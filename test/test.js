var should = require('should');
var dbHelper = require('./../biz/dbHelper');

var getArray = function(){
    return [1,2];
};

var getString = function(){
    return "Hello";
};

//describe('Test Array',function(){
//   it('should return 2',function(){
//       getArray().should.have.length(2);
//   }) ;
//    it('Assert Boolean',function(){
//        should(true).ok;
//    }) ;
//});
//
//describe('Test String Functions',function(){
//    it('Should begin with H',function(){
//       getString().should.startWith('H');
//    });
//});

describe('Test DbHelper Functions', function () {
    var sql1 = "select * from Users";
    var sql2 = "select * from Users where name='admin'";
    it('Should has more values',function(done){
        dbHelper.query(sql1,function(err,recordSet){
            if(err) throw err;
            should(recordSet).ok;
            done();
        });
    });
    it('Should has one value',function(done){
        dbHelper.query(sql2,function(err,recordSet){
            if(err) throw err;
            recordSet.length.should.eql(1);
            done();
        });
    });
})