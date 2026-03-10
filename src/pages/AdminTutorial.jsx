import React from 'react';
import { Shield, FileText, CheckCircle, Smartphone, Users, Key } from 'lucide-react';
import './AdminTutorial.css';

const AdminTutorial = () => {
    return (
        <div className="tutorial-page">
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">How to Create a <span className="text-gradient">Tournament</span></h1>
                    <p className="page-subtitle">A step-by-step guide for Admins to manage and host Free Fire matches.</p>
                </div>
            </div>

            <div className="container content-section">
                <div className="tutorial-steps">

                    {/* Step 1 */}
                    <div className="step-card glass-panel">
                        <div className="step-number">1</div>
                        <div className="step-content">
                            <h3 className="step-title"><Shield className="step-icon text-primary" /> Go to Admin Panel</h3>
                            <p className="text-muted">Navigate to the hidden Admin Dashboard where all tournaments are managed.</p>
                        </div>
                    </div>

                    {/* Step 2 & 3 */}
                    <div className="step-card glass-panel">
                        <div className="step-number">2</div>
                        <div className="step-content">
                            <h3 className="step-title"><FileText className="step-icon text-warning" /> Fill Tournament Details</h3>
                            <p className="text-muted mb-3">Click on <strong>"Create Tournament"</strong> and enter the required details:</p>
                            <ul className="step-list text-sm text-muted">
                                <li><strong>Tournament Name</strong> e.g., "Weekend Scrims"</li>
                                <li><strong>Match Type</strong> (Solo / Duo / Squad)</li>
                                <li><strong>Entry Fee</strong> (Amount in ₹)</li>
                                <li><strong>Prize Pool</strong> (Total distribution amount)</li>
                                <li><strong>Total Players</strong> Maximum allowed participants</li>
                                <li><strong>Match Date & Time</strong> When the room will be created</li>
                            </ul>
                        </div>
                    </div>

                    {/* Step 4 & 5 */}
                    <div className="step-card glass-panel">
                        <div className="step-number">3</div>
                        <div className="step-content">
                            <h3 className="step-title"><CheckCircle className="step-icon text-success" /> Publish Tournament</h3>
                            <p className="text-muted">
                                Click <strong>"Publish Tournament"</strong>. The match will immediately become visible to all players in the "Live & Upcoming Matches" section.
                            </p>
                        </div>
                    </div>

                    {/* Step 6 & 7 */}
                    <div className="step-card glass-panel">
                        <div className="step-number">4</div>
                        <div className="step-content">
                            <h3 className="step-title"><Smartphone className="step-icon text-info" /> Player Registration & Payment</h3>
                            <p className="text-muted mb-3">
                                Players will click "Join Match", fill in their Free Fire UID, and pay the Entry Fee via the <strong>QR Code</strong>.
                            </p>
                            <div className="alert alert-info border-info text-sm bg-dark">
                                <strong>Note:</strong> Players MUST upload a screenshot of their successful payment to complete registration.
                            </div>
                        </div>
                    </div>

                    {/* Step 8 */}
                    <div className="step-card glass-panel">
                        <div className="step-number">5</div>
                        <div className="step-content">
                            <h3 className="step-title"><Users className="step-icon text-primary" /> Verify & Approve Players</h3>
                            <p className="text-muted">
                                Go to the <strong>"Approvals"</strong> tab in the Admin Panel. Review the uploaded payment screenshots and click <strong>Approve</strong>. Approved players are added to the match roster.
                            </p>
                        </div>
                    </div>

                    {/* Step 9 & 10 */}
                    <div className="step-card glass-panel">
                        <div className="step-number">6</div>
                        <div className="step-content">
                            <h3 className="step-title"><Key className="step-icon text-danger" /> Share Room Details</h3>
                            <p className="text-muted">
                                10-15 minutes before the match begins, create the Custom Room in Free Fire. Then, update the tournament in the Admin Panel to include the <strong>Room ID and Password</strong>. <br /><br />
                                <em>Only approved players will be able to see these credentials in their Match Room tab.</em>
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AdminTutorial;
