var App =  App ? App : {};
App.views = App.views ? App.views : {};
App.models = App.models ? App.models : {};
App.devices = App.devices ? App.devices : {};

App.baseurl = window.location.origin;


$(document).ready(function() {
	App.socket = io.connect(App.baseurl);
	Backduino.baseurl = App.baseurl;

	App.devices.pins = new Backduino.Pins();
	//App.devices.pins.socket(App.socket);

	App.devices.sensors = new Backduino.Sensors();
	//App.devices.sensors.socket(App.socket);
	App.devices.sensors.fetch({success: initializeSensors});

	App.devices.leds = new Backduino.Leds();
	//App.devices.leds.socket(App.socket);
	App.devices.leds.fetch({ success: initializeLeds});

	App.devices.servos = new Backduino.Servos();
	App.devices.servos.fetch();

	App.socket.on("data", function(msg) {
		var id = msg.id;
		var resource = msg.resource;
		var data = msg.data;

		if (App.devices[resource]) {
			if (App.devices[resource].get(id)) {
				App.devices[resource].get(id).set(data);
			}
		} 
	});

	App.views.panel = new App.views.Panel({sensors: App.devices.sensors, leds: App.devices.leds, servos : App.devices.servos});
	$("#content").html(App.views.panel.$el);



});

var initializeSensors = function() {
	App.devices.sensors.get("A0").set("active",true);
	App.devices.sensors.get("A0").save();
	App.devices.sensors.get("A1").set("active",true);
	App.devices.sensors.get("A1").save();
	App.devices.sensors.get("A2").set("active",true);
	App.devices.sensors.get("A2").save();


	App.devices.sensors.get("A0").setType("temp");
	App.devices.sensors.get("A1").setType("humidity");
	App.devices.sensors.get("A2").setType("light");
}

var initializeLeds = function() {

}

