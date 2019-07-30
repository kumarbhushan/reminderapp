

/* create our namespace */
var rnc = rnc || {};

(function (rnc, $, document) {
  "use strict"

  var jqReady = $.Deferred(),
    pgReady = $.Deferred();

    rnc.onTheWeb = false;
    rnc.resolver = {
      /* Callback for when the app is ready */
      callback: null,

      /* Application Constructor */
      initialize: function (callback) {
        rnc.resolver.callback = callback;
        var browser = document.URL.match(/^https?:/);
        if (browser) {
          console.log("Running on the web");
          rnc.onTheWeb = true;
          // In case of web, we ignore PG but resolve the Deferred Object to trigger initialization
          pgReady.resolve();
        }
        else {
          console.log("NOT running on the web");
          this.bindEvents();
        }
      },
      bindEvents: function () {
        document.addEventListener("deviceready", this.onDeviceReady, false);
      },
      onDeviceReady: function () {
          document.getElementById("global-nav").style.display = "none";
        /* The scope of 'this' is the event, hence we need to use rnc. */
        rnc.resolver.receivedEvent("deviceready");
      },
      receivedEvent: function (event) {
        switch (event) {
          case "deviceready":
            pgReady.resolve();
            break;
        }
      }
    };

  $(document).ready(function () {
    console.log("document ready");
      document.getElementById("global-nav").style.display = "none";
    jqReady.resolve();
  });

  $.when(jqReady, pgReady).then(function () {
    console.log("Frameworks ready.");
    /* both frameworks have initialized, so call the callback if one exists */
    if (rnc.resolver.callback) {
      rnc.resolver.callback();
    }
  });
}(rnc, jQuery, document));
