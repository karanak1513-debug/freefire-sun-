import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer glass-panel">
            <div className="container footer-container">
                <div className="footer-brand">
                    <Link to="/" className="brand">
                        <span className="text-gradient font-bold text-2xl">FireBattle</span>
                        <span className="text-muted text-sm ml-1">Arena</span>
                    </Link>
                    <p className="text-muted mt-4 text-sm">
                        The ultimate Free Fire esports tournament platform. Join tournaments, climb the leaderboard, and win real cash prizes!
                    </p>
                </div>

                <div className="footer-links">
                    <h3 className="footer-title">Quick Links</h3>
                    <ul>
                        <li><Link to="/tournaments">Tournaments</Link></li>
                        <li><Link to="/leaderboard">Leaderboard</Link></li>
                        <li><Link to="/winners">Recent Winners</Link></li>
                        <li><Link to="/how-to-play">How to Play</Link></li>
                    </ul>
                </div>

                <div className="footer-links">
                    <h3 className="footer-title">Support</h3>
                    <ul>
                        <li><Link to="/contact">Contact Us</Link></li>
                        <li><Link to="/faq">FAQ</Link></li>
                        <li><Link to="/terms">Terms & Conditions</Link></li>
                        <li><Link to="/privacy">Privacy Policy</Link></li>
                    </ul>
                </div>

                <div className="footer-social">
                    <h3 className="footer-title">Connect With Us</h3>
                    <div className="social-icons">
                        <a href="https://www.instagram.com/its_sun_official_ok/?__pwa=1#" target="_blank" rel="noopener noreferrer" className="social-icon">
                            <Instagram size={20} />
                        </a>
                    </div>
                    <div className="mt-4">
                        <p className="text-sm text-muted">Follow our Instagram for daily updates!</p>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container">
                    <p className="text-center text-sm text-muted">
                        &copy; {new Date().getFullYear()} FireBattle Arena. All rights reserved. Not affiliated with Garena Free Fire.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
