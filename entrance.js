var server = require("./module/http")
var router = require("./module/router")
var requestHandler = require("./module/requestHandler")

var handle = {}
handle["/"] = requestHandler.start
handle["/start"] = requestHandler.start
handle["/deal"] = requestHandler.deal
handle["/pub"] = requestHandler.pub

server.start(router.route,handle)
