# Tour App API

This repository contains the API for a **Tour App**, which allows users to explore and book tours. Built using **MongoDB**, **Express**, and **Node.js**, it handles all the backend operations for managing tours, bookings, and users.

## Features

- **Tour Management**: Create, update, and delete tours.
- **User Authentication**: Sign up, log in, and manage user sessions.
- **Booking System**: Users can book tours.
- **Pagination and Sorting**: Efficiently handle large datasets.
- **Error Handling**: Global error handling for consistent responses.

## Technologies Used

- **Node.js**: JavaScript runtime.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for data storage.
- **Mongoose**: MongoDB object modeling for Node.js.
- **JWT**: For user authentication.
- **bcrypt**: For password encryption.

## Prerequisites

Ensure you have the following installed:

- **Node.js** (v14 or later)
- **MongoDB** (local or cloud instance)

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YourUsername/TourAppAPI.git
   cd TourAppAPI
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory with the following:
   ```
   NODE_ENV=development
   PORT=3000
   DATABASE=mongodb://localhost:27017/tour-app
   JWT_SECRET=your_secret_key
   JWT_EXPIRES_IN=90d
   ```

4. **Run the application**:
   ```bash
   npm start
   ```

   The API will be available at `http://localhost:3000`.

## API Endpoints

### Tours

- **GET** `/api/tours` - Get all tours
- **POST** `/api/tours` - Create a new tour
- **GET** `/api/tours/:id` - Get tour by ID
- **PATCH** `/api/tours/:id` - Update tour
- **DELETE** `/api/tours/:id` - Delete tour

### Users

- **POST** `/api/users/signup` - Sign up
- **POST** `/api/users/login` - Log in
- **PATCH** `/api/users/:id` - Update user

### Bookings

- **GET** `/api/bookings` - Get all bookings
- **POST** `/api/bookings` - Create a booking

## Project Structure

```bash
├── controllers/     # Request handlers
├── models/          # MongoDB models
├── routes/          # API routes
├── app.js           # Express app configuration
├── server.js        # Entry point for the server
└── config.env       # Environment variables
```

## Error Handling

All API errors are handled centrally and returned in a consistent JSON format.

## Authentication & Security

- Passwords are encrypted using **bcrypt**.
- Authentication is managed with **JWT** (JSON Web Tokens).
- Protected routes ensure that only authorized users can perform certain actions.

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Submit a pull request.

## License

This project is licensed under the MIT License.
