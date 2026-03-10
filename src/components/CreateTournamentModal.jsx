import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useApp } from '../context/AppContext';

const CreateTournamentModal = ({ onClose }) => {
    const { createTournament } = useApp();
    const [formData, setFormData] = useState({
        name: '',
        game: 'Free Fire',
        mode: 'Squad',
        entry: '₹50',
        prize: '₹5000', // Total format
        prize1: '₹2500',
        prize2: '₹1000',
        prize3: '₹500',
        prizeKill: '₹10',
        maxPlayers: 48,
        date: new Date().toISOString().split('T')[0],
        exactTime: '20:00',
        regCloseTime: '19:30',
        rules: 'Standard Free Fire esports rules apply. No hacking.',
        paymentMethod: 'UPI',
        paymentId: 'firebattle@upi',
        qrCodeImage: null
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            // Very simple local data read for demo purposes
            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, [name]: reader.result }));
            };
            if (file) reader.readAsDataURL(file);
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Structure the custom prizes array
            const customPrizes = [
                { rank: "1st Prize", amount: formData.prize1 },
                { rank: "2nd Prize", amount: formData.prize2 },
                { rank: "3rd Prize", amount: formData.prize3 }
            ];

            if (formData.prizeKill) {
                customPrizes.push({ rank: "Per Kill", amount: formData.prizeKill });
            }

            const finalData = {
                ...formData,
                prizes: customPrizes
            };

            console.log("Creating tournament with data:", finalData);
            await createTournament(finalData);
            alert('✅ Tournament Created Successfully!');
            onClose();
        } catch (error) {
            console.error("Failed to create tournament:", error);
            alert(`❌ Error creating tournament: ${error.message || 'Check Firestore permissions'}`);
        }
    };

    return (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="modal-content glass-panel p-5" style={{ maxWidth: '500px', width: '90%', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}>
                <button className="close-btn" onClick={onClose} style={{ position: 'absolute', top: '15px', right: '15px', background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}>
                    <X size={24} />
                </button>

                <h2 className="text-xl font-bold mb-4 text-gradient">Create New Tournament</h2>

                <form onSubmit={handleSubmit} className="auth-form mb-0">
                    <div className="form-group mb-3">
                        <label className="text-muted text-sm d-block mb-1">Tournament Name *</label>
                        <input type="text" name="name" required placeholder="e.g. Pro League Season 1" className="w-100 p-2 rounded bg-dark border-secondary text-white" value={formData.name} onChange={handleChange} />
                    </div>

                    <div className="d-flex" style={{ gap: '15px' }}>
                        <div className="form-group mb-3 w-50">
                            <label className="text-muted text-sm d-block mb-1">Match Type</label>
                            <select name="mode" className="w-100 p-2 rounded bg-dark border-secondary text-white" value={formData.mode} onChange={handleChange}>
                                <option value="Solo">Solo</option>
                                <option value="Duo">Duo</option>
                                <option value="Squad">Squad</option>
                            </select>
                        </div>
                        <div className="form-group mb-3 w-50">
                            <label className="text-muted text-sm d-block mb-1">Maximum Players *</label>
                            <input type="number" name="maxPlayers" required className="w-100 p-2 rounded bg-dark border-secondary text-white" value={formData.maxPlayers} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="d-flex" style={{ gap: '15px' }}>
                        <div className="form-group mb-3 w-50">
                            <label className="text-muted text-sm d-block mb-1">Entry Fee (₹) *</label>
                            <input type="text" name="entry" required placeholder="e.g. ₹50 or Free" className="w-100 p-2 rounded bg-dark border-secondary text-white" value={formData.entry} onChange={handleChange} />
                        </div>
                        <div className="form-group mb-3 w-50">
                            <label className="text-muted text-sm d-block mb-1">Total Prize Pool (₹) *</label>
                            <input type="text" name="prize" required placeholder="e.g. ₹5000" className="w-100 p-2 rounded bg-dark border-secondary text-white" value={formData.prize} onChange={handleChange} />
                        </div>
                    </div>

                    <h3 className="text-lg font-bold mb-3 mt-2 text-gradient">Prize Distribution</h3>
                    <div className="d-flex flex-wrap" style={{ gap: '15px' }}>
                        <div className="form-group mb-3" style={{ width: 'calc(50% - 7.5px)' }}>
                            <label className="text-muted text-sm d-block mb-1">1st Prize (₹) *</label>
                            <input type="text" name="prize1" required placeholder="e.g. ₹2500" className="w-100 p-2 rounded bg-dark border-secondary text-white" value={formData.prize1} onChange={handleChange} />
                        </div>
                        <div className="form-group mb-3" style={{ width: 'calc(50% - 7.5px)' }}>
                            <label className="text-muted text-sm d-block mb-1">2nd Prize (₹) *</label>
                            <input type="text" name="prize2" required placeholder="e.g. ₹1000" className="w-100 p-2 rounded bg-dark border-secondary text-white" value={formData.prize2} onChange={handleChange} />
                        </div>
                        <div className="form-group mb-3" style={{ width: 'calc(50% - 7.5px)' }}>
                            <label className="text-muted text-sm d-block mb-1">3rd Prize (₹) *</label>
                            <input type="text" name="prize3" required placeholder="e.g. ₹500" className="w-100 p-2 rounded bg-dark border-secondary text-white" value={formData.prize3} onChange={handleChange} />
                        </div>
                        <div className="form-group mb-3" style={{ width: 'calc(50% - 7.5px)' }}>
                            <label className="text-muted text-sm d-block mb-1">Per Kill Reward (Optional)</label>
                            <input type="text" name="prizeKill" placeholder="e.g. ₹10" className="w-100 p-2 rounded bg-dark border-secondary text-white" value={formData.prizeKill} onChange={handleChange} />
                        </div>
                    </div>

                    <h3 className="text-lg font-bold mb-3 mt-4 text-gradient">Match Schedule</h3>
                    <div className="d-flex" style={{ gap: '15px' }}>
                        <div className="form-group mb-3 w-50">
                            <label className="text-muted text-sm d-block mb-1">Match Date *</label>
                            <input type="text" name="date" required placeholder="e.g. 25 Oct 2024" className="w-100 p-2 rounded bg-dark border-secondary text-white" value={formData.date} onChange={handleChange} />
                        </div>
                        <div className="form-group mb-3 w-50">
                            <label className="text-muted text-sm d-block mb-1">Match Time *</label>
                            <input type="text" name="exactTime" required placeholder="e.g. 08:30 PM" className="w-100 p-2 rounded bg-dark border-secondary text-white" value={formData.exactTime} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="form-group mb-4">
                        <label className="text-muted text-sm d-block mb-1">Registration Closing Time (Optional)</label>
                        <input type="text" name="regCloseTime" placeholder="e.g. 08:00 PM" className="w-100 p-2 rounded bg-dark border-secondary text-white" value={formData.regCloseTime} onChange={handleChange} />
                    </div>

                    <div className="form-group mb-4">
                        <label className="text-muted text-sm d-block mb-1">Tournament Rules</label>
                        <textarea name="rules" rows="3" className="w-100 p-2 rounded bg-dark border-secondary text-white" value={formData.rules} onChange={handleChange}></textarea>
                    </div>

                    <h3 className="text-lg font-bold mb-3 text-gradient">Payment Details (For Entry Fee)</h3>

                    <div className="d-flex" style={{ gap: '15px' }}>
                        <div className="form-group mb-3 w-50">
                            <label className="text-muted text-sm d-block mb-1">Payment Method</label>
                            <select name="paymentMethod" className="w-100 p-2 rounded bg-dark border-secondary text-white" value={formData.paymentMethod} onChange={handleChange}>
                                <option value="UPI">UPI</option>
                                <option value="Paytm">Paytm</option>
                                <option value="PhonePe">PhonePe</option>
                                <option value="Google Pay">Google Pay</option>
                                <option value="Bank Transfer">Bank Transfer</option>
                            </select>
                        </div>
                        <div className="form-group mb-3 w-50">
                            <label className="text-muted text-sm d-block mb-1">UPI ID / Phone Number *</label>
                            <input type="text" name="paymentId" required placeholder="e.g. 9876543210@upi" className="w-100 p-2 rounded bg-dark border-secondary text-white" value={formData.paymentId} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="form-group mb-4">
                        <label className="text-muted text-sm d-block mb-1">Upload QR Code Image (Optional)</label>
                        <input type="file" name="qrCodeImage" accept="image/*" className="w-100 p-2 rounded bg-dark border-secondary text-white text-sm" onChange={handleChange} />
                        {formData.qrCodeImage && <p className="text-success text-sm mt-1">Image selected successfully.</p>}
                    </div>

                    <button type="submit" className="btn btn-primary w-100 btn-lg" style={{ background: 'var(--primary)', border: 'none' }}>
                        Publish Tournament
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateTournamentModal;
