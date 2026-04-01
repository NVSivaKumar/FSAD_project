import mysql from 'mysql2';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'Pathfinder',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test connection
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the MySQL database. Is it created and running?:', err.message);
    } else {
        console.log('Connected to the MySQL database (Pathfinder).');
        connection.release();
    }
});

// Create a wrapper that behaves like sqlite3 API, so we don't need to rewrite all queries
const db = {
    serialize: (callback) => {
        callback();
    },
    run: (sql, params, callback) => {
        if (typeof params === 'function') {
            callback = params;
            params = [];
        }
        pool.query(sql, params, function (err, results) {
            if (err) {
                if (callback) callback(err);
                return;
            }
            const context = {
                lastID: results.insertId,
                changes: results.affectedRows
            };
            if (callback) callback.call(context, null);
        });
    },
    get: (sql, params, callback) => {
        if (typeof params === 'function') {
            callback = params;
            params = [];
        }
        pool.query(sql, params, (err, results) => {
            if (err) {
                if (callback) callback(err, null);
                return;
            }
            if (callback) callback(null, results && results.length > 0 ? results[0] : undefined);
        });
    },
    all: (sql, params, callback) => {
        if (typeof params === 'function') {
            callback = params;
            params = [];
        }
        pool.query(sql, params, (err, results) => {
            if (err) {
                if (callback) callback(err, null);
                return;
            }
            if (callback) callback(null, results);
        });
    }
};

export default db;
