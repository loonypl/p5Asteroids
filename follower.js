// © Chris K.
// p5Asteroids, 06 January 2017 19:42, Warsaw, Poland.

function Follower () {

	this.size = 20; // size of follower

	// show function
	this.show = function () {
		push();
		noFill();
		stroke(80, 100, 30);
		strokeWeight(2);
		translate(- this.size / 2, - this.size / 2);
		rect(mouseX, mouseY, this.size, this.size);
		pop();
	}

	// setSize function
	this.setSize = function (size) {
		this.size = size; // set size of follower
	}

	// getPosition function
	this.getPosition = function () {
		return createVector(mouseX, mouseY); // return follower position
	}

}