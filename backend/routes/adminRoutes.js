import express from 'express';
import { getUsers, getPendingUsers, approveUser, rejectUser, deleteUserAccount } from '../controllers/adminController.js';

const router = express.Router();

// GET all non-admin users
router.get('/users', getUsers);

// Verification routes
router.get('/pending-users', getPendingUsers);
router.patch('/:id/approve', approveUser);
router.patch('/:id/reject', rejectUser);

// Delete user route
router.delete('/users/:id', deleteUserAccount);

export default router;
