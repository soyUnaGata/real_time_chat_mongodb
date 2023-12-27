# Real-time Chat App v2

Welcome to the documentation for the Real-time Chat App version 2! This project is an improved chat application that leverages MongoDB, Socket.io, Bootstrap, JWT tokens, bcryptjs, Express-validator, and more. The app provides real-time chat with features like user authentication, message history, and a user-friendly interface.

## Live Demo

Check out the live demo: [Live Demo](https://real-time-client.onrender.com/register)

## Features

- User authentication with JWT tokens
- Real-time chat using Socket.io
- Message history for reviewing past conversations
- Responsive design with Bootstrap
- Secure password storage with bcryptjs

## Technologies Used

- MongoDB
- Socket.io
- Bootstrap
- JWT tokens
- Bcryptjs
- Express-validator
- Cors
- Nodemon

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine
- Accessible MongoDB instance

### Installation

1. **Clone the repository:**
    ```bash
    git clone <repository-url>
    ```

2. **Navigate to the project directory:**
    ```bash
    cd real-time-chat-v2
    ```

3. **Install dependencies for client and server:**

   - Client:
     ```bash
     cd clientv2/src/static
     npm install
     ```

   - Server:
     ```bash
     cd server
     npm install
     ```

### Usage

1. **Run the server:**
    ```bash
    cd server && npm start
    ```

2. **Open the client folder:**
    ```bash
    cd clientv2
    ```

3. **Open `index.html` in your browser.**

## Project Structure

```bash
clientv2/
└── src/
    └── static/
        ├── chat.js
        ├── login.js
        ├── register.js
        └── style.css
    ├── chat.html
    ├── login.html
    ├── register.html
    └── index.js

server/
├── controllers/
│   ├── authController.js
│   └── msgController.js
├── models/
│   ├── Message.js
│   └── User.js
├── routers/
│   ├── authRouter.js
│   └── messageRouter.js
├── config.js
└── index.js


Contributing
Contributions are welcome! If you find any issues or have improvements, feel free to create a pull request.

License
This project is licensed under the MIT License. See the LICENSE.md file for details.


Please copy and paste this version into your GitHub README, and it should display with proper formatting.
