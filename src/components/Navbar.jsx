import { Link, useLocation } from 'react-router-dom';
import { Briefcase, Calendar, LayoutDashboard, Database, Users, Palette } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Navbar = ({ isAdmin, setIsAdmin }) => {
    const location = useLocation();
    const { activeThemeIndex, setActiveThemeIndex, themes } = useTheme();

    const userLinks = [
        { name: 'Home', path: '/', icon: <Briefcase size={18} /> },
        { name: 'Explore Careers', path: '/explore', icon: <Briefcase size={18} /> },
        { name: 'Counseling', path: '/counseling', icon: <Calendar size={18} /> },
        { name: 'My Bookings', path: '/my-bookings', icon: <Calendar size={18} /> },
    ];

    const adminLinks = [
        { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={18} /> },
        { name: 'Resources', path: '/admin/resources', icon: <Database size={18} /> },
        { name: 'Appointments', path: '/admin/appointments', icon: <Users size={18} /> },
    ];

    const links = isAdmin ? adminLinks : userLinks;

    return (
        <nav className="glass-panel" style={{
            padding: '1rem 2rem',
            margin: '1rem auto',
            maxWidth: '1200px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'sticky',
            top: '1rem',
            zIndex: 100,
            borderColor: 'var(--app-border-color)' // Dynamic border
        }}>
            <Link to={isAdmin ? '/admin' : '/'} className="logo text-gradient" style={{ fontSize: '1.5rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Briefcase color="var(--accent-primary)" />
                PathFinder
            </Link>

            <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', margin: 0, padding: 0 }}>
                {links.map((link) => (
                    <li key={link.path}>
                        <Link
                            to={link.path}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                color: location.pathname === link.path ? 'var(--text-primary)' : 'var(--text-secondary)',
                                fontWeight: location.pathname === link.path ? '600' : '400',
                                transition: 'color 0.2s',
                            }}
                            onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
                            onMouseLeave={(e) => {
                                if (location.pathname !== link.path) e.target.style.color = 'var(--text-secondary)'
                            }}
                        >
                            {link.icon}
                            {link.name}
                        </Link>
                    </li>
                ))}
            </ul>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                {/* Theme Selector UI */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Palette size={16} color="var(--text-secondary)" />
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {themes.map((theme, index) => (
                            <button
                                key={theme.id}
                                onClick={() => setActiveThemeIndex(index)}
                                style={{
                                    width: '18px',
                                    height: '18px',
                                    borderRadius: '50%',
                                    backgroundColor: theme.colorCode,
                                    border: activeThemeIndex === index ? '2px solid white' : '2px solid transparent',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    opacity: activeThemeIndex === index ? 1 : 0.6,
                                    transform: activeThemeIndex === index ? 'scale(1.2)' : 'none'
                                }}
                                title={theme.name}
                                aria-label={`Select ${theme.name} theme`}
                                onMouseEnter={(e) => {
                                    if (activeThemeIndex !== index) {
                                        e.target.style.opacity = '1';
                                        e.target.style.transform = 'scale(1.1)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (activeThemeIndex !== index) {
                                        e.target.style.opacity = '0.6';
                                        e.target.style.transform = 'none';
                                    }
                                }}
                            />
                        ))}
                    </div>
                </div>

                <button
                    className="btn-secondary"
                    onClick={() => setIsAdmin(!isAdmin)}
                    style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                >
                    {isAdmin ? 'User Mode' : 'Admin Mode'}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
