#! /usr/bin/env node:wq

'use strict';

var getIp = require('./get-ip');
var profiles = require('./profiles');
var proxy = require('./proxy');

var args = process.argv;
var headersForProfile = [];

var FILEPATH_ARG = '-f';
var PROFILE_ARG = '-u';
var TARGET_PORT_ARG = '-t';
var LISTEN_PORT_ARG = '-p';

var profileName = getArgValue(PROFILE_ARG);
var fileName = getArgValue(FILEPATH_ARG);
var targetPort = getArgValue(TARGET_PORT_ARG);
var listenPort = getArgValue(LISTEN_PORT_ARG);

function getArgValue(argKey) {
  var args = process.argv;
  if (args.indexOf(argKey) > 0) {
    return args[args.indexOf(argKey) + 1];
  }
}

var headers = [];
if (profileName) {
  headers = profiles.getHeadersForUser(profileName);
} else if (fileName) {
  headers = profiles.getHeadersForFilename(fileName);
}

if (headers.length === 0) {
  console.warn('WARN: no additional headers will be sent');
}

proxy.create({
  user: profileName,
  headers: headers,
  targetPort: targetPort,
  listenPort: listenPort
});
