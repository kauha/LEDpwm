var express = require('express');
var app = express();
var led = require("./ledpwm.js")

/// LED STUFF
var piblaster = require('pi-blaster.js'); // Require pi-blaster lib
var gpio = require('rpi-gpio');   // Require rpi-gpio lib for starting ATX PSU
var sleep = require('sleep'); //Sleeping

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
};		
///LED STUFF

app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "index.htm" );
})

app.get('/process_get', function (req, res) {
   // Prepare output in JSON format
   response = {
      first_name:req.query.first_name,
      last_name:req.query.last_name
   };
   console.log(response);
   res.send({success: true});
})

app.get('/power_on', function (req, res) {
	led.data.start_color_loop(colors, key_array, STEPS);
	console.log("PSU turned on");
	res.status(200);
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Server listening at http://%s:%s", host, port)
})