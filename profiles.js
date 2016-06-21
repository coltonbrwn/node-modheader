'use strict';

var fs = require('fs');

function requireIf(path) {
  if (fs.existsSync(path)) {
    console.log('🔍  Found ' + path);
    return require(path);
  }
  return null;
}

function notFoundError(profile) {
 return new Error('Profile "' + profile + '" not found' );
}

function getHeadersForModheaderProfile(profile) {
  return profile.headers || [];
}

function getHeadersForCustomProfile(profile) {
  return Object.keys(profile).map(function makeHeaders(key){
    return {
      name: key,
      value: profile[key]
    };
  });
}

function getHeadersForProfile(profile) {
  if (profile && profile.title && profile.headers) {
    return getHeadersForModheaderProfile(profile);
  } else if (profile) {
    return getHeadersForCustomProfile(profile);
  }
  throw notFoundError(profileTitle);
}

function getHeadersForUser(user) {
  var profile = requireIf('./profiles/' + user + '.json');
  return getHeadersForProfile(profile);
}

function getHeadersForFilename(filename) {
  var profile = requireIf(filename);
  return getHeadersForProfile(profile);
}

module.exports = {
  getHeadersForUser: getHeadersForUser,
  getHeadersForFilename: getHeadersForFilename
}
