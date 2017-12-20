var piblaster = require('pi-blaster.js'); // Require pi-blaster lib
var gpio = require('rpi-gpio');   // Require rpi-gpio lib for starting ATX PSU
var sleep = require('sleep'); //Sleeping

const power_pin = 7;  // Pin to start up the ATX PSU  !!Different pin numbering

const red_pin = 24;		// Define used GPIO pins
const green_pin = 23;
const blue_pin = 25;
const STEPS = 256;		// The number of brightness levels

var colors = {  // Stores the pins of the colors and the current brightness of the strip
	'red': {
		'pin': red_pin,
		'current_brightness': 0	
	},
	'green':{
		'pin': green_pin,
		'current_brightness': 0
	},
	'blue': {
		'pin': blue_pin,
		'current_brightness': 0
	}
};		

gpio.setup(power_pin, gpio.DIR_OUT, start_power);

function start_power() {
	gpio.write(power_pin, true, function(err) {
        if (err) throw err;
        console.log('Power on');
    });
}



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
var selected_color = 'red';

function color_looper() {
	if (direction == 1){
		if(colors[selected_color][current_brightness] < STEPS) {
			sleep.msleep(10);
			color_changer();
			colors[selected_color][current_brightness]++;
		} else {
				selected_color = colors.random();
				console.log("Color is", selected_color);
				if (colors[selected_color][current_brightness] == 0){
					direction = 1;
				} else {
					direction = -1;
				}
				color_looper();	
		}
	} else {
		if(colors[selected_color][current_brightness] >= 1) {
			sleep.msleep(10);
			color_changer();
			colors[selected_color][current_brightness]--;
		} else {
				selected_color = colors.random();
				if (colors[selected_color][current_brightness] == 0){
					direction = 1;
				} else {
					direction = -1;
				}
				color_looper();
		}
	}
}

function color_changer() {
	piblaster.setPwm(colors.red.pin, (brightness_level/STEPS), function(callback) {
		piblaster.setPwm(colors.green.pin, (brightness_level/STEPS));
		piblaster.setPwm(colors.blue.pin, (brightness_level/STEPS));
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
