var piblaster = require('pi-blaster.js'); // Require pi-blaster lib
var sleep = require('sleep'); //Sleeping
const red_pin = 18;
const green_pin = 23;
const blue_pin = 24;
const GPIO_PINS = [red_pin, green_pin, blue_pin];
const COLORS = [0,1,2];		// Define used GPIO pins
const STEPS = 256;		// The number of brightness levels

var current_colors = [0,0,0];





var brightness = new Array(STEPS);
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

var direction = 1
var a = 0;
var selected_color = 0;

function color_looper() {
	if (direction == 1){
		if(current_colors[selected_color] < STEPS) {
			sleep.msleep(10);
			color_changer(selected_color, current_colors[selected_color], direction);
			current_colors[selected_color]++;
		} else {
				selected_color = COLORS.random();
				console.log(1);
				if (current_colors[selected_color] == 0){
					direction = 1;
				} else {
					direction = -1;
				}
				color_looper();	
		}
	} else {
		if(current_colors[selected_color] >= 1) {
			sleep.msleep(10);
			color_changer(selected_color, current_colors[selected_color], direction);
			current_colors[selected_color]--;
		} else {
				selected_color = COLORS.random();
				if (current_colors[selected_color] == 0){
					direction = 1;
				} else {
					direction = -1;
				}
				color_looper();
		}
	}
}

function color_changer(pin, brightness_level, direction) {
	piblaster.setPwm(GPIO_PINS[pin], brightness_level, function(callback) {
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