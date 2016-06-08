'use strict';

var fs = require('fs');
var modHeaderProfiles = requireIf('./profiles/modHeaderProfiles.json');
var customProfiles = requireIf('./profiles/customProfiles.json');

function requireIf(path) {
  if (fs.existsSync(path)) {
    return require(path);
  }
  return null;
}

function notFoundError(profile) {
 return new Error('Profile "' + profile + '" not found' );
}

function getHeadersForModheaderProfile(profileTitle) {
  if (modHeaderProfiles && modHeaderProfiles.length) {
    for (var i = 0; i < modHeaderProfiles.length; i++) {
      var profile = modHeaderProfiles[i];
      if (profile.title === profileTitle) {
        return profile.headers;
      }
    }
  }
  throw notFoundError(profileTitle);
}

function getHeadersForCustomProfile(profileTitle) {
  if (customProfiles && customProfiles[profileTitle]) {
    var profile = customProfiles[profileTitle];
    return [
      'x-auth-params-uuid: ' + profile.uuid,
      'x-auth-params-user-uuid: ' + profile.uuid,
      'x-auth-params-token: ' + profile.token,
      'x-auth-params-groups: merch-pbx-admin' 
    ]
  }
  throw notFoundError(profileTitle);
}

module.exports = {
  getHeadersForCustomProfile: getHeadersForCustomProfile,
  getHeadersForModheaderProfile: getHeadersForModheaderProfile
}
