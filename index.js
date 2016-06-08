'use strict';

var profiles = require('./profiles');
var proxy = require('./proxy');

var args = process.argv;
var headersForProfile = [];
var MODHEADER_ARG = '-m';
var PROFILE_ARG = '-p';

if (args.indexOf(MODHEADER_ARG) > 0) {
  var profileTitle = args[args.indexOf(MODHEADER_ARG) + 1];
  headersForProfile = profiles.getHeadersForModheaderProfile(profileTitle);
} else if (args.indexOf(PROFILE_ARG) > 0) {
  var profileTitle = args[args.indexOf(PROFILE_ARG) + 1];
  headersForProfile = profiles.getHeadersForCustomProfile(profileTitle);
}

if (headersForProfile.length === 0) {
  console.warn('WARN: no additional headers will be sent');
}

proxy.create({
  headers: headersForProfile
});
