import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css'; // Reusing Login styles for consistency

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            return setError('Passwords do not match');
        }

        setIsLoading(true);
        try {
            await signup(email, password, username);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message.replace('Firebase:', ''));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-page fade-in d-flex justify-center align-center">
            <div className="glass-panel login-card">
                <div className="text-center mb-5">
                    <div className="auth-icon-wrapper mb-3">
                        <User className="text-primary" size={48} />
                    </div>
                    <h2 className="font-bold text-2xl text-gradient">Create Account</h2>
                    <p className="text-muted text-sm mt-2">Join the FireBattle community</p>
                </div>

                {error && (
                    <div className="error-alert mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSignup}>
                    <div className="form-group mb-4">
                        <label className="text-sm text-muted mb-2 d-block">Username</label>
                        <div className="password-input-wrapper">
                            <User className="input-icon" size={18} />
                            <input
                                type="text"
                                className="form-control glass-input with-icon"
                                placeholder="Choose a username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group mb-4">
                        <label className="text-sm text-muted mb-2 d-block">Email Address</label>
                        <div className="password-input-wrapper">
                            <Mail className="input-icon" size={18} />
                            <input
                                type="email"
                                className="form-control glass-input with-icon"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group mb-4">
                        <label className="text-sm text-muted mb-2 d-block">Password</label>
                        <div className="password-input-wrapper">
                            <Lock className="input-icon" size={18} />
                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-control glass-input with-icon"
                                placeholder="Create password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="toggle-password-btn"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <div className="form-group mb-5">
                        <label className="text-sm text-muted mb-2 d-block">Confirm Password</label>
                        <div className="password-input-wrapper">
                            <Lock className="input-icon" size={18} />
                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-control glass-input with-icon"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        className="btn btn-primary w-100 btn-glow d-flex align-center justify-center gap-2"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Creating Account...' : (
                            <>
                                Sign Up <ArrowRight size={18} />
                            </>
                        )}
                    </button>

                    <div className="text-center mt-4">
                        <p className="text-sm text-muted">
                            Already have an account? <Link to="/login" className="text-primary font-medium">Login</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
