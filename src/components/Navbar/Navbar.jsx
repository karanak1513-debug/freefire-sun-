import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="navbar glass-panel">
            <div className="container nav-container">
                <Link to="/" className="brand">
                    <span className="text-gradient font-bold text-2xl">FireBattle</span>
                    <span className="text-muted text-sm ml-1">Arena</span>
                </Link>

                <div className={`nav-links ${isOpen ? 'active' : ''}`}>
                    <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
                    <Link to="/tournaments" onClick={() => setIsOpen(false)}>Tournaments</Link>
                    <Link to="/leaderboard" onClick={() => setIsOpen(false)}>Leaderboard</Link>
                    <Link to="/admin/tutorial" onClick={() => setIsOpen(false)}>Tutorial / How to Create Tournament</Link>
                </div>

                <div className="nav-actions desktop-only">
                    {/* Add any global actions here if needed */}
                </div>

                <button className="mobile-toggle" onClick={toggleMenu}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
