var express = require('express');
var app = express();
var led = require("ledpwm.js")


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
	led.start_power();
	console.log("PSU turned on");
	res.status(200);
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Server listening at http://%s:%s", host, port)
})