/**
 * Created by songfei on 15/6/16.
 */

var q = require('Q');
var dbHelper = require('./../Lib/dbHelper');

exports.getUser = function(name){
    var defered = q.defer();
    dbHelper.query("select top 1 * from Users where name = '"+name+"'",function(err,recordSet){
        if(!err && recordSet.length == 1){
            defered.resolve(recordSet[0].id);
        }else {
            console.log(err);
            defered.reject(err);
        }
    });
    return defered.promise;
}

exports.getOrderList = function(userId){
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

exports.getProductList = function(productIds){
    var defered = q.defer();
    dbHelper.query("select * from products where id in("+productIds+")",function(err,recordSet){
        if(!err) {
            defered.resolve(recordSet);
        }else console.log(err);
    })
    return defered.promise;
};
