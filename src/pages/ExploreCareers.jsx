import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Input from '../components/Input';
import { getCareers } from '../utils/mockData';
import { Search, Briefcase, DollarSign, Award } from 'lucide-react';
import { GlowingEffect } from '../components/ui/glowing-effect';

const ExploreCareers = () => {
    const [careers, setCareers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        setCareers(getCareers());
    }, []);

    const categories = ['All', ...new Set(getCareers().map(c => c.category))];

    const filteredCareers = careers.filter(career => {
        const matchesSearch = career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            career.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || career.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="animate-fade-in" style={{ padding: '2rem 0' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Explore <span className="text-gradient">Career Paths</span></h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
                    Discover the perfect career that aligns with your passions and skills.
                </p>
            </div>

            <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '3rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{ flex: '1', minWidth: '300px' }}>
                    <Input
                        placeholder="Search careers, keywords..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={selectedCategory === cat ? 'btn-primary' : 'btn-secondary'}
                            style={{ padding: '0.5rem 1rem' }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2.5rem' }}>
                {filteredCareers.map((career, i) => {
                    return (
                        <div key={career.id} className={`relative min-h-[14rem] list-none delay-${(i % 3 + 1) * 100} animate-fade-in`} style={{ height: '100%' }}>
                            <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-white/10 p-2 md:rounded-[1.5rem] md:p-3" style={{ height: '100%' }}>
                                <GlowingEffect
                                    spread={40}
                                    glow={true}
                                    disabled={false}
                                    proximity={64}
                                    inactiveZone={0.01}
                                    borderWidth={3}
                                />
                                <div className="glass-panel relative flex h-full flex-col overflow-hidden rounded-xl border-[0.75px] border-white/5 p-6">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                                        <div>
                                            <span style={{
                                                background: 'rgba(16, 185, 129, 0.2)',
                                                color: 'var(--accent-primary)',
                                                padding: '4px 10px',
                                                borderRadius: '12px',
                                                fontSize: '0.8rem',
                                                fontWeight: '600'
                                            }}>
                                                {career.category}
                                            </span>
                                            <h3 style={{ fontSize: '1.5rem', margin: '0.5rem 0 0 0' }}>{career.title}</h3>
                                        </div>
                                        <Briefcase size={24} color="var(--accent-secondary)" />
                                    </div>

                                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', minHeight: '60px', flexGrow: 1 }}>
                                        {career.description}
                                    </p>

                                    <div style={{ marginBottom: '1.5rem' }}>
                                        <strong style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                                            <Award size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> Top Skills
                                        </strong>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                            {career.skills.map(skill => (
                                                <span key={skill} style={{
                                                    background: 'rgba(255, 255, 255, 0.05)',
                                                    border: '1px solid var(--border-color)',
                                                    padding: '4px 10px',
                                                    borderRadius: '4px',
                                                    fontSize: '0.85rem',
                                                    color: 'var(--text-secondary)'
                                                }}>
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#10b981', fontWeight: '600' }}>
                                            <DollarSign size={18} /> {career.salary}
                                        </span>
                                        <Link
                                            to={`/career/${career.id}`}
                                            className="btn-secondary z-10"
                                            style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', textDecoration: 'none' }}
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {filteredCareers.length === 0 && (
                <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-secondary)' }}>
                    <Search size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                    <h3>No careers found matching your criteria.</h3>
                </div>
            )}
        </div>
    );
};

export default ExploreCareers;
