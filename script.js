/**
 * Created by rain on 1/25/2016.
 */

/**
 * Boil Class
 * @param x
 * @param y
 * @constructor
 */

function Boid(x, y) {
  this.accelerator = createVector(0, 0);
  this.velocity = createVector(random(-1, 1), random(-1, 1));
  this.position = createVector(x, y);
  this.r = 3.0;
  this.maxspeed = 2;
  this.maxforce = 0.03;
}

Boid.prototype.update = function () {
  this.velocity.add(this.accelerator);
  this.velocity.limit(this.maxspeed);
  this.position.add(this.velocity);
};

Boid.prototype.applyForce = function (force) {
  this.accelerator.add(force);
};

/**
 * Seek Force
 * @param target: position of target
 */
Boid.prototype.seek = function (target) {
  var desired = p5.Vector.sub(target, this.position);
  desired.normalize();
  desired.mult(this.maxspeed);
  var steer = p5.Vector.sub(desired, this.velocity);
  steer.limit(this.maxforce);
  return steer;
};

Boid.prototype.render = function () {
  stroke(255);
  fill(255);
  push();
  angleMode(RADIANS);
  translate(this.position.x, this.position.y);
  rotate(this.velocity.heading() - PI / 2);
  beginShape();
  vertex(0, this.r * 4);
  vertex(-this.r, 0);
  vertex(this.r, 0);
  endShape(CLOSE);
  pop();
};

Boid.prototype.run = function () {
  var steer = this.seek(createVector(mouseX, mouseY));
  this.applyForce(steer);
  this.update();
  this.render();
};

/**
 * Flock Class
 *
 * @constructor
 */
function Flock(){
  this.boids = [];
};

Flock.prototype.run = function(){
  for(var i = 0; i< this.boids.length; i++){
    this.boids[i].run();
  }
};

Flock.prototype.addBoid = function(boid){
  this.boids.push(boid);
};

/**
 * Main Program
 */

var flock;
function setup() {
  createCanvas(640, 360);
  flock = new Flock();
  var numBoids = 10;
  for(var i = 0; i < numBoids; i++){
    flock.addBoid(new Boid(random(0, width), random(0, height)));
  }
}

function draw() {
  background(0);
  flock.run();
}
