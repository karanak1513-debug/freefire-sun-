import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Copy, ShieldAlert, Timer, CheckCircle, Smartphone } from 'lucide-react';
import './MatchRoom.css';

const MatchRoom = () => {
    const { id } = useParams();
    // In a real app, use the id to fetch room details from backend
    console.log("Viewing Room ID:", id);
    const [copiedId, setCopiedId] = useState(false);
    const [copiedPass, setCopiedPass] = useState(false);

    // Fake countdown
    const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 mins

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const copyToClipboard = (text, type) => {
        navigator.clipboard.writeText(text);
        if (type === 'id') {
            setCopiedId(true);
            setTimeout(() => setCopiedId(false), 2000);
        } else {
            setCopiedPass(true);
            setTimeout(() => setCopiedPass(false), 2000);
        }
    };

    return (
        <div className="match-room-page">
            <div className="container match-room-container">
                <div className="text-center mb-5">
                    <div className="status-indicator">
                        <span className="live-dot-large"></span> Match is Live
                    </div>
                    <h1 className="room-title">Match <span className="text-gradient">Room</span></h1>
                    <p className="text-muted text-lg mt-2">Night Owl Scrims VIP • Squad TPP • Bermuda</p>
                </div>

                <div className="room-grid">

                    {/* Credentials Card */}
                    <div className="glass-panel room-card credentials-card">
                        <div className="card-header text-center border-bottom pb-4 mb-4">
                            <Timer size={40} className="text-primary mx-auto mb-3" />
                            <h3 className="countdown-text glow-text">{formatTime(timeLeft)}</h3>
                            <p className="text-muted">Time until match start</p>
                        </div>

                        <div className="credentials-box">
                            <h4 className="text-warning mb-4 text-center">Room Details Revealed!</h4>

                            <div className="cred-row">
                                <div className="cred-info">
                                    <span className="cred-label">Custom Room ID</span>
                                    <span className="cred-value text-gradient">9823412</span>
                                </div>
                                <button
                                    className="btn btn-outline btn-sm copy-btn"
                                    onClick={() => copyToClipboard('9823412', 'id')}
                                >
                                    {copiedId ? <CheckCircle size={16} className="text-success" /> : <Copy size={16} />}
                                    {copiedId ? 'Copied' : 'Copy'}
                                </button>
                            </div>

                            <div className="cred-row mt-3">
                                <div className="cred-info">
                                    <span className="cred-label">Room Password</span>
                                    <span className="cred-value text-gradient">arena99</span>
                                </div>
                                <button
                                    className="btn btn-outline btn-sm copy-btn"
                                    onClick={() => copyToClipboard('arena99', 'pass')}
                                >
                                    {copiedPass ? <CheckCircle size={16} className="text-success" /> : <Copy size={16} />}
                                    {copiedPass ? 'Copied' : 'Copy'}
                                </button>
                            </div>
                        </div>

                        <a href="intent://freefire.mobile#Intent;scheme=android-app;package=com.dts.freefireth;end;" className="btn btn-primary w-100 btn-lg mt-4 d-flex justify-center flex-col align-center">
                            <span className="d-flex align-center"><Smartphone size={20} className="mr-2" /> Open Free Fire Game</span>
                        </a>
                    </div>

                    {/* Instructions Card */}
                    <div className="glass-panel room-card instructions-card">
                        <h3 className="card-title mb-4 flex align-center"><ShieldAlert size={24} className="mr-2 text-warning" /> Important Instructions</h3>

                        <div className="instruction-step">
                            <div className="step-number">1</div>
                            <div className="step-details">
                                <h4>Copy Room ID & Password</h4>
                                <p className="text-muted text-sm">Use the copy buttons to securely copy the credentials provided.</p>
                            </div>
                        </div>

                        <div className="instruction-step">
                            <div className="step-number">2</div>
                            <div className="step-details">
                                <h4>Open Free Fire Game</h4>
                                <p className="text-muted text-sm">Launch Free Fire on your device and navigate to the Custom Room tab.</p>
                            </div>
                        </div>

                        <div className="instruction-step">
                            <div className="step-number">3</div>
                            <div className="step-details">
                                <h4>Search & Join</h4>
                                <p className="text-muted text-sm">Search for the Room ID and enter the password when prompted.</p>
                            </div>
                        </div>

                        <div className="instruction-step">
                            <div className="step-number">4</div>
                            <div className="step-details">
                                <h4>Take your Slot</h4>
                                <p className="text-muted text-sm">Occupy an empty slot. Ensure your in-game name matches your profile name exactly.</p>
                            </div>
                        </div>

                        <div className="warning-box mt-4">
                            <strong>WARNING:</strong> DO NOT share this Room ID and Password with anyone else. Unregistered players will be kicked, and the account that invited them will be banned from the platform.
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default MatchRoom;
