var Backduino =  Backduino ? Backduino : {};
Backduino.views = Backduino.views ? Backduino.views : {};
Backduino.models = Backduino.models ? Backduino.models : {};
Backduino = Backduino ? Backduino: {};

/* =================================
*  		MODELS & COLLECTIONS
*  =================================*/ 

/* ---------------------------------*/
/*				PINS  				*/
/* ---------------------------------*/
Backduino.models.Pin = Backbone.Model.extend({

});

Backduino.Pins = Backbone.Collection.extend({
	model:Backduino.models.Pin,

	initialize : function(models, options) {
		if (options && options.socket) this.socket(options.socket);
	},

	socket : function(socket) {
		var self = this;

		// Update sensor data when a new sample is received from the socket
		socket.on("pin", function(data) {
			var id = data.id;
			
			if (self.get(id)) {
				self.get(id).set(data);
			}
		})
	},

	url: function() {return Backduino.baseurl+"/api/pins"}
})


/* ---------------------------------*/
/*				LEDS  				*/
/* ---------------------------------*/
Backduino.models.Led = Backbone.Model.extend({
	url: function() {
		return Backduino.baseurl+"/api/leds/"+this.id;
	},

	turnon: function() {
		this.set("on", true);
		this.save();
	},

	turnoff: function() {
		this.set("on", false);
		this.save();
	}
}) 

Backduino.Leds = Backbone.Collection.extend({
	model: Backduino.models.Led,

	initialize : function(models, options) {
		if (options && options.socket) this.socket(options.socket);
	},

	socket : function(socket) {
		var self = this;

		// Update sensor data when a new sample is received from the socket
		socket.on("led", function(data) {
			var id = data.id;
			
			if (self.get(id)) {
				self.get(id).set(data);
			}
		})
	},

	url: function() {
		return Backduino.baseurl+"/api/leds";
	}
}) 

/* ---------------------------------*/
/*				SENSORS  			*/
/* ---------------------------------*/
Backduino.models.Sensor = Backbone.Model.extend({
	defaults: {
		scale : [0,1024],
		type: null
	},

	setScale: function(range) {
		this.set("scale", range)
	},

	setType: function(type) {
		this.set("type", type)
		switch(this.get("type"))
			{
			case "temp":
			  this.set("scale", [0,500])
			  break;
			case "light":
			  this.set("scale", [0,500])
			  break;
			default:
			  this.set("scale", [0,1024])
			}

	},

	label : function() {
		switch(this.get("type"))
			{
			case "temp":
			  return "Temperature"
			  break;
			case "light":
			  return "Light"
			  break;
			case "humidity":
			  return "Humidity"
			  break;
			default:
			  return "Sensor "+this.get("id");
			}
	},

	value: function() {
		var value = this.get("value");


		switch(this.get("type"))
			{
			case "temp":
			  return this.scale(value, [0,500], [0,1024])
			  break;
			case "light":
			  return this.scale(value, [0,1], [0,500])
			  break;
			default:
			  return value
			}
	},

	scale: function(value, range, domain) {
		var rmin = range[0];
		var rmax = range[1];

		var dmin = domain[0];
		var dmax = domain[1];

		value = value > dmax ? dmax : value;
		value = value < dmin ? dmin : value;

		var scaledValue = rmin + (rmax-rmin)*(value-dmin)/(dmax-dmin)

		return scaledValue;

	}


})

Backduino.Sensors = Backbone.Collection.extend({
	model: Backduino.models.Sensor,

	initialize : function(models, options) {
		if (options && options.socket) this.socket(options.socket);
	},

	socket : function(socket) {
		var self = this;

		// Update sensor data when a new sample is received from the socket
		socket.on("sensor", function(data) {
			var id = data.id;
			
			if (self.get(id)) {
				self.get(id).set(data);
			}
		})
	},

	url: function() {
		return Backduino.baseurl+"/api/sensors"
	}
})

/* ---------------------------------*/
/*				SERVOS  				*/
/* ---------------------------------*/
Backduino.models.Servo = Backbone.Model.extend({
	url: function() {
		return Backduino.baseurl+"/api/servos/"+this.id;
	},

	to: function(angle) {
		this.set("to", angle);
		this.save();
	}
}) 

Backduino.Servos = Backbone.Collection.extend({
	model: Backduino.models.Servo,

	initialize : function(models, options) {
		if (options && options.socket) this.socket(options.socket);
	},

	socket : function(socket) {
		var self = this;

		// Update sensor data when a new sample is received from the socket
		socket.on("servo", function(data) {
			var id = data.id;
			
			if (self.get(id)) {
				self.get(id).set(data);
			}
		})
	},

	url: function() {
		return Backduino.baseurl+"/api/servos";
	}
}) 

