var express = require('express');
var app = express();
var led = require("./ledpwm.js")
var bodyParser = require("body-parser")

/// LED STUFF
var piblaster = require('pi-blaster.js'); // Require pi-blaster lib
var gpio = require('rpi-gpio');   // Require rpi-gpio lib for starting ATX PSU
var sleep = require('sleep'); //Sleeping

global.power_pin = 7;  // Pin to start up the ATX PSU  !!Different pin numbering

const red_pin = 23;		// Define used GPIO pins
const green_pin = 25;
const blue_pin = 24;
global.STEPS = 256;		// The number of brightness levels

global.power_status = false;

global.key_array = ['red', 'green', 'blue'];
global.colors = {  // Stores the pins of the colors and the current brightness of the strip
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
///LED STUFF


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "index.htm" );
})

app.post('/color_code', function (req, res) {
   // Prepare output in JSON format
   response = {
      red:req.body.red,
      green:req.body.green,
      blue:req.body.blue
   };
   console.log(response.red, response.green, response.blue);
   global.colors.red.current_brightness = response.red;
   global.colors.green.current_brightness = response.green;
   global.colors.blue.current_brightness = response.blue;   
   led.data.set_color();
   res.sendStatus(200);
})

app.post('/power_on', function (req, res) {
	global.power_status = true;
	led.data.power_status();
	console.log("PSU turned on");
	res.sendStatus(200);
})

app.post('/power_off', function (req, res) {
	global.power_status = false;
	led.data.power_status();
	console.log("PSU turned off");
	res.sendStatus(200);
})

app.post('/start_rgb_loop', function (req, res) {
	led.data.start_color_loop();
	console.log("Color loop on");
	res.sendStatus(200);
})

app.post('/stop_rgb_loop', function (req, res) {
	//led.data.start_color_loop();
	console.log("Color loop off");
	res.sendStatus(200);
})


var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Server listening at http://%s:%s", host, port)
})