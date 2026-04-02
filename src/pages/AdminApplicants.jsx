import API_BASE_URL from '../utils/config';
import { Users, FileText, IdCard, Search, Filter, CheckCircle, XCircle, Trash2 } from 'lucide-react';
import Card from '../components/Card';

const AdminApplicants = () => {
    const [applicants, setApplicants] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('all'); // 'all', 'student', 'counselor'
    const [searchTerm, setSearchTerm] = useState('');
    const [pendingUsers, setPendingUsers] = useState([]);
    const [isPendingLoading, setIsPendingLoading] = useState(false);

    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/admin/users`);
                if (!response.ok) {
                    throw new Error('Failed to fetch applicants');
                }
                const data = await response.json();
                setApplicants(data);
            } catch (err) {
                setError(err.message || 'An error occurred while fetching applicants.');
            } finally {
                setIsLoading(false);
            }
        };

        const fetchPendingUsers = async () => {
            setIsPendingLoading(true);
            try {
                const response = await fetch(`${API_BASE_URL}/admin/pending-users`);
                if (response.ok) {
                    const data = await response.json();
                    setPendingUsers(data);
                }
            } catch (error) {
                console.error('Failed to fetch pending users', error);
            } finally {
                setIsPendingLoading(false);
            }
        };

        fetchApplicants();
        fetchPendingUsers();
    }, []);

    const fetchPendingUsersGlobal = async () => {
        setIsPendingLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/admin/pending-users`);
            if (response.ok) {
                const data = await response.json();
                setPendingUsers(data);
            }
        } catch (error) {
            console.error('Failed to fetch pending users', error);
        } finally {
            setIsPendingLoading(false);
        }
    };

    const handleVerification = async (id, action) => {
        if (!window.confirm(`Are you sure you want to ${action} this user?`)) return;

        try {
            const response = await fetch(`${API_BASE_URL}/admin/${id}/${action}`, {
                method: 'PATCH'
            });

            if (response.ok) {
                // Fetch the accepted user list again so they show up below
                const applicantsResponse = await fetch(`${API_BASE_URL}/admin/users`);
                if (applicantsResponse.ok) {
                    const data = await applicantsResponse.json();
                    setApplicants(data);
                }
                fetchPendingUsersGlobal();
            } else {
                const data = await response.json();
                alert(data.message || `Failed to ${action} user`);
            }
        } catch (error) {
            console.error(`Error trying to ${action} user:`, error);
            alert(`An error occurred while trying to ${action} the user.`);
        }
    };

    const handleDeleteUser = async (id) => {
        if (!window.confirm('Are you sure you want to delete this user? This action is permanent.')) return;

        try {
            const response = await fetch(`${API_BASE_URL}/admin/users/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                // Remove user from local state immediately for better UX or re-fetch
                setApplicants(prev => prev.filter(user => user.id !== id));
            } else {
                const data = await response.json();
                alert(data.message || 'Failed to delete user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('An error occurred while trying to delete the user.');
        }
    };

    const filteredApplicants = applicants.filter(applicant => {
        const matchesFilter = filter === 'all' || applicant.role === filter;
        const searchRegex = new RegExp(searchTerm, 'i');
        const matchesSearch = searchRegex.test(applicant.fullName) || searchRegex.test(applicant.email);
        return matchesFilter && matchesSearch;
    });

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const renderFileLink = (filePath, icon, label) => {
        if (!filePath) return <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Not provided</span>;

        // Ensure the path is correctly formatted for the URL
        const normalizedPath = filePath.replace(/\\/g, '/');
        // Extract base URL (remove /api suffix) for static files
        const STATIC_BASE_URL = API_BASE_URL.replace('/api', '');
        const fileUrl = `${STATIC_BASE_URL}/${normalizedPath}`;

        return (
            <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    color: 'var(--accent-primary)',
                    textDecoration: 'none',
                    fontSize: '0.85rem',
                    background: 'rgba(var(--accent-primary-rgb), 0.1)',
                    padding: '4px 8px',
                    borderRadius: '4px',
                }}
            >
                {icon} {label}
            </a>
        );
    };

    return (
        <div className="animate-fade-in" style={{ padding: '2rem 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <Users size={32} color="var(--accent-primary)" />
                <h1 style={{ margin: 0 }}>Applicants List</h1>
            </div>

            {/* Applicant Verification Section */}
            <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Applicant Verification Requests
                {pendingUsers.length > 0 && (
                    <span style={{
                        background: 'var(--accent-primary)', color: 'white',
                        fontSize: '0.8rem', padding: '2px 8px', borderRadius: '12px', fontWeight: 'bold'
                    }}>
                        {pendingUsers.length}
                    </span>
                )}
            </h2>
            <Card style={{ padding: 0, overflow: 'hidden', marginBottom: '3rem' }}>
                {isPendingLoading ? (
                    <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading requests...</div>
                ) : pendingUsers.length > 0 ? (
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border-color)' }}>
                                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Name</th>
                                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Email</th>
                                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Role</th>
                                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Registration Date</th>
                                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: '500', textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingUsers.map((user, i) => (
                                <tr key={user.id} style={{ borderBottom: i === pendingUsers.length - 1 ? 'none' : '1px solid var(--border-color)' }}>
                                    <td style={{ padding: '1rem 1.5rem', fontWeight: '500' }}>{user.name}</td>
                                    <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)' }}>{user.email}</td>
                                    <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', textTransform: 'capitalize' }}>{user.role}</td>
                                    <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)' }}>
                                        {formatDate(user.registrationDate)}
                                    </td>
                                    <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                            <button
                                                onClick={() => handleVerification(user.id, 'approve')}
                                                style={{
                                                    background: 'rgba(16, 185, 129, 0.1)', color: '#10b981',
                                                    border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '6px',
                                                    padding: '0.4rem 0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem',
                                                    fontSize: '0.85rem', fontWeight: '500', transition: 'all 0.2s'
                                                }}
                                                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(16, 185, 129, 0.2)'}
                                                onMouseOut={(e) => e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)'}
                                            >
                                                <CheckCircle size={16} /> Approve
                                            </button>
                                            <button
                                                onClick={() => handleVerification(user.id, 'reject')}
                                                style={{
                                                    background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444',
                                                    border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '6px',
                                                    padding: '0.4rem 0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem',
                                                    fontSize: '0.85rem', fontWeight: '500', transition: 'all 0.2s'
                                                }}
                                                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'}
                                                onMouseOut={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
                                            >
                                                <XCircle size={16} /> Reject
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                        No pending applicant verification requests.
                    </div>
                )}
            </Card>

            <h2 style={{ marginBottom: '1.5rem' }}>All Registered Users</h2>
            <Card style={{ marginBottom: '2rem', padding: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: '1rem', flex: 1, minWidth: '300px' }}>
                    <div style={{ position: 'relative', flex: 1 }}>
                        <Search size={18} color="var(--text-secondary)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.75rem 1rem 0.75rem 3rem',
                                borderRadius: '0.5rem',
                                border: '1px solid var(--app-border-color)',
                                background: 'rgba(255, 255, 255, 0.05)',
                                color: 'var(--text-primary)',
                                outline: 'none'
                            }}
                        />
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Filter size={18} color="var(--text-secondary)" />
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        style={{
                            padding: '0.75rem 1rem',
                            borderRadius: '0.5rem',
                            border: '1px solid var(--app-border-color)',
                            background: 'rgba(255, 255, 255, 0.05)',
                            color: 'var(--text-primary)',
                            outline: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        <option value="all" style={{ background: '#1a1a1a' }}>All Roles</option>
                        <option value="student" style={{ background: '#1a1a1a' }}>Students</option>
                        <option value="counselor" style={{ background: '#1a1a1a' }}>Counselors</option>
                    </select>
                </div>
            </Card>

            <Card style={{ padding: 0, overflow: 'hidden' }}>
                {isLoading ? (
                    <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                        Loading applicants...
                    </div>
                ) : error ? (
                    <div style={{ padding: '3rem', textAlign: 'center', color: '#ef4444' }}>
                        {error}
                    </div>
                ) : filteredApplicants.length > 0 ? (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
                            <thead>
                                <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border-color)' }}>
                                    <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Name</th>
                                    <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Email</th>
                                    <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Role</th>
                                    <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Registered</th>
                                    <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Submitted Documents</th>
                                    <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: '500', textAlign: 'right' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredApplicants.map((applicant, i) => (
                                    <tr key={applicant.id} style={{ borderBottom: i === filteredApplicants.length - 1 ? 'none' : '1px solid var(--border-color)' }}>
                                        <td style={{ padding: '1rem 1.5rem', fontWeight: '500' }}>{applicant.fullName}</td>
                                        <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)' }}>{applicant.email}</td>
                                        <td style={{ padding: '1rem 1.5rem' }}>
                                            <span style={{
                                                background: applicant.role === 'counselor' ? 'rgba(56, 189, 248, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                                                color: applicant.role === 'counselor' ? '#38bdf8' : '#10b981',
                                                padding: '4px 10px',
                                                borderRadius: '12px',
                                                fontSize: '0.85rem',
                                                textTransform: 'capitalize'
                                            }}>
                                                {applicant.role}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                            {formatDate(applicant.createdAt)}
                                        </td>
                                        <td style={{ padding: '1rem 1.5rem' }}>
                                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                                {applicant.role === 'student' && renderFileLink(applicant.studentIdFilePath, <IdCard size={14} />, 'Student ID')}
                                                {applicant.role === 'counselor' && (
                                                    <>
                                                        {renderFileLink(applicant.resumeFilePath, <FileText size={14} />, 'Resume')}
                                                        {applicant.degree && <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><FileText size={14} /> {applicant.degree}</span>}
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                        <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                                            <button
                                                onClick={() => handleDeleteUser(applicant.id)}
                                                style={{
                                                    background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444',
                                                    border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '6px',
                                                    padding: '0.4rem 0.6rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
                                                    fontSize: '0.85rem', fontWeight: '500', transition: 'all 0.2s'
                                                }}
                                                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'}
                                                onMouseOut={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
                                                title="Delete User"
                                            >
                                                <Trash2 size={16} /> Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                        No applicants found matching the current filters.
                    </div>
                )}
            </Card>
        </div>
    );
};

export default AdminApplicants;
