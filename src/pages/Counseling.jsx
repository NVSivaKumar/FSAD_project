import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Input from '../components/Input';
import { getCounselors, bookAppointment, getAppointments } from '../utils/mockData';
import { Calendar, Clock, User, Star, CheckCircle } from 'lucide-react';

const Counseling = () => {
    const [counselors, setCounselors] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [selectedCounselor, setSelectedCounselor] = useState(null);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [studentName, setStudentName] = useState('');
    const [message, setMessage] = useState('');
    const [bookingSuccess, setBookingSuccess] = useState(false);

    useEffect(() => {
        setCounselors(getCounselors());
        setAppointments(getAppointments());
    }, []);

    const handleBooking = (e) => {
        e.preventDefault();
        bookAppointment({
            counselorId: selectedCounselor.id,
            counselorName: selectedCounselor.name,
            studentName,
            date,
            time,
            status: 'Scheduled',
        });
        setAppointments(getAppointments());
        setBookingSuccess(true);

        setTimeout(() => {
            setBookingSuccess(false);
            setSelectedCounselor(null);
            setDate('');
            setTime('');
            setStudentName('');
        }, 3000);
    };

    return (
        <div className="animate-fade-in" style={{ padding: '2rem 0' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Expert <span className="text-gradient">Counseling</span></h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
                    Connect 1-on-1 with industry veterans and professional career counselors to get personalized advice.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: selectedCounselor ? '1fr 1fr' : '1fr', gap: '2rem', transition: 'all 0.4s' }}>
                {/* Counselors List */}
                <div>
                    <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Available Counselors</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {counselors.map((counselor, i) => (
                            <Card
                                key={counselor.id}
                                className={`delay-${(i % 3 + 1) * 100} animate-fade-in`}
                                style={{ border: selectedCounselor?.id === counselor.id ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)' }}
                                onClick={() => setSelectedCounselor(counselor)}
                            >
                                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                                    <div style={{
                                        width: '60px', height: '60px', borderRadius: '50%', flexShrink: 0,
                                        background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        <User size={32} color="var(--accent-secondary)" />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <h3 style={{ fontSize: '1.2rem', margin: '0 0 0.25rem 0' }}>{counselor.name}</h3>
                                            {appointments.some(appt => appt.counselorId === counselor.id) && (
                                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '600' }}>
                                                    <CheckCircle size={14} /> Booked
                                                </span>
                                            )}
                                        </div>
                                        <p style={{ color: 'var(--accent-primary)', fontSize: '0.9rem', margin: '0 0 0.5rem 0', fontWeight: '500' }}>
                                            {counselor.expertise}
                                        </p>
                                        <p style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#fbbf24', fontSize: '0.85rem', margin: '0 0 0.5rem 0' }}>
                                            <Star size={14} fill="#fbbf24" /> {counselor.rating}
                                        </p>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
                                            {counselor.bio}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Booking Form or Success Animation */}
                {selectedCounselor && (
                    <div className="animate-fade-in" style={{ position: 'sticky', top: '6rem', alignSelf: 'start' }}>
                        <Card title={bookingSuccess ? undefined : `Book Session with ${selectedCounselor.name}`} subtitle={bookingSuccess ? undefined : selectedCounselor.expertise}>
                            {bookingSuccess ? (
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '3rem 1rem', textAlign: 'center' }} className="animate-fade-in">
                                    <div style={{
                                        width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        animation: 'fade-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                                    }}>
                                        <CheckCircle size={40} />
                                    </div>
                                    <h3 style={{ fontSize: '1.8rem', margin: 0, color: 'var(--text-primary)' }}>Session Booked!</h3>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Your appointment with {selectedCounselor.name} has been confirmed. You can check your schedule in 'My Bookings'.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleBooking} style={{ marginTop: '1.5rem' }}>
                                    <Input
                                        label="Your Name"
                                        value={studentName}
                                        onChange={(e) => setStudentName(e.target.value)}
                                        placeholder="John Doe"
                                        required
                                    />
                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <div style={{ flex: 1 }}>
                                            <Input
                                                label="Date"
                                                type="date"
                                                value={date}
                                                onChange={(e) => setDate(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <Input
                                                label="Time"
                                                type="time"
                                                value={time}
                                                onChange={(e) => setTime(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <Input
                                        label="What do you want to discuss?"
                                        isTextArea
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="I need help with my resume and interview prep..."
                                    />

                                    <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                                        <Calendar size={18} /> Confirm Booking
                                    </button>
                                    <button
                                        type="button"
                                        className="btn-secondary"
                                        onClick={() => setSelectedCounselor(null)}
                                        style={{ width: '100%', marginTop: '0.5rem' }}
                                    >
                                        Cancel
                                    </button>
                                </form>
                            )}
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Counseling;
