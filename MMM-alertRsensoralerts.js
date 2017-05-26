/* global Module */

/* Magic Mirror
 * Module: MMM-alertRsensoralerts
 *
 * By Andre Pawlowski (sqall) https://alertr.de
 * MIT Licensed.
 */

// Needs npm install mysql


Module.register("MMM-alertRsensoralerts",{

	// Default module config.
	defaults: {
		numberSensorAlerts: 10,
	},

	// Override dom generator.
	getDom: function() {

		this.getSensorAlerts();

		var wrapper = document.createElement("table");
		wrapper.className = "table";

		for(var i = 0; i < this.sensorAlerts.length; i++) {
			var sensorAlertWrapper = document.createElement("tr");
			sensorAlertWrapper.className = "tr";

			var timeWrapper = document.createElement("td");
			timeWrapper.className = "td_time";
			var localDate = new Date(this.sensorAlerts[i].timeReceived * 1000);
			var yearString = localDate.getFullYear();
			var monthString = ("0" + (localDate.getMonth() + 1)).slice(-2);
			var dateString = ("0" + localDate.getDate()).slice(-2);
			var hoursString = ("0" + localDate.getHours()).slice(-2);
			var minutesString = ("0" + localDate.getMinutes()).slice(-2);
			var secondsString = ("0" + localDate.getSeconds()).slice(-2);
			var receivedTimeString = monthString + "/" + dateString + "/" +
				yearString + " " + hoursString + ":" +
				minutesString + ":" + secondsString;
			timeWrapper.textContent = receivedTimeString;	

			var stateWrapper = document.createElement("td");
			stateWrapper.className = "td_state";
			if(this.sensorAlerts[i].state === 0) {
				stateWrapper.textContent = "Normal";
			}
			else if(this.sensorAlerts[i].state === 1) {
				stateWrapper.textContent = "Triggered";
			}
			else {
				stateWrapper.textContent = "Unknown";
			}

			var descriptionWrapper = document.createElement("td");
			descriptionWrapper.className = "td_desc";

			dataJson = JSON.parse(this.sensorAlerts[i].dataJson);
			// Add sensor alert optional message if exists.
			if(dataJson.hasOwnProperty("message")) {
				descriptionWrapper.textContent = this.sensorAlerts[i].description + "\n(" + dataJson["message"] + ")";
			}
			else {
				descriptionWrapper.textContent = this.sensorAlerts[i].description;
			}

			sensorAlertWrapper.appendChild(timeWrapper);
			sensorAlertWrapper.appendChild(stateWrapper);
			sensorAlertWrapper.appendChild(descriptionWrapper);
			wrapper.appendChild(sensorAlertWrapper);
		}

		return wrapper;
	},

	// Define start sequence.
	start: function() {
		Log.info("Starting module: " + this.name);

		this.sensorAlerts = {};

		this.getSensorAlerts();

		// Schedule update interval.
		var self = this;
		setInterval(function() {
			self.updateDom();
		}, 3000);
	},

	getSensorAlerts: function() {
		Log.info("Getting sensor alerts");

		this.sendSocketNotification("GET_SENSOR_ALERTS", {config: this.config
			});
	},

	socketNotificationReceived: function(notification, payload) {

		if(notification === "RESULT_SENSOR_ALERTS") {
			Log.info("Received sensor alerts data");

			for(var i = 0; i < payload.rows.length; i++) {
				this.sensorAlerts = payload.rows;
			}

		}

	},

	// Define required scripts.
	getScripts: function() {
		return ["moment.js"];
	},

	// Define required styles.
	getStyles: function() {
		return ["MMM-alertRsensoralerts.css"];
	},

});
