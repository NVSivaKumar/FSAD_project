import React, { createContext, useContext, useState, useEffect } from 'react';

export const themes = [
    {
        id: 'golden',
        name: 'Deep Gold',
        border: 'border-yellow-500/20',
        shadow: 'shadow-[0_0_40px_rgba(234,179,8,0.15)]',
        badgeBg: 'bg-yellow-500/10',
        text: 'text-yellow-500',
        buttonGradient: 'bg-gradient-to-r from-yellow-500 to-yellow-600',
        buttonShadow: 'shadow-[0_4px_15px_rgba(234,179,8,0.3)] hover:shadow-[0_6px_20px_rgba(234,179,8,0.5)]',
        colorCode: '#eab308',
        hsl: '45, 93%, 47%', 
        primaryAccent: '#ca8a04',
        secondaryAccent: '#eab308'
    },
    {
        id: 'cyber',
        name: 'Cyber Green',
        border: 'border-green-500/20',
        shadow: 'shadow-[0_0_40px_rgba(34,197,94,0.15)]',
        badgeBg: 'bg-green-500/10',
        text: 'text-green-400',
        buttonGradient: 'bg-gradient-to-r from-green-500 to-green-600',
        buttonShadow: 'shadow-[0_4px_15px_rgba(34,197,94,0.3)] hover:shadow-[0_6px_20px_rgba(34,197,94,0.5)]',
        colorCode: '#22c55e',
        hsl: '142, 71%, 45%', // Approx for #22c55e
        primaryAccent: '#10b981',
        secondaryAccent: '#22c55e'
    },
    {
        id: 'ocean',
        name: 'Ocean Blue',
        border: 'border-blue-500/20',
        shadow: 'shadow-[0_0_40px_rgba(59,130,246,0.15)]',
        badgeBg: 'bg-blue-500/10',
        text: 'text-blue-400',
        buttonGradient: 'bg-gradient-to-r from-blue-500 to-blue-600',
        buttonShadow: 'shadow-[0_4px_15px_rgba(59,130,246,0.3)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.5)]',
        colorCode: '#3b82f6',
        hsl: '217, 91%, 60%', // Approx for #3b82f6
        primaryAccent: '#2563eb',
        secondaryAccent: '#3b82f6'
    },
    {
        id: 'sunset',
        name: 'Sunset Orange',
        border: 'border-orange-500/20',
        shadow: 'shadow-[0_0_40px_rgba(249,115,22,0.15)]',
        badgeBg: 'bg-orange-500/10',
        text: 'text-orange-400',
        buttonGradient: 'bg-gradient-to-r from-orange-500 to-orange-600',
        buttonShadow: 'shadow-[0_4px_15px_rgba(249,115,22,0.3)] hover:shadow-[0_6px_20px_rgba(249,115,22,0.5)]',
        colorCode: '#f97316',
        hsl: '25, 95%, 53%', // Approx for #f97316
        primaryAccent: '#ea580c',
        secondaryAccent: '#f97316'
    },
    {
        id: 'amethyst',
        name: 'Amethyst Purple',
        border: 'border-purple-500/20',
        shadow: 'shadow-[0_0_40px_rgba(168,85,247,0.15)]',
        badgeBg: 'bg-purple-500/10',
        text: 'text-purple-400',
        buttonGradient: 'bg-gradient-to-r from-purple-500 to-purple-600',
        buttonShadow: 'shadow-[0_4px_15px_rgba(168,85,247,0.3)] hover:shadow-[0_6px_20px_rgba(168,85,247,0.5)]',
        colorCode: '#a855f7',
        hsl: '271, 91%, 65%', // Approx for #a855f7
        primaryAccent: '#9333ea',
        secondaryAccent: '#a855f7'
    }
];

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const [activeThemeIndex, setActiveThemeIndex] = useState(0);
    const activeTheme = themes[activeThemeIndex];

    useEffect(() => {
        // Apply global CSS variables based on active theme
        const root = document.documentElement;
        root.style.setProperty('--accent-primary', activeTheme.primaryAccent);
        root.style.setProperty('--accent-secondary', activeTheme.secondaryAccent);
        root.style.setProperty('--accent-gradient', `linear-gradient(135deg, ${activeTheme.primaryAccent}, ${activeTheme.secondaryAccent})`);

        // Dynamic border color based on theme
        root.style.setProperty('--app-border-color', `hsla(${activeTheme.hsl}, 0.4)`);
    }, [activeThemeIndex]);

    return (
        <ThemeContext.Provider value={{ activeThemeIndex, setActiveThemeIndex, activeTheme, themes }}>
            {children}
        </ThemeContext.Provider>
    );
};
