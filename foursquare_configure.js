Template.configureLoginServicesDialogForFoursquare.siteUrl = function () {
  return Meteor.absoluteUrl();
};

Template.configureLoginServicesDialogForFoursquare.fields = function () {
  return [
    {property: 'clientId', label: 'Client ID'},
    {property: 'secret', label: 'Client secret'}
  ];
};
