/**
 * Created by songfei on 15/6/15.
 */

var express = require('express');
var router = express.Router();

var orderBiz = require('./../biz/orderBiz');


var userName,products;

router.get('/',function(req,res){
    var name = 'admin';
    orderBiz.getUser(name).then(orderBiz.getOrderList).then(orderBiz.getProductList).then(function(data){
        res.render('order',{
            userName:name,
            products:data
        });
    });
});

module.exports = router;
