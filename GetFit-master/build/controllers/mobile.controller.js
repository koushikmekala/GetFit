var mysql = require('../database/db');
module.exports.login = function(req, res){

    var email = req.params.email;
    var password = req.params.password;
      query = "select * from profile where email = '"+email+"' and password = '"+password+"'";

      mysql.fetchData(function(err, results){
           console.log(results.length);
          if(err){
              res.send({"status":500 , 'msg': 'Server Under Maintenance'});
          }
          else{
              req.session.mobile_email = email;
            if(results.length !== 0){  
          res.send({"status":200 , 'msg': 'Correct Login'});
          }
          else {
              res.send({"status":204 , 'msg': 'Incorrect Login'});
          }
          } 
      }, query);
};

module.exports.goals = function(req, res){
    console.log("In goals api");
    var email = req.params.email;
    query = "select * from goals where email='"+ email +"'";

    mysql.fetchData(function (err, results) {
        if (err) {
            res.status(500)
                .json(err);
        }
        else if (results.length > 0) {
            console.log(results[0]);
            res.send(results[0]);
            //res.status(200)
              //  .json(results);
        }
        else {
            res.status(204)
                .json(results);
        }
    }, query);
};

module.exports.activity = function(req, res){
    console.log("In activity api");
    var email = req.params.email;
    query = "select * from fitbit where email='"+ email +"'";

    mysql.fetchData(function (err, results) {
        if (err) {
            res.status(500)
                .json(err);
        }
        else if (results.length > 0) {
            console.log(results[0]);
            res.send(results[0]);
            //res.status(200)
              //  .json(results);
        }
        else {
            res.status(204)
                .json(results);
        }
    }, query);
};

module.exports.profile = function(req, res){
    console.log("In profile api");
    var email = req.params.email;
    query = "select * from profile where email='"+ email +"'";

    mysql.fetchData(function (err, results) {
        if (err) {
            res.status(500)
                .json(err);
        }
        else if (results.length > 0) {
            console.log(results[0]);
            res.send(results[0]);
            //res.status(200)
              //  .json(results);
        }
        else {
            res.status(204)
                .json(results);
        }
    }, query);
};

module.exports.access = function(req, res){
    console.log("In user_access api");
    query = "select userid,access_token from user_access where email='"+ req.session.mobile_email +"'";

    mysql.fetchData(function (err, results) {
        if (err) {
            res.status(500)
                .json(err);
        }
        else if (results.length > 0) {
            req.session.access_token = results[0].access_token;
            console.log(results[0]);
            res.send(results[0]);
            //res.status(200)
              //  .json(results);
        }
        else {
            res.status(204)
                .json(results);
        }
    }, query);
};