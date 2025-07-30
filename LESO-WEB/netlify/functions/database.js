const sqlite3 = require('sqlite3').verbose();
const DB_PATH = process.env.NODE_ENV === 'development' ? './leso.db' : '/tmp/leso.db';
let db;

function connectToDatabase() {
    return new Promise((resolve, reject) => {
        const database = new sqlite3.Database(DB_PATH, (err) => {
            if (err) {
                console.error("Error connecting to database", err.message);
                reject(err);
            } else {
                console.log('Connected to the SQLite database.');
                database.run(`CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    email TEXT NOT NULL UNIQUE,
                    password TEXT NOT NULL
                )`, (err) => {
                    if (err) {
                        console.error("Error creating users table", err.message);
                        reject(err);
                    } else {
                        resolve(database);
                    }
                });
            }
        });
    });
}

// Exportamos una función que asegura que la base de datos está conectada
module.exports = async () => {
    if (!db) {
        db = await connectToDatabase();
    }
    return db;
};