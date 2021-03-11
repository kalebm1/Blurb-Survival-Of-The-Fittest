/**
 * Kaleb Morgan
 * CSC 2463
 * Graphics Assignment 3
 */

var blurbs = [];
var count = 10;
var foodCount = 50;
var food = [];
var generation = 0;
var currentCount = 10;

function preload() {
  for (var i = 0; i < count; i++) {
    // blurbs[i] = new Blurb(random(windowWidth - 1), random(windowHeight - 1));
    blurbs[i] = new Blurb(5, i * 20 + 5);
  }
  for (var j = 0; j < foodCount; j++) {
    food[j] = new Food(random(650) + 20, random(650));
  }
  blurbs[count - 1].hawk = true;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
}

function keyPressed() {
  if (keyCode == 32) {
    for (var i = 0; i < currentCount; i++) {
      blurbs[i].goEat();
      generation++;
    }
    for (var j = 0; j < count; j++) {
      blurbs[j].eat();
    }
    console.log(currentCount - count);
    for (var x = 0; x < foodCount; x++) {
      food[x].reset();
    }
    for (var y = 0; y < currentCount; y++) {
      blurbs[y].reset();
    }
  }
}

function draw() {
  background(250, 250, 250);

  for (var i = 0; i < currentCount; i++) {
    blurbs[i].draw();
  }
  for (var j = 0; j < foodCount; j++) {
    food[j].drawFood();
  }
}

function Blurb(x, y) {
  this.hawk = false;
  this.x = x;
  this.y = y;
  this.reproduce = false;
  this.food = 0;
  this.foodx = 0;
  this.foody = 0;
  this.eaten = false;
  this.eating = false;
  this.top = false;
  this.survive = true;

  this.eat = function () {
    if (food[this.food].visited == 2) {
      this.reproduce = false;
      this.survive = true;
    } else if (food[this.food].visited == 1) {
      this.reproduce = true;
      this.survive = true;
    }
    if (this.reproduce) {
      blurbs[currentCount] = new Blurb(5, currentCount * 20 + 5);
      currentCount++;
    }
    // var currentTime = second();
    // var time = currentTime + 5;
    // if (time > 59) {
    //   time = time % 60;
    // }
    // while (currentTime != time) {
    //   currentTime = second();
    // }
  };

  this.draw = function () {
    if (!this.hawk && !this.eating) {
      noStroke();
      fill(0, 0, 255);
      rect(x, y, 10, 10);
    } else if (this.hawk && !this.eating) {
      noStroke();
      fill(255, 0, 0);
      rect(x, y, 10, 10);
    } else if (this.eating) {
      noStroke();
      fill(0, 0, 255);
      if (this.top) {
        rect(this.foodx - 20, this.foody, 10, 10);
      } else {
        rect(this.foodx + 20, this.foody, 10, 10);
      }
    }
  };

  this.goEat = function () {
    this.food = round(random(foodCount - 1));
    // console.log(this.food);
    if (!food[this.food].isFull()) {
      this.eaten = true;
      food[this.food].blurbEat();
    } else {
      var hasFood = false;
      while (!hasFood) {
        this.food = round(random(foodCount - 1));
        if (!food[this.food].isFull()) {
          hasFood = true;
          this.eaten = true;
          food[this.food].blurbEat();
        }
      }
    }

    if (this.eaten) {
      this.foodx = food[this.food].getX();
      this.foody = food[this.food].getY();
      if (food[this.food].isTop()) {
        this.top = true;
        this.eating = true;
      } else {
        this.eating = true;
      }
    }
  };

  this.reset = function () {
    this.reproduce = false;
    this.top = false;
  };
}

function Food(x, y) {
  this.x = x;
  this.y = y;
  this.visited = 0;
  this.top = false;

  this.isFull = function () {
    if (this.visited >= 2) {
      return true;
    } else {
      return false;
    }
  };
  this.blurbEat = function () {
    this.visited++;
  };

  this.drawFood = function () {
    noStroke();
    fill(0, 255, 100);
    rect(x, y, 10, 10);
  };

  this.isTop = function () {
    var temp = this.top;
    this.top = true;
    return temp;
  };

  this.getX = function () {
    return this.x;
  };

  this.getY = function () {
    return this.y;
  };

  this.reset = function () {
    this.visited = 0;
    this.top = false;
  };
}
