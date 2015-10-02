var exec = require("child_process").exec,
      querystring = require('querystring'),
      fs = require('fs'),
      util = require('util'),
      path = require("path"),
      url = require('url'),
      formidable = require('formidable');

var highest = 15;

function start (res) {
    console.log('start!!!')
    fs.readFile(path.join(__dirname,'index.html'), function (err, data) {
        if (err) {
            console.log(err);
            res.writeHead(404, {'Content-Type': 'text/html'});
        }else{
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data.toString());
        }
        res.end();
    })
}

function deal (res,req) {
    console.log('deal???')
    var post = '';
    req.on('data',function (chunk) {
        post += chunk;
    })
    req.on('end',function () {
        post = querystring.parse(post);
        console.log(post['data']);
        if (post['data'] >= highest) {
            console.log(''>='');
            console.log(post['data']);
            res.end(util.inspect(post['data']));
        }else{
            console.log(''<'');
            console.log(highest);
            res.end(util.inspect(highest));
        }
    })
}

function pub (res,req) {
    console.log('public~~~')
    var str = url.parse(req.url).pathname.match(/\/[a-zA-z0-9.-]+/g)['1']
    fs.readFile(path.join('pub',str), function (err, data) {
        if (err) {
            console.log(err);
            res.writeHead(404, {'Content-Type': 'text/html'});
        }else{
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data.toString());
        }
        res.end();
    })
}

exports.start = start
exports.deal = deal
exports.pub = pub

