import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import colors from 'colors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { DBConnect } from './config/dbConnection';
import Router from './src/mainRoute';
import passport from 'passport';
import session from 'express-session';
import getLocalStrategy from './utils/strategy/localStrategy';
import getBearerStrategy from './utils/strategy/bearerStrategy';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());

// CORS configuration
let corsOptions = {
    origin: ['http://localhost:4001','http://localhost:4200'],
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Database connection
DBConnect();

// Passport strategy setup
getLocalStrategy(passport);
getBearerStrategy(passport);
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Static files
const staticPath = path.join(__dirname, 'client', 'dist/client/browser');
app.use(express.static(staticPath));

// Routes
app.get('/server', (req, res) => {
    return res.status(200).json({
        message: 'Server is running'
    });
});

app.use('/api/v1', Router);

// Error handling middleware
app.use((error, req, res, next) => {
    const errorStatus = error.status || 500;
    const errorMessage = error.message || 'Something went Wrong on Server';
    return res.status(errorStatus).json({
        error: true,
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: error.stack
    });
});

// Catch-all route to serve the frontend
app.get('/*', (req, res) => {
    return res.sendFile(path.join(staticPath, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(colors.green.underline(`|--- Server is Running at PORT: ${PORT} ---|`));
});
