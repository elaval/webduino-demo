var App =  App ? App : {};
App.views = App.views ? App.views : {};
App.models = App.models ? App.models : {};

App.baseurl = window.location.origin;


$(document).ready(function() {
	App.socket = io.connect(App.baseurl);
	Backduino.baseurl = App.baseurl;

	App.pins = new Backduino.Pins();
	App.pins.socket(App.socket);

	App.switch = new App.models.Switch();

	App.sensors = new Backduino.Sensors();
	App.sensors.socket(App.socket);
	App.sensors.fetch({success: initializeSensors});

	App.leds = new Backduino.Leds();
	App.leds.socket(App.socket);
	App.leds.fetch({ success: initializeLeds});

	App.views.panel = new App.views.Panel({sensors: App.sensors, leds: App.leds, switch: App.switch});
	$("#svgcontainer").html(App.views.panel.$el);

	App.switch.set("min", d3.select("input.min").attr("value"));
	App.switch.set("max", d3.select("input.max").attr("value"));
	
	var inputmin = d3.select("input.min")
    	.on("change", function() { 
    		App.switch.set("min", this.value) 
    	})

	var inputmax = d3.select("input.max")
    	.on("change", function() { 
    		App.switch.set("max", this.value) 
    	})


});

var initializeSensors = function() {
	App.sensors.get("A0").set("active",true);
	App.sensors.get("A0").save();
	App.sensors.get("A1").set("active",true);
	App.sensors.get("A1").save();
	App.sensors.get("A2").set("active",true);
	App.sensors.get("A2").save();


	App.sensors.get("A0").setType("temp");
	App.sensors.get("A1").setType("humidity");
	App.sensors.get("A2").setType("light");
	App.switch.setSensor(App.sensors.get("A2"));
}

var initializeLeds = function() {
	App.switch.setLed(App.leds.get(13));
}

