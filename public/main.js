const xVals = [];
const yVals = [];

let m, b; // slope and y-intercept

const learningRate = 0.2; // how quickly the optimizer brings the line to the correct place
const optimizer = tf.train.sgd(learningRate);

let start = false;

//FOR PLAYER(S)
let xCoord = 30;
let yCoord = 40;
let player;
let players = [];

let socket;

function setup() {
  createCanvas(800, 800);
  // var ipAndPort = location.host; // Get the host name here
  // if the ip is on localhost, then the host is set to localhost. Otherwise, set it to the ip in the url
  const ipAndPort =
    location.host.search(/localhost/) > -1 ? 'localhost:3000' : location.host;
  socket = io.connect(`http://${ipAndPort}`);
  // tf.variable allows us to change m and b. Tensors are immutable otherwise
  // tf.scalar because we are using tensors. `scalar` just means integer.
  m = tf.variable(tf.scalar(random(1))); // random number between 0 and 1
  b = tf.variable(tf.scalar(random(1)));

  player = new Player(xCoord, yCoord, 30, 30);
  const data = {
    x: player.x,
    y: player.y,
    h: player.h,
    w: player.w,
  };
  socket.emit('start', data);

  socket.on('heartbeat', function(data) {
    players = data;
  });
}

function draw() {
  tf.tidy(() => {
    // Since we made m and b tf.variables, we are able to adjust those tensors
    if (xVals.length > 0) {
      const ys = tf.tensor1d(yVals); // transform ys from array to tensor
      optimizer.minimize(() => loss(predict(xVals), ys)); // minimize the loss function
    }
  });
  background(0);
  if (start === false) {
    stroke(255);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(40);
    text('LINE GAME', width / 2, height / 2 - Math.floor(width / 16));
    textSize(30);
    text('Press Enter to Start', width / 2, height / 2);
  } else {
    stroke(255);

    strokeWeight(Math.floor(width / 100)); // Sets the dot sizes to be 1/100th the size of the screen
    for (let i = 0; i < xVals.length; i++) {
      const px = map(xVals[i], 0, 1, 0, width); // maps from our normalized quadrant back to canvas coords
      const py = map(yVals[i], 0, 1, height, 0);
      if (xVals.length > 5) xVals.shift();
      if (yVals.length > 5) yVals.shift();
      point(px, py);
    }
    let lineX = [0, 1];
    const ys = tf.tidy(() => predict(lineX)); // clean up memory leak
    let lineY = ys.dataSync(); // dataSync is an async func so could slow performance but we should be okay...
    ys.dispose();

    // lineX are floats so they can be used in the line func
    let x1 = map(lineX[0], 0, 1, 0, width);
    let x2 = map(lineX[1], 0, 1, 0, width);

    // ys are tensors so we had to get floats from them with dataSync
    let y1 = map(lineY[0], 0, 1, height, 0);
    let y2 = map(lineY[1], 0, 1, height, 0);

    strokeWeight(Math.floor(width / 200));

    line(x1, y1, x2, y2);

    for (let i = players.length - 1; i > 0; i--) {
      let id = players[i].id;
      if (id.substring(2, id.length) !== socket.id) {
        rect(players[i].x, players[i].y, 30, 30);
        textAlign(CENTER);
        textSize(4);
      }
    }
    if (!player.gameOver(x1, y1, x2, y2)) {
      player.display();
    }

    const data = {
      x: player.x,
      y: player.y,
      h: player.h,
      w: player.w,
    };
    socket.emit('update', data);
  }
}

// predictions (guesses) are y-vals from predict func
// labels are actual y values from 'ys'
// THIS IS OUR MEAN SQUARE ERROR! (guess - y)^2
function loss(pred, label) {
  return pred
    .sub(label)
    .square()
    .mean();
}

function mousePressed() {
  if (players[0].id === socket.id) {
    const x = map(mouseX, 0, width, 0, 1); // normlaizes our plane to be in the first quadrant instead of just the "width and height"
    const y = map(mouseY, 0, height, 1, 0);
    xVals.push(x);
    yVals.push(y);
    plotData = {
      id: players[0].id,
      xVals,
      yVals,
    };
    socket.emit('plot', plotData);
  }
}

function predict(x) {
  const xs = tf.tensor1d(x);
  // y = mx + b
  const ys = xs.mul(m).add(b);

  return ys;
}

function keyPressed() {
  if (keyCode == ENTER) {
    start = true;
  }
}
