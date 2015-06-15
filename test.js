/**
 * Created by songfei on 15/6/15.
 */

var _callback = function(message){
    console.log(message + ' End');
};

var step1 = function(callback){
    console.log('Step 1 Start');
    setTimeout(function(){
        callback('Step 1');
        //eventEmitter.emit('Step1End');

    },3000);
};



var step2 = function(callback){
    console.log('Step 2 Start');
    setTimeout(function(){
        callback('Step 2');
        //eventEmitter.emit('Step2End');
    },2000);
};

var step3 = function(callback){
    console.log('Step 3 Start');
    setTimeout(function(){
        callback('Step 3');
    },1000);
};

//step1(_callback)

/**
var events = require('events');
var eventEmitter  = new events.EventEmitter();

eventEmitter.on('Step1End',function(){
    console.log('Event Step 1 End!');
    step2(_callback);
})
eventEmitter.on('Step2End',function(){
    console.log('Event Step 2 End!');
    step3(_callback);
})
 */

//Promise

var Q = require('Q');
Q().fcall(function(){
   step1(_callback);
}).then(function(){
    step2(_callback);
}).then(function(){
    step3(_callback);
});