class Player {
  constructor(x, y, w, h, isAlive) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.isAlive = isAlive;
  }

  display() {
    fill(255);
    // rect(this.x, this.y, this.w, this.h);
    const speed = 3;
    this.offScreen();

    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) this.x += speed;

    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) this.x -= speed;

    if (keyIsDown(UP_ARROW) || keyIsDown(87)) this.y -= speed;

    if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) this.y += speed;
  }

  offScreen() {
    if (this.x + this.w < 0) {
      this.x = width;
    }
    if (this.x - this.w > width) {
      this.x = 0 - this.w;
    }
    if (this.y + this.h < 0) {
      this.y = height;
    }
    if (this.y - this.h > height) {
      this.y = 0 - this.h;
    }
  }

  lineCollision(x1, y1, x2, y2, rx1, ry1, rx2, ry2) {
    const uA =
      ((rx2 - rx1) * (y1 - ry1) - (ry2 - ry1) * (x1 - rx1)) /
      ((ry2 - ry1) * (x2 - x1) - (rx2 - rx1) * (y2 - y1));
    const uB =
      ((x2 - x1) * (y1 - ry1) - (y2 - y1) * (x1 - rx1)) /
      ((ry2 - ry1) * (x2 - x1) - (rx2 - rx1) * (y2 - y1));

    if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
      return true;
    }
    return false;
  }

  shouldPlayerDie(x1, y1, x2, y2) {
    const x = this.x;
    const y = this.y;
    const w = this.w;
    const h = this.h;

    const left = this.lineCollision(x1, y1, x2, y2, x, y, x, y + h);
    const right = this.lineCollision(x1, y1, x2, y2, x + w, y, x + w, y + h);
    const top = this.lineCollision(x1, y1, x2, y2, x, y, x + w, y);
    const bottom = this.lineCollision(x1, y1, x2, y2, x, y + h, x + w, y + h);

    if (left || right || top || bottom) {
      this.isAlive = false;
    }
  }

  reset() {
    this.x = 30;
    this.y = 40;
    this.isAlive = true;
  }
}
