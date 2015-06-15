/**
 * Created by songfei on 15/6/15.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: '首页',
        userName: req.session.user ? req.session.user.userName : '',
        hasLogin: req.session.user,
        noLogin:!req.session.user
    });
});

module.exports = router;
