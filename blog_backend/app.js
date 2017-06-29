var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.get('/', function(req, res){
    res.send('Hello World');
});
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json()); 

var db=mongoose.connection;
db.on('error',console.error);
db.once('open',function(){
    console.log('connected to mongod server');
});

//connect to mongodb server
var config =require('./config.js');
mongoose.connect(config.mongoAuth);

//define model
var Book=require('./model/book');

var port = process.env.PORT || 4000;

var router = require('./routes')(app,Book)
var server=app.listen(port,function(){
    console.log("Express server has started on port " + port)
});
