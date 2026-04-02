import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import API_BASE_URL from '../utils/config';

const Account = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // If no user is logged in, redirect them ( handled by routes typically, but good fallback )
    if (!user) {
        navigate('/login');
        return null;
    }

    const handleLogout = () => {
        logout(navigate);
    };

    const handleDeleteAccount = async () => {
        if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) return;

        try {
            const response = await fetch(`${API_BASE_URL}/auth/${user.id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert("Account deleted successfully.");
                logout(navigate);
            } else {
                const data = await response.json();
                alert(data.message || "Failed to delete account.");
            }
        } catch (error) {
            console.error("Error deleting account:", error);
            alert("An error occurred while deleting your account.");
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
            <h1 style={{ color: 'var(--text-primary)', marginBottom: '1.5rem', textAlign: 'center' }}>My Account</h1>

            <div style={{
                background: 'rgba(20, 20, 20, 0.7)',
                backdropFilter: 'blur(10px)',
                borderRadius: '1rem',
                border: '1px solid var(--app-border-color)',
                padding: '2rem',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                marginBottom: '2rem'
            }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '1rem'
                    }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--accent-primary)',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '2rem',
                            fontWeight: 'bold'
                        }}>
                            {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
                        </div>
                    </div>

                    <div style={{ marginBottom: '0.5rem' }}>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Name</span>
                        <div style={{ color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: '500' }}>{user.fullName || 'N/A'}</div>
                    </div>

                    {user.email && (
                        <div style={{ marginBottom: '0.5rem' }}>
                            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Email</span>
                            <div style={{ color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: '500' }}>{user.email}</div>
                        </div>
                    )}

                    {user.role && (
                        <div style={{ marginBottom: '0.5rem' }}>
                            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Role</span>
                            <div style={{ 
                                display: 'inline-block',
                                color: 'var(--text-primary)', 
                                fontSize: '0.9rem', 
                                fontWeight: '500',
                                background: 'rgba(255, 255, 255, 0.1)',
                                padding: '0.2rem 0.6rem',
                                borderRadius: '1rem',
                                marginTop: '0.2rem',
                                textTransform: 'capitalize'
                            }}>
                                {user.role}
                            </div>
                        </div>
                    )}

                    {/* Additional fields if present */}
                    {Object.entries(user).map(([key, value]) => {
                        const hiddenFields = ['id', 'fullName', 'email', 'role', 'password'];
                        if (hiddenFields.includes(key) || typeof value === 'object') return null;
                        
                        // Format key to Title Case
                        const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); });

                        return (
                            <div key={key} style={{ marginBottom: '0.5rem' }}>
                                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{formattedKey}</span>
                                <div style={{ color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: '500' }}>
                                    {String(value)}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
            }}>
                <button 
                    onClick={handleLogout}
                    style={{
                        padding: '0.8rem',
                        background: 'transparent',
                        border: '1px solid var(--app-border-color)',
                        borderRadius: '0.5rem',
                        color: 'var(--text-primary)',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        fontWeight: '500',
                        transition: 'all 0.2s',
                        textAlign: 'center'
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.background = 'transparent';
                    }}
                >
                    Logout
                </button>

                <button 
                    onClick={handleDeleteAccount}
                    style={{
                        padding: '0.8rem',
                        background: 'transparent',
                        border: '1px solid #ef4444',
                        borderRadius: '0.5rem',
                        color: '#ef4444',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        fontWeight: '500',
                        transition: 'all 0.2s',
                        textAlign: 'center'
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(239, 68, 68, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.background = 'transparent';
                    }}
                >
                    Delete Account
                </button>
            </div>
        </div>
    );
};

export default Account;
