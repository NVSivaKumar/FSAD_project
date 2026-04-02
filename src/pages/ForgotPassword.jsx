import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API_BASE_URL from '../utils/config';
import { Mail, Lock, ArrowRight, ArrowLeft } from 'lucide-react';

const ForgotPassword = () => {
    const [formData, setFormData] = useState({
        email: '',
        newPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Password reset failed');
            }

            setSuccess('Password reset successfully! Redirecting to login...');

            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (err) {
            if (err.message === 'Failed to fetch') {
                setError('Unable to connect to the server. Please check your internet connection or ensure the backend is running.');
            } else {
                setError(err.message || 'An error occurred during password reset.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '80vh',
            padding: '2rem'
        }}>
            <div className="glass-panel hover-glow" style={{
                maxWidth: '450px',
                width: '100%',
                padding: '3rem 2.5rem',
                borderRadius: '1.5rem',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Decorative background glow */}
                <div style={{
                    position: 'absolute',
                    top: '-50%',
                    left: '-50%',
                    width: '200%',
                    height: '200%',
                    background: 'radial-gradient(circle, var(--accent-primary) 0%, transparent 40%)',
                    opacity: '0.05',
                    pointerEvents: 'none',
                    zIndex: 0
                }} />

                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '64px',
                            height: '64px',
                            borderRadius: '50%',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid var(--app-border-color)',
                            marginBottom: '1.5rem'
                        }}>
                            <Lock size={32} color="var(--accent-primary)" />
                        </div>
                        <h1 style={{
                            fontSize: '2rem',
                            fontWeight: '700',
                            marginBottom: '0.5rem',
                            color: 'var(--text-primary)'
                        }}>Reset Password</h1>
                        <p style={{ color: 'var(--text-secondary)' }}>Enter your email and a new password to reset it.</p>
                    </div>

                    {error && (
                        <div style={{
                            padding: '0.75rem',
                            marginBottom: '1.25rem',
                            borderRadius: '0.5rem',
                            background: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid rgba(239, 68, 68, 0.2)',
                            color: '#ef4444',
                            fontSize: '0.9rem',
                            textAlign: 'center'
                        }}>
                            {error}
                        </div>
                    )}

                    {success && (
                        <div style={{
                            padding: '0.75rem',
                            marginBottom: '1.25rem',
                            borderRadius: '0.5rem',
                            background: 'rgba(34, 197, 94, 0.1)',
                            border: '1px solid rgba(34, 197, 94, 0.2)',
                            color: '#22c55e',
                            fontSize: '0.9rem',
                            textAlign: 'center'
                        }}>
                            {success}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label htmlFor="email" style={{
                                fontSize: '0.9rem',
                                fontWeight: '500',
                                color: 'var(--text-primary)'
                            }}>Email Address</label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={18} color="var(--text-secondary)" style={{
                                    position: 'absolute',
                                    left: '1rem',
                                    top: '50%',
                                    transform: 'translateY(-50%)'
                                }} />
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your email"
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 1rem 0.75rem 3rem',
                                        borderRadius: '0.5rem',
                                        border: '1px solid var(--app-border-color)',
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        color: 'var(--text-primary)',
                                        outline: 'none',
                                        transition: 'all 0.2s ease',
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = 'var(--accent-primary)';
                                        e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = 'var(--app-border-color)';
                                        e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                                    }}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label htmlFor="newPassword" style={{
                                fontSize: '0.9rem',
                                fontWeight: '500',
                                color: 'var(--text-primary)'
                            }}>New Password</label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={18} color="var(--text-secondary)" style={{
                                    position: 'absolute',
                                    left: '1rem',
                                    top: '50%',
                                    transform: 'translateY(-50%)'
                                }} />
                                <input
                                    type="password"
                                    id="newPassword"
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter new password"
                                    minLength="6"
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 1rem 0.75rem 3rem',
                                        borderRadius: '0.5rem',
                                        border: '1px solid var(--app-border-color)',
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        color: 'var(--text-primary)',
                                        outline: 'none',
                                        transition: 'all 0.2s ease',
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = 'var(--accent-primary)';
                                        e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = 'var(--app-border-color)';
                                        e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                                    }}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn-primary"
                            disabled={isLoading}
                            style={{
                                width: '100%',
                                padding: '0.875rem',
                                marginTop: '1rem',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '0.5rem',
                                opacity: isLoading ? 0.7 : 1,
                                cursor: isLoading ? 'wait' : 'pointer'
                            }}
                        >
                            {isLoading ? 'Resetting...' : 'Reset Password'}
                            {!isLoading && <ArrowRight size={18} />}
                        </button>
                    </form>

                    <div style={{
                        marginTop: '2rem',
                        textAlign: 'center',
                        fontSize: '0.9rem',
                        color: 'var(--text-secondary)'
                    }}>
                        <Link to="/login" style={{
                            color: 'var(--accent-primary)',
                            textDecoration: 'none',
                            fontWeight: '600',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.25rem'
                        }}>
                            <ArrowLeft size={16} /> Back to Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
