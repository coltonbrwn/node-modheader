'use strict';

var exec = require('child_process').exec;

function findIpOsx(cb) {
  var cmd0 = 'ipconfig getifaddr en0';
  var cmd1 = 'ipconfig getifaddr en1';
  exec(cmd0, function(err0, res0) {
    if (!res0) {
      return exec(cmd1, function(err1, res1) {
        cb(res1.trim());
      });
    }
    cb(res0.trim());
  });
}

module.exports = findIpOsx;