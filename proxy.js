'use strict';

var http = require('http');
var httpProxy = require('http-proxy');

var URL_MAX_LEN = 40;

function requestSummary(req) {
  var url = req.url;
  if (url.length > URL_MAX_LEN) {
    url = url.substr(0, URL_MAX_LEN) + ' ...';
  }
  return '🍌  ' + url;
}

function createProxy(opts) {
  var user = opts.user;
  var headers = opts.headers;
  var port = opts.listenPort || 4750;
  var targetPort = opts.targetPort || 8080;

  var target = 'http://127.0.0.1:' + targetPort;
  var proxy = httpProxy.createProxyServer({});

  proxy.on('proxyReq', function(proxyReq, req, res, options) {
    console.log(requestSummary(req));
    headers.forEach(function setHeader(header){
      proxyReq.setHeader(header.name, header.value);
    });
  });

  var server = http.createServer(function(req, res) {
    proxy.web(req, res, {
      target: target
    });
  });

  console.log("🙇  User is '" + user + "'");
  console.log("👾  Proxying requests to " + target);
  console.log("👂  listening on port " + port);
  console.log(" ... ");

  server.listen(port);
}

module.exports = {
  create: createProxy
}
