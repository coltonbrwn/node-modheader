'use strict';

var http = require('http');
var httpProxy = require('http-proxy');

function requestSummary(req) {
  return req.url.substr(0, 40) + ' ..'
}

function createProxy(opts) {
  var headers = opts.headers;
  var port = opts.port || 4750;
  var processPort = opts.processPort || 4746;

  var proxy = httpProxy.createProxyServer({});

  proxy.on('proxyReq', function(proxyReq, req, res, options) {
    console.log('Adding Headers for: ' + requestSummary(req));
    headers.forEach(function setHeader(header){
      proxyReq.setHeader(header.name, header.value);
    });
  });

  var server = http.createServer(function(req, res) {
    proxy.web(req, res, {
      target: 'http://127.0.0.1:' + processPort
    });
  });

  console.log("listening on port " + port);
  server.listen(port);
}

module.exports = {
  create: createProxy
}