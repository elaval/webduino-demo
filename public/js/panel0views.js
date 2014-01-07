var App =  App ? App : {};
App.views = App.views ? App.views : {};
App.models = App.models ? App.models : {};


App.views.Panel = Backbone.View.extend({
	className : "col-xs-12",

	initialize : function(options) {
		this.sensors = options && options.sensors ? options.sensors : new Backbone.Collection();
		this.leds = options && options.leds ? options.leds : new Backbone.Collection();

		this.template = _.template($("#Panel_template").html());
		this.render();
	},

	render : function() {
		this.$el.html(this.template());

		this.sensorView = new Backduino.views.LabSensors({collection: this.sensors})
		this.ledView = new Backduino.views.LabLeds({collection: this.leds})

		this.$(".sensors").append(this.sensorView.$el);
		this.$(".leds").append(this.ledView.$el);
	},

})



Backduino.views.LabSensors = Backbone.View.extend({
	className : "col-xs-12",

	initialize : function(options) {
		this.collection = this.collection ? this.collection : new Backbone.Collection();

		this.render();

		this.listenTo(this.collection, "add", this.render, this)
		this.listenTo(this.collection, "sync", this.render, this)
	},


	render: function() {
		var self = this;

		this.$el.html("");

		this.collection.each(function(item) {
			var itemView = new Backduino.views.LabSensor({model:item});

			self.$el.append(itemView.$el);
		})
					
	},

})

Backduino.views.LabSensor = Backbone.View.extend({
	className : "col-xs-4 col-sm-3 col-md-2 col-lg-2" ,

	initialize : function(options) {
		this.model = this.model ? this.model : new Backbone.Model();

		this.template = _.template($("#Sensor_template").html());

		this.formatDecimal = d3.format('.2f')
		this.formatPercentage = d3.format('%')

		this.render();
		this.listenTo(this.model, "change", this.render, this)
	},

	render: function() {
		var self = this;

		var value = " ";

		switch(this.model.get("type"))
		{
		case "temp":
		  value = self.formatDecimal(this.model.value())+" º";
		  break;
		case "light":
		  value = self.formatPercentage(this.model.value());
		  break;
		default:
		  value = this.model.value();
		}

		value = value ? value : "not active";

		var label = this.model.label();

		var html = this.template({'label' : label, 'value': value});

		this.$el.html(html);

      	return this
					
	},


});


Backduino.views.LabLeds = Backbone.View.extend({
	className : "col-xs-12",
	initialize : function(options) {
		this.collection = this.collection ? this.collection : new Backbone.Collection();

		this.render();

		this.listenTo(this.collection, "add", this.render, this)
		this.listenTo(this.collection, "sync", this.render, this)
	},


	render: function() {
		var self = this;

		this.$el.html("");

		this.collection.each(function(item) {
			var itemView = new Backduino.views.LabLed({model:item});

			self.$el.append(itemView.$el);
		})
					
	},

})

Backduino.views.LabLed = Backbone.View.extend({
	className : "col-xs-4 col-sm-2 col-md-2 col-lg-2" ,

	events : {
		"click" : "toggle"
	},

	initialize : function(options) {
		this.model = this.model ? this.model : new Backbone.Model();

		this.template = _.template($("#Led_template").html());

		this.render();
		this.listenTo(this.model, "change", this.render, this)
	},


	render: function() {
		var self = this;

		var state = this.model.get("on") ? "on" : "off";

		var label = "Led "+ this.model.get("id");

		var html = this.template({'label': label, 'state': state});

		this.$el.html(html);

      	return this
					
	},

	toggle: function() {
		if (this.model.get("on")) {
			this.model.set("on", false);
		} else {
			this.model.set("on", true)
		}				
	},

})







