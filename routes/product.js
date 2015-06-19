/**
 * Created by songfei on 15/6/15.
 */
var express = require('express');
var router = express.Router();

var dbHelper = require('./dbHelper');

/* GET product page. */
router.get('/', function(req, res) {
    res.render('product', {
        title: '产品'
    });
});
router.get('/list',function(req,res){
    dbHelper.query('select * from products',function(err,recordSet){
        if(!err)
            res.json({isSuccess:true, data: recordSet});
        else
            res.json({isSuccess:false, errMsg:err.originalError});
    });
});
router.post('/save',function(req,res){
    if(req.body.id){
        dbHelper.query("update products set name='"+req.body.name+"',image='"+req.body.image+"',des='"+req.body.des+"' where id=" +req.body.id,function(err,recordSet){
            if(!err)
                res.send(true);
            else {
                res.send(false);
                console.log(err);
            }
        });
    }
    else{
        dbHelper.query("insert into products(name,image,des) values('"+req.body.name+"','"+req.body.image+"','"+req.body.des+"')",function(err,recordSet){
            if(!err)
                res.send(true);
            else {
                res.send(false);
                console.log(err);
            }
        });
    }
});
router.post('/delete',function(req,res){
    dbHelper.query('delete from products where id=' + req.body.id,function(err,recordSet){
        console.log("delete:" + recordSet);
        if(!err)
            res.send(true);
    });
});

module.exports = router;
