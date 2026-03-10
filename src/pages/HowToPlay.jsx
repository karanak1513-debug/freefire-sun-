import React from 'react';
import { Target, Search, CreditCard, Trophy } from 'lucide-react';

const HowToPlay = () => {
    return (
        <div className="how-to-play-page" style={{ paddingTop: 'calc(70px + 4rem)', paddingBottom: '4rem', minHeight: '100vh' }}>
            <div className="container">
                <div className="text-center mb-5">
                    <h1 className="text-3xl font-bold mb-3">How to <span className="text-gradient">Play & Win</span></h1>
                    <p className="text-muted">Follow these 4 simple steps to start earning real cash from your gaming skills.</p>
                </div>

                <div className="steps-grid mt-5" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>

                    <div className="glass-panel p-4 text-center" style={{ padding: '2rem' }}>
                        <div className="icon-wrapper mb-4 text-primary" style={{ width: '80px', height: '80px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,69,0,0.1)', borderRadius: '50%' }}>
                            <Search size={40} />
                        </div>
                        <h3 className="mb-2">1. Find a Match</h3>
                        <p className="text-muted text-sm">Browse our live and upcoming tournaments. Filter by Solo, Duo, or Squad matches based on your preference.</p>
                    </div>

                    <div className="glass-panel p-4 text-center" style={{ padding: '2rem' }}>
                        <div className="icon-wrapper mb-4 text-secondary" style={{ width: '80px', height: '80px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(138,43,226,0.1)', borderRadius: '50%' }}>
                            <CreditCard size={40} />
                        </div>
                        <h3 className="mb-2">2. Join & Pay</h3>
                        <p className="text-muted text-sm">Add money to your wallet using UPI or Paytm. Pay the entry fee to secure your slot in the tournament.</p>
                    </div>

                    <div className="glass-panel p-4 text-center" style={{ padding: '2rem' }}>
                        <div className="icon-wrapper mb-4 text-warning" style={{ width: '80px', height: '80px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,183,0,0.1)', borderRadius: '50%' }}>
                            <Target size={40} />
                        </div>
                        <h3 className="mb-2">3. Get Room Details</h3>
                        <p className="text-muted text-sm">15 mins before match start, check the Match Room to get your Free Fire Custom Room ID and Password.</p>
                    </div>

                    <div className="glass-panel p-4 text-center" style={{ padding: '2rem' }}>
                        <div className="icon-wrapper mb-4 text-success" style={{ width: '80px', height: '80px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,255,136,0.1)', borderRadius: '50%' }}>
                            <Trophy size={40} />
                        </div>
                        <h3 className="mb-2">4. Play & Win</h3>
                        <p className="text-muted text-sm">Join the match on time. Winnings are automatically added to your wallet based on your rank and kills.</p>
                    </div>

                </div>

                <div className="glass-panel p-4 mt-5 text-center" style={{ maxWidth: '800px', margin: '4rem auto 0' }}>
                    <h3>Important Rules</h3>
                    <ul className="text-muted mt-3" style={{ textAlign: 'left', display: 'inline-block' }}>
                        <li className="mb-2">Ensure your exact Free Fire Name matches your profile.</li>
                        <li className="mb-2">Teaming up or hacking will result in a permanent ban.</li>
                        <li className="mb-2">Minimum withdrawal amount is ₹100.</li>
                        <li className="mb-2">Room ID should not be shared with anyone outside the platform.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default HowToPlay;
