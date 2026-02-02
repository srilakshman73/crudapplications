const EmployeeService = require('../services/employee.service');

exports.getAllEmployees = async (req, res, next) => {
    try {
        const employees = await EmployeeService.getAllEmployees();
        res.status(200).json({
            status: 'success',
            results: employees.length,
            data: { employees },
        });
    } catch (err) {
        next(err);
    }
};

exports.getEmployee = async (req, res, next) => {
    try {
        const employee = await EmployeeService.getEmployeeById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: { employee },
        });
    } catch (err) {
        next(err);
    }
};

exports.createEmployee = async (req, res, next) => {
    try {
        const newEmployee = await EmployeeService.createEmployee(req.body);
        res.status(201).json({
            status: 'success',
            data: { employee: newEmployee },
        });
    } catch (err) {
        next(err);
    }
};

exports.updateEmployee = async (req, res, next) => {
    try {
        const updatedEmployee = await EmployeeService.updateEmployee(req.params.id, req.body);
        res.status(200).json({
            status: 'success',
            data: { employee: updatedEmployee },
        });
    } catch (err) {
        next(err);
    }
};

exports.deleteEmployee = async (req, res, next) => {
    try {
        await EmployeeService.deleteEmployee(req.params.id);
        res.status(204).json({
            status: 'success',
            data: null,
        });
    } catch (err) {
        next(err);
    }
};
