// Import required packages
const colors = require('colors');
const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// Configure DotEnv
dotenv.config();

const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 5000;

// Create Express App
const app = express();

// Configure Middlewares
if (NODE_ENV === 'development') {
  // Use morgan for logging during development
  app.use(morgan('dev'));
}

// Enable Cross-Origin Resource Sharing
app.use(cors());

// Parse incoming JSON data
app.use(express.json());

// Parse incoming form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

// Start the server
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
