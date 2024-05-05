// 인터렉티브디자인 중간과제 - C135177 백단하 
//---------------------------------------------------------------------------------------------------------
// Amphora Generator
// 암포라(Amphora)는 포도주를 보관하는 고대 그리스 도자기입니다.
//---------------------------------------------------------------------------------------------------------
// 기획 의도: 불규칙한 모양을 가진 사물에서 규칙을 찾아 제너레이티브 시스템으로 구현하고 싶었습니다.
//          암포라는 특정한 양식이 없는 것처럼 보이지만, 자세히 살펴보면 테두리, 목, 몸통, 발 그리고 2개의 핸들로 구성되어 있습니다. 
//          이러한 구조를 동일하게 가지면서 형태와 무늬가 다양한 암포라가 생성되도록 만들었습니다.
//---------------------------------------------------------------------------------------------------------
// Update
// - 암포라의 무늬가 더 다양해졌습니다.
// - 포도알을 드래그하여 움직일 수 있습니다.
// - 키보드에서 a를 누르면 암포라가 이미지로 저장됩니다.
//---------------------------------------------------------------------------------------------------------

let amphora;
let x1, y1, h1, h0, w0, x2, y2, h2, w2, r, l1, l2, l3, l4, l5, l6, l7, l8, l9, l0;
let rp1, rp2, rp3, rp4, rp5, rp6, rp7;
let slider1, slider2, slider3, slider4, slider5;
let patterns = [pattern1, pattern2, pattern3, pattern4, pattern5];
let randomTable;
let y;
let vines = [];
let vineNum = 40;
let grapes1 = [];
let grapes2 = [];
let grapeNum;
let functions = [firstRect, triangle, ellipse, rectPoint, vertical, arc, diamond, lastRect];

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  colorMode(HSB, 360, 100, 100);

  x1 = random(-250, -50);
  y1 = random(-200, -50);
  h1 = random(30, 200);
  h0 = random(10, 25);
  w0 = random(5, 10);
  x2 = random(x1 + 10, -50);
  y2 = random(250, 350);
  h2 = random(10, 250);
  w2 = random(5, 10);
  r = constrain(random(40, 100), 30, h1 - 20);
  l1 = random(2, 5);
  l2 = random(25, 70);
  l3 = random(20, 40);
  l4 = random(20, 80);
  l5 = random(20, 50);
  l6 = random(10, 30);
  l7 = random(10, 70);
  l8 = random(20, 50);
  l9 = random(l4 + l5 + l6 + l7 + l8 + 40, 250);
  l0 = random(20, 40);

  rp1 = random(functions);
  rp2 = random(functions);
  rp3 = random(functions);
  rp4 = random(functions);
  rp5 = random(functions);
  rp6 = random(functions);
  rp7 = random(functions);

  amphora = new Amphora(x1, y1, h1, h0, w0, x2, y2, h2, w2, r, l1, l2, l3, l4, l5, l6, l7, l8, l9, l0,
    rp1, rp2, rp3, rp4, rp5, rp6, rp7);

  slider1 = createSlider(30, 200, h1);
  slider1.position(width / 2 - 50 - 115 * 2, 940);
  slider1.changed(updatedAmphora);
  slider1.size(98);

  slider2 = createSlider(-200, -50, y1);
  slider2.position(width / 2 - 50 - 115, 940);
  slider2.changed(updatedAmphora);
  slider2.size(98);

  slider3 = createSlider(10, 250, h2);
  slider3.position(width / 2 - 50, 940);
  slider3.changed(updatedAmphora);
  slider3.size(98);

  slider4 = createSlider(250, 350, y2);
  slider4.position(width / 2 - 50 + 115, 940);
  slider4.changed(updatedAmphora);
  slider4.size(98);

  slider5 = createSlider(30, 100, r);
  slider5.position(width / 2 - 50 + 115 * 2, 940);
  slider5.changed(updatedAmphora);
  slider5.size(98);

  y = 650;
  randomTable = random(patterns);

  for (let i = 0; i < vineNum; i++) {
    vines[i] = new DrawVine;
  }

  let grapeNum = random(10, 70);
  for (let i = 0; i < grapeNum; i++) {
    grapes1.push(new Grape1(random(50, width - 50), random(600, 900), random(30, 50)));
  }
}

function draw() {
  push();
  background(18, 10, 95);
  translate(width / 2, height / 2);
  pop();

  //table
  push();
  stroke(357, 18, 94);
  strokeWeight(5);
  noFill();
  randomTable();
  pop();

  //vines
  push();
  translate(width / 2, height / 2);
  rotate(radians(90));
  for (let i = 0; i < vines.length; i++) {
    vines[i].display();
  }
  pop();

  //grapes
  push();
  for (let grp of grapes1) {
    grp.display();
  }
  pop();

  //amphora
  push();
  translate(width / 2, height / 2);
  noStroke();
  amphora.display();
  pop();
}

function updatedAmphora() {
  amphora = new Amphora(x1, slider2.value(), slider1.value(), h0, w0, x2,
    slider4.value(), slider3.value(), w2, slider5.value(),
    l1, l2, l3, l4, l5, l6, l7, l8, l9, l0, rp1, rp2, rp3, rp4, rp5, rp6, rp7);
}

//1. rect
function firstRect() {
  stroke(295, 43, 36);
  strokeWeight(l1);
  rect(0, -l2, 800, l1 * 3);
}

//2. triangle
function triangle() {
  for (let i = -400; i < 400; i += l3) {
    stroke(295, 43, 36);
    strokeWeight(l1);
    noFill();
    triangle(i, 0, i + l3 / 2, -l2 + l1 * 3, i + l3, 0);
    line(i, -l2 + l1 * 3 - 5, i + 400, -l2 + l1 * 3 - 5);
  }
}

//3. ellipse
function ellipse() {
  rect(0, l4, 800, l5);
  for (let i = -400; i < 400; i += l5 / 2) {
    fill(295, 43, 36);
    ellipse(i, l4, l5 / 5, l5 / 3);
  }
}

//4. rect & points
function rectPoint() {
  fill(295, 43, 36)
  rect(0, l4 + l5, 800, l6);
  for (let i = -400; i < 400; i += l6) {
    strokeWeight(l1 * 3 / 2);
    stroke(359, 22, 89);
    point(i, l4 + l5);
  }
}

//5. vertical line
function vertical() {
  for (let i = -400; i < 400; i += l6 / 2) {
    stroke(295, 43, 36);
    strokeWeight(l1 * 1.5);
    line(i, l4 + l5 + l6, i, l4 + l5 + l6 + l7);
  }
}

//6. arc
function arc() {
  noStroke();
  fill(295, 43, 36);
  for (let i = -400; i < 400; i += l8) {
    arc(i, l4 + l5 + l6 + l7 + l8, l8, l8, PI, 0, PIE);
  }
}

//7. diamond
function diamond() {
  noStroke();
  fill(295, 43, 36);
  for (let i = -400; i < 400; i += l0 * 1.5) {
    quad(i, l9, i + l0 / 2, l9 - l0 / 2, i + l0, l9, i + l0 / 2, l9 + l0 / 2);
  }
}

//8. rect
function lastRect() {
  stroke(295, 43, 36);
  strokeWeight(l1);
  noFill();
  rect(0, l9 + l0, 800, l1 * 3);
}

class Amphora {
  constructor(x1, y1, h1, h0, w0, x2, y2, h2, w2, r, l1, l2, l3, l4, l5, l6, l7, l8, l9, l0,
    rp1, rp2, rp3, rp4, rp5, rp6, rp7) {
    this.x1 = x1;
    this.y1 = y1;
    this.h1 = h1;
    this.h0 = h0;
    this.w0 = w0;
    this.x2 = x2;
    this.y2 = y2;
    this.h2 = h2;
    this.w2 = w2;
    this.r = r;

    this.l1 = l1;       //strokeWeight
    this.l2 = l2;       //rect1 y position  
    this.l3 = l3;       //triangle width & height
    this.l4 = l4;       //rect2 y position
    this.l5 = l5;       //rect2 height
    this.l6 = l6;       //rect3 height
    this.l7 = l7;       //line length
    this.l8 = l8;       //arcR
    this.l9 = l9;       //diamond y position
    this.l0 = l0;       //diamond height

    this.rp1 = rp1;
    this.rp2 = rp2;
    this.rp3 = rp3;
    this.rp4 = rp4;
    this.rp5 = rp5;
    this.rp6 = rp6;
    this.rp7 = rp7;
  }

  neck() {
    fill(295, 43, 36);
    beginShape();
    vertex(this.x1, this.y1);
    quadraticVertex(this.x1 + 10, this.y1 - this.h1 / 2, this.x1, this.y1 - this.h1);
    quadraticVertex(0, this.y1 - this.h1 + 20, -this.x1, this.y1 - this.h1);
    quadraticVertex(-this.x1 - 10, this.y1 - this.h1 / 2, -this.x1, this.y1);
    quadraticVertex(0, this.y1 + 30, this.x1, this.y1);
    endShape(CLOSE);
  }

  rim() {
    fill(359, 22, 89);
    beginShape();
    vertex(this.x1, this.y1 - this.h1);
    vertex(this.x1 - this.w0, this.y1 - this.h1 - this.h0);
    vertex(-this.x1 + this.w0, this.y1 - this.h1 - this.h0);
    vertex(-this.x1, this.y1 - this.h1);
    quadraticVertex(0, this.y1 - this.h1 + 20, this.x1, this.y1 - this.h1);
    endShape(CLOSE);
  }

  belly() {
    fill(359, 22, 89);
    beginShape();
    vertex(this.x1, this.y1);
    quadraticVertex(this.x1 - 150, this.y1 + this.h2, this.x2, this.y2);
    quadraticVertex(0, this.y2 + 10, -this.x2, this.y2);
    quadraticVertex(-this.x1 + 150, this.y1 + this.h2, -this.x1, this.y1);
    quadraticVertex(0, this.y1 + 20, this.x1, this.y1);
    endShape(CLOSE);

    push();
    canvas.getContext("2d").clip();
    this.rp1();
    this.rp2();
    this.rp3();
    this.rp4();
    this.rp5();
    this.rp6();
    this.rp7();
    pop();
  }

  foot() {
    beginShape();
    fill(295, 43, 36);
    vertex(this.x2, this.y2);
    vertex(this.x2 - this.w2, 370);
    quadraticVertex(0, 380, -this.x2 + this.w2, 370);
    vertex(-this.x2, this.y2);
    quadraticVertex(0, this.y2 + 10, this.x2, this.y2);
    endShape();
  }

  handle() {
    fill(295, 43, 36);
    circle(this.x1, this.y1, this.r * 2);
    circle(-this.x1, this.y1, this.r * 2);
    fill(18, 10, 95);
    circle(this.x1, this.y1, this.r);
    circle(-this.x1, this.y1, this.r);
  }

  display() {
    this.handle();
    this.neck();
    this.rim();
    this.foot();
    this.belly();
  }
}

class DrawVine {
  constructor() {
    this.x = random(-2000, -1300);
    this.y = random(-width, width);
    this.arcR = random(200, 400);
    this.ratio = random((0.3, 0.7));
    this.angle = radians(random(270, 360));
    this.weight = random(3, 9);

  }
  display() {
    push();
    noFill();
    stroke(300, 51, 25);
    strokeWeight(this.weight);
    this.drawVine(this.x, this.y, this.arcR, this.ratio, this.angle);
    pop();
  }

  drawVine(x, y, arcR, ratio, angle) {
    if (arcR > 50) {
      push();
      arc(x + arcR / 2, y, arcR, arcR, PI, 0);
      arc(x + arcR * 3 / 4, y, arcR / 2, arcR / 2, 0, PI);
      arc(x + arcR * 5 / 8, y, arcR / 4, arcR / 4, PI, 0);
      x = x + arcR / 2 + cos(radians(angle)) * arcR / 2;
      y = y + sin(radians(angle)) * arcR / 2;
      arcR *= 0.8;
      this.drawVine(x, y, arcR, ratio, angle);
      pop();
    }
  }
}

class Grape1 {
  constructor(x, y, r) {
    if (x > width / 2 - 300 && x < width / 2 + 300) {
      console.log("Error: Object cannot be created at this position.");
      return;
    }

    this.x = x;
    this.y = y;
    this.r = r;
    this.k = random(0, 8);
    this.dragging = false;
    this.offsetX = 0;
    this.offsetY = 0;
  }

  display() {
    if (this.dragging) {
      this.x = mouseX + this.offsetX;
      this.y = mouseY + this.offsetY;
      this.x = constrain(this.x, this.r, width - this.r);
      this.y = constrain(this.y, this.r, height - this.r);
    }
    fill(300, 51, 25);
    noStroke();
    circle(this.x, this.y, this.r * 2);
    stroke(22, 24, 98);
    strokeWeight(2);
    arc(this.x, this.y, this.r * 2 - 25, this.r * 2 - 25, HALF_PI * this.k, HALF_PI * (this.k + 1));
    arc(this.x, this.y, this.r * 2 - 40, this.r * 2 - 40, HALF_PI * this.k, HALF_PI * (this.k + 1));
  }

  mousePressed() {
    if (dist(mouseX, mouseY, this.x, this.y) < this.r) {
      this.dragging = true;
      this.offsetX = this.x - mouseX;
      this.offsetY = this.y - mouseY;
    }
  }

  mouseReleased() {
    this.dragging = false;
  }
}

function mousePressed() {
  for (let grp of grapes1) {
    grp.mousePressed();
  }
}

function mouseReleased() {
  for (let grp of grapes1) {
    grp.mouseReleased();
  }
}

function pattern1() {
  for (let i = 0; i < width; i += 30) {
    for (let j = 0; j < 500; j += 40) {
      let x = i;

      line(0, y + 10 + j, width, y + 10 + j);
      line(0, y - 30 + j, width, y + -30 + j);
      beginShape();
      vertex(x, y + j);
      vertex(x + 20, y + j);
      vertex(x + 20, y - 10 + j);
      endShape();

      beginShape();
      vertex(x + 10, y - 10 + j);
      vertex(x + 10, y - 20 + j);
      vertex(x + 30, y - 20 + j);
      vertex(x + 30, y + j);
      endShape();
    }
  }
}

function pattern2() {
  for (let i = 0; i < width; i += 90) {
    for (let j = 0; j < 500; j += 50) {
      let x = i;

      line(x, y + j, x + 100, y + j);
      line(x, y + j - 50, x + 100, y + j - 50);
      beginShape();
      vertex(x + 50, y + j);
      vertex(x + 50, y + j - 40);
      vertex(x + 10, y + j - 40);
      vertex(x + 10, y + j - 10);
      vertex(x + 40, y + j - 10);
      vertex(x + 40, y + j - 30);
      vertex(x + 20, y + j - 30);
      vertex(x + 20, y + j - 20);
      vertex(x + 30, y + j - 20);
      endShape();

      beginShape();
      vertex(x + 50, y + j - 40);
      vertex(x + 90, y + j - 40);
      vertex(x + 90, y + j - 10);
      vertex(x + 60, y + j - 10);
      vertex(x + 60, y + j - 30);
      vertex(x + 80, y + j - 30);
      vertex(x + 80, y + j - 20);
      vertex(x + 70, y + j - 20);
      endShape();
    }
  }
}

function pattern3() {
  for (let i = 0; i < width; i += 40) {
    for (let j = -50; j < 500; j += 60) {
      let x = i;

      line(x, y - 60, x + 100, y - 60);
      beginShape();
      vertex(x, y + j);
      vertex(x + 30, y + j);
      vertex(x + 30, y + j + 20);
      vertex(x + 10, y + j + 20);
      vertex(x + 10, y + j + 10);
      vertex(x + 20, y + j + 10);
      endShape();

      beginShape();
      vertex(x + 20, y + j + 40);
      vertex(x + 30, y + j + 40);
      vertex(x + 30, y + j + 30);
      vertex(x + 10, y + j + 30);
      vertex(x + 10, y + j + 50);
      vertex(x + 40, y + j + 50);
      vertex(x + 40, y + j);
      endShape();
    }
  }
}

function pattern4() {
  for (let i = 0; i < width; i += 50) {
    for (let j = 0; j < 500; j += 50) {
      let x = i;

      line(x, y - 50, x + 100, y - 50);
      beginShape();
      vertex(x, y + j);
      vertex(x + 10, y + j);
      vertex(x + 10, y + j - 30);
      vertex(x + 30, y + j - 30);
      vertex(x + 30, y + j - 10);
      vertex(x + 50, y + j - 10);
      vertex(x + 50, y + j - 50);
      endShape();

      beginShape();
      vertex(x, y + j - 40);
      vertex(x + 40, y + j - 40);
      vertex(x + 40, y + j - 20);
      vertex(x + 20, y + j - 20);
      vertex(x + 20, y + j);
      vertex(x + 60, y + j);
      endShape();
    }
  }
}

function pattern5() {
  for (let i = 0; i < width; i += 80) {
    for (let j = 0; j < 500; j += 40) {
      let x = i;

      beginShape();
      line(x, y + j - 30, x + 100, y + j - 30);
      vertex(x, y + j);
      vertex(x + 20, y + j);
      vertex(x + 20, y + j - 20);
      vertex(x + 10, y + j - 20);
      vertex(x + 10, y + j - 10);
      vertex(x + 40, y + j - 10);
      vertex(x + 40, y + j);
      vertex(x + 30, y + j);
      vertex(x + 30, y + j - 20);
      vertex(x + 60, y + j - 20);
      vertex(x + 60, y + j);
      vertex(x + 50, y + j);
      vertex(x + 50, y + j - 10);
      vertex(x + 80, y + j - 10);
      vertex(x + 80, y + j - 20);
      vertex(x + 70, y + j - 20);
      vertex(x + 70, y + j);
      vertex(x + 80, y + j);
      endShape();
    }
  }
}

function keyPressed() {
  if (key === 'a' || key === 'A') {
    saveCanvas('My Amphora', 'jpg');
  }
}
