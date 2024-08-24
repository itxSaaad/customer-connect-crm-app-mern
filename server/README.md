# CustomerConnect CRM - Backend

## Overview

The CustomerConnect CRM - backend is a RESTful API built with Node.js, Express, and MongoDB. It provides endpoints for managing users, interactions, leads, and opportunities within a CRM system. This document outlines the API routes, middleware, error handling, and setup instructions.

## Table of Contents

- [CustomerConnect CRM - Backend](#customerconnect-crm---backend)
  - [Overview](#overview)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
    - [1. Secure User Authentication and Authorization](#1-secure-user-authentication-and-authorization)
    - [2. Comprehensive User Management](#2-comprehensive-user-management)
    - [3. Customer and Interaction Management](#3-customer-and-interaction-management)
    - [4. Lead and Opportunity Management](#4-lead-and-opportunity-management)
    - [5. Middleware and Error Handling](#5-middleware-and-error-handling)
    - [6. API Routing](#6-api-routing)
    - [7. Data Validation and Security](#7-data-validation-and-security)
    - [8. Flexible and Scalable Design](#8-flexible-and-scalable-design)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [API Endpoints](#api-endpoints)
  - [Routes](#routes)
    - [1. User Endpoints](#1-user-endpoints)
    - [2. Interaction Endpoints](#2-interaction-endpoints)
    - [3. Lead Endpoints](#3-lead-endpoints)
    - [4. Opportunity Endpoints](#4-opportunity-endpoints)
    - [5. Customer Endpoints](#5-customer-endpoints)
    - [6. Error Handling Endpoints](#6-error-handling-endpoints)
  - [Middlewares](#middlewares)
    - [Authentication Middleware](#authentication-middleware)
    - [Authorization Middleware](#authorization-middleware)
    - [Error Handler Middleware](#error-handler-middleware)
  - [Models](#models)
    - [1. User Model](#1-user-model)
    - [2. Customer Model](#2-customer-model)
    - [3. Interaction Model](#3-interaction-model)
    - [4. Lead Model](#4-lead-model)
    - [5. Opportunity Model](#5-opportunity-model)
  - [Contributing](#contributing)
  - [Contact](#contact)
  - [License](#license)
  - [Support](#support)

## Features

### 1. Secure User Authentication and Authorization

- **JWT Authentication**: Implements secure JWT-based authentication to protect routes and manage user sessions.
- **Role-Based Access Control (RBAC)**: Restrict access to specific routes based on user roles (Admin, Sales Representative, Manager) using middleware.

### 2. Comprehensive User Management

- **User Registration and Login**: Register new users and allow them to log in securely.
- **User Profile Management**: Users can view and update their personal profiles.
- **Admin Management**: Admin users can view and update all users in the system.

### 3. Customer and Interaction Management

- **Customer CRUD Operations**: Manage customers with Create, Read, Update, and Delete (CRUD) operations.
- **Interaction Logging**: Record and manage different types of interactions (e.g., calls, meetings, emails) associated with customers.

### 4. Lead and Opportunity Management

- **Lead Tracking**: Add, manage, and track sales leads with detailed information.
- **Opportunity Management**: Manage sales opportunities and track them through various stages like Qualification, Proposal, and Negotiation.

### 5. Middleware and Error Handling

- **Protect Middleware**: Secure routes with middleware that checks for valid JWT tokens.
- **Role Authorization Middleware**: Ensure that only users with the correct roles can access specific resources.
- **Centralized Error Handling**: Implement comprehensive error handling to provide clear and consistent error messages across the application.

### 6. API Routing

- **RESTful API Design**: Structured routing using Express to handle all CRUD operations for users, customers, leads, opportunities, and interactions.
- **Modular Codebase**: Organize the codebase into separate modules and controllers to maintain clean and maintainable code.

### 7. Data Validation and Security

- **Data Validation**: Ensure the integrity of data using Mongoose schemas and validation rules.
- **Secure Data Storage**: Encrypt sensitive information like passwords before storing them in the database.

### 8. Flexible and Scalable Design

- **Modular Architecture**: Design the application with a modular structure to allow easy extension and maintenance.
- **Scalable Middleware**: Easily add or modify middleware functions as the application

## Installation

1.Clone the repo

```sh
git clone https://github.com/codesBySaad/customer-connect-crm-app-mern.git
```

2.Install NPM packages

```sh
npm install
```

3.Create a `.env` file and add the following

```sh
NODE_ENV = development
PORT = 5000
MONGO_URI = <your_mongodb_uri>
JWT_SECRET = <your_jwt_secret>
SALT = <your_salt>
```

## Configuration

**PORT:** Port on which the server will run (default: 5000).
**JWT_SECRET:** Secret key for signing JWT tokens.
**JWT_EXPIRE:** Expiration time for JWT tokens (e.g., "30d").
**MONGO_URI:** MongoDB connection string.

## API Endpoints

## Routes

The application has several routes organized by functionality, allowing interaction with different parts of the system. Below is a summary of the main routes and their purposes.

### 1. User Endpoints

These routes manage user registration, login, profile management, and admin-level user operations.

- **`GET /api/users`**
  - Retrieves all users. Only accessible by admin users.
- **`POST /api/users/login`**
  - Logs in a user with email and password and returns a JWT token.
- **`POST /api/users/register`**
  - Registers a new user and returns a JWT token.
- **`GET /api/users/profile`**
  - Retrieves the authenticated user's profile information.
- **`PUT /api/users/profile`**
  - Updates the authenticated user's profile information.
- **`PUT /api/users/:id`**
  - Updates a specific user's information. Only accessible by admin users.

### 2. Interaction Endpoints

These routes handle CRUD operations related to customer interactions (e.g., meetings, calls, emails).

- **`GET /api/interactions`**
  - Retrieves all customer interactions.
- **`POST /api/interactions`**
  - Creates a new interaction. Accessible by admin and sales representatives.
- **`GET /api/interactions/:id`**
  - Retrieves a specific interaction by its ID.
- **`PUT /api/interactions/:id`**
  - Updates a specific interaction by its ID. Accessible by admin and sales representatives.
- **`DELETE /api/interactions/:id`**
  - Deletes a specific interaction by its ID. Only accessible by admin users.

### 3. Lead Endpoints

These routes manage the sales leads, including creating, reading, updating, and deleting leads.

- **`GET /api/leads`**
  - Retrieves all sales leads.
- **`POST /api/leads`**
  - Creates a new lead. Accessible by admin and sales representatives.
- **`GET /api/leads/:id`**
  - Retrieves a specific lead by its ID.
- **`PUT /api/leads/:id`**
  - Updates a specific lead by its ID. Accessible by admin and sales representatives.
- **`DELETE /api/leads/:id`**
  - Deletes a specific lead by its ID. Only accessible by admin users.

### 4. Opportunity Endpoints

These routes manage the sales opportunities within the application.

- **`GET /api/opportunities`**
  - Retrieves all sales opportunities.
- **`POST /api/opportunities`**
  - Creates a new sales opportunity.
- **`GET /api/opportunities/:id`**
  - Retrieves a specific sales opportunity by its ID.
- **`PUT /api/opportunities/:id`**
  - Updates a specific sales opportunity by its ID.
- **`DELETE /api/opportunities/:id`**
  - Deletes a specific sales opportunity by its ID. Only accessible by managers and admin users.

### 5. Customer Endpoints

These routes manage customer data, including creating, reading, updating, and deleting customer records.

- **`GET /api/customers`**
  - Retrieves all customers.
- **`POST /api/customers`**
  - Creates a new customer record. Accessible by admin and sales representatives.
- **`GET /api/customers/:id`**
  - Retrieves a specific customer by its ID.
- **`PUT /api/customers/:id`**
  - Updates a specific customer by its ID. Accessible by admin and sales representatives.
- **`DELETE /api/customers/:id`**
  - Deletes a specific customer by its ID. Only accessible by admin users.

### 6. Error Handling Endpoints

These routes handle common errors such as 404 (Not Found) and other server errors.

- **`Error: 404 Not Found`**
  - Triggered when an undefined route is accessed.
- **`Error: General`**
  - Handles all other server errors and returns an appropriate error message.

## Middlewares

### Authentication Middleware

**protect:** Ensures that the route is protected and the user is authenticated. It checks for the presence of a JWT token in the request headers, verifies the token, and attaches the user object to the request if the token is valid.

### Authorization Middleware

**authorizeRoles:** Restricts access to routes based on user roles. Only users with one of the specified roles are allowed to proceed.

### Error Handler Middleware

**notFoundHandler:** Catches requests to routes that do not exist and returns a 404 Not Found status with a message indicating the route was not found.
**errorHandler:** Catches all errors, returns a response with the error message and status code, and includes the error stack in development mode.

## Models

### 1. User Model

The `User` model represents the users in the system. It includes fields for user authentication, profile management, and role-based access.

- **Schema Fields:**
  - `name`: The name of the user (String, required).
  - `email`: The user's email address (String, required, unique).
  - `password`: The user's password (String, required, hashed before storage).
  - `role`: The user's role within the system (String, defaults to 'user', possible values include 'admin', 'sales-rep', and 'manager').

### 2. Customer Model

The `Customer` model is used to manage customer information, including contact details and related interactions.

- **Schema Fields:**
  - `name`: The name of the customer (String, required).
  - `contactInfo`: General contact information for the customer (String).
  - `company`: The company the customer is associated with (String).
  - `address`: The customer's address (String).
  - `industry`: The industry sector of the customer (String).
  - `notes`: Additional notes about the customer (String).
  - `interactions`: A reference to associated `Interaction` documents (Array of ObjectIds).

### 3. Interaction Model

The `Interaction` model tracks interactions between the company and its customers, such as meetings, calls, and emails.

- **Schema Fields:**
  - `type`: The type of interaction (String, required, enum of 'Meeting', 'Call', 'Email').
  - `date`: The date of the interaction (Date, defaults to current date).
  - `time`: The time of the interaction (String).
  - `description`: A brief description of the interaction (String).
  - `customer`: A reference to the `Customer` associated with this interaction (ObjectId, required).

### 4. Lead Model

The `Lead` model manages sales leads, tracking their status and related opportunities.

- **Schema Fields:**
  - `name`: The name of the lead (String, required).
  - `contactInfo`: Contact information for the lead, including email and phone (Object).
  - `source`: The source of the lead (String).
  - `status`: The current status of the lead (String, defaults to 'New', enum of 'New', 'Contacted', 'Qualified', 'Lost', 'Won').
  - `salesRepresentative`: A reference to the `User` assigned as the sales representative for the lead (ObjectId).
  - `opportunities`: A reference to associated `Opportunity` documents (Array of ObjectIds).
  - `createdAt`: The date when the lead was created (Date, defaults to current date).

### 5. Opportunity Model

The `Opportunity` model tracks potential sales opportunities and their progress through various stages.

- **Schema Fields:**
  - `name`: The name of the opportunity (String, required).
  - `value`: The monetary value of the opportunity (Number, required).
  - `stage`: The current stage of the opportunity (String, defaults to 'Qualification', enum of 'Qualification', 'Proposal', 'Negotiation', 'Closed').
  - `expectedCloseDate`: The expected date for closing the opportunity (Date).
  - `lead`: A reference to the `Lead` associated with this opportunity (ObjectId, required).

## Contributing

Contributions are what make the open-source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the repo
2. Clone the project
3. Create your feature branch (`git checkout -b feature/AmazingFeature`)
4. Commit your changes (`git commit -m "Add some AmazingFeature"`)
5. Push to the branch (`git push origin feature/AmazingFeature`)
6. Open a pull request

## Contact

- Twitter: [@codesBySaad](https://twitter.com/codesBySaad)
- LinkedIn: [@codesBySaad](https://www.linkedin.com/in/codesBySaad/)
- Bento: [@codesBySaad](https://bento.me/codesBySaad)
- Email: [saadstudent.cs@gmail.com](mailto:saadstudent.cs@gmail.com)

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Support

Give ⭐️ if you like this project!

<a href="https://www.buymeacoffee.com/itxSaaad"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" width="200" /></a>
