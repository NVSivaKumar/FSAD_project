import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AuthStatus = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();



    if (!user) {
        return (
            <div style={{ position: 'fixed', top: '1.5rem', right: '2rem', zIndex: 1000, display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Link to="/login" style={{
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    fontWeight: '500',
                    fontSize: '0.9rem',
                    transition: 'color 0.2s',
                    background: 'rgba(20, 20, 20, 0.5)',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '0.5rem',
                    backdropFilter: 'blur(5px)'
                }}
                    onMouseEnter={(e) => e.target.style.color = 'var(--accent-primary)'}
                    onMouseLeave={(e) => e.target.style.color = 'var(--text-primary)'}
                >
                    Log in
                </Link>
                <Link to="/register" className="btn-primary" style={{
                    padding: '0.5rem 1rem',
                    fontSize: '0.9rem',
                    textDecoration: 'none'
                }}>
                    Sign up
                </Link>
            </div>
        );
    }

    return (
        <div style={{
            position: 'fixed',
            top: '1.5rem',
            right: '2rem',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            background: 'rgba(20, 20, 20, 0.7)',
            backdropFilter: 'blur(10px)',
            padding: '0.5rem 1rem',
            borderRadius: '2rem',
            border: '1px solid var(--app-border-color)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
        }}>
            <Link to="/account" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--text-primary)',
                fontWeight: '500',
                fontSize: '0.9rem',
                textDecoration: 'none',
                cursor: 'pointer'
            }}
                onMouseEnter={(e) => e.target.style.color = 'var(--text-secondary)'}
                onMouseLeave={(e) => e.target.style.color = 'var(--text-primary)'}
            >
                <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--accent-primary)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    pointerEvents: 'none'
                }}>
                    {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
                </div>
                <span style={{ pointerEvents: 'none' }}>{user.fullName}</span>
            </Link>
        </div>
    );
};

export default AuthStatus;
