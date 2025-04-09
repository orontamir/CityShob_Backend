const express = require('express');
require('dotenv').config();
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const routes = require('./routes/Routes');

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: '*'
  }
});

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/api/tasks', routes);

// Connect to MongoDB 
mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server once the DB is connected
    server.listen(3000, () => {
      console.log('Server running on port 3000');
    });
  })
  .catch(err => console.error(err));

// Handle Socket.io connection events
io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});
