import React from 'react';
import CyberMatrixHero from './ui/cyber-matrix-hero';
import { Link } from 'react-router-dom';
import { Compass, BookOpen, Users, CheckCircle } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
    <div className={`glass-panel p-8 flex flex-col items-center text-center delay-${delay} animate-fade-in hover:-translate-y-2 transition-transform duration-300`}>
        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ background: 'var(--app-border-color)', border: '1px solid var(--app-border-color)', boxShadow: '0 0 15px var(--app-border-color)' }}>
            <Icon size={32} style={{ color: 'var(--accent-primary)' }} />
        </div>
        <h3 className="text-xl font-bold mb-4 text-white">{title}</h3>
        <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
);

const Hero = () => {
    return (
        <main className="bg-transparent pb-32">
            <CyberMatrixHero />

            <div className="container mx-auto relative z-10" style={{ marginTop: '10rem' }}>
                <div className="text-center" style={{ marginBottom: '4rem' }}>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                        Master Your <span style={{ background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent' }}>Trajectory</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        We provide the data, resources, and connections you need to excel in the technology careers of tomorrow.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <FeatureCard
                        icon={Compass}
                        title="Interactive Roadmaps"
                        description="Follow step-by-step career blueprints curated by industry leaders. Complete with course links and real-world milestones."
                        delay={100}
                    />
                    <FeatureCard
                        icon={BookOpen}
                        title="Skill Matrix"
                        description="Discover the exact technical and soft skills required to level up. Compare your current status with the industry standard."
                        delay={200}
                    />
                    <FeatureCard
                        icon={Users}
                        title="Expert Counseling"
                        description="Book 1-on-1 sessions with seasoned professionals who have already achieved what you're striving for."
                        delay={300}
                    />
                </div>

                {/* Explicit spacer to guarantee gap */}
                <div style={{ height: '10rem', width: '100%' }} aria-hidden="true" />

                <div className="glass-panel p-16 md:p-24 rounded-3xl relative flex flex-col items-center text-center overflow-hidden" style={{ marginBottom: '8rem', border: '1px solid var(--app-border-color)' }}>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] blur-[120px] rounded-full pointer-events-none" style={{ background: 'var(--app-border-color)' }}></div>

                    <div className="relative z-10 max-w-3xl mx-auto">
                        <h3 className="text-4xl md:text-5xl font-bold text-white mb-8">Ready to initiate the sequence?</h3>
                        <p className="text-xl text-gray-300 mb-12 leading-relaxed">
                            Join thousands of professionals navigating the tech landscape with pinpoint precision and real-world resources.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                            <Link to="/explore" className="btn-primary px-10 py-5 text-xl inline-flex items-center gap-3" style={{ boxShadow: '0 0 20px var(--app-border-color)' }}>
                                <Compass size={28} /> Launch Explorer
                            </Link>
                            <Link to="/counseling" className="btn-secondary px-10 py-5 text-xl inline-flex items-center gap-3 bg-black/40 hover:bg-black/80 backdrop-blur">
                                <Users size={28} /> Get Counseling
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
};

export default Hero;
