'use strict';

var http = require('http');
var httpProxy = require('http-proxy');
var titleLine = require('./title-line');

var DEFAULT_LISTEN_PORT = 4750;
var DEFAULT_TARGET_PORT = 8080;
var URL_MAX_LEN = 60;

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
  var port = opts.listenPort || DEFAULT_LISTEN_PORT;
  var targetPort = opts.targetPort || DEFAULT_TARGET_PORT;

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

  server.listen(port, function() {
    titleLine({
      port: port,
      target: target,
      user: user
    });
  });
}

module.exports = {
  create: createProxy
}
