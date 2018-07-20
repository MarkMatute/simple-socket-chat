const express = require('express');
const socket = require('socket.io');
const app = express();

// Static Files
app.use(express.static('public'));

// Server Set up
const server = app.listen(4002, () => {
  console.log('Listening to request port 4002');
});

// Socket Set up
const io = socket(server);
io.on('connection', (socket) => {

  // New Chat Message
  socket.on('chat-message', (data) => {
    io.sockets.emit('new-chat', data);
  });

  // Typing
  socket.on('typing', (data) => {
    socket.broadcast.emit('typing');
  });

});