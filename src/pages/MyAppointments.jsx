import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, CheckCircle, XCircle, Check, X } from 'lucide-react';
import Card from '../components/Card';

const MyAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const currentUser = JSON.parse(localStorage.getItem('user'));

    const fetchAppointments = async () => {
        if (!currentUser) return;
        setIsLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/api/appointments/${currentUser.id}/counselor`);
            if (!response.ok) throw new Error('Failed to fetch appointments');
            const data = await response.json();
            setAppointments(data);
        } catch (err) {
            console.error("Error:", err);
            setError("Could not load your appointments.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            const response = await fetch(`http://localhost:5000/api/appointments/${id}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (!response.ok) throw new Error(`Failed to mark as ${newStatus}`);
            fetchAppointments(); // Refresh the list
        } catch (err) {
            console.error("Error updating status:", err);
            alert(`Could not update appointment status. Please try again.`);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    return (
        <div className="animate-fade-in" style={{ padding: '2rem 0' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>My <span className="text-gradient">Appointments</span></h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
                    View and manage your scheduled counseling sessions with students.
                </p>
            </div>

            {isLoading ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>Loading appointments...</div>
            ) : error ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: '#ef4444' }}>{error}</div>
            ) : appointments.length === 0 ? (
                <div className="glass-panel" style={{ padding: '4rem 2rem', marginTop: '2rem', textAlign: 'center' }}>
                    <Calendar size={48} color="var(--text-secondary)" style={{ marginBottom: '1rem', opacity: 0.5 }} />
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>No upcoming appointments</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>When a student books a session with you, it will appear here.</p>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
                    {appointments.map((appt, i) => (
                        <Card key={appt.id || i} className={`delay-${(i % 3 + 1) * 100} animate-fade-in`} style={{ borderLeft: '4px solid var(--accent-primary)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.3rem', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <User size={18} color="var(--accent-primary)" />
                                        {appt.studentName}
                                    </h3>
                                    <span style={{
                                        background: appt.status === 'Pending' ? 'rgba(234, 179, 8, 0.1)' : appt.status === 'Rejected' ? 'rgba(239, 68, 68, 0.1)' : 'var(--app-border-color)',
                                        color: appt.status === 'Pending' ? '#eab308' : appt.status === 'Rejected' ? '#ef4444' : 'var(--accent-primary)',
                                        padding: '4px 10px',
                                        borderRadius: '12px',
                                        fontSize: '0.8rem',
                                        fontWeight: '600',
                                        border: `1px solid ${appt.status === 'Pending' ? 'rgba(234, 179, 8, 0.3)' : appt.status === 'Rejected' ? 'rgba(239, 68, 68, 0.3)' : 'transparent'}`
                                    }}>
                                        {appt.status || 'Pending'}
                                    </span>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', color: 'var(--text-secondary)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Calendar size={16} /> <strong>Date:</strong> {appt.date}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Clock size={16} /> <strong>Time:</strong> {appt.time}
                                </div>
                                {appt.message && (
                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginTop: '0.5rem' }}>
                                        <div style={{ padding: '0.5rem', background: 'var(--app-border-color)', borderRadius: '0.5rem', width: '100%', fontSize: '0.9rem' }}>
                                            <strong>Message:</strong> {appt.message}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                                {(appt.status === 'Pending' || !appt.status) ? (
                                    <>
                                        <button
                                            className="btn-secondary"
                                            style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(239, 68, 68, 0.05)' }}
                                            onClick={() => handleStatusChange(appt.id, 'Rejected')}
                                        >
                                            <X size={16} /> Reject
                                        </button>
                                        <button
                                            className="btn-primary"
                                            style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                                            onClick={() => handleStatusChange(appt.id, 'Approved')}
                                        >
                                            <Check size={16} /> Approve
                                        </button>
                                    </>
                                ) : appt.status === 'Approved' || appt.status === 'Scheduled' ? (
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                                        <CheckCircle size={14} color="var(--accent-primary)" /> Approved
                                    </span>
                                ) : (
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ef4444', fontSize: '0.85rem' }}>
                                        <XCircle size={14} color="#ef4444" /> Rejected
                                    </span>
                                )}
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyAppointments;
