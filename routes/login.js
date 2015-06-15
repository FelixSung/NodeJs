/**
 * Created by songfei on 15/6/15.
 */
var express = require('express');
var router = express.Router();

var dbHelper = require('../lib/dbHelper');

router.route('/').get(function(req,res){
    res.render('login', { title: '登录' });
}).post(function(req,res){
    dbHelper.query("select top 1 id,name from Users where name='"+req.body.userName+"' and password='"+req.body.password+"'",function(err,recordSet){
        if(!err){
            if(recordSet.length == 0){
                res.json({isSuccess:false,errMsg: '用户名或密码错误！'});
            }else{
                var user = recordSet[0];
                req.session.user = {id:user.id,userName:user.name};
                res.json({isSuccess:true,data:req.session.user});
            }
        }
        else {
            res.json({isSuccess:false,errMsg: err.message});
        }
    });
});

module.exports = router;
