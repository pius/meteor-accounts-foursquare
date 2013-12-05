Accounts.oauth.registerService('foursquare');

if (Meteor.isClient) {
  Meteor.loginWithFoursquare = function(options, callback) {
    // support a callback without options
    if (! callback && typeof options === "function") {
      callback = options;
      options = null;
    }

    var credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);
    Foursquare.requestCredential(options, credentialRequestCompleteCallback);
  };
} else {
  Accounts.addAutopublishFields({
    forLoggedInUser: ['services.foursquare'],
    forOtherUsers: ['services.foursquare.id']
  });
}
