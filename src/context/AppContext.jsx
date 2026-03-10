/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {

    // Initial user match history
    const [matchHistory, setMatchHistory] = useState([
        { id: 101, name: "Daily Morning Faceoff", date: "Oct 24, 2024", result: "Won", points: 450, prize: "₹500" },
        { id: 102, name: "Solo King Championship", date: "Oct 22, 2024", result: "Lost", points: 20, prize: "-" },
    ]);

    // Tournaments list
    const [tournaments, setTournaments] = useState([]);

    // Join a tournament (Guest)
    const joinTournament = (tournamentId) => {
        const tIndex = tournaments.findIndex(t => t.id === Number(tournamentId));
        if (tIndex > -1) {
            setTournaments(prev => {
                const newT = [...prev];
                newT[tIndex] = { ...newT[tIndex], players: newT[tIndex].players + 1 };
                return newT;
            });
            return true;
        }
        return false;
    };

    // Admin Create Tournament
    const createTournament = (newT) => {
        setTournaments([
            { ...newT, id: Date.now(), players: 0, status: 'upcoming', game: 'Free Fire', perspective: 'TPP', time: 'Upcoming' },
            ...tournaments
        ]);
    };

    // Admin Edit Tournament
    const editTournament = (id, updatedT) => {
        setTournaments(prev => prev.map(t => t.id === id ? { ...t, ...updatedT } : t));
    };

    // Admin Delete Tournament
    const deleteTournament = (id) => {
        setTournaments(prev => prev.filter(t => t.id !== id));
    };

    // Admin Close Registration
    const closeRegistration = (id) => {
        setTournaments(prev => prev.map(t => t.id === id ? { ...t, status: 'closed', time: 'Registration Closed' } : t));
    };

    // Admin update result (mock)
    const setTournamentResult = (tId) => {
        setTournaments(prev => prev.map(t => t.id === tId ? { ...t, status: 'completed', time: 'Completed' } : t));
    };

    return (
        <AppContext.Provider value={{
            tournaments,
            matchHistory,
            setMatchHistory,
            joinTournament,
            createTournament,
            editTournament,
            deleteTournament,
            closeRegistration,
            setTournamentResult
        }}>
            {children}
        </AppContext.Provider>
    );
};
