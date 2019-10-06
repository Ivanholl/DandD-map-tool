var express = require('express');
var app = express();
var conf = require('./conf.js');

app.use('/', express.static(__dirname + '/public')); // ← adjust

app.listen(conf.port, () => console.log('listening: ' + conf.port));
