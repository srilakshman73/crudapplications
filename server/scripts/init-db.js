const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

// Load env vars from server/.env
dotenv.config({ path: path.join(__dirname, '..', '.env') });

async function initDB() {
    const connectionConfig = {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'password',
        multipleStatements: true, // Allow running the entire schema file
    };

    console.log('Attempting to connect to MySQL with config:', { ...connectionConfig, password: '****' });

    let connection;
    try {
        connection = await mysql.createConnection(connectionConfig);
        console.log('Connected to MySQL server.');

        const schemaPath = path.join(__dirname, '..', 'db', 'schema.sql');
        const schemaSql = fs.readFileSync(schemaPath, 'utf8');

        console.log('Running schema.sql...');
        await connection.query(schemaSql);
        console.log('Database initialized successfully!');

    } catch (err) {
        console.error('Error initializing database:', err.message);
        console.error('Please check your MySQL connection details in server/.env and ensure MySQL is running.');
        process.exit(1);
    } finally {
        if (connection) await connection.end();
    }
}

initDB();
