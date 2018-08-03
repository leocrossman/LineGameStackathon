const path = require('path');
const express = require('express');
const morgan = require('morgan');
const PORT = process.env.PORT || 3000;
const app = express();
const socket = require('socket.io');
module.exports = app;

app.use('/api', require('./api'));

let players = [];
class Player {
  constructor(id, x, y, w, h) {
    this.id = id;
    this.y = y;
    this.x = x;
    this.w = w;
    this.h = h;
  }
}

const createApp = () => {
  // start listening (and create a 'server' object representing our server)
  const server = app.listen(PORT, () =>
    console.log(`Mixing it up on port ${PORT}`)
  );

  // logging middleware
  app.use(morgan('dev'));

  app.use(express.static(path.join(__dirname, '..', 'public')));

  const io = socket(server);

  setInterval(heartbeat, 20);
  function heartbeat() {
    io.sockets.emit('heartbeat', players);
  }

  io.sockets.on('connection', socket => {
    console.log(`Ladies and Gentlemen, we got a new client: ${socket.id}`);

    socket.on('start', function(data) {
      console.log(`${socket.id} ${data.x} ${data.y}`);
      const player = new Player(socket.id, data.x, data.y, data.w, data.h);
      players.push(player);
    });

    socket.on('plot', function(plotData) {
      console.log(`${socket.id} has plotted a new point!`);
      console.log('PLOT DATA:', plotData);
    });

    socket.on('update', data => {
      let player;
      for (let i = 0; i < players.length; i++) {
        if (socket.id === players[i].id) {
          player = players[i];
        }
      }
      player.x = data.x;
      player.y = data.y;
      player.w = data.w;
      player.h = data.h;
    });

    socket.on('disconnect', () => {
      console.log(`Client ${socket.id} has disconnected`);
    });
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
