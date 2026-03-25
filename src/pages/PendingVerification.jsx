import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Search, BookOpen, Calendar, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { SplineSceneBasic } from '@/components/ui/demo';

const PendingVerification = () => {
    const [activeTab, setActiveTab] = useState(0);

    const features = [
        {
            id: 'explore',
            title: 'Explore Careers',
            description: 'Dive deep into various career paths, understand the requirements, salary expectations, and day-to-day responsibilities to make an informed decision.',
            icon: <Search size={32} color="var(--accent-primary)" />,
            color: 'rgba(56, 189, 248, 0.2)'
        },
        {
            id: 'counsel',
            title: 'Expert Counseling',
            description: 'Connect with verified industry professionals and career counselors who can guide you through your educational and career journey.',
            icon: <BookOpen size={32} color="#10b981" />,
            color: 'rgba(16, 185, 129, 0.2)'
        },
        {
            id: 'book',
            title: 'Easy Scheduling',
            description: 'Book personalized 1-on-1 sessions with counselors at your convenience using our seamless scheduling system.',
            icon: <Calendar size={32} color="#f59e0b" />,
            color: 'rgba(245, 158, 11, 0.2)'
        }
    ];

    // Auto-cycle tabs
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTab((prev) => (prev + 1) % features.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [features.length]);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '85vh',
            padding: '2rem 1rem',
            maxWidth: '1200px',
            margin: '0 auto'
        }}>
            
            <div style={{
                textAlign: 'center',
                marginBottom: '4rem',
                marginTop: '2rem',
                animation: 'fadeIn 0.8s ease-out'
            }}>
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: 'rgba(245, 158, 11, 0.1)',
                    border: '1px solid rgba(245, 158, 11, 0.3)',
                    marginBottom: '1.5rem',
                    boxShadow: '0 0 30px rgba(245, 158, 11, 0.2)'
                }}>
                    <Clock size={40} color="#f59e0b" style={{ animation: 'spin-slow 10s linear infinite' }} />
                </div>
                
                <h1 style={{
                    fontSize: '2.5rem',
                    fontWeight: '800',
                    marginBottom: '1rem',
                    color: 'var(--text-primary)',
                    background: 'linear-gradient(90deg, #fff, #a1a1aa)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>Review in Progress</h1>
                
                <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: '1.2rem',
                    maxWidth: '600px',
                    margin: '0 auto',
                    lineHeight: '1.6'
                }}>
                    Your account is currently being verified by our administrators. This usually takes 24-48 hours.
                    While you wait, discover what you'll be able to do!
                </p>
            </div>

            {/* Interactive Feature Showcase */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem',
                width: '100%',
                maxWidth: '900px',
                animation: 'slideUp 0.8s ease-out forwards',
                opacity: 0,
                // adding a simple inline keyframe via style is tricky, so relying on standard app css or adding inline
                transform: 'translateY(20px)'
            }} className="slide-up-on-load">
                
                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    justifyContent: 'center',
                    flexWrap: 'wrap'
                }}>
                    {features.map((feature, index) => (
                        <button
                            key={feature.id}
                            onClick={() => setActiveTab(index)}
                            style={{
                                background: activeTab === index ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.02)',
                                border: '1px solid',
                                borderColor: activeTab === index ? 'var(--accent-primary)' : 'rgba(255, 255, 255, 0.05)',
                                padding: '1rem 2rem',
                                borderRadius: '1rem',
                                color: activeTab === index ? 'var(--text-primary)' : 'var(--text-secondary)',
                                fontWeight: '600',
                                fontSize: '1.1rem',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                transform: activeTab === index ? 'translateY(-5px)' : 'none',
                                boxShadow: activeTab === index ? '0 10px 20px rgba(0,0,0,0.2)' : 'none'
                            }}
                        >
                            <span style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                opacity: activeTab === index ? 1 : 0.5
                            }}>
                                {React.cloneElement(feature.icon, { size: 24 })}
                            </span>
                            {feature.title}
                        </button>
                    ))}
                </div>

                {/* Active Feature Display */}
                <div style={{
                    background: 'rgba(20, 20, 20, 0.6)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid var(--app-border-color)',
                    borderRadius: '1.5rem',
                    padding: '3rem',
                    minHeight: '280px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: `0 0 40px ${features[activeTab].color}`
                }}>
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '4px',
                        background: 'var(--accent-primary)',
                        transform: 'scaleX(0)',
                        transformOrigin: 'left',
                        animation: 'progress 5s linear infinite'
                    }} key={activeTab} />
                    
                    <div style={{
                        marginBottom: '1.5rem',
                        animation: 'popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards'
                    }} key={`icon-${activeTab}`}>
                        {features[activeTab].icon}
                    </div>
                    
                    <h2 style={{
                        fontSize: '2rem',
                        color: 'var(--text-primary)',
                        marginBottom: '1rem',
                        animation: 'fadeInUp 0.5s forwards'
                    }} key={`title-${activeTab}`}>
                        {features[activeTab].title}
                    </h2>
                    
                    <p style={{
                        fontSize: '1.1rem',
                        color: 'var(--text-secondary)',
                        maxWidth: '600px',
                        lineHeight: '1.7',
                        animation: 'fadeInUp 0.6s forwards'
                    }} key={`desc-${activeTab}`}>
                        {features[activeTab].description}
                    </p>
                </div>
            </div>

            <div style={{ width: '100%', maxWidth: '1200px', margin: '2rem auto' }}>
                <SplineSceneBasic />
            </div>

            <div style={{
                marginTop: '4rem',
                display: 'flex',
                gap: '1.5rem',
                flexWrap: 'wrap',
                justifyContent: 'center',
                animation: 'fadeIn 1.2s ease-out'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                    <ShieldCheck size={20} color="#10b981" />
                    <span>Secure Platform</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                    <Zap size={20} color="#f59e0b" />
                    <span>Fast Approvals</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                    <BookOpen size={20} color="var(--accent-primary)" />
                    <span>Verified Content</span>
                </div>
            </div>

            <Link to="/" style={{
                marginTop: '3rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '2rem',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--app-border-color)',
                transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                e.target.style.borderColor = 'var(--text-secondary)';
            }}
            onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                e.target.style.borderColor = 'var(--app-border-color)';
            }}
            >
                Return to Homepage <ArrowRight size={16} />
            </Link>

            <style>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes progress {
                    0% { transform: scaleX(0); }
                    100% { transform: scaleX(1); }
                }
                @keyframes popIn {
                    0% { transform: scale(0.5); opacity: 0; }
                    100% { transform: scale(1); opacity: 1; }
                }
                @keyframes fadeInUp {
                    0% { transform: translateY(15px); opacity: 0; }
                    100% { transform: translateY(0); opacity: 1; }
                }
                .slide-up-on-load {
                    animation-fill-mode: forwards !important;
                }
                @keyframes slideUp {
                    to { transform: translateY(0); opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default PendingVerification;
