var http = require('http');
var url = require("url");
var querystring = require("querystring");
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Birds = require('./module/model.js');

var express = require('express');
var app = express();

app.use(bodyParser());

app.use(function(req,res,next){
    var ip = req.socket.remoteAddress;
    mongoose.connect('mongodb://127.0.0.1/test');
    var db = mongoose.connection;
    // var Birds = require('./model.js');
    db.on('error',console.error.bind(console,'connection error:'));
    db.once('open',function(callback){
        var query = {ip : ip}; // 查询条件
        var fields = {name : 1, ip : 1, height : 1,distance : 1}; // 待返回的字段
        var options = {};
        Birds.find(query,fields,options,function (err,result) {
            if (err) return console.error(err);
            req.online = result;
            db.close();// cannot predict the time when there's no more invoking
            next();
        });
    });
});

app.get('/', function (req, res) {
    console.log(req.online);
    if (req.online == null) {
        res.send('World!');
    }else{
        res.send(req.online);
    }
});

app.get('/other', function (req, res) {
    res.send('o');
});

app.post('/self', function (req, res) {
    req.setEncoding('utf-8');
    var postData = "";
    req.addListener("data", function(postDataChunk){
        postData += postDataChunk;
    })
    req.addListener("end",function(){
        var params = querystring.parse(postData);
    })

    var name = params.name;
    var height = params.height;
    var distance = params.distance;
    var ip = req.socket.remoteAddress;

    var record = model.find(ip);
    if(record == null){
        model.insert(name,ip,height,distance);
    }else{
        model.update(ip,height,distance);
    }
    res.send('s');
});

app.get('/self', function (req, res) {
    var params = url.parse(req.url,true).query;
    // console.log(params);
    var name = params.name;
    var height = params.height;
    var distance = params.distance;
    var ip = req.socket.remoteAddress;

    var record = model.find(ip);
    if(record == null){
        model.insert(name,ip,height,distance);
    }else{
        model.update(ip,height,distance);
    }
    res.send('s');
});

var port = process.env.PORT || 8082;
var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('app listening at http://%s:%s', host, port);
});
