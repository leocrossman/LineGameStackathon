const path = require('path');
const express = require('express');
const morgan = require('morgan');
const PORT = process.env.PORT || 3000;
const app = express();
// const socketio = require('socket.io');
const socket = require('socket.io');
module.exports = app;

app.use('/api', require('./api'));

const createApp = () => {
  // start listening (and create a 'server' object representing our server)
  const server = app.listen(PORT, () =>
    console.log(`Mixing it up on port ${PORT}`)
  );

  // logging middleware
  app.use(morgan('dev'));

  app.use(express.static(path.join(__dirname, '..', 'public')));

  const io = socket(server);
  io.sockets.on('connection', socket => {
    console.log(`Lady's and Gentlemen, we got a new client: ${socket.id}`);
  });

  // // sends index.html
  // app.use('*', (req, res) => {
  //   res.sendFile(path.join(__dirname, '..', 'public/index.html'));
  // });

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
  });
};

async function bootApp() {
  await createApp();
  // await startListening();
}

// This evaluates as true when this file is run directly from the command line,
// i.e. when we say 'node server/index.js' (or 'nodemon server/index.js', or 'nodemon server', etc)
// It will evaluate false when this module is required by another module - for example,
// if we wanted to require our app in a test spec
if (require.main === module) {
  bootApp();
} else {
  createApp();
}
