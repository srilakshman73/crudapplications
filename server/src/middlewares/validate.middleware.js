const Joi = require('joi');
const AppError = require('../utils/AppError');

const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            const message = error.details.map((detail) => detail.message).join(', ');
            return next(new AppError(message, 400));
        }
        next();
    };
};

const schemas = {
    createEmployee: Joi.object({
        first_name: Joi.string().min(2).max(50).required(),
        last_name: Joi.string().min(2).max(50).required(),
        email: Joi.string().email().required(),
        position: Joi.string().min(2).max(50).required(),
        salary: Joi.number().positive().precision(2).required(),
    }),
    updateEmployee: Joi.object({
        first_name: Joi.string().min(2).max(50),
        last_name: Joi.string().min(2).max(50),
        email: Joi.string().email(),
        position: Joi.string().min(2).max(50),
        salary: Joi.number().positive().precision(2),
    }).min(1), // Require at least one field update
};

module.exports = { validate, schemas };
