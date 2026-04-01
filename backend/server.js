import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import counselorRoutes from './routes/counselorRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Ensure uploads directories exist
const uploadsDir = path.join(__dirname, 'uploads');
const resumesDir = path.join(uploadsDir, 'resumes');
const studentIdsDir = path.join(uploadsDir, 'studentIds');

if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);
if (!fs.existsSync(resumesDir)) fs.mkdirSync(resumesDir);
if (!fs.existsSync(studentIdsDir)) fs.mkdirSync(studentIdsDir);

// Serve static files from uploads directory
app.use('/uploads', express.static(uploadsDir));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/counselors', counselorRoutes);
app.use('/api/appointments', appointmentRoutes);

// Base route test
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Career Guidance Platform API' });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    // Initialize Database setup
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            fullName VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role VARCHAR(50) NOT NULL,
            studentIdFilePath TEXT,
            degree TEXT,
            resumeFilePath TEXT,
            verification_status VARCHAR(50) DEFAULT 'APPROVED',
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )`, (err) => {
            if (err) {
                console.error("Error creating users table", err.message);
            } else {
                console.log("Users table initialized.");

                // Add verification_status column if it doesn't exist (for existing databases)
                db.run(`ALTER TABLE users ADD COLUMN verification_status VARCHAR(50) DEFAULT 'APPROVED'`, (alterErr) => {
                    // Ignore "duplicate column name" errors
                    if (alterErr && !alterErr.message.includes('Duplicate column name')) {
                        console.error("Error adding verification_status column", alterErr.message);
                    }
                });

                // Now create appointments table since users table is guaranteed to exist
                db.run(`CREATE TABLE IF NOT EXISTS appointments (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    studentId INT,
                    studentName VARCHAR(255) NOT NULL,
                    counselorId INT NOT NULL,
                    counselorName VARCHAR(255) NOT NULL,
                    date VARCHAR(255) NOT NULL,
                    time VARCHAR(255) NOT NULL,
                    message TEXT,
                    status VARCHAR(50) DEFAULT 'Scheduled',
                    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY(studentId) REFERENCES users(id),
                    FOREIGN KEY(counselorId) REFERENCES users(id)
                )`, (err) => {
                    if (err) {
                        console.error("Error creating appointments table", err.message);
                    } else {
                        console.log("Appointments table initialized.");
                    }
                });
            }
        });
    });
});
