// List of predefined assignation of pins to device types (there is conflict defining a pin as LED & SERVO)
var devices = {}
devices.leds = [10,11,12,13]; // Defaults to all digital pins if null or not defined
devices.servos = [4,5,6,7];   // Defaults to no pin if null or not defined
devices.sensors = ["A0", "A1", "A2"];   // Defaults to no pin if null or not defined

var webduino = require('webduino');
var webduinoApp = webduino({
	'test':true,
	'devices': devices
});

var server = webduinoApp.server();
var PORT = 8000;

var firebaseRoot = 'https://uk.firebaseio.com/webduino';
var userid = "elaval";
var boardName = "Tarjeta de Prueba 1";

webduinoApp.on("ready", function() {

  // Create a channel for 2 way communication with FireBase Board Model
  var channelFireBase = require("./channelFirebase").Create({'firebase': firebaseRoot+"/"+userid+"/"+boardName});
  webduinoApp.addChannel(channelFireBase);

  // On board ready, start listening for http requests
  server.listen(PORT, function() {
    // Notify local IP Addrsss & PORT
    var IP = webduinoApp.localIPs()[0];
    console.log("Listening on "+IP+":"+PORT)
  });
})





