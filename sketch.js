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
  createCanvas(800, 600); // 改為 800*600
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

  // 先顯示攝影機畫面
  image(video, 0, 0, width, height);

  // 畫面上方中間顯示中文字標題
  fill(0);
  textFont(font);
  textSize(32);
  textAlign(CENTER, TOP);
  text("淡江教育科技系", width / 2, 20);

  // Display video and detect index and thumb position
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
}

function gotHands(results) {
  hands = results;
}
