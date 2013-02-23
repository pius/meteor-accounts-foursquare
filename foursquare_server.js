(function () {
  Meteor.accounts.foursquare.setSecret = function (secret) {
    Meteor.accounts.foursquare._secret = secret;
  };

  Accounts.oauth.registerService('foursquare', 2, function(query) {

    var accessToken = getAccessToken(query);
    var identity = getIdentity(accessToken);
    
    return {
      serviceData: {
        id: identity.id,
        accessToken: accessToken,
				email: identity.contact.email,
        phone: identity.contact.phone
      },
      options: {profile: {firstName: identity.firstName, 
                           lastName: identity.lastName, 
                             gender: identity.gender, 
                           homeCity: identity.homeCity, 
                           photoUrl: identity.photo}}
    };
  });

  var getAccessToken = function (query) {
	  var config = Accounts.loginServiceConfiguration.findOne({service: 'foursquare'});
	  if (!config)
		  throw new Accounts.ConfigError("Service not configured");
	  
	  var result = Meteor.http.post(
			  "https://foursquare.com/oauth/access_token", {headers: {Accept: 'application/json'}, params: {
				  code: query.code,
				  client_id: config.clientId,
				  client_secret: config.secret,
				  redirect_uri: Meteor.absoluteUrl("_oauth/foursquare?close"),
				  state: query.state
			  }});
	  if (result.error) // if the http response was an error
		  throw result.error;
	  if (result.data.error) // if the http response was a json object with an error attribute
	      throw result.data;
	  return result.data.access_token;
  };

  var getIdentity = function (accessToken) {
    var result = Meteor.http.get(
      "https://api.foursquare.com/v2/users/self",
      {params: {access_token: accessToken}});

    if (result.error)
      throw result.error;
    return result.data;
  };
}) ();
