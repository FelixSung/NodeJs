/**
 * Created by songfei on 15/6/15.
 */

var express = require('express');
var router = express.Router();
var dbHelper = require('./../Lib/dbHelper');
var q = require('Q');

var userName,products;

router.get('/',function(req,res){
    getUser('admin').then(getOrderList).then(getProductList).then(function(data){
        res.render('order',{
            userName:userName,
            products:products
        });
    });
});

var getUser = function(name){
    var defered = q.defer();
    dbHelper.query("select top 1 * from Users where name = '"+name+"'",function(err,recordSet){
        if(!err && recordSet.length == 1){
            userName = recordSet[0].name;
            defered.resolve(recordSet[0].id);
        }else {
            console.log(err);
            defered.reject(err);
        }
    });
    return defered.promise;
}

var getOrderList = function(userId){
    var defered = q.defer();
    dbHelper.query("select * from orders where userId = " + userId,function(err,recordSet){
        if(!err) {
            var orderIds = "";
            for (var i = 0; i < recordSet.length; i++){
                orderIds += "'" + recordSet[i].productID + "',";
            }
            if(orderIds != "") orderIds = orderIds.substr(0,orderIds.length -1);
            defered.resolve(orderIds);
        }else {
            console.log(err)
            defered.reject(err);
        };
    })
    return defered.promise;
};

var getProductList = function(productIds){
    var defered = q.defer();
    dbHelper.query("select * from products where id in("+productIds+")",function(err,recordSet){
        if(!err) {
            products = recordSet;
            defered.resolve(recordSet);
        }else console.log(err);
    })
    return defered.promise;
};

module.exports = router;
