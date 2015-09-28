var http = require('http')
var url = require('url')
var querystring = require('querystring')

function start(route,handle){
    http.createServer(function (req,res) {//核心API，创建Server实例(对象)
        var postData = ""
        var pathname = url.parse(req.url).pathname;
        var string = pathname.match(/\/[a-zA-z0-9.-]+/g)
        if(string['0'] == '/pub') {
            pathname = string['0']
        }

        // console.log(string)
        console.log('request for ' + pathname + ' received.');

        route(handle,pathname,res,req);

    })
    .listen(2015)
    console.log('server has started.');
}

exports.start = start;
