import db from '../config/db.js';

// Create a new appointment
export const createAppointment = (req, res) => {
    try {
        const { studentId, studentName, counselorId, counselorName, date, time, message } = req.body;

        if (!studentName || !counselorId || !counselorName || !date || !time) {
            return res.status(400).json({ message: 'Missing required fields for booking.' });
        }

        const sql = `
            INSERT INTO appointments (studentId, studentName, counselorId, counselorName, date, time, message, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        db.run(sql, [studentId || null, studentName, counselorId, counselorName, date, time, message, 'Pending'], function (err) {
            if (err) return res.status(500).json({ message: 'Error creating appointment', error: err.message });

            res.status(201).json({
                message: 'Appointment booked successfully!',
                appointment: {
                    id: this.lastID,
                    studentId,
                    studentName,
                    counselorId,
                    counselorName,
                    date,
                    time,
                    message,
                    status: 'Pending'
                }
            });
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error while booking appointment.', error: error.message });
    }
};

// Get appointments for a specific user (either student or counselor)
export const getAppointments = (req, res) => {
    try {
        const { userId, role } = req.params;

        if (!userId || !role) {
            return res.status(400).json({ message: 'User ID and role are required.' });
        }

        let sql = '';
        if (role === 'student') {
            sql = `SELECT * FROM appointments WHERE studentId = ? ORDER BY date ASC, time ASC`;
        } else if (role === 'counselor') {
            sql = `SELECT * FROM appointments WHERE counselorId = ? ORDER BY date ASC, time ASC`;
        } else {
            return res.status(400).json({ message: 'Invalid role specified.' });
        }

        db.all(sql, [userId], (err, rows) => {
            if (err) return res.status(500).json({ message: 'Error fetching appointments', error: err.message });
            res.status(200).json(rows);
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error while fetching appointments.', error: error.message });
    }
};

// Cancel an appointment
export const cancelAppointment = (req, res) => {
    try {
        const { id } = req.params;

        if (!id) return res.status(400).json({ message: 'Appointment ID is required.' });

        const sql = `DELETE FROM appointments WHERE id = ?`;

        db.run(sql, [id], function (err) {
            if (err) return res.status(500).json({ message: 'Error cancelling appointment', error: err.message });

            if (this.changes === 0) {
                return res.status(404).json({ message: 'Appointment not found.' });
            }

            res.status(200).json({ message: 'Appointment cancelled successfully.' });
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error while cancelling appointment.', error: error.message });
    }
};

// Update appointment status (Approve/Reject)
export const updateAppointmentStatus = (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!id) return res.status(400).json({ message: 'Appointment ID is required.' });
        if (!status || !['Pending', 'Approved', 'Rejected'].includes(status)) {
            return res.status(400).json({ message: 'Valid status is required (Pending, Approved, Rejected).' });
        }

        const sql = `UPDATE appointments SET status = ? WHERE id = ?`;

        db.run(sql, [status, id], function (err) {
            if (err) return res.status(500).json({ message: 'Error updating appointment status', error: err.message });

            if (this.changes === 0) {
                return res.status(404).json({ message: 'Appointment not found.' });
            }

            res.status(200).json({ message: `Appointment status updated to ${status}.` });
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error while updating appointment status.', error: error.message });
    }
};

