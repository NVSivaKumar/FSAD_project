import db from '../config/db.js';

// Get all counselors
export const getCounselors = (req, res) => {
    try {
        const sql = `
            SELECT id, fullName, email, degree, resumeFilePath, createdAt 
            FROM users 
            WHERE role = 'counselor' 
            ORDER BY createdAt DESC
        `;

        db.all(sql, [], (err, rows) => {
            if (err) {
                return res.status(500).json({ message: 'Error retrieving counselors', error: err.message });
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
                };
            });

            res.status(200).json(formattedRows);
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error retrieving counselors.', error: error.message });
    }
};
