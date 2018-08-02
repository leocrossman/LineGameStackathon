class Player{
  constructor(x,y, w, h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  display() {
    fill(255);
    rect(this.x, this.y, this.w, this.h);
    const speed = 3;
    this.offScreen();

    if(keyIsDown(RIGHT_ARROW)) this.x +=speed;

    if(keyIsDown(LEFT_ARROW)) this.x -=speed;

    if(keyIsDown(UP_ARROW)) this.y -=speed;

    if(keyIsDown(DOWN_ARROW)) this.y +=speed;
  }

  offScreen(){
    if(this.x + this.w < 0){
      this.x = width
    }
    if(this.x - this.w > width){
      this.x = 0-this.w;
    }
    if(this.y + this.h < 0){
      this.y = height
    }
    if(this.y - this.h > height){
      this.y = 0-this.h;
    }
  }
}
