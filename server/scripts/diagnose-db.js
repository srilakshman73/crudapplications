const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

async function testConnection() {
    const config = {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD, // This can be undefined/empty
        port: process.env.DB_PORT || 3306
    };

    console.log('---------------------------------------------------');
    console.log('🧪 Testing MySQL Connection...');
    console.log(`Target: ${config.user}@${config.host}:${config.port}`);
    console.log('Password provided:', config.password ? 'YES (Hidden)' : 'NO (Empty)');
    console.log('---------------------------------------------------');

    try {
        const connection = await mysql.createConnection(config);
        console.log('✅ SUCCESS: Connected to MySQL server!');

        const [rows] = await connection.query('SHOW DATABASES;');
        console.log('📂 Available Databases:');
        rows.forEach(row => console.log(` - ${row.Database}`));

        // Check if our DB exists
        const dbName = process.env.DB_NAME || 'employee_db';
        const dbExists = rows.some(r => r.Database === dbName);

        if (dbExists) {
            console.log(`✅ Database '${dbName}' found.`);
        } else {
            console.log(`❌ Database '${dbName}' NOT found. Attempting to create...`);
            await connection.query(`CREATE DATABASE ${dbName}`);
            console.log(`✅ Database '${dbName}' created.`);

            console.log('Running schema...');
            await connection.query(`USE ${dbName}`);
            await connection.query(`
            CREATE TABLE IF NOT EXISTS employees (
                id INT AUTO_INCREMENT PRIMARY KEY,
                first_name VARCHAR(50) NOT NULL,
                last_name VARCHAR(50) NOT NULL,
                email VARCHAR(100) NOT NULL UNIQUE,
                position VARCHAR(50) NOT NULL,
                salary DECIMAL(10, 2) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `);
            console.log('✅ Tables created.');
        }

        await connection.end();
        console.log('---------------------------------------------------');
        console.log('🎉 DIAGNOSTIC COMPLETE: You can now restart the server. 🎉');

    } catch (err) {
        console.error('❌ CONNECTION FAILED');
        console.error(`Error Code: ${err.code}`);
        console.error(`Error Message: ${err.message}`);
        console.error('---------------------------------------------------');
        if (err.code === 'ECONNREFUSED') {
            console.error('💡 TIP: Is MySQL running? Check XAMPP Control Panel.');
            console.error('💡 TIP: Is the port correct? Default is 3306.');
        } else if (err.code === 'ER_ACCESS_DENIED_ERROR') {
            console.error('💡 TIP: Wrong Username or Password.');
            console.error('   - Try root with NO password.');
            console.error('   - Try root with "password" or "admin".');
        }
    }
}

testConnection();
