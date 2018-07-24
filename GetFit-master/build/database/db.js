var mysql = require('mysql');
var config = require('../config');

function getConnection(){
    var connection = mysql.createConnection({
        host : config.sqldb.host,
        user : config.sqldb.user,
        password : config.sqldb.password,
        database : config.sqldb.database
    });
    return connection;
};

module.exports.fetchData = function(callback, sqlQuery){
    console.log("\nSql Query: ", sqlQuery);
    var connection = getConnection();

    connection.query(sqlQuery, function(err, rows, fields){
        if(err){
            callback(err);
        }
        else{
            console.log(rows);
            callback(err,rows);
        }
    });
    connection.end();
}

module.exports.getConnection = getConnection;