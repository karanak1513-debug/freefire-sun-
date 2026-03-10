import React from 'react';
import { User, Mail, Calendar, LogOut, Shield, Award, MapPin, Edit2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
    const { currentUser, userData, logout, isAdmin } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    if (!userData) return <div className="loading-screen text-center p-5">Loading Profile...</div>;

    return (
        <div className="dashboard-page fade-in container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Profile Overview Card */}
                <div className="lg:col-span-1">
                    <div className="glass-panel profile-card p-6 text-center">
                        <div className="profile-photo-wrapper mb-4">
                            {userData.profilePhoto ? (
                                <img src={userData.profilePhoto} alt="Profile" className="profile-img" />
                            ) : (
                                <div className="profile-placeholder">
                                    <User size={64} />
                                </div>
                            )}
                            <button className="edit-photo-btn">
                                <Edit2 size={16} />
                            </button>
                        </div>
                        
                        <h2 className="text-2xl font-bold mb-1">{userData.username}</h2>
                        <p className="text-muted flex items-center justify-center gap-2 mb-4">
                            <Mail size={14} /> {userData.email}
                        </p>
                        
                        <div className="flex justify-center gap-3 mb-6">
                            {isAdmin && (
                                <span className="badge badge-admin flex items-center gap-1">
                                    <Shield size={12} /> Admin
                                </span>
                            )}
                            <span className="badge badge-user">Pro Player</span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 border-t border-b border-gray-800 py-6 mb-6">
                            <div className="stat-item">
                                <span className="stat-value">12</span>
                                <span className="stat-label">Matches</span>
                            </div>
                            <div className="stat-item border-l border-gray-800">
                                <span className="stat-value">4</span>
                                <span className="stat-label">Wins</span>
                            </div>
                        </div>

                        <button onClick={handleLogout} className="btn btn-outline w-full flex items-center justify-center gap-2">
                            <LogOut size={18} /> Logout
                        </button>
                    </div>
                </div>

                {/* Account Details & Activity */}
                <div className="lg:col-span-2">
                    <div className="glass-panel p-8 mb-8">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <Award className="text-primary" /> Account Statistics
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="info-card p-4 rounded-lg bg-black/30 border border-white/5">
                                <p className="text-xs text-muted uppercase tracking-wider mb-1">Account ID</p>
                                <p className="font-mono text-sm truncate">{userData.uid}</p>
                            </div>
                            <div className="info-card p-4 rounded-lg bg-black/30 border border-white/5">
                                <p className="text-xs text-muted uppercase tracking-wider mb-1">Joined Date</p>
                                <p className="font-medium">
                                    {userData.joinedAt ? new Date(userData.joinedAt.seconds * 1000).toLocaleDateString() : 'Recent'}
                                </p>
                            </div>
                            <div className="info-card p-4 rounded-lg bg-black/30 border border-white/5">
                                <p className="text-xs text-muted uppercase tracking-wider mb-1">Rank</p>
                                <p className="font-bold text-primary">Gold II</p>
                            </div>
                        </div>
                    </div>

                    <div className="glass-panel p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold">Recent Participations</h3>
                            <button className="text-sm text-primary hover-underline">View All</button>
                        </div>
                        
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded bg-primary/20 flex items-center justify-center text-primary font-bold">
                                            T{i}
                                        </div>
                                        <div>
                                            <p className="font-bold">Elite Solo Tournament #{i+100}</p>
                                            <p className="text-xs text-muted">24 Oct, 2024 • Bermunda</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-success">+ ₹200</p>
                                        <p className="text-xs text-muted">Position: #2</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
