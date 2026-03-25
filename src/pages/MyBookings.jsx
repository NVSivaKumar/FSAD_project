import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { getAppointments, cancelAppointment } from '../utils/mockData';
import { Calendar, Clock, User, Trash2 } from 'lucide-react';

const MyBookings = () => {
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const currentUser = JSON.parse(localStorage.getItem('user'));

    const fetchAppointments = async () => {
        if (!currentUser) return;
        setIsLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/api/appointments/${currentUser.id}/student`);
            if (!response.ok) throw new Error('Failed to fetch appointments');
            const data = await response.json();
            setAppointments(data);
        } catch (err) {
            console.error("Error:", err);
            setError("Could not load your bookings.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const handleCancel = async (id) => {
        if (window.confirm("Are you sure you want to cancel this booking?")) {
            try {
                const response = await fetch(`http://localhost:5000/api/appointments/${id}`, {
                    method: 'DELETE'
                });
                if (!response.ok) throw new Error('Failed to cancel appointment');
                // Refresh list
                fetchAppointments();
            } catch (err) {
                console.error("Error cancelling:", err);
                alert("Failed to cancel the booking. Please try again.");
            }
        }
    };

    return (
        <div className="animate-fade-in" style={{ padding: '2rem 0' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>My <span className="text-gradient">Bookings</span></h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
                    View and manage your scheduled counseling sessions.
                </p>
            </div>

            {appointments.length === 0 ? (
                <div className="glass-panel" style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-secondary)' }}>
                    <Calendar size={48} style={{ margin: '0 auto 1rem', opacity: 0.5, color: 'var(--accent-primary)' }} />
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>No bookings found</h3>
                    <p>You haven't scheduled any counseling sessions yet.</p>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
                    {appointments.map((appt, i) => (
                        <Card key={appt.id || i} className={`delay-${(i % 3 + 1) * 100} animate-fade-in`} style={{ borderLeft: '4px solid var(--accent-primary)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.3rem', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <User size={18} color="var(--accent-primary)" />
                                        {appt.counselorName}
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
                                    <User size={16} /> <strong>Student:</strong> {appt.studentName}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Calendar size={16} /> <strong>Date:</strong> {appt.date}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Clock size={16} /> <strong>Time:</strong> {appt.time}
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                                <button
                                    className="btn-secondary"
                                    style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(239, 68, 68, 0.05)' }}
                                    onClick={() => handleCancel(appt.id)}
                                >
                                    <Trash2 size={16} /> Cancel Booking
                                </button>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyBookings;
