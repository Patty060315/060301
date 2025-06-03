/*
----- Coding Tutorial by Patt Vira ----- 
Name: Interactive Fridge Magnets
Video Tutorial: https://youtu.be/72pAzuD8tqE

Connect with Patt: @pattvira
https://www.pattvira.com/
----------------------------------------
*/

let video; let handPose; let hands = [];
let font; let size = 35;
let magnets = []; let num = 5;

function preload() {
  font = loadFont("Outfit-Regular.ttf");
  handPose = ml5.handPose({flipped: true});
}

function setup() {
  createCanvas(640, 480);
  // Detect video & load ML model
  video = createCapture(VIDEO, {flipped: true});
  video.hide();
  handPose.detectStart(video, gotHands);
  
  // Create magnet objects
  rectMode(CENTER);
  for (let i=0; i<num; i++) {
    magnets[i] = new Magnet();
  }
}

function draw() {
  background(220);

  // Display video and detect index and thumb position
  image(video, 0, 0, width, height);
  if (hands.length > 0) {
    let index = hands[0].keypoints[8];
    let thumb = hands[0].keypoints[4];

    noFill();
    stroke(0, 255, 0);
    text("index", index.x, index.y);
    text("thumb", thumb.x, thumb.y);

    for (let i = 0; i < num; i++) {
      magnets[i].touch(thumb.x, thumb.y, index.x, index.y);
    }
  }

  for (let i = 0; i < num; i++) {
    magnets[i].display();
  }

  // 在畫面正中央顯示文字
  fill(0);
  textFont(font);
  textSize(48);
  textAlign(CENTER, CENTER);
  text("淡江教育科技系", width / 2, height / 2);
}

function gotHands(results) {
  hands = results;
}

// Magnet class
class Magnet {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.w = 50;
    this.txt = "Magnet";
  }
  
  touch(thumbX, thumbY, indexX, indexY) {
    // Add touch interaction logic here
  }
  
  display() {
    push();
    translate(this.x, this.y);
    fill(255, 204, 0);
    stroke(0);
    strokeWeight(2);
    this.drawStar(0, 0, this.w/2.5, this.w/1.2, 5); // 畫五角星
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    textFont(font);
    textSize(size);
    text(this.txt, 0, 0);
    pop();
  }
  
  drawStar(x, y, radius1, radius2, npoints) {
    let angle = TWO_PI / npoints;
    let halfAngle = angle / 2.0;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = x + cos(a) * radius2;
      let sy = y + sin(a) * radius2;
      vertex(sx, sy);
      sx = x + cos(a + halfAngle) * radius1;
      sy = y + sin(a + halfAngle) * radius1;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }
}
