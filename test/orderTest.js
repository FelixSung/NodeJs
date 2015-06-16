/**
 * Created by songfei on 15/6/16.
 */

var should = require('should');
var biz = require('./../biz/orderBiz');

describe('Test Order Biz', function () {

    describe('Test GetUser Function',function(){
        it('result should is 1',function(){
             return biz.getUser('admin').then(function(data){
                 data.should.eql(2);
            });
        });
    });

    describe('Test getOrderList Function',function(){
        it('result is string',function(){
            return biz.getOrderList(1).then(function(data){
                data.should.be.type('string');
            });
        });
    });

    describe('Test getProductList Function',function(){
        it('result is not error',function(){
            return biz.getProductList('150,151').then(function(data){
                should(data).ok;
            });
        });
    });

});