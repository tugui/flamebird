// var server = require("./module/http")
// var router = require("./module/router")
// var requestHandler = require("./module/requestHandler")

// var handle = {}
// handle["/"] = requestHandler.start
// handle["/start"] = requestHandler.start
// handle["/deal"] = requestHandler.deal
// handle["/pub"] = requestHandler.pub

// server.start(router.route,handle)

var model = require('../module/model.js');
model.insert('aaa','127.0.0.5');
model.search('127.0.0.5');

// var express = require('express');
// var app = express();

// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });

// var server = app.listen(3000, function () {
//   var host = server.address().address;
//   var port = server.address().port;

//   console.log('Example app listening at http://%s:%s', host, port);
// });
