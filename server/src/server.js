const app = require('./app');
const db = require('./config/db');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await db.query('SELECT 1');
        console.log('MySQL Database Connected Successfully.');

        app.listen(PORT, () => {
            console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
        });
    } catch (err) {
        console.error('-------------------------------------');
        console.error('⚠️  DATABASE CONNECTION FAILED ⚠️');
        console.error('Error:', err.message);
        console.error('Server will start, but API endpoints requiring DB will fail.');
        console.error('Please check your MySQL config in server/.env');
        console.error('-------------------------------------');
        // process.exit(1); // Do not crash the server

        app.listen(PORT, () => {
            console.log(`Server running (No DB) in ${process.env.NODE_ENV} mode on port ${PORT}`);
        });
    }
};

startServer();
