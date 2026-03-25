import express from 'express';
import { createAppointment, getAppointments, cancelAppointment, updateAppointmentStatus } from '../controllers/appointmentController.js';

const router = express.Router();

router.post('/', createAppointment);
router.get('/:userId/:role', getAppointments);
router.patch('/:id/status', updateAppointmentStatus);
router.delete('/:id', cancelAppointment);

export default router;
