import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import API_BASE_URL from '../utils/config';
import { AnimatedAuthLayout } from '@/components/ui/animated-auth-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const Login = () => {
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            // Successful login: update global auth state
            login(data.user, data.token);

            navigate('/explore');
        } catch (err) {
            if (err.message === 'Failed to fetch') {
                setError('Unable to connect to the server. Please check your internet connection or ensure the backend is running.');
            } else if (err.message === 'Verifying your data') {
                navigate('/pending-verification');
            } else {
                setError(err.message || 'An error occurred during login.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AnimatedAuthLayout
            title="Welcome back!"
            subtitle="Please enter your details"
            isTyping={isTyping}
            password={formData.password}
            showPassword={showPassword}
        >
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {error && (
                    <div className="p-3 text-sm text-red-400 bg-red-950/20 border border-red-900/30 rounded-lg text-center">
                        {error}
                    </div>
                )}
                <div className="flex flex-col gap-2">
                    <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="anna@example.com"
                            value={formData.email}
                            autoComplete="off"
                            onChange={handleChange}
                            onFocus={() => setIsTyping(true)}
                            onBlur={() => setIsTyping(false)}
                            required
                            className="h-12 border-border/60 focus:border-primary"
                            style={{ paddingLeft: '2.5rem' }}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                        <Link to="/forgot-password" className="text-sm text-primary hover:underline font-medium">
                            Forgot Password?
                        </Link>
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            onFocus={() => setIsTyping(true)}
                            onBlur={() => setIsTyping(false)}
                            required
                            className="h-12 border-border/60 focus:border-primary"
                            style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="remember" />
                        <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
                            Remember for 30 days
                        </Label>
                    </div>
                </div>

                <Button 
                    type="submit" 
                    className="w-full h-12 text-base font-medium btn-primary" 
                    size="lg" 
                    disabled={isLoading}
                >
                    {isLoading ? "Signing in..." : "Log in"}
                </Button>
            </form>

            <div className="mt-6">
                <Button 
                    variant="outline" 
                    className="w-full h-12 bg-background border-border/60 hover:bg-accent flex items-center justify-center gap-2"
                    type="button"
                >
                    <Mail className="size-5" />
                    Log in with Google
                </Button>
            </div>

            <div className="text-center text-sm text-muted-foreground mt-6">
                Don't have an account?{" "}
                <Link to="/register" className="text-foreground font-medium hover:text-primary hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.8)] transition-all">
                    Sign Up
                </Link>
            </div>
        </AnimatedAuthLayout>
    );
};

export default Login;
