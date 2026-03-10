import React, { useState } from 'react';
import { Medal, Trophy, Crosshair, Users } from 'lucide-react';
import './Leaderboard.css';

const Leaderboard = () => {
    const [activeTab, setActiveTab] = useState('global');

    // Dummy data
    const players = [
        { rank: 1, name: "TSG_Legend", uid: "12345678", points: 15420, kills: 1450, winRate: "35%", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" },
        { rank: 2, name: "Gyan_Sujan", uid: "87654321", points: 14200, kills: 1320, winRate: "32%", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sujan" },
        { rank: 3, name: "Total_Gaming", uid: "45678912", points: 13800, kills: 1250, winRate: "28%", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ajjubhai" },
        { rank: 4, name: "Desi_Gamers", uid: "78912345", points: 12500, kills: 1100, winRate: "25%", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amit" },
        { rank: 5, name: "Lokesh_Gamer", uid: "34567890", points: 11900, kills: 980, winRate: "22%", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lokesh" },
        { rank: 6, name: "Two_Side_Gamers", uid: "90123456", points: 10500, kills: 850, winRate: "20%", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jash" },
    ];

    return (
        <div className="leaderboard-page">
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">Top <span className="text-gradient">Players</span></h1>
                    <p className="page-subtitle">The most elite Free Fire players on FireBattle Arena based on tournament performance.</p>
                </div>
            </div>

            <div className="container content-section">
                <div className="leaderboard-tabs glass-panel mb-5">
                    <button className={`lb-tab ${activeTab === 'global' ? 'active' : ''}`} onClick={() => setActiveTab('global')}>
                        <Trophy size={18} /> Global Rank
                    </button>
                    <button className={`lb-tab ${activeTab === 'killers' ? 'active' : ''}`} onClick={() => setActiveTab('killers')}>
                        <Crosshair size={18} /> Top Killers
                    </button>
                    <button className={`lb-tab ${activeTab === 'clans' ? 'active' : ''}`} onClick={() => setActiveTab('clans')}>
                        <Users size={18} /> Top Clans
                    </button>
                </div>

                {/* Top 3 Podium */}
                <div className="podium-section">
                    <div className="podium-wrapper">
                        {/* Rank 2 */}
                        <div className="podium-item rank-2 glass-panel">
                            <div className="podium-avatar">
                                <img src={players[1].avatar} alt={players[1].name} />
                                <div className="rank-badge silver">2</div>
                            </div>
                            <h3 className="player-name">{players[1].name}</h3>
                            <p className="player-points text-gradient">{players[1].points} pts</p>
                        </div>

                        {/* Rank 1 */}
                        <div className="podium-item rank-1 glass-panel">
                            <div className="podium-avatar">
                                <img src={players[0].avatar} alt={players[0].name} className="glow-gold" />
                                <div className="rank-badge gold"><Medal size={16} /> 1</div>
                            </div>
                            <h3 className="player-name glow-text">{players[0].name}</h3>
                            <p className="player-points text-gradient font-bold" style={{ fontSize: '1.25rem' }}>{players[0].points} pts</p>
                        </div>

                        {/* Rank 3 */}
                        <div className="podium-item rank-3 glass-panel">
                            <div className="podium-avatar">
                                <img src={players[2].avatar} alt={players[2].name} />
                                <div className="rank-badge bronze">3</div>
                            </div>
                            <h3 className="player-name">{players[2].name}</h3>
                            <p className="player-points text-gradient">{players[2].points} pts</p>
                        </div>
                    </div>
                </div>

                {/* Leaderboard Table */}
                <div className="leaderboard-table-container glass-panel">
                    <table className="leaderboard-table">
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Player Info</th>
                                <th>Matches</th>
                                <th>Kills</th>
                                <th>Win Rate</th>
                                <th>Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {players.map((player) => (
                                <tr key={player.rank} className={player.rank <= 3 ? 'top-row' : ''}>
                                    <td className="rank-col">
                                        <span className={`rank-number r-${player.rank}`}>{player.rank}</span>
                                    </td>
                                    <td>
                                        <div className="player-info-cell">
                                            <img src={player.avatar} alt={player.name} className="mini-avatar" />
                                            <div>
                                                <div className="font-bold">{player.name}</div>
                                                <div className="text-xs text-muted">ID: {player.uid}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{Math.floor(player.kills / 6)}</td> {/* Fake matches count */}
                                    <td>{player.kills}</td>
                                    <td>{player.winRate}</td>
                                    <td className="text-secondary font-bold">{player.points}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;
