module.exports = function (RED) {
  "use strict";
  var ttn = require('ttn');

  function TTNConfig (config) {
    RED.nodes.createNode(this, config);
    var node = this;

    node.appId = config.appId;
    node.accessKey = config.accessKey;
    node.region = config.region;

    node.client = new ttn.Client(node.region, node.appId, node.accessKey);

    // clean up
    node.on('close', function (done) {
      node.log('closing connection');
      node.client.end();
      done();
    });
  }

  RED.nodes.registerType('ttn app', TTNConfig);
};
