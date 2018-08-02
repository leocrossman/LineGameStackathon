const xs = [];
const ys = [];

let m, b; // slope and y-intercept

const learningRate = 0.2; // how quickly the optimizer brings the line to the correct place
const optimizer = tf.train.sgd(learningRate);

//FOR PLAYER
let xCoord = 30;
let yCoord = 40;
const player = new Player(xCoord, yCoord, 30, 30);

function setup() {
  createCanvas(800, 800);

  // tf.variable allows us to change m and b. Tensors are immutable otherwise
  // tf.scalar because we are using tensors. `scalar` just means integer.
  m = tf.variable(tf.scalar(random(1))); // random number between 0 and 1
  b = tf.variable(tf.scalar(random(1)));
}

function mousePressed() {
  const x = map(mouseX, 0, width, 0, 1); // normlaizes our plane to be in the first quadrant instead of just the "width and height"
  const y = map(mouseY, 0, height, 1, 0);
  xs.push(x);
  ys.push(y);
}

function predict(x) {
  const xs = tf.tensor1d(x);
  // y = mx + b
  const ys = tfxs.mul(m).add(b);

  return ys;
}

function draw() {
  background(0);
  stroke(255);
  player.display();
  strokeWeight(Math.floor(width / 100)); // Sets the dot sizes to be 1/100th the size of the screen
  for (let i = 0; i < xs.length; i++) {
    const px = map(xs[i], 0, 1, 0, width); // maps from our normalized quadrant back to canvas coords
    const py = map(ys[i], 0, 1, height, 0);
    point(px, py);
  }
}
