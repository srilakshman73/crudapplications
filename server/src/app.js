const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const globalErrorHandler = require('./middlewares/error.middleware');
const AppError = require('./utils/AppError');

dotenv.config();

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(express.json());

// Routes
const employeeRoutes = require('./routes/employee.routes');

app.use('/api/v1/employees', employeeRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

// 404 Handler
app.all(/(.*)/, (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error Handler
app.use(globalErrorHandler);

module.exports = app;
