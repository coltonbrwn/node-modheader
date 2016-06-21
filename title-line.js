'use strict';

var getIp = require('./get-ip');

function titleLine() {
  console.log('');
  console.log(" === NODE-MODHEADER === ");
  console.log('');
}

function userLine(opts) {
  var user = opts.user;
  if (user) {
    console.log("🙇  User is '" + user + "'");
  }
}

function networkLine(opts) {
  var port = opts.port;
  var target = opts.target;
  getIp(function(ipAddress) {
    console.log("👂  Proxying requests ...");
    console.log("   http://" + ipAddress + ":" + port + "  ▶ ▶ ▶  " + target);
    console.log("");
  });
}

module.exports = function(opts) {
  titleLine();
  userLine(opts);
  networkLine(opts);
};
