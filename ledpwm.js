var piblaster = require('pi-blaster.js'); // Require pi-blaster lib
const GPIO_PINS = [18, 23, 24];		// Define used GPIO pins
const STEPS = 255;		// The number of brightness levels

var brightness = new Array(STEPS);

function array_creator(brightness) {
	var a = 0;
	while(a <= STEPS) {
		brightness[a] = (a / STEPS);
		a++;
	}
	console.log(brightness);
}
array_creator(brightness);

piblaster.setPwm(18, 1 ); // 100% brightness
piblaster.setPwm(23, 0.2 ); // 20% brightness
piblaster.setPwm(24, 0 ); // off
