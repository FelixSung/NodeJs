/**
 * Created by songfei on 15/6/12.
 */
var http = require('http');
var app = require('../app');

http.createServer(app).listen(4000)
    .on('listening',function(){
    console.log('Server Running..');
});