import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { getAppointments, getCareers } from '../utils/mockData';
import { LayoutDashboard, Users, Database, Clock, CalendarCheck } from 'lucide-react';

const AdminDashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [careersCount, setCareersCount] = useState(0);
    const [pendingUsers, setPendingUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setAppointments(getAppointments().reverse()); // Show newest first
        setCareersCount(getCareers().length);
    }, []);

    const stats = [
        { title: 'Total Users', value: '1,248', icon: <Users size={24} color="var(--accent-primary)" />, trend: '+12% this week' },
        { title: 'Active Resources', value: careersCount, icon: <Database size={24} color="var(--accent-secondary)" />, trend: '+3 this week' },
        { title: 'Sessions Booked', value: appointments.length, icon: <CalendarCheck size={24} color="#10b981" />, trend: 'Steady' },
    ];

    return (
        <div className="animate-fade-in" style={{ padding: '2rem 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <LayoutDashboard size={32} color="var(--accent-primary)" />
                <h1 style={{ margin: 0 }}>Admin Dashboard</h1>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                {stats.map((stat, i) => (
                    <Card key={i} className={`delay-${(i + 1) * 100} animate-fade-in`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <p style={{ color: 'var(--text-secondary)', margin: '0 0 0.5rem 0', fontWeight: '500' }}>{stat.title}</p>
                            <h2 style={{ fontSize: '2.5rem', margin: '0 0 0.5rem 0', lineHeight: 1 }}>{stat.value}</h2>
                            <span style={{ color: '#10b981', fontSize: '0.85rem' }}>{stat.trend}</span>
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px' }}>
                            {stat.icon}
                        </div>
                    </Card>
                ))}
            </div>

            <h2 style={{ marginBottom: '1.5rem' }}>Recent Appointments</h2>
            <Card style={{ padding: 0, overflow: 'hidden' }}>
                {appointments.length > 0 ? (
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border-color)' }}>
                                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Student</th>
                                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Counselor</th>
                                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Date & Time</th>
                                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((apt, i) => (
                                <tr key={apt.id} style={{ borderBottom: i === appointments.length - 1 ? 'none' : '1px solid var(--border-color)' }}>
                                    <td style={{ padding: '1rem 1.5rem', fontWeight: '500' }}>{apt.studentName}</td>
                                    <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)' }}>{apt.counselorName}</td>
                                    <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <Clock size={16} /> {apt.date} at {apt.time}
                                        </div>
                                    </td>
                                    <td style={{ padding: '1rem 1.5rem' }}>
                                        <span style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', padding: '4px 10px', borderRadius: '12px', fontSize: '0.85rem' }}>
                                            {apt.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                        No appointments scheduled yet.
                    </div>
                )}
            </Card>
        </div>
    );
};

export default AdminDashboard;
