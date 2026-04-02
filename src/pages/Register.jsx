import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Briefcase, FileText, GraduationCap, IdCard, Eye, EyeOff } from 'lucide-react';
import API_BASE_URL from '../utils/config';
import { AnimatedAuthLayout } from '@/components/ui/animated-auth-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        role: 'student',
        studentId: null,
        degree: '',
        resume: null,
        password: '',
        confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'file' ? files[0] : value
        }));
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const submitData = new FormData();
            submitData.append('fullName', formData.fullName);
            submitData.append('email', formData.email);
            submitData.append('password', formData.password);
            submitData.append('role', formData.role);

            if (formData.role === 'student' && formData.studentId) {
                submitData.append('studentId', formData.studentId);
            }

            if (formData.role === 'counselor') {
                submitData.append('degree', formData.degree);
                if (formData.resume) {
                    submitData.append('resume', formData.resume);
                }
            }

            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                // Don't set Content-Type header manually when using FormData
                // Fetch will automatically set it to multipart/form-data with the correct boundary
                body: submitData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            // Successfully registered
            navigate('/pending-verification');
        } catch (err) {
            if (err.message === 'Failed to fetch') {
                setError('Unable to connect to the server. Please check your internet connection or ensure the backend is running.');
            } else {
                setError(err.message || 'An error occurred during registration.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AnimatedAuthLayout
            title="Create an Account"
            subtitle="Join us to start exploring the best careers"
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
                    <Label htmlFor="fullName" className="text-sm font-medium">Full Name</Label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                        <Input
                            id="fullName"
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            onFocus={() => setIsTyping(true)}
                            onBlur={() => setIsTyping(false)}
                            required
                            placeholder="John Doe"
                            className="h-12 border-border/60 focus:border-primary"
                            style={{ paddingLeft: '2.5rem' }}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                        {formData.role === 'student' ? 'Student Email' : 'Email Address'}
                    </Label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onFocus={() => setIsTyping(true)}
                            onBlur={() => setIsTyping(false)}
                            required
                            placeholder="john@example.com"
                            className="h-12 border-border/60 focus:border-primary"
                            style={{ paddingLeft: '2.5rem' }}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <Label htmlFor="role" className="text-sm font-medium">Account Type</Label>
                    <div className="relative w-full">
                        <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground z-10" />
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="flex h-12 w-full rounded-md border border-input bg-transparent py-2 pr-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-white"
                            style={{ paddingLeft: '2.5rem' }}
                        >
                            <option value="student" className="bg-[#0a0f1c] text-white">Student</option>
                            <option value="counselor" className="bg-[#0a0f1c] text-white">Counselor</option>
                            <option value="admin" className="bg-[#0a0f1c] text-white">Admin</option>
                        </select>
                    </div>
                </div>



                {formData.role === 'student' && (
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="studentId" className="text-sm font-medium">Upload Student ID</Label>
                        <div className="relative">
                           <IdCard className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                           <Input
                                type="file"
                                id="studentId"
                                name="studentId"
                                onChange={handleChange}
                                required
                                accept="image/*,.pdf"
                                className="h-12 pt-3 border-border/60 focus:border-primary"
                                style={{ paddingLeft: '2.5rem' }}
                            />
                        </div>
                        <span className="text-xs text-muted-foreground ml-1">Accepted formats: Images, PDF</span>
                    </div>
                )}

                {formData.role === 'counselor' && (
                    <>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="degree" className="text-sm font-medium">Highest Degree / Qualification</Label>
                            <div className="relative">
                                <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                                <Input
                                    type="text"
                                    id="degree"
                                    name="degree"
                                    value={formData.degree}
                                    onChange={handleChange}
                                    onFocus={() => setIsTyping(true)}
                                    onBlur={() => setIsTyping(false)}
                                    required
                                    placeholder="e.g. M.S. in Career Counseling"
                                    className="h-12 border-border/60 focus:border-primary"
                                    style={{ paddingLeft: '2.5rem' }}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="resume" className="text-sm font-medium">Upload Resume</Label>
                            <div className="relative">
                                <FileText className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                                <Input
                                    type="file"
                                    id="resume"
                                    name="resume"
                                    onChange={handleChange}
                                    required
                                    accept=".pdf,.doc,.docx"
                                    className="h-12 pt-3 border-border/60 focus:border-primary"
                                    style={{ paddingLeft: '2.5rem' }}
                                />
                            </div>
                            <span className="text-xs text-muted-foreground ml-1">Accepted formats: PDF, DOC, DOCX</span>
                        </div>
                    </>
                )}

                <div className="flex flex-col sm:flex-row gap-6">
                    <div className="flex flex-col gap-2 flex-1">
                        <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                onFocus={() => setIsTyping(true)}
                                onBlur={() => setIsTyping(false)}
                                required
                                placeholder="Min 8 chars"
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

                    <div className="flex flex-col gap-2 flex-1">
                        <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                            <Input
                                id="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                onFocus={() => setIsTyping(true)}
                                onBlur={() => setIsTyping(false)}
                                required
                                placeholder="Repeat password"
                                className="h-12 border-border/60 focus:border-primary"
                                style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {showConfirmPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                            </button>
                        </div>
                    </div>
                </div>

                <Button 
                    type="submit" 
                    className="w-full h-12 text-base font-medium btn-primary" 
                    size="lg" 
                    disabled={isLoading}
                >
                    {isLoading ? "Creating Account..." : "Sign Up"}
                </Button>
            </form>

            <div className="text-center text-sm text-muted-foreground mt-6">
                Already have an account?{' '}
                <Link to="/login" className="text-foreground font-medium hover:text-primary hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.8)] transition-all">
                    Log in here
                </Link>
            </div>
        </AnimatedAuthLayout>
    );
};

export default Register;
