let chars = ['T', 'k', 'u', 'e', 't'];
let textMagnets = [];
let magnetIndex = 0;

// 在 setup() 執行時呼叫此函式
function initTextMagnets() {
  let centerX = 400;
  let centerY = 300;
  textMagnets = [];
  for (let i = 0; i < chars.length; i++) {
    textMagnets.push({
      t: chars[i],
      x: centerX + random(-100, 100),
      y: centerY + random(-100, 100)
    });
  }
  magnetIndex = 0; // 重新歸零
}

class Magnet {
  constructor() {
    // 依序取用每個字卡與位置
    let data = textMagnets[magnetIndex % textMagnets.length];
    this.t = data.t;
    this.x = data.x;
    this.y = data.y;
    magnetIndex++;

    this.angle = random(TWO_PI);
    this.c = color(255);

    this.bbox = font.textBounds(this.t, this.x, this.y, size);
    this.pos = createVector(this.x, this.y);
    this.w = this.bbox.w;
    this.h = this.bbox.h;

    this.fingerx = 0;
    this.fingery = 0;
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    fill(this.c);
    rect(0, 0, this.w, this.h);

    fill(0);
    noStroke();
    textFont(font);
    textSize(size / 2);
    textAlign(CENTER, CENTER);
    text(this.t, 0, 0);
    pop();

    fill(255, 0, 0);
    ellipse(this.fingerx, this.fingery, 10, 10);
  }

  touch(thumbx, thumby, indexx, indexy) {
    let distBetweenFingers = dist(thumbx, thumby, indexx, indexy);
    this.fingerx = abs(thumbx - indexx) + min(thumbx, indexx);
    this.fingery = abs(thumby - indexy) + min(thumby, indexy);

    let distFromFingers = dist(this.pos.x, this.pos.y, this.fingerx, this.fingery);

    if (distBetweenFingers < 40 && distFromFingers < this.w / 2) {
      this.c = color(255, 0, 0);
      this.pos.x = this.fingerx;
      this.pos.y = this.fingery;
    } else {
      this.c = color(255);
    }
  }
}
