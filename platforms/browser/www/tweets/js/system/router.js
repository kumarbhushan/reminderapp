var rnc = rnc || {};

rnc.router = function () {

  console.log("starting our app");

  // sorry, no Backbone router here since chocolate chip handles the routes
  // instead we bind the navigation events to backbone views

  function navEventHandler(data, url) {
    console.log("nav to " + url);
    rnc.Event.trigger("route:" + url, url);
  }

  $.subscribe('chui/navigateBack/enter', navEventHandler);
  $.subscribe('chui/navigate/enter', navEventHandler);

  new rnc.Views.Listings();
  new rnc.Views.Main();
}



// wait for everything to be ready then run the demo code
rnc.resolver.initialize(function () {
  rnc.router();
  if (typeof(StatusBar) !== "undefined") {
    console.log("Setting StatusBar");
    StatusBar.overlaysWebView(false);
    StatusBar.backgroundColorByHexString('black');
  } else {
    console.log("NO StatusBar");
  }

  rnc.Event.on('rnc_tweets_authorized', function(evt){
    rnc.Collections.tweets.fetch();
          //rnc.Event.trigger("route:" + "listings-article", "listings-article");

  });

  rnc.Collections.tweets = new rnc.Collections.Tweets();
});