/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword,
    signInWithPopup,
    signOut,
    sendPasswordResetEmail,
    updateProfile,
    sendEmailVerification
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, googleProvider, db } from '../firebase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Root Admin Emails - Users with these emails bypass regular role checks
const ADMIN_EMAILS = [
    'firefire2674543015@gmail.com',
    'karanak1513@gmail.com',
];

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    // Sync Firestore User Data
    const syncUserData = async (user) => {
        if (!user) return;
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        
        if (userSnap.exists()) {
            const data = userSnap.data();
            // Force role to admin if in hardcoded list
            if (ADMIN_EMAILS.includes(user.email) && data.role !== 'admin') {
                const updatedData = { ...data, role: 'admin' };
                await setDoc(userRef, { role: 'admin' }, { merge: true });
                setUserData(updatedData);
            } else {
                setUserData(data);
            }
        } else {
            const newUser = {
                uid: user.uid,
                email: user.email,
                username: user.displayName || user.email.split('@')[0],
                profilePhoto: user.photoURL || '',
                role: ADMIN_EMAILS.includes(user.email) ? 'admin' : 'user',
                status: 'Active',
                joinedAt: serverTimestamp(),
                realName: '',
                freeFireUID: '',
                gameName: '',
                phone: ''
            };
            await setDoc(userRef, newUser);
            setUserData(newUser);
        }
    };

    const updateUserData = async (newData) => {
        if (!currentUser) return;
        const userRef = doc(db, 'users', currentUser.uid);
        await setDoc(userRef, newData, { merge: true });
        setUserData(prev => ({ ...prev, ...newData }));
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);
            if (user) {
                await syncUserData(user);
                // The role will be set in syncUserData or fetched from Firestore
            } else {
                setUserData(null);
                setIsAdmin(false);
            }
            setIsLoading(false);
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        if (userData) {
            setIsAdmin(userData.role === 'admin' || ADMIN_EMAILS.includes(currentUser?.email));
        } else {
            setIsAdmin(false);
        }
    }, [userData, currentUser]);

    const signup = async (email, password, username) => {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(res.user, { displayName: username });
        await sendEmailVerification(res.user);
        return res;
    };

    const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
    
    const googleLogin = () => signInWithPopup(auth, googleProvider);
    
    const logout = () => signOut(auth);
    
    const resetPassword = (email) => sendPasswordResetEmail(auth, email);

    const value = {
        currentUser,
        userData,
        isAdmin,
        isLoading,
        signup,
        login,
        googleLogin,
        logout,
        resetPassword,
        updateUserData
    };

    return (
        <AuthContext.Provider value={value}>
            {!isLoading && children}
        </AuthContext.Provider>
    );
};
