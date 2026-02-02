const db = require('../config/db');

class EmployeeModel {
    static async findAll() {
        const [rows] = await db.query('SELECT * FROM employees ORDER BY created_at DESC');
        return rows;
    }

    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM employees WHERE id = ?', [id]);
        return rows[0];
    }

    static async findByEmail(email) {
        const [rows] = await db.query('SELECT * FROM employees WHERE email = ?', [email]);
        return rows[0];
    }

    static async create(employee) {
        const { first_name, last_name, email, position, salary } = employee;
        const [result] = await db.query(
            'INSERT INTO employees (first_name, last_name, email, position, salary) VALUES (?, ?, ?, ?, ?)',
            [first_name, last_name, email, position, salary]
        );
        return { id: result.insertId, ...employee };
    }

    static async update(id, employee) {
        const { first_name, last_name, email, position, salary } = employee;
        await db.query(
            'UPDATE employees SET first_name = ?, last_name = ?, email = ?, position = ?, salary = ? WHERE id = ?',
            [first_name, last_name, email, position, salary, id]
        );
        return { id, ...employee };
    }

    static async delete(id) {
        const [result] = await db.query('DELETE FROM employees WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
}

module.exports = EmployeeModel;
