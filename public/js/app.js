var App =  App ? App : {};
App.views = App.views ? App.views : {};
App.models = App.models ? App.models : {};

App.baseurl = window.location.origin;


$(document).ready(function() {
	App.socket = io.connect(App.baseurl);
	Backduino.baseurl = App.baseurl;

	App.pins = new Backduino.Pins();
	App.pins.socket(App.socket);

	App.sensors = new Backduino.Sensors();
	App.sensors.socket(App.socket);
	App.sensors.fetch({success: initializeSensors});

	App.leds = new Backduino.Leds();
	App.leds.socket(App.socket);
	App.leds.fetch({ success: initializeLeds});

	App.views.panel = new App.views.Panel({sensors: App.sensors, leds: App.leds});
	$("#content").html(App.views.panel.$el);

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
}

var initializeLeds = function() {

}

