var proxy  = require('ams-rest-proxy');
var express = require('express');
var serverApp = express();
var path = require('path')

var configurator = function(app){
  app.route('/##app.name##')
      .get(function (req, res) {
        res.sendFile(path.join(__dirname, 'index.html'));

      });
  app.use('/',express.static(path.join(__dirname,'..')));
  app.use('/##app.name##',express.static(path.join(__dirname)));
    app.use('/assets',express.static(path.join('assets')));
  app.use('/bower_components',express.static(path.join(__dirname,'../../bower_components')));

};
proxy.createServer({}).mountApp("",serverApp,configurator).start(3001);
