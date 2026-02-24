import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Input from '../components/Input';
import { getCareers, saveCareer, deleteCareer } from '../utils/mockData';
import { Database, Plus, Edit2, Trash2, X } from 'lucide-react';

const AdminResources = () => {
    const [careers, setCareers] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentCareer, setCurrentCareer] = useState({ title: '', category: '', description: '', skills: '', salary: '' });

    const loadCareers = () => {
        setCareers(getCareers());
    };

    useEffect(() => {
        loadCareers();
    }, []);

    const handleSave = (e) => {
        e.preventDefault();
        const skillsArray = typeof currentCareer.skills === 'string'
            ? currentCareer.skills.split(',').map(s => s.trim())
            : currentCareer.skills;

        saveCareer({
            ...currentCareer,
            skills: skillsArray
        });

        setIsEditing(false);
        setCurrentCareer({ title: '', category: '', description: '', skills: '', salary: '' });
        loadCareers();
    };

    const handleEdit = (career) => {
        setCurrentCareer({
            ...career,
            skills: career.skills.join(', ')
        });
        setIsEditing(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this resource?')) {
            deleteCareer(id);
            loadCareers();
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setCurrentCareer({ title: '', category: '', description: '', skills: '', salary: '' });
    };

    return (
        <div className="animate-fade-in" style={{ padding: '2rem 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Database size={32} color="var(--accent-secondary)" />
                    <h1 style={{ margin: 0 }}>Manage Resources</h1>
                </div>
                {!isEditing && (
                    <button className="btn-primary" onClick={() => setIsEditing(true)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Plus size={18} /> Add New Career
                    </button>
                )}
            </div>

            {isEditing ? (
                <Card title={currentCareer.id ? 'Edit Career' : 'Add New Career'} style={{ marginBottom: '2rem' }}>
                    <form onSubmit={handleSave}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <Input label="Job Title" value={currentCareer.title} onChange={(e) => setCurrentCareer({ ...currentCareer, title: e.target.value })} required />
                            <Input label="Category" value={currentCareer.category} onChange={(e) => setCurrentCareer({ ...currentCareer, category: e.target.value })} required />
                        </div>
                        <Input label="Description" isTextArea value={currentCareer.description} onChange={(e) => setCurrentCareer({ ...currentCareer, description: e.target.value })} required />
                        <Input label="Skills (comma separated)" value={currentCareer.skills} onChange={(e) => setCurrentCareer({ ...currentCareer, skills: e.target.value })} required />
                        <Input label="Expected Salary" value={currentCareer.salary} onChange={(e) => setCurrentCareer({ ...currentCareer, salary: e.target.value })} required />

                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                            <button type="submit" className="btn-primary" style={{ flex: 1 }}>Save Resource</button>
                            <button type="button" className="btn-secondary" onClick={handleCancel} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px' }}>
                                <X size={20} />
                            </button>
                        </div>
                    </form>
                </Card>
            ) : null}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                {careers.map((career) => (
                    <Card key={career.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h3 style={{ margin: '0 0 0.5rem 0' }}>{career.title} <span style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', marginLeft: '0.5rem' }}>({career.category})</span></h3>
                            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{career.description.substring(0, 100)}...</p>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button onClick={() => handleEdit(career)} style={{ background: 'rgba(255,255,255,0.1)', padding: '0.5rem', borderRadius: '8px', color: 'var(--text-primary)' }}>
                                <Edit2 size={18} />
                            </button>
                            <button onClick={() => handleDelete(career.id)} style={{ background: 'rgba(239,68,68,0.1)', padding: '0.5rem', borderRadius: '8px', color: 'var(--danger)' }}>
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </Card>
                ))}
                {careers.length === 0 && <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>No resources available.</p>}
            </div>
        </div>
    );
};

export default AdminResources;
