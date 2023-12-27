# Real-time Chat App v2

Welcome to the documentation for the Real-time Chat App version 2! This project is an enhanced chat application that utilizes various technologies such as MongoDB, Socket.io, Bootstrap, JWT tokens, bcryptjs, Express-validator, and more. The application provides real-time chat functionality with features like user authentication, message history, and a clean user interface.

## Live Demo

Check out the live demo of the Real-time Chat App v2: [Live Demo](https://real-time-client.onrender.com/register)

## Features

- User authentication with JWT tokens
- Real-time chat functionality using Socket.io
- Message history to view past conversations
- Responsive and clean user interface powered by Bootstrap
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

- Node.js and npm must be installed on your machine.
- MongoDB instance should be set up and accessible.

### Installation

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd real-time-chat-v2`
3. Install dependencies for both client and server:

   Client:
   ```bash
   cd clientv2/src/static
   npm install
Server:
cd server
npm install

Usage
Run the server: cd server && npm start
Open the client folder: cd clientv2
Open index.html in your browser.

Project Structure
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


Feel free to customize the content and structure according to your project's specifics. Update placeholders such as `<repository-url>` with the actual repository URL.
