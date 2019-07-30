
(function () {
  "use strict";

  rnc.Collections.Tweets = Backbone.Collection.extend({
    model: rnc.Models.Tweet,
    numListing: 20,
    totalAvailable: 0,
    totalPages: 0,
    authorization: null,
    urlApiKey: "nzUcn1fUbcgdauxqee2Ye3syw",
    urlApiSecret: "LCPnnPnTGnslBp7iS0uubhcDNtLI96t8N4ffc4FPAfi5gXoBXj",
    twitterTokenURL: 'https://api.twitter.com/oauth2/token',
    twitterStreamURL: "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=",
    screenName: "SuicideCallBack",
    authorizationReady: null,
    dataReady: null,

    initialize: function () {
      this.authorizationReady = $.Deferred();
      this.getAuthorization();

      // we need to wait for the authorization to
      $.when(this.authorizationReady).then(function () {
        console.log("Tweets Authorized!");
        rnc.Event.trigger("rnc_tweets_authorized");
      });
      console.log("Tweets Collection Initialized!")
    },

    url: function () {
      return this.twitterStreamURL + this.screenName;
    },

    // PhoneGap apps don't have cross domain issues
    sync: function (method, model, options) {
      if (this.authorizationReady.state() === "resolved") {
        var that = this;
        var ajaxRead = function (model, options) {
          // Default JSON-request options.
          var params = _.extend({
            dataType: 'json',
            beforeSend: function (xhrObj) {
              xhrObj.setRequestHeader("Authorization", "Bearer " + that.authorization.access_token);
              xhrObj.setRequestHeader("Content-Type", "application/json");
            },
            type: 'GET',
            url: this.url()
          }, options);
          console.log("URL: " + params.url);
          return $.ajax(params);
        };

        switch (method) {
          case 'read':
            console.log("SYNC'ing!!!");
            return ajaxRead.call(this, model, options);
          default:
            // all other verbs can't be implemented since this is a read-only third party service
            break;
        }
      }
    },

    parse: function (response) {
      if (response && response.length) {
          for(var i=0; i<response.length; i++){
              var resText=response[i].text;
              var editedText="";
              var urls = response[i].entities.urls;
              for (var j =((urls.length)-1); j>=0; j--){
                  var urlindex1 = response[i].entities.urls[j].indices[0];
                  var urlindex2 = response[i].entities.urls[j].indices[1];
                  var urlText = '<a style="color:#9fcd5a; padding-top: 5px;" onclick="window.open('+"'"+response[i].entities.urls[j].url+"'"+', '+"'"+'_system'+"'"+');" href="#">'+response[i].entities.urls[j].url+'</a>';
                  resText = resText.replace(resText.substring(urlindex1,urlindex2), urlText);
              }
              
              $('#tweet'+i).show();
              $('#tweetText'+i).html(resText);
              //$('#logotweets'+i).attr({src:response[i].user.profile_image_url}); //changed to hardcoded logo based on client request
              $('#logotweets'+i).attr({src:'img/tweets-logo.png'});
              
          }
          
          
        return response;
      }
      return [];
    },

    getAuthorization: function () {
      // URL encode the consumer key and secret
      var base64Encoded,
        that = this,
      // Concatenate the encoded consumer key, a colon character, and the encoded consumer secret
        urlApiKey = encodeURIComponent(this.urlApiKey),
        urlApiSecret = encodeURIComponent(this.urlApiSecret),
        combined = urlApiKey + ":" + urlApiSecret;

      // Base64 encode the string
      base64Encoded = rnc.Base64.encode(combined);
      // Step 2: Obtain a bearer token
      $.ajax({
        beforeSend: function (xhrObj) {
          xhrObj.setRequestHeader("Authorization", "Basic " + base64Encoded);
          xhrObj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
        },
        type: "POST",
        url: this.twitterTokenURL,
        processData: true,
        data: {
          grant_type: 'client_credentials'
        },
        dataType: "json",
        success: function (auth) {
          that.authorization = auth;
          // resolve
          that.authorizationReady.resolve();
          // Applications should verify that the value associated with the
          // token_type key of the returned object is bearer
          if (auth && auth.token_type && auth.token_type === "bearer") {
            console.log(JSON.stringify(auth));
          }
        }
      });
    }
  });
}());
