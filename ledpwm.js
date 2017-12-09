var piblaster = require('pi-blaster.js'); // Require pi-blaster lib
var sleep = require('sleep'); //Sleeping
const red_pin = 18;
const green_pin = 23;
const blue_pin = 24;
const GPIO_PINS = [red_pin, green_pin, blue_pin];		// Define used GPIO pins
const STEPS = 256;		// The number of brightness levels
const DIRECTIONS = [-1,1]; 

var brightness = new Array(STEPS);

var random_pin = GPIO_PINS[0];
var random_direction = DIRECTIONS[1];
var a = 0;

function array_creator(brightness) {
	var i = 0;
	while(i <= STEPS) {
		brightness[i] = (i / STEPS);
		i++;
	}
}

Array.prototype.random = function () {  // Generates random values
	return this[Math.floor((Math.random()*this.length))];
}

function color_looper() {
	if (random_direction == 1){
		if(a < STEPS) {
			sleep.msleep(10);
			color_changer(random_pin, brightness[a], random_direction);
			a++;
		} else {
				random_pin = GPIO_PINS.random();
				random_direction = DIRECTIONS.random();
				color_looper();	
		}
	} else {
		if(a >= 1) {
			sleep.msleep(10);
			color_changer(random_pin, brightness[a], random_direction);
			a--;
		} else {
				random_pin = GPIO_PINS.random();
				random_direction = DIRECTIONS.random();
				color_looper();
		}
	}
		
	//color_looper();
	
}

function color_changer(pin, brightness_level, direction) {
	piblaster.setPwm(pin, brightness_level, function(callback) {
		console.log(pin, brightness_level, direction);
		color_looper();
	});
}


array_creator(brightness);

color_looper();

/*
piblaster.setPwm(18, 1 ); // 100% brightness
piblaster.setPwm(23, 0.2 ); // 20% brightness
piblaster.setPwm(24, 0 ); // off
*/