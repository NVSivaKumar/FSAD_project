import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { register, login, resetPassword, deleteOwnAccount } from '../controllers/authController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsPath = path.join(__dirname, '../uploads');

const router = express.Router();

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'resume') {
            cb(null, path.join(uploadsPath, 'resumes'));
        } else if (file.fieldname === 'studentId') {
            cb(null, path.join(uploadsPath, 'studentIds'));
        } else {
            cb(null, uploadsPath);
        }
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Routes
// We handle dynamic optional files using .fields()
router.post('/register', upload.fields([
    { name: 'resume', maxCount: 1 },
    { name: 'studentId', maxCount: 1 }
]), register);

router.post('/login', login);
router.post('/reset-password', resetPassword);
router.delete('/:id', deleteOwnAccount);

export default router;
