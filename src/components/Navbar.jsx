import { Link, useLocation } from 'react-router-dom';
import { Briefcase, Calendar, LayoutDashboard, Database, Users } from 'lucide-react';

const Navbar = ({ isAdmin, setIsAdmin }) => {
    const location = useLocation();

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
            zIndex: 100
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

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button
                    className="btn-secondary"
                    onClick={() => setIsAdmin(!isAdmin)}
                    style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                >
                    {isAdmin ? 'Admin Mode' : 'User Mode'}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
