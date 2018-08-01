const xs = [];
const ys = [];

let m, b; // slope and y-intercept

function setup() {
  createCanvas(800, 800);
}

function mousePressed() {
  const x = map(mouseX, 0, width, 0, 1); // normlaizes our plane to be in the first quadrant instead of just the "width and height"
  const y = map(mouseY, 0, height, 1, 0);
  xs.push(x);
  ys.push(y);
}

function draw() {
  background(0);
  stroke(255);
  strokeWeight(Math.floor(width / 100)); // Sets the dot sizes to be 1/100th the size of the screen
  for (let i = 0; i < xs.length; i++) {
    const px = map(xs[i], 0, 1, 0, width); // maps from our normalized quadrant back to canvas coords
    const py = map(ys[i], 0, 1, height, 0);
    point(px, py);
  }
}
