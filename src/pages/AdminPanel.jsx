import React, { useState } from 'react';
import { LayoutDashboard, Users as UsersIcon, Swords, Trophy, DollarSign, Settings, Plus, Search, Edit2, Trash2, XCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import CreateTournamentModal from '../components/CreateTournamentModal';
import './AdminPanel.css';

const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const { tournaments, deleteTournament, closeRegistration } = useApp();

    const handleEdit = (id) => {
        alert(`Edit functionality will open a modal with populated details for ID: ${id}.`);
    };

    // Removed inline prompt creation

    // Derived stats
    const stats = [
        { title: "Total Users", value: "1,245", icon: <UsersIcon size={24} />, color: "text-primary" },
        { title: "Active Tournaments", value: tournaments.length, icon: <Swords size={24} />, color: "text-warning" },
        { title: "Matches Completed", value: "348", icon: <Trophy size={24} />, color: "text-success" },
        { title: "Total Revenue", value: "₹45,200", icon: <DollarSign size={24} />, color: "text-secondary" },
    ];

    return (
        <div className="admin-page">
            <div className="admin-layout">
                <aside className="admin-sidebar glass-panel">
                    <div className="admin-brand">
                        <span className="text-gradient font-bold text-xl">Arena Admin</span>
                    </div>
                    <nav className="admin-nav">
                        <button className={`admin-nav-link ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
                            <LayoutDashboard size={18} /> Overview
                        </button>
                        <button className={`admin-nav-link ${activeTab === 'tournaments' ? 'active' : ''}`} onClick={() => setActiveTab('tournaments')}>
                            <Swords size={18} /> Tournaments
                        </button>
                        <button className={`admin-nav-link ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>
                            <UsersIcon size={18} /> Users
                        </button>
                        <button className={`admin-nav-link ${activeTab === 'results' ? 'active' : ''}`} onClick={() => setActiveTab('results')}>
                            <Trophy size={18} /> Match Results
                        </button>
                        <button className="admin-nav-link mt-auto hover-danger">
                            <Settings size={18} /> Settings
                        </button>
                    </nav>
                </aside>

                <main className="admin-content">
                    <div className="admin-header glass-panel mb-4">
                        <h2 className="admin-title text-capitalize">{activeTab} Management</h2>
                        <div className="admin-profile">
                            <span className="text-muted mr-3">Welcome, SuperAdmin</span>
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" alt="Admin" className="admin-avatar" />
                        </div>
                    </div>

                    {activeTab === 'overview' && (
                        <div className="admin-tab fade-in">
                            <div className="stats-grid mb-5">
                                {stats.map((s, i) => (
                                    <div key={i} className="admin-stat-card glass-panel">
                                        <div className="stat-header">
                                            <span className="text-muted text-sm text-uppercase">{s.title}</span>
                                            <div className={`stat-icon ${s.color}`}>{s.icon}</div>
                                        </div>
                                        <div className="stat-value">{s.value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'tournaments' && (
                        <div className="admin-tab fade-in">
                            <div className="d-flex justify-between align-center mb-4">
                                <div className="search-box">
                                    <Search size={18} className="search-icon" />
                                    <input type="text" placeholder="Search tournaments..." />
                                </div>
                                <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
                                    <Plus size={18} /> Create Tournament
                                </button>
                            </div>

                            <div className="glass-panel admin-table-container">
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Status</th>
                                            <th>Players</th>
                                            <th>Entry / Prize</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tournaments.map(t => (
                                            <tr key={t.id}>
                                                <td>#{t.id}</td>
                                                <td className="font-bold">{t.name}</td>
                                                <td>
                                                    <span className={`status-badge ${t.status?.toLowerCase()}`}>{t.status || 'Live'}</span>
                                                </td>
                                                <td>{t.players}/{t.maxPlayers}</td>
                                                <td>{t.entry} / {t.prize}</td>
                                                <td>
                                                    <button className="btn-link text-primary mr-2" onClick={() => handleEdit(t.id)} title="Edit"><Edit2 size={16} /></button>
                                                    <button className="btn-link text-warning mr-2" onClick={() => closeRegistration(t.id)} title="Close Registrations"><XCircle size={16} /></button>
                                                    <button className="btn-link text-danger" onClick={() => { if (window.confirm('Delete tournament?')) deleteTournament(t.id) }} title="Delete"><Trash2 size={16} /></button>
                                                </td>
                                            </tr>
                                        ))}
                                        {tournaments.length === 0 && (
                                            <tr>
                                                <td colSpan="6" className="text-center text-muted p-4">No tournaments available. Create one!</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </main>
            </div>

            {showCreateModal && <CreateTournamentModal onClose={() => setShowCreateModal(false)} />}
        </div>
    );
};

export default AdminPanel;
