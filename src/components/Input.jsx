import React from 'react';

const Input = ({ label, type = 'text', value, onChange, placeholder, required = false, isTextArea = false, rows = 4 }) => {
    const baseStyle = {
        width: '100%',
        padding: '0.75rem 1rem',
        borderRadius: '8px',
        border: '1px solid var(--border-color)',
        background: 'rgba(255, 255, 255, 0.05)',
        color: 'var(--text-primary)',
        fontSize: '1rem',
        outline: 'none',
        transition: 'border-color 0.2s, box-shadow 0.2s',
    };

    const handleFocus = (e) => {
        e.target.style.borderColor = 'var(--accent-primary)';
        e.target.style.boxShadow = '0 0 0 2px rgba(16, 185, 129, 0.2)';
    };

    const handleBlur = (e) => {
        e.target.style.borderColor = 'var(--border-color)';
        e.target.style.boxShadow = 'none';
    };

    return (
        <div style={{ marginBottom: '1rem' }}>
            {label && <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{label} {required && <span style={{ color: 'var(--danger)' }}>*</span>}</label>}
            {isTextArea ? (
                <textarea
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    rows={rows}
                    style={{ ...baseStyle, resize: 'vertical' }}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            ) : (
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    style={baseStyle}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            )}
        </div>
    );
};

export default Input;
