const express = require('express');
const employeeController = require('../controllers/employee.controller');
const { validate, schemas } = require('../middlewares/validate.middleware');

const router = express.Router();

router
    .route('/')
    .get(employeeController.getAllEmployees)
    .post(validate(schemas.createEmployee), employeeController.createEmployee);

router
    .route('/:id')
    .get(employeeController.getEmployee)
    .put(validate(schemas.updateEmployee), employeeController.updateEmployee) // PUT for full update, or PATCH? Implementation allows partial updates validation merge, so PATCH logic on PUT endpoint or rename. 
    // Let's stick to standard REST. Usually PUT replaces resource. But in my service I merge. I'll call it PUT but it acts like PATCH/Update. 
    // To be strict, I should make it PATCH or ensure client sends all data.
    // Given requirements "CRUD", I'll allow flexible updates.
    .delete(employeeController.deleteEmployee);

module.exports = router;
