var mssql = require('mssql');

//Create Connection Config
var config = {
    user: 'sa',
    password: 'sql@123',
    server: '192.168.2.199', // You can use 'localhost\\instance' to connect to named instance
    database: 'testing',
    options: {
        encrypt: false // Use this if you're on Windows Azure
    }
};

exports.query = function(sql,callback){
    var connection = new mssql.Connection(config,function(err){
        if(!err)
        {
            var request = new mssql.Request(connection);
            //console.log(sql);
            request.query(sql,callback);
        }
        else
            console.log(err);
    });
};
