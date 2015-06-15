/**
 * Created by songfei on 15/6/12.
 */
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

var routes = require('./routes/index');
var product = require('./routes/product');
var login = require('./routes/login');
var logout = require('./routes/logout');

app.set('views',path.join(__dirname,'views'));
app.set('view engine','hjs');
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var session = require('express-session');
var uuid = require('uuid');
//app.engine('html',require('hjs').__express);
app.use(session({
    secret: 'felixsung',
    resave:false,
    saveUninitialized:false,
    genid:function(req){
        return uuid.v4();
    },
    cookie:{
        maxAge: 1000*60*30
    }
}));

//日志过滤器
var fs = require('fs');
app.use(function(req,res,next){
    var user = req.session.user;
    if(user){
        var date = new Date();
        var path = __dirname + '/logs/' + date.getHours().toString() + (date.getMonth()+1).toString() + date.getDate().toString() + '.txt';
        var content = date.toLocaleString() + ":[UerName]" + user.userName + "\t[URL]" + req.originalUrl + "\n";
        fs.appendFile(path,content)
    }
    next();
})
app.use('/',routes);
app.use('/product',product);
app.use('/login',login);
app.use('/logout',logout);


app.use(function(err,req,res,next){
    res.status(404);
    res.render('error');
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message
    });
});

module.exports = app;