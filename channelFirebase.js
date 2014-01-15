// Var & util used for Events management
var events = require("events");
var util = require("util");

// Firebase is a real time data exchnage service
var Firebase = require("firebase");

global.Firebase = Firebase;

var Channel = function(opts) {
  var self = this;

  if ( !(this instanceof Channel) ) {
    return new Channel(opts);
  }

  var refUrl = opts.firebase;
  this.ref = new Firebase(refUrl);

  var checkChanges = function(resource) {
    this.ref.child(resource).on("child_changed", function(snapshot) {
        var data = snapshot.val();
        var id = data.id;
        self.emit("data", {'resource': resource, "id":id, 'data':data});
    })
  }.bind(this);

  checkChanges("leds");
  checkChanges("sensors");
  checkChanges("servos");
  checkChanges("pins");


  events.EventEmitter.call(this);
};

// Inherit event api
util.inherits( Channel, events.EventEmitter );

Channel.prototype.put = function(resource, id,  data) {
  // Verify that data does not have undefined properties (to avoid conflicts with FireBase)
  for (key in data) {
    data[key] = data[key] || null;
  }

  this.ref.child(resource).child(id).set(data);
}






module.exports.Create = Channel;
