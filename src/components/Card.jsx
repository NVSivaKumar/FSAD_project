import React from 'react';

const Card = ({ children, title, subtitle, className = '', style = {}, onClick }) => {
    return (
        <div
            className={`glass-panel ${className}`}
            style={{ padding: '1.5rem', cursor: onClick ? 'pointer' : 'default', transition: 'all 0.3s', ...style }}
            onClick={onClick}
            onMouseEnter={(e) => {
                if (onClick) {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(16, 185, 129, 0.2)';
                }
            }}
            onMouseLeave={(e) => {
                if (onClick) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
                }
            }}
        >
            {(title || subtitle) && (
                <div style={{ marginBottom: '1rem' }}>
                    {title && <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--text-primary)' }}>{title}</h3>}
                    {subtitle && <p style={{ margin: '0.25rem 0 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{subtitle}</p>}
                </div>
            )}
            <div>{children}</div>
        </div>
    );
};

export default Card;
