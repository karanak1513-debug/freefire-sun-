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

const ADMIN_EMAIL = 'firefire2674543015@gmail.com'; // Admin from previous version

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
            setUserData(userSnap.data());
        } else {
            const newUser = {
                uid: user.uid,
                email: user.email,
                username: user.displayName || user.email.split('@')[0],
                profilePhoto: user.photoURL || '',
                role: user.email === ADMIN_EMAIL ? 'admin' : 'user',
                status: 'Active',
                joinedAt: serverTimestamp()
            };
            await setDoc(userRef, newUser);
            setUserData(newUser);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);
            if (user) {
                await syncUserData(user);
                setIsAdmin(user.email === ADMIN_EMAIL);
            } else {
                setUserData(null);
                setIsAdmin(false);
            }
            setIsLoading(false);
        });
        return unsubscribe;
    }, []);

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
        resetPassword
    };

    return (
        <AuthContext.Provider value={value}>
            {!isLoading && children}
        </AuthContext.Provider>
    );
};
