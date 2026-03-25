import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../config/db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_super_secret_key_123';

// Register User
export const register = async (req, res) => {
    try {
        const { fullName, email, password, role, degree } = req.body;

        // Validation
        if (!fullName || !email || !password || !role) {
            return res.status(400).json({ message: 'Missing required fields.' });
        }

        // Check if user already exists
        db.get('SELECT email FROM users WHERE email = ?', [email], async (err, row) => {
            if (err) return res.status(500).json({ message: 'Database error', error: err.message });
            if (row) return res.status(409).json({ message: 'Email already in use.' });

            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Handle optional files
            const resumeFilePath = req.files && req.files['resume'] ? req.files['resume'][0].path.replace(/\\/g, '/') : null;
            const studentIdFilePath = req.files && req.files['studentId'] ? req.files['studentId'][0].path.replace(/\\/g, '/') : null;

            // Insert new user
            const verificationStatus = 'PENDING';
            const sql = `INSERT INTO users (fullName, email, password, role, degree, resumeFilePath, studentIdFilePath, verification_status)
                         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

            db.run(sql, [fullName, email, hashedPassword, role, degree || null, resumeFilePath, studentIdFilePath, verificationStatus], function (err) {
                if (err) return res.status(500).json({ message: 'Error registering user', error: err.message });

                res.status(201).json({
                    message: 'User registered successfully!',
                    user: { id: this.lastID, fullName, email, role }
                });
            });
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error during registration.', error: error.message });
    }
};

// Login User
export const login = (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password.' });
        }

        // Find user
        db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
            if (err) return res.status(500).json({ message: 'Database error', error: err.message });
            if (!user) return res.status(404).json({ message: 'Invalid credentials. User not found.' });

            // Verify password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(401).json({ message: 'Invalid credentials. Incorrect password.' });

            // Verification Check for All Users
            if (user.verification_status === 'PENDING') {
                return res.status(403).json({ message: 'Verifying your data' });
            }
            if (user.verification_status === 'REJECTED') {
                return res.status(403).json({ message: 'Unfortunately your data not matched our standards' });
            }

            // Generate JWT
            const token = jwt.sign(
                { id: user.id, email: user.email, role: user.role },
                JWT_SECRET,
                { expiresIn: '2h' }
            );

            res.status(200).json({
                message: 'Login successful!',
                token,
                user: {
                    id: user.id,
                    fullName: user.fullName,
                    email: user.email,
                    role: user.role
                }
            });
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error during login.', error: error.message });
    }
};

// Reset Password
export const resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        if (!email || !newPassword) {
            return res.status(400).json({ message: 'Please provide email and new password.' });
        }

        // Find user
        db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
            if (err) return res.status(500).json({ message: 'Database error', error: err.message });
            if (!user) return res.status(404).json({ message: 'User not found with that email address.' });

            // Hash new password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);

            // Update user's password
            db.run('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, user.id], function (err) {
                if (err) return res.status(500).json({ message: 'Error updating password', error: err.message });

                res.status(200).json({ message: 'Password reset successfully!' });
            });
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error during password reset.', error: error.message });
    }
};

// Delete Own Account
export const deleteOwnAccount = (req, res) => {
    try {
        const { id } = req.params;

        // Check if user exists
        db.get('SELECT * FROM users WHERE id = ?', [id], (err, user) => {
            if (err) return res.status(500).json({ message: 'Database error', error: err.message });
            if (!user) return res.status(404).json({ message: 'User not found.' });

            // Delete user
            db.run('DELETE FROM users WHERE id = ?', [id], function (err) {
                if (err) return res.status(500).json({ message: 'Error deleting account', error: err.message });

                res.status(200).json({ message: 'Account deleted successfully.' });
            });
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error during account deletion.', error: error.message });
    }
};
