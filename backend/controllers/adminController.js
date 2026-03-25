import db from '../config/db.js';

// Get all non-admin users
export const getUsers = (req, res) => {
    try {
        const sql = `
            SELECT id, fullName, email, role, degree, resumeFilePath, studentIdFilePath, createdAt 
            FROM users 
            WHERE role != 'admin' 
            ORDER BY createdAt DESC
        `;

        db.all(sql, [], (err, rows) => {
            if (err) {
                return res.status(500).json({ message: 'Error retrieving users', error: err.message });
            }

            // The database stores absolute paths since we used path.join(__dirname, ...) in multer.
            // We need to extract just the relative path starting from 'uploads' so the frontend 
            // can safely prepend http://localhost:5000/ to it.
            const formattedRows = rows.map(user => {
                const formatPath = (fullPath) => {
                    if (!fullPath) return null;
                    // Normalize slashes and find the 'uploads' directory
                    const normalized = fullPath.replace(/\\/g, '/');
                    const uploadIndex = normalized.indexOf('uploads/');
                    return uploadIndex !== -1 ? normalized.substring(uploadIndex) : fullPath;
                };

                return {
                    ...user,
                    resumeFilePath: formatPath(user.resumeFilePath),
                    studentIdFilePath: formatPath(user.studentIdFilePath)
                };
            });

            res.status(200).json(formattedRows);
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error retrieving users.', error: error.message });
    }
};

// Get pending user verifications
export const getPendingUsers = (req, res) => {
    try {
        const sql = `
            SELECT id, fullName as name, email, role, createdAt as registrationDate 
            FROM users 
            WHERE verification_status = 'PENDING'
            ORDER BY createdAt DESC
        `;

        db.all(sql, [], (err, rows) => {
            if (err) return res.status(500).json({ message: 'Database error', error: err.message });
            res.status(200).json(rows);
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error retrieving pending users.', error: error.message });
    }
};

// Approve user
export const approveUser = (req, res) => {
    try {
        const { id } = req.params;
        db.run('UPDATE users SET verification_status = ? WHERE id = ?', ['APPROVED', id], function (err) {
            if (err) return res.status(500).json({ message: 'Database error', error: err.message });
            if (this.changes === 0) return res.status(404).json({ message: 'User not found.' });
            res.status(200).json({ message: 'User approved successfully!' });
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error approving user.', error: error.message });
    }
};

// Reject user
export const rejectUser = (req, res) => {
    try {
        const { id } = req.params;
        db.run('UPDATE users SET verification_status = ? WHERE id = ?', ['REJECTED', id], function (err) {
            if (err) return res.status(500).json({ message: 'Database error', error: err.message });
            if (this.changes === 0) return res.status(404).json({ message: 'User not found.' });
            res.status(200).json({ message: 'User rejected.' });
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error rejecting user.', error: error.message });
    }
};

// Delete user account
export const deleteUserAccount = (req, res) => {
    try {
        const { id } = req.params;
        
        db.run('DELETE FROM users WHERE id = ?', [id], function (err) {
            if (err) return res.status(500).json({ message: 'Database error', error: err.message });
            if (this.changes === 0) return res.status(404).json({ message: 'User not found.' });
            
            res.status(200).json({ message: 'User account deleted successfully.' });
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error deleting user.', error: error.message });
    }
};
