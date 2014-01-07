var webduino = require('../webduino/lib/webduino');
var webduinoApp = webduino({test:true});

var server = webduinoApp.server();
var PORT = 8000;

webduinoApp.on("ready", function() {
  // On board ready, start listening for http requests
  server.listen(PORT, function() {
    // Notify local IP Addrsss & PORT
    var IP = webduinoApp.localIPs()[0];
    console.log("Listening on "+IP+":"+PORT)
  });
})





