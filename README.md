# (sfbpms)Sports Facility Booking Platform Management System-server

### Project Overview: 

The full name of "SFBPMS" is Sports Facility Booking Platform Management System-server which is a TypeScript web app using Express.js and MongoDB with Mongoose, allowing users to register, log in, manage facilities, make bookings, and providing admin users additional management features.

## Project Features

### User Management:

1. User can register as(admin and user)
2. User login and authentication with JWT

### Facility Management:

1. Admin can add, update, delete facility softly.
2. User & Admin both can see the available facilities  

### Booking Management:

1. User can book facility and cancel facility
2. User & Admin can check availability of facility.
3. User can see the booked facility by himself only.
4. Admin can check see all the booked facilities by users.

## Validation and Error Handling

In this project I have used Zod validation to ensure data consistency and prevent malformed requests. For error handling I have used global error handling with my onw way to show the error using httpstatus code and stack to get the error place. Also handle different type of errors. For example,
1. No Data Found,
2. Route Not Found,
3. Validate by user role

## Credentials

1. ADMIN: Email- admin@codermahabub.com
        Password- Admin222111

2. USER: Email- user@codermahabub.com
        Password- User222111

## Installation

1. **first of clone the repository**
    ```bash
    git clone https://github.com/CoderMahabub/sfbpms-server.git
    cd sfbpms-server
    ```
    Live server link: 

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Create a `.env` file in the root of your project:**
    ```bash
    touch .env
    ```
    Add the necessary environment variables to the `.env` file. For example:
    ```env
    NODE_ENV=development
    PORT=
    DB_URL=
    BCRYPT_SALT_ROUNDS=
    JWT_ACCESS_SECRET=
    JWT_REFRESH_SECRET=
    JWT_ACCESS_EXPIRES_IN=
    JWT_REFRESH_EXPIRES_IN=
    ```

## Running the Application

### In Development Mode

To run the application in development mode with hot-reloading:

```bash
npm run start:dev
 ```
## API EndPoint
### User Routes

1.POST /api/auth/signup -> (Register a new user)

2.POST /api/auth/login -> (Log in a registered user)

### Admin Only

1. POST /api/facility -> (Add a new facility)
2. PUT /api/facility/:id -> (Update an existing facility)
3. DELETE /api/facility/:id -> (Soft delete a facility)
4. GET /api/facility -> (Retrieve all facilities)

### UserOnly Only

1. GET /api/check-availability -> (Check availability of time slots for booking)
2. POST /api/bookings -> (Create a new booking(user Only))
3. GET /api/bookings -> (View all bookings (Admin Only))
4. GET /api/bookings/user -> (View bookings by user (User Only))
5. DELETE /api/bookings/:id -> (Cancel a booking (User Only

### Project overview Video Link:
