var piblaster = require('pi-blaster.js'); // Require pi-blaster lib
var sleep = require('sleep'); //Sleeping
const GPIO_PINS = [18, 23, 24];		// Define used GPIO pins
const STEPS = 256;		// The number of brightness levels
const DIRECTIONS = [-1,1]; 

var brightness = new Array(STEPS);

var random_pin = GPIO_PINS[0];
var random_direction = DIRECTIONS[1];
var a = 0;

function array_creator(brightness) {
	var i = 0;
	while(i < STEPS) {
		brightness[i] = (i / STEPS);
		i++;
	}
}

Array.prototype.random = function () {  // Generates random values
	return this[Math.floor((Math.random()*this.length))];
}

function color_changer() {
	if (random_direction == 1){
		if(a < STEPS) {
			sleep.msleep(10);
			piblaster.setPwm(random_pin, brightness[a] ,function(callback) {
				console.log(random_pin, brightness[a], "up");
				if (brightness[a] == undefined){
					break;
				}
				color_changer();
			});
			a++;
		}else {
				random_pin = GPIO_PINS.random();
				random_direction = DIRECTIONS.random();
				color_changer();	
		}
	} else {
		if(a >= 1){
			//piblaster.setPwm(random_pin, brightness[a]);
			sleep.msleep(10);
			piblaster.setPwm(random_pin, brightness[a] ,function(callback) {
				console.log(random_pin, brightness[a], "down");
				if (brightness[a] == undefined){
					break;
				}
				color_changer();
			});
			a--;
		} else {
				random_pin = GPIO_PINS.random();
				random_direction = DIRECTIONS.random();
				color_changer();
		}
	}
		
	//color_changer();
	
}


array_creator(brightness);

color_changer();

/*
piblaster.setPwm(18, 1 ); // 100% brightness
piblaster.setPwm(23, 0.2 ); // 20% brightness
piblaster.setPwm(24, 0 ); // off
*/