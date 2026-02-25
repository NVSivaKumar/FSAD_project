import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getCareers, getCounselors } from '../utils/mockData';
import { ArrowLeft, Briefcase, Award, DollarSign, Map, ExternalLink, User, Star, Calendar } from 'lucide-react';
import Card from '../components/Card';

const skillDescriptions = {
    'JavaScript': 'Used to build interactive and dynamic frontend web applications.',
    'React': 'A popular JavaScript library for building user interfaces using components.',
    'Java': 'A versatile, object-oriented programming language widely used in enterprise software.',
    'Problem Solving': 'An essential capability to systematically unblock technical and logical challenges.',
    'Python': 'A high-level programming language dominant in data science and machine learning.',
    'Machine Learning': 'The study of computer algorithms that can improve automatically through experience.',
    'SQL': 'The standard language for managing, querying, and analyzing relational databases.',
    'Statistics': 'The practice of analyzing empirical data to find underlying patterns and insights.',
    'Leadership': 'The ability to guide, motivate, and manage cross-functional teams toward success.',
    'Agile': 'A project management methodology focused on iterative development and flexibility.',
    'Communication': 'Crucial for conveying ideas clearly and acting as a bridge between stakeholders.',
    'Strategy': 'High-level planning to achieve long-term goals under conditions of uncertainty.',
    'Figma': 'A collaborative web application for interface design and modern UI prototyping.',
    'User Research': 'The systematic study of target users to uncover their needs and behaviors.',
    'Prototyping': 'Creating preliminary models of interfaces to test and refine ideas before development.',
    'Wireframing': 'Designing low-fidelity structural blueprints for digital platforms.',
    'Excel': 'An indispensable spreadsheet tool for complex financial and data analysis.',
    'Financial Modeling': 'Building abstract representations of real-world financial situations to forecast performance.',
    'Accounting': 'The systematic recording, analyzing, and reporting of financial transactions.',
    'Analysis': 'The detailed examination of elements or structure to inform strategic decisions.'
};

const CareerDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [career, setCareer] = useState(null);
    const [selectedSkill, setSelectedSkill] = useState(null);
    const [counselors, setCounselors] = useState([]);

    useEffect(() => {
        const careers = getCareers();
        const foundCareer = careers.find(c => c.id === id);
        setCareer(foundCareer);

        // Fetch related counselors across the platform based on category
        const allCounselors = getCounselors();
        if (foundCareer) {
            // Very simple filtering based on categories (e.g if it's Technology career, show Tech counselors)
            const filteredCounselors = allCounselors.filter(c => c.expertise.includes(foundCareer.category) || c.expertise.includes('Career'));
            // If none directly match the category, just pick the top 2
            setCounselors(filteredCounselors.length > 0 ? filteredCounselors : allCounselors.slice(0, 2));
        }
    }, [id]);

    if (!career) {
        return (
            <div className="container animate-fade-in" style={{ padding: '4rem 0', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Career Not Found</h2>
                <Link to="/explore" className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                    <ArrowLeft size={18} /> Back to Explore
                </Link>
            </div>
        );
    }

    return (
        <div className="container animate-fade-in" style={{ padding: '2rem 0', maxWidth: '800px', margin: '0 auto' }}>
            <Link to="/explore" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', textDecoration: 'none', marginBottom: '2rem', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>
                <ArrowLeft size={18} /> Back to careers
            </Link>

            <div className="glass-panel" style={{ padding: '3rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                    <div>
                        <span style={{
                            background: 'var(--app-border-color)',
                            color: 'var(--accent-primary)',
                            padding: '6px 14px',
                            borderRadius: '20px',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            display: 'inline-block',
                            marginBottom: '1rem'
                        }}>
                            {career.category}
                        </span>
                        <h1 style={{ fontSize: '2.5rem', margin: '0', lineHeight: 1.2 }}>{career.title}</h1>
                    </div>
                    <Briefcase size={36} color="var(--accent-secondary)" />
                </div>

                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                    {career.description}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem', padding: '1.5rem', background: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
                    <div>
                        <strong style={{ marginBottom: '0.75rem', fontSize: '1.1rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Award size={20} color="var(--accent-primary)" /> Required Skills
                        </strong>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {career.skills.map(skill => (
                                <span key={skill}
                                    onClick={() => setSelectedSkill(selectedSkill === skill ? null : skill)}
                                    style={{
                                        cursor: 'pointer',
                                        background: selectedSkill === skill ? 'var(--app-border-color)' : 'rgba(255, 255, 255, 0.05)',
                                        border: selectedSkill === skill ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
                                        padding: '6px 12px',
                                        borderRadius: '6px',
                                        fontSize: '0.9rem',
                                        color: selectedSkill === skill ? 'var(--accent-primary)' : 'var(--text-secondary)',
                                        transition: 'all 0.2s ease'
                                    }}>
                                    {skill}
                                </span>
                            ))}
                        </div>
                        {selectedSkill && (
                            <div style={{
                                marginTop: '1rem',
                                padding: '1rem',
                                background: 'var(--app-border-color)', // using transparent theme color
                                border: '1px solid var(--app-border-color)',
                                borderRadius: '8px',
                                animation: 'fade-in 0.3s ease-in-out'
                            }}>
                                <h4 style={{ color: 'var(--accent-primary)', margin: '0 0 0.25rem 0', fontSize: '0.95rem' }}>Why {selectedSkill}?</h4>
                                <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.85rem', lineHeight: 1.5 }}>
                                    {skillDescriptions[selectedSkill] || 'An essential skill required for success in this career trajectory.'}
                                </p>
                            </div>
                        )}
                    </div>
                    <div>
                        <strong style={{ marginBottom: '0.75rem', fontSize: '1.1rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <DollarSign size={20} color="var(--accent-primary)" /> Expected Salary
                        </strong>
                        <span style={{ fontSize: '1.25rem', color: 'var(--accent-primary)', fontWeight: '600' }}>
                            {career.salary}
                        </span>
                    </div>
                </div>

                <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--accent-primary)', borderBottom: '1px dashed var(--border-color)', paddingBottom: '1rem' }}>
                    <Map size={24} /> Learning Roadmap
                </h2>

                {career.roadmap ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {career.roadmap.map((step, index) => (
                            <div key={index} style={{
                                background: 'rgba(0, 0, 0, 0.7)',
                                backdropFilter: 'blur(24px) saturate(120%)',
                                WebkitBackdropFilter: 'blur(24px) saturate(120%)',
                                border: '1px solid var(--app-border-color)',
                                padding: '1.5rem',
                                borderRadius: '12px',
                                borderLeft: '4px solid var(--accent-secondary)',
                                position: 'relative',
                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)'
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    left: '-14px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    width: '24px',
                                    height: '24px',
                                    borderRadius: '50%',
                                    background: 'var(--bg-primary)',
                                    border: '4px solid var(--accent-secondary)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}></div>
                                <strong style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1.2rem', color: 'var(--text-primary)' }}>
                                    {step.step}
                                </strong>
                                <a href={step.url} target="_blank" rel="noopener noreferrer" style={{
                                    color: '#fff',
                                    textDecoration: 'none',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    fontSize: '1rem',
                                    padding: '0.5rem 1rem',
                                    background: 'var(--app-border-color)', // acts as transparent theme bg
                                    borderRadius: '8px',
                                    transition: 'background 0.2s',
                                    marginTop: '0.5rem'
                                }}
                                    onMouseEnter={(e) => {
                                        // slightly more opaque theme background on hover
                                        e.target.style.background = 'var(--app-border-color)';
                                        e.target.style.filter = 'brightness(1.5)';
                                        e.target.style.textDecoration = 'none';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.background = 'var(--app-border-color)';
                                        e.target.style.filter = 'none';
                                    }}
                                >
                                    <ExternalLink size={16} /> Explore Resource: {step.resource}
                                </a>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>Roadmap currently being developed.</p>
                )}

                <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
                    <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-primary)' }}>
                        <User size={24} color="var(--accent-primary)" /> Meet Expert Counselors
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.05rem' }}>
                        Need personalized guidance for a career in {career.title}? Connect with our domain experts.
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
                        {counselors.map((counselor, i) => (
                            <Card key={counselor.id} className={`delay-${(i % 3 + 1) * 100} animate-fade-in`}>
                                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                                    <div style={{
                                        width: '60px', height: '60px', borderRadius: '50%', flexShrink: 0,
                                        background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        <User size={32} color="var(--accent-secondary)" />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{ fontSize: '1.2rem', margin: '0 0 0.25rem 0' }}>{counselor.name}</h3>
                                        <p style={{ color: 'var(--accent-primary)', fontSize: '0.9rem', margin: '0 0 0.5rem 0', fontWeight: '500' }}>
                                            {counselor.expertise}
                                        </p>
                                        <p style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#fbbf24', fontSize: '0.85rem', margin: '0 0 0.5rem 0' }}>
                                            <Star size={14} fill="#fbbf24" /> {counselor.rating}
                                        </p>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: '0 0 1rem 0' }}>
                                            {counselor.bio}
                                        </p>

                                        <button
                                            onClick={() => navigate('/counseling')}
                                            className="btn-primary"
                                            style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%', justifyContent: 'center' }}
                                        >
                                            <Calendar size={14} /> Schedule Session
                                        </button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CareerDetails;
