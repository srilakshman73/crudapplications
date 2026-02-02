const EmployeeModel = require('../models/employee.model');
const AppError = require('../utils/AppError');

class EmployeeService {
    static async getAllEmployees() {
        return await EmployeeModel.findAll();
    }

    static async getEmployeeById(id) {
        const employee = await EmployeeModel.findById(id);
        if (!employee) {
            throw new AppError('Employee not found', 404);
        }
        return employee;
    }

    static async createEmployee(data) {
        const existingEmployee = await EmployeeModel.findByEmail(data.email);
        if (existingEmployee) {
            throw new AppError('Email already exists', 400);
        }
        return await EmployeeModel.create(data);
    }

    static async updateEmployee(id, data) {
        const employee = await EmployeeModel.findById(id);
        if (!employee) {
            throw new AppError('Employee not found', 404);
        }

        if (data.email && data.email !== employee.email) {
            const existingEmail = await EmployeeModel.findByEmail(data.email);
            if (existingEmail) {
                throw new AppError('Email already in use', 400);
            }
        }

        // Merge existing data with updates
        const updatedData = { ...employee, ...data };
        return await EmployeeModel.update(id, updatedData);
    }

    static async deleteEmployee(id) {
        const employee = await EmployeeModel.findById(id);
        if (!employee) {
            throw new AppError('Employee not found', 404);
        }
        await EmployeeModel.delete(id);
    }
}

module.exports = EmployeeService;
