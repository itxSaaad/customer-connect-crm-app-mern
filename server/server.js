// Import Packages
import bodyParser from 'body-parser';
import colors from 'colors';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import rateLimiter from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import xss from 'xss-clean';

// Import Middlewares
import {
  errorHandler,
  notFoundHandler,
} from './middlewares/errorMiddlewares.js';

// Import Routes

// Configure DotEnv
dotenv.config();

const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 5000;

// Create Express App
const app = express();

// Get current directory
const __dirname = path.resolve();

// Configure Middlewares

// Trust First Proxy
app.set('trust proxy', 1);

// limit Requests Per IP
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

// Parse incoming JSON data
app.use(express.json());

// Set Security Headers
app.use(helmet());

// Enable Cross-Origin Resource Sharing
app.use(cors());

// Sanitize User Input
app.use(xss());

// Parse incoming form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use morgan for logging during development
if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Basic route for the root URL
app.get('/', (req, res) => {
  res.send(
    `<section style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
      <h1 style="color: #4CAF50;">Hello, Code Wizard!</h1>
      <h3 style="color: #FF9800;">Got a moment?</h3>
      <p style="font-size: 1.2em;">Your API is not just running; it's sprinting like Usain Bolt!</p>
      <div style="margin-top: 20px;">
        <p style="font-size: 1.5em; font-weight: bold;">Everything is Awesome!</p>
        <p style="font-size: 1.2em;">💻✨🚀</p>
      </div>
      <footer style="margin-top: 30px; font-size: 0.8em; color: #9E9E9E;">
        <p>Need more magic? Explore the code and unleash your creativity!</p>
        <p>Happy coding, developer! 🎉</p>
      </footer>
    </section>`
  );
});

// Eror Handling Routes
app.use(notFoundHandler);
app.use(errorHandler);

// Start the server
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
