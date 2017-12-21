var piblaster = require('pi-blaster.js'); // Require pi-blaster lib
var gpio = require('rpi-gpio');   // Require rpi-gpio lib for starting ATX PSU
var sleep = require('sleep'); //Sleeping
/*
const power_pin = 7;  // Pin to start up the ATX PSU  !!Different pin numbering

const red_pin = 23;		// Define used GPIO pins
const green_pin = 25;
const blue_pin = 24;
const STEPS = 256;		// The number of brightness levels

const key_array = ['red', 'green', 'blue'];
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
};		*/

var methods = {};

methods.start_power = function() {
	gpio.setup(global.power_pin, gpio.DIR_OUT, send_start);
	
};

function send_start () {
	gpio.write(global.power_pin, true, function(err) {
        if (err) throw err;
        console.log('Power supply turned on');
    });
}

Array.prototype.random = function () {  // Generates random values
	return this[Math.floor((Math.random()*this.length))];
}

methods.start_color_loop = function() {
	var direction = 1;
	var selected_color = global.key_array.random();
	console.log("Changing brightness of", selected_color);
	color_looper(direction, selected_color);
};

function color_looper(direction, selected_color) {
	if (direction == 1){
		if(global.colors[selected_color]['current_brightness'] < global.STEPS) {
			sleep.msleep(10);
			color_changer(direction, selected_color);
			global.colors[selected_color]['current_brightness']++;
		} else {
				selected_color = global.key_array.random();
				console.log("Changing brightness of", selected_color);
				if (global.colors[selected_color]['current_brightness'] == 0){
					direction = 1;
				} else {
					direction = -1;
				}
				color_looper(direction, selected_color);	
				
		}
	} else {
		if(global.colors[selected_color]['current_brightness'] >= 1) {
			sleep.msleep(10);
			color_changer(direction, selected_color);
			global.colors[selected_color]['current_brightness']--;
		} else {
				selected_color = global.key_array.random();
				if (global.colors[selected_color]['current_brightness'] == 0){
					direction = 1;
				} else {
					direction = -1;
				}
				color_looper(direction, selected_color);
		}
	}
}

function color_changer(direction, selected_color) {
	piblaster.setPwm(global.colors.red.pin, (global.colors.red.current_brightness/global.STEPS), function(callback) {
		piblaster.setPwm(global.colors.green.pin, (global.colors.green.current_brightness/global.STEPS));
		piblaster.setPwm(global.colors.blue.pin, (global.colors.blue.current_brightness/global.STEPS));
		color_looper(direction, selected_color);
		//console.log(colors, selected_color, direction);
	});
}

methods.set_color = function() {
	piblaster.setPwm(global.colors.red.pin, (global.colors.red.current_brightness/global.STEPS));
	piblaster.setPwm(global.colors.green.pin, (global.colors.green.current_brightness/global.STEPS));
	piblaster.setPwm(global.colors.blue.pin, (global.colors.blue.current_brightness/global.STEPS));
	console.log("Values set")
}

exports.data = methods;
//start_color_loop();

/*
piblaster.release(colors.red.pin); 
piblaster.release(colors.green.pin); 
piblaster.release(colors.blue.pin); 
*/
