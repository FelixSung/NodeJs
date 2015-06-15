/**
 * Created by songfei on 15/6/15.
 */
var express = require('express');
var router = express.Router();

/* GET login page. */
router.route('/').get(function(req,res){
    req.session.user = null;
    res.redirect('/');
});

module.exports = router;