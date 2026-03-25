import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./backend/career-db.sqlite');

db.run(
    `INSERT INTO users (fullName, email, password, role, degree) 
   VALUES ('Test Counselor', 'counselor@test.com', 'hashedpassword123', 'counselor', 'PhD in Career Psychology')`,
    function (err) {
        if (err) {
            console.error(err);
        } else {
            console.log('Counselor added with ID:', this.lastID);
        }
        db.close();
    }
);
