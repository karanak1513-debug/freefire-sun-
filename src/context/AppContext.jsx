/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext, useEffect } from 'react';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, query, orderBy, where, getDocs } from 'firebase/firestore';
import { ref, onValue, set, update } from 'firebase/database';
import { db, rtdb } from '../firebase';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {

    // Firestore Collections State
    const [rawTournaments, setRawTournaments] = useState([]);
    const [users, setUsers] = useState([]);
    const [entries, setEntries] = useState([]);
    const [payments, setPayments] = useState([]);
    const [uidSubmissions, setUidSubmissions] = useState([]);
    const [liveRoomDetails, setLiveRoomDetails] = useState({});
    const [liveMessages, setLiveMessages] = useState({});

    const [currentTime, setCurrentTime] = useState(Date.now());

    // Listeners
    useEffect(() => {
        const q = query(collection(db, 'users'), orderBy('joinedAt', 'desc'));
        return onSnapshot(q, (s) => setUsers(s.docs.map(d => ({ id: d.id, ...d.data() }))));
    }, []);

    useEffect(() => {
        const q = query(collection(db, 'tournaments'), orderBy('createdAt', 'desc'));
        return onSnapshot(q, (s) => setRawTournaments(s.docs.map(d => ({ id: d.id, ...d.data() }))));
    }, []);

    // RTDB Listener for room details & Chat (Lower latency)
    useEffect(() => {
        const roomRef = ref(rtdb, 'match_details');
        const r1 = onValue(roomRef, (snapshot) => {
            const data = snapshot.val();
            if (data) setLiveRoomDetails(data);
        });

        const chatRef = ref(rtdb, 'chats');
        const r2 = onValue(chatRef, (snapshot) => {
            const data = snapshot.val();
            if (data) setLiveMessages(data);
        });

        return () => { r1(); r2(); };
    }, []);

    useEffect(() => {
        const q = query(collection(db, 'entries'), orderBy('joinTime', 'desc'));
        return onSnapshot(q, (s) => setEntries(s.docs.map(d => ({ id: d.id, ...d.data() }))));
    }, []);

    useEffect(() => {
        const q = query(collection(db, 'payments'), orderBy('submittedAt', 'desc'));
        return onSnapshot(q, (s) => setPayments(s.docs.map(d => ({ id: d.id, ...d.data() }))));
    }, []);

    useEffect(() => {
        const q = query(collection(db, 'uid_submissions'), orderBy('submitTime', 'desc'));
        return onSnapshot(q, (s) => setUidSubmissions(s.docs.map(d => ({ id: d.id, ...d.data() }))));
    }, []);

    // Interval for status
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(Date.now()), 10000);
        return () => clearInterval(timer);
    }, []);

    const tournaments = rawTournaments.map(t => {
        // Overlay RTDB data if it exists for this tournament
        const rtdbData = liveRoomDetails[t.id] || {};
        
        const mergedT = {
            ...t,
            roomId: rtdbData.roomId || t.roomId,
            roomPassword: rtdbData.roomPassword || t.roomPassword
        };

        if (mergedT.status === 'completed' || mergedT.status === 'closed' || mergedT.status === 'live') return mergedT;
        try {
            let finalDateStr = mergedT.date;
            if (mergedT.date && mergedT.date.toLowerCase() === 'today') finalDateStr = new Date().toDateString();
            let parsedTime = null;
            if (mergedT.date && mergedT.date.includes('-')) {
                const timePart = mergedT.exactTime ? (mergedT.exactTime.includes('AM') || mergedT.exactTime.includes('PM') ? mergedT.exactTime : `${mergedT.exactTime}:00`) : '00:00:00';
                parsedTime = new Date(`${mergedT.date}T${timePart.replace(' AM', '').replace(' PM', '')}`).getTime();
            } else {
                parsedTime = new Date(`${finalDateStr} ${mergedT.exactTime || '00:00'}`).getTime();
            }
            if (parsedTime && !isNaN(parsedTime) && currentTime >= parsedTime) return { ...mergedT, status: 'live' };
        } catch { /* ignore */ }
        return { ...mergedT, status: 'upcoming' };
    });

    // Actions
    const joinTournament = async (tournamentId, playerData) => {
        try {
            const userId = playerData.userId || `guest_${Date.now()}`;
            await addDoc(collection(db, 'entries'), { tournamentId, userId, username: playerData.name, paymentStatus: 'pending', joinTime: Date.now() });
            await addDoc(collection(db, 'payments'), { tournamentId, userId, username: playerData.name, amount: playerData.entryFee, screenshot: playerData.screenshotId, status: 'pending', submittedAt: Date.now() });
            await addDoc(collection(db, 'uid_submissions'), { tournamentId, userId, freeFireUID: playerData.ffuid, submitTime: Date.now() });

            const tRef = doc(db, 'tournaments', tournamentId);
            const tData = rawTournaments.find(t => t.id === tournamentId);
            await updateDoc(tRef, { players: (tData?.players || 0) + 1 });
            return true;
        } catch (error) { console.error(error); return false; }
    };

    const createTournament = async (newT) => {
        try {
            await addDoc(collection(db, 'tournaments'), { ...newT, players: 0, status: 'upcoming', createdAt: Date.now(), roomId: '', roomPassword: '', winners: null });
            return true;
        } catch (error) {
            console.error("Create tournament error:", error);
            throw error;
        }
    };

    const updateRoomDetails = async (id, roomId, roomPassword) => {
        try { 
            // Update Firestore (Source of truth/Permanent storage)
            await updateDoc(doc(db, 'tournaments', id), { roomId, roomPassword }); 
            
            // Update RTDB (Ultra-fast sync for players)
            await set(ref(rtdb, `match_details/${id}`), { roomId, roomPassword, updatedAt: Date.now() });

            alert("Room data shared via Realtime Database!");
        } catch (error) { console.error(error); alert("Failed to save room data."); }
    };


    const approvePayment = async (paymentId, tournamentId, userId) => {
        try {
            await updateDoc(doc(db, 'payments', paymentId), { status: 'approved' });
            const entriesRef = collection(db, 'entries');
            const q = query(entriesRef, where('tournamentId', '==', tournamentId), where('userId', '==', userId));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(async (d) => {
                await updateDoc(doc(db, 'entries', d.id), { paymentStatus: 'approved' });
            });
        } catch (error) { console.error(error); }
    };

    const rejectPayment = async (paymentId) => {
        try { await updateDoc(doc(db, 'payments', paymentId), { status: 'rejected' }); }
        catch (error) { console.error(error); }
    };

    const startMatch = async (id) => {
        try { 
            await updateDoc(doc(db, 'tournaments', id), { status: 'live' });
            alert("Match started successfully!");
        } catch (error) { console.error(error); alert("Failed to start match."); }
    };

    const endWithWinners = async (id, winners) => {
        try { 
            await updateDoc(doc(db, 'tournaments', id), { status: 'completed', winners });
            alert("Match completed and winners saved!");
        } catch (error) { console.error(error); alert("Failed to save winners."); }
    };

    const deleteTournament = async (id) => {
        try { 
            await deleteDoc(doc(db, 'tournaments', id));
            alert("Tournament deleted successfully!");
        } catch (error) { console.error(error); alert("Failed to delete tournament."); }
    };

    const deleteUser = async (uId) => {
        if (window.confirm("Delete?")) await deleteDoc(doc(db, 'users', uId));
    };

    const toggleUserStatus = async (uId, status) => {
        await updateDoc(doc(db, 'users', uId), { status: status === 'Active' ? 'Banned' : 'Active' });
    };

    const promoteToAdmin = async (uId, currentRole) => {
        try {
            await updateDoc(doc(db, 'users', uId), { role: currentRole === 'admin' ? 'player' : 'admin' });
        } catch (error) { console.error(error); }
    };

    const submitLateUID = async (tournamentId, userId, username, freeFireUID) => {
        try {
            await addDoc(collection(db, 'uid_submissions'), { tournamentId, userId, playerName: username, freeFireUID, submitTime: Date.now() });
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    const sendRoomMessage = async (tournamentId, messageData) => {
        try {
            const msgId = Date.now().toString();
            await set(ref(rtdb, `chats/${tournamentId}/${msgId}`), {
                ...messageData,
                time: Date.now()
            });
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    return (
        <AppContext.Provider value={{
            tournaments, users, entries, payments, uidSubmissions, liveMessages,
            joinTournament, createTournament, updateRoomDetails,
            approvePayment, rejectPayment, startMatch, endMatch: endWithWinners,
            deleteTournament, deleteUser, toggleUserStatus, promoteToAdmin, submitLateUID,
            sendRoomMessage
        }}>
            {children}
        </AppContext.Provider>
    );
};
