"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useTheme } from '../../contexts/ThemeContext';

// The main hero component
const CyberMatrixHero = () => {
    const gridRef = useRef(null);
    const [isClient, setIsClient] = useState(false);

    // Get the active theme from our global context
    const { activeTheme } = useTheme();

    useEffect(() => {
        // This ensures the code only runs on the client, avoiding SSR issues.
        setIsClient(true);
    }, []);

    const fadeUpVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.2 + 0.5,
                duration: 0.8,
                ease: "easeInOut",
            },
        }),
    };

    return (
        <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">

            {/* Overlay HTML Content */}
            <div className={cn(
                "relative z-10 text-center p-8 bg-black/60 backdrop-blur-md rounded-2xl border transition-colors duration-500 flex flex-col items-center",
                activeTheme.border,
                activeTheme.shadow
            )}>
                <motion.div
                    custom={0}
                    variants={fadeUpVariants}
                    initial="hidden"
                    animate="visible"
                    className={cn(
                        "inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6 transition-colors duration-500",
                        activeTheme.badgeBg,
                        activeTheme.border
                    )}
                >
                    <Code className={cn("h-4 w-4 transition-colors duration-500", activeTheme.text)} />
                    <span className={cn("text-sm font-medium transition-colors duration-500", activeTheme.text)}>
                        Career Launchpad
                    </span>
                </motion.div>

                <motion.h1
                    custom={1}
                    variants={fadeUpVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400"
                >
                    Career Guidance and Counseling Platform
                </motion.h1>

                <motion.p
                    custom={2}
                    variants={fadeUpVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-2xl mx-auto text-lg text-gray-400 mb-10"
                >
                    Discover your true potential with our comprehensive career guidance. Explore diverse paths, connect with expert counselors, and build a successful future.
                </motion.p>

                <motion.div
                    custom={3}
                    variants={fadeUpVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex justify-center w-full"
                >
                    <Link
                        to="/explore"
                        className={cn(
                            "px-8 py-4 text-lg rounded-lg inline-flex items-center justify-center gap-3 mt-4 text-white font-semibold transition-all duration-500",
                            activeTheme.buttonGradient,
                            activeTheme.buttonShadow
                        )}
                    >
                        Explore Paths
                        <ArrowRight className="h-6 w-6" />
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default CyberMatrixHero;
