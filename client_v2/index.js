const express = require('express');
const app = express();
const port = 3000; // You can change the port as needed
const srcDirname = __dirname + '/src'
app.use('/static', express.static(srcDirname + '/static'));

// Define routes
app.get('/login', (req, res) => {
  res.sendFile(srcDirname + '/login.html');
});

app.get('/register', (req, res) => {
  res.sendFile(srcDirname + '/register.html');
});

app.get('/chat', (req, res) => {
  res.sendFile(srcDirname + '/chat.html');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
