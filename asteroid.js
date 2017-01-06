// © Chris K.
// p5Asteroids, 06 January 2017 19:42, Warsaw, Poland.

function Asteroid (vector) {

	this.vector = vector; // position vector
	this.velocity = createVector(random(-4, 4), random(-4, 4)); // velocity vector
	this.angles = random(7, 15); // amount of angles
	this.radius = random(15, 25); // radius
	this.offsets = []; // offsets
	this.pause = false; // pause
	this.colourR = random(255); // colour r
	this.colourG = random(255); // colour g
	this.colourB = random(255); // colour b

	// generate offsets
	for (var i = 0; i < this.angles; i++) this.offsets.push(random(- this.radius * 0.2, this.radius * 0.5));

	// show function
	this.show = function () {
		push();
		noFill();
		stroke(this.colourR, this.colourG, this.colourB);
		strokeWeight(1);
		translate(this.vector.x, this.vector.y);
		beginShape();
		for (var i = 0; i < this.angles; i++) { // create vertexs
			var r = this.radius + this.offsets[i];
			var angle = map(i, 0, this.angles, 0, TWO_PI);
			vertex(r * cos(angle), r * sin(angle));
		}
		endShape(CLOSE);
		pop();
	}

	// update function
	this.update = function () {
		if (this.pause == false) { // if not paused
			// move (add velocity vector to actual position vector)
			this.vector.x += this.velocity.x;
			this.vector.y += this.velocity.y;
			// reflection from edge
			if (this.vector.x < - this.radius) {
				this.vector.x = width; // change x position
				this.velocity = createVector(random(-4), random(-4)); // change velocity vector
			} else if (this.vector.x > width + this.radius - 1) {
				this.vector.x = 0; // change x position
				this.velocity = createVector(random(4), random(4)); // change velocity vector
			} else if (this.vector.y < - this.radius) {
				this.vector.y = height; // change y position
				this.velocity = createVector(random(-4), random(-4)); // change velocity vector
			} else if (this.vector.y > height + this.radius - 1) {
				this.vector.y = 0; // change y position
				this.velocity = createVector(random(4), random(4)); // change velocity vector
			}
		}
	}

	// pause function
	this.pauseAsteroid = function (boolean) {
		this.pause = boolean;
	}

	// checkCollide function
	this.checkCollide = function () {
		if (int(p5.Vector.dist(this.vector, follower.getPosition())) < this.radius) {
			for (var i = 0; i < asteroids.length; i++) {
				asteroids[i].pauseAsteroid(true);
			}

			if (confirm('Game Over !' + '\n' + 'Your score: ' + score)) { // when confirm window closed
				for (var i = 0; i < asteroids.length; i++) {
					asteroids[i].pauseAsteroid(false);
				}
				mouseX = 0; // set cursor x position to 0
				mouseY = 0; // set cursor y position to 0
			} else {
				for (var i = 0; i < asteroids.length; i++) {
					asteroids[i].pauseAsteroid(false);
				}
				mouseX = 0; // set cursor x position to 0
				mouseY = 0; // set cursor y position to 0
			}
			score = 0; // reset score

			asteroids = [];

			// asteroids
			asteroidsAmount = random(25, 35); // generate amount of asteroids
			for (var i = 0; i < asteroidsAmount; i++) { // loop 'x' times
				var pos = createVector(int(random(width)), int(random(height))); // customize position vector for asteroid
				asteroids.push(new Asteroid(pos)); // create asteroid
			}
		}
	}

	// isPaused function
	this.isPaused = function () {
		return this.pause; // return true or false
	}

}