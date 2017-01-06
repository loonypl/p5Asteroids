// © Chris K.
// p5Asteroids, 06 January 2017 19:42, Warsaw, Poland.

// objects
var asteroids = []; // asteroids
var asteroidsAmount; // amount of asteroids
var follower; // follower

// global
var canvas; // canvas
var canvasDim = { // canvas dimensions
	width : window.innerWidth, // width
	height : window.innerHeight // height
};
var canvasBg = 0; // background colour of canvas
var score = 0; // players' score
var scoreShowed = false; // boolean

// DOM
var canvasContainer;

// setup function
function setup() {
	// containers
	canvasContainer = createElement('canvascontainer');
	// canvas
	canvas = createCanvas(canvasDim.width, canvasDim.height);
	canvas.parent(canvasContainer);

	// asteroids
	asteroidsAmount = random(25, 50); // generate amount of asteroids
	for (var i = 0; i < asteroidsAmount; i++) { // loop 'x' times
		var pos = createVector(int(random(width)), int(random(height))); // customize position vector for asteroid
		asteroids.push(new Asteroid(pos)); // create asteroid
	}

	// follower
	follower = new Follower(); // create follower

	// score
	setInterval(incScore, 2000);
}

// draw function
function draw() {
	// background
	background(canvasBg);

	// asteroids
	for (var i = 0; i < asteroids.length; i++) { // loop throught asteroids
		asteroids[i].show(); // show function for asteroid
		asteroids[i].update(); // update function for asteroid
		asteroids[i].checkCollide(); // checking collide function for asteroid
	}

	// follower
	follower.show(); // show function for follower
}

// incScore function
function incScore () {
	if (asteroids.length != 0 && !asteroids[0].isPaused()) {
		score++; // if amount of asteroids is not 0 and asteroids is not paused and increment score
		var pos = createVector(int(random(width)), int(random(height))); // customize position vector for asteroid
		asteroids.push(new Asteroid(pos)); // create asteroid
	}
}

// addStyles function
function addStyles (element, styles) {
	for (var i = 0; i < styles.length; i++) { // loop 'x' times
		element.style(styles);
	}
}