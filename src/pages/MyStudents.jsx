import React, { useState, useEffect } from 'react';
import { Users, Mail, Calendar } from 'lucide-react';
import Card from '../components/Card';

const MyStudents = () => {
    const [students, setStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const currentUser = JSON.parse(localStorage.getItem('user'));

    const fetchStudents = async () => {
        if (!currentUser) return;
        setIsLoading(true);
        try {
            // Re-use the counselor appointments endpoint to get all bookings
            const response = await fetch(`http://localhost:5000/api/appointments/${currentUser.id}/counselor`);
            if (!response.ok) throw new Error('Failed to fetch appointments');
            const data = await response.json();

            // Extract unique students from appointments
            const uniqueStudentsMap = new Map();
            data.forEach(appt => {
                if (!uniqueStudentsMap.has(appt.studentId)) {
                    uniqueStudentsMap.set(appt.studentId, {
                        ...appt,
                        totalSessions: 1
                    });
                } else {
                    const existing = uniqueStudentsMap.get(appt.studentId);
                    existing.totalSessions += 1;
                    uniqueStudentsMap.set(appt.studentId, existing);
                }
            });

            setStudents(Array.from(uniqueStudentsMap.values()));
        } catch (err) {
            console.error("Error:", err);
            setError("Could not load your students.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    return (
        <div className="animate-fade-in" style={{ padding: '2rem 0' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '3rem', margin: '0 0 1rem 0' }}>My <span className="text-gradient">Students</span></h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
                    View the students who have booked counseling sessions with you.
                </p>
            </div>

            {isLoading ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>Loading students...</div>
            ) : error ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: '#ef4444' }}>{error}</div>
            ) : students.length === 0 ? (
                <div className="glass-panel" style={{ padding: '4rem 2rem', marginTop: '2rem', textAlign: 'center' }}>
                    <Users size={48} color="var(--text-secondary)" style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>No students yet</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>When students book sessions with you, they will appear here.</p>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                    {students.map((student, i) => (
                        <Card key={student.studentId || i} className={`delay-${(i % 3 + 1) * 100} animate-fade-in`} style={{ borderTop: '4px solid var(--accent-primary)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '2rem' }}>
                            <div style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                background: 'var(--app-border-color)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '1.5rem',
                                color: 'var(--accent-primary)'
                            }}>
                                <Users size={40} />
                            </div>

                            <h3 style={{ fontSize: '1.4rem', margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>
                                {student.studentName}
                            </h3>

                            <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                background: 'var(--app-border-color)',
                                padding: '0.4rem 1rem',
                                borderRadius: '20px',
                                color: 'var(--text-secondary)',
                                fontSize: '0.9rem',
                                marginTop: '1rem'
                            }}>
                                <Calendar size={16} color="var(--accent-primary)" />
                                <span>{student.totalSessions} sessions booked</span>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyStudents;
