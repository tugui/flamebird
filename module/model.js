var mongoose = require('mongoose');
// var options = {
//   server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
//   replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
// };
// var db = mongoose.createConnection('mongodb://localhost/test');

mongoose.connect('mongodb://127.0.0.1/test');
var db = mongoose.connection;

var birdSchema = mongoose.Schema({
    name : String,
    ip : String,
    height : Number,
    distance : Number
});
// methods must be added to the schema before compiling it with mongoose.model()
// birdSchema.methods.speak = function(){
//     var greeting = this.name
//     ? "Moew name is " + this.name
//     : "I don't have a name";
//     console.log(greeting);
// };

// compile our schema into a model/cannot overwrite `Bird` model once compiled/plus a 's' automatically
var Birds = mongoose.model('Bird',birdSchema);
// module.exports = mongoose.model('Bird', birdSchema);

db.on('error',console.error.bind(console,'connection error:'));

exports.find = function(ip){
    db.once('open',function(callback){
        var query = {ip : ip}; // 查询条件
        var fields = {name : 1, ip : 1, height : 1,distance : 1}; // 待返回的字段
        var options = {};

        // if (typeof Birds == 'undefined') {...}
        Birds.find(query,fields,options,function (err, result) {
            if (err) return console.error(err);
            console.log(result);
            // db.close();// cannot predict the time when there's no more invoking
        });

        // Birds.find({ name: /^fluff/ }, function(err,msg){
        //     if (err) return console.error(err);
        //     console.log(msg);
        //     db.close();
        // });
    });
}

exports.create = function(name,ip,height,distance){
    db.once('open',function(callback){

        // instantiate/create a document
        // var fluffy = new Birds({ name: 'fluffy' });
        // fluffy.save(function (err, fluffy) {
        //   if (err) return console.error(err);
        //   fluffy.speak();
        //   db.close();
        // });

        var new = {name : name,ip : ip,height : height ,distance : distance};
        // insert base on model
        Birds.create(new, function(error){
            if(error) {
                console.log(error);
            } else {
                console.log('save ok');
            }
            // db.close();// don't close connection before receiving results
        });
    });
}

export.update(ip,height,distance){
    db.once('open',function(callback){
        var conditions = {ip : ip};
        var update = {$set : {height : height, distance : distance}};
        var options = {upsert : true};
        Birds.update(conditions, update, options, function(error){
            if(error) {
                console.log(error);
            } else {
                console.log('update ok!');
            }
        });
    });
}

export.remove(ip){
    db.once('open',function(callback){
        var conditions = {ip : ip};
        Birds.remove(conditions, function(error){
            if(error) {
                console.log(error);
            } else {
                console.log('delete ok!');
            }
        });
    });
}
