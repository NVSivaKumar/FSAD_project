"use client";

import React, { useEffect, useRef, useState } from 'react';

const CyberMatrixBackground = ({ children }) => {
    const gridRef = useRef(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient || !gridRef.current) return;

        const grid = gridRef.current;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789<>/?;:"[]{}\\|!@#$%^&*()_+-=';
        let columns = 0;
        let rows = 0;

        const createTile = (index) => {
            const tile = document.createElement('div');
            tile.classList.add('tile');

            tile.onclick = e => {
                const target = e.target;
                target.textContent = chars[Math.floor(Math.random() * chars.length)];
                target.classList.add('glitch');
                setTimeout(() => target.classList.remove('glitch'), 200);
            };

            return tile;
        }

        const createTiles = (quantity) => {
            Array.from(Array(quantity)).map((_, index) => {
                grid.appendChild(createTile(index));
            });
        }

        const createGrid = () => {
            grid.innerHTML = '';

            const size = 60; // Made tiles smaller for a denser grid
            columns = Math.floor(window.innerWidth / size);
            rows = Math.floor(window.innerHeight / size); // Use scroll height for full page? Inner height is fine for fixed bg

            grid.style.setProperty('--columns', columns);
            grid.style.setProperty('--rows', rows);

            createTiles(columns * rows);

            // Set initial characters
            for (const tile of grid.children) {
                tile.textContent = chars[Math.floor(Math.random() * chars.length)];
            }
        }

        const handleMouseMove = e => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            const radius = window.innerWidth / 4;

            for (const tile of grid.children) {
                const rect = tile.getBoundingClientRect();
                const tileX = rect.left + rect.width / 2;
                const tileY = rect.top + rect.height / 2;

                const distance = Math.sqrt(
                    Math.pow(mouseX - tileX, 2) + Math.pow(mouseY - tileY, 2)
                );

                const intensity = Math.max(0, 1 - distance / radius);

                tile.style.setProperty('--intensity', intensity);
            }
        };

        window.addEventListener('resize', createGrid);
        window.addEventListener('mousemove', handleMouseMove);

        createGrid();

        return () => {
            window.removeEventListener('resize', createGrid);
            window.removeEventListener('mousemove', handleMouseMove);
        };

    }, [isClient]);

    return (
        <div className="relative min-h-screen w-full bg-black flex flex-col items-center overflow-x-hidden">
            {/* Animated Grid Background */}
            <div ref={gridRef} id="tiles" className="fixed inset-0 z-0 pointer-events-auto"></div>

            <style>{`
                #tiles {
                    --intensity: 0;
                    display: grid;
                    grid-template-columns: repeat(var(--columns), 1fr);
                    grid-template-rows: repeat(var(--rows), 1fr);
                    width: 100vw;
                    height: 100vh;
                    position: fixed;
                    top: 0;
                    left: 0;
                }
                .tile {
                    position: relative;
                    cursor: pointer;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-family: 'Courier New', Courier, monospace;
                    font-size: 1.2rem;
                    
                    /* Use CSS variable for dynamic styling */
                    opacity: calc(0.1 + var(--intensity) * 0.9);
                    color: hsl(120, 100%, calc(50% + var(--intensity) * 50%));
                    text-shadow: 0 0 calc(var(--intensity) * 15px) hsl(120, 100%, 50%);
                    transform: scale(calc(1 + var(--intensity) * 0.2));
                    transition: color 0.2s ease, text-shadow 0.2s ease, transform 0.2s ease;
                }
                .tile.glitch {
                    animation: glitch-anim 0.2s ease;
                }
                @keyframes glitch-anim {
                    0% { transform: scale(1); color: #0f0; }
                    50% { transform: scale(1.2); color: #fff; text-shadow: 0 0 10px #fff; }
                    100% { transform: scale(1); color: #0f0; }
                }
            `}</style>

            {/* Application Content */}
            <div className="relative z-10 w-full pointer-events-none">
                <div className="pointer-events-auto w-full">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default CyberMatrixBackground;
