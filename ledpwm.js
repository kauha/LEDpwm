var piblaster = require('pi-blaster.js'); // Require pi-blaster lib
var sleep = require('sleep'); //Sleeping
const GPIO_PINS = [18, 23, 24];		// Define used GPIO pins
const STEPS = 255;		// The number of brightness levels
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

function color_changer() {
	/*if (random_direction == 1){
		while(a <= STEPS) {
			sleep.msleep(100);
			piblaster.setPwm(random_pin, brightness[a]);
			console.log(random_pin, brightness[a], "up");
			a++;
		}
	} else {
		while(a != 0){
			//piblaster.setPwm(random_pin, brightness[a]);
			sleep.msleep(100);
			console.log(random_pin, brightness[a], "down");
			a--;
			if (a == 1) {
				a = 0;
			}
		}
	}
	*/
	random_pin = GPIO_PINS.random();
	random_direction = DIRECTIONS.random();
	sleep.msleep(1000);
	piblaster.setPwm(18, 1 ,function(callback) {
			console.log("sisällä");
			color_changer();
		}); // 100% brightness
	console.log("Jotain!!")
	sleep.msleep(1000);
	//color_changer();
	
}


array_creator(brightness);

color_changer();

/*
piblaster.setPwm(18, 1 ); // 100% brightness
piblaster.setPwm(23, 0.2 ); // 20% brightness
piblaster.setPwm(24, 0 ); // off
*/