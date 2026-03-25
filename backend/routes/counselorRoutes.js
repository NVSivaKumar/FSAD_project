import express from 'express';
import { getCounselors } from '../controllers/counselorController.js';

const router = express.Router();

// GET all counselors
router.get('/', getCounselors);

export default router;
