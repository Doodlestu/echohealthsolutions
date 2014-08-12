/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        navigator.splashscreen.hide();
        try {
            analytics.startTrackerWithId('UA-50812266-1', function() {
                alert('succ');
            }, function() {
                alert('fail');
            });
            analytics.trackEvent('Category', 'Action', 'Label', 1, function() {
                alert('succ');
            }, function() {
                alert('fail');
            })
            analytics.trackView('Screen Title');
            analytics.debugMode();
            alert("pass");
        }
        catch (e) {
            console.log("error:" + e);
        }
         gaPlugin = window.plugins.gaPlugin;
		 gaPlugin.init(successHandler, errorHandler, "UA-50812266-1", 10);
        
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
(function (g) {

	var productId = "9b0f17355ba64d8780f786668a3eb5c4"; // App unique product key

	// Make analytics available via the window.analytics variable
	// Start analytics by calling window.analytics.Start()
	var analytics = g.analytics = g.analytics || {};
	analytics.Start = function () {
		// Handy shortcuts to the analytics api
		var factory = window.plugins.EqatecAnalytics.Factory;
		var monitor = window.plugins.EqatecAnalytics.Monitor;
		// Create the monitor instance using the unique product key for Analytics
		var settings = factory.CreateSettings(productId);
		settings.LoggingInterface = factory.CreateTraceLogger();
		factory.CreateMonitorWithSettings(settings,
		  function () {
		  	console.log("Monitor created");
		  	// Start the monitor inside the success-callback
		  	monitor.Start(function () {
		  		console.log("Monitor started");
		  	});
		  },
		  function (msg) {
		  	console.log("Error creating monitor: " + msg);
		  });
	}
	analytics.Stop = function () {
		var monitor = window.plugins.EqatecAnalytics.Monitor;
		monitor.Stop();
	}
	analytics.Monitor = function () {
		return window.plugins.EqatecAnalytics.Monitor;
	}
})(window);

function onDeviceReady() {
     window.analytics.Start();
     // existing code goes here
}

function onPause() {
     window.analytics.Stop();
     // existing code goes here
}
function onResume() {
     window.analytics.Start();
     // existing code goes here
}
