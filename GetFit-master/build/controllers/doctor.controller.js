var mysql = require('../database/db');

module.exports.doctorLogin = function(req, res){
    console.log('Doctor Login');

    var email = req.params.dEmail;
    var password = req.params.password;
    console.log('Email is:: %s', email);
    console.log('Password is:: %s', password);
    query = "select * from doctor where dEmail = '" + email + "' and dPassword = '" + password + "'";

    mysql.fetchData(function (err, results) {
        if (err) {
            res.status(500)
                .json(err);
        }
        else if (results.length > 0) {
            res.status(200)
                .json(results);
        }
        else {
            res.status(204)
                .json(results);
        }
    }, query);
};

module.exports.doctorSignup = function(req, res){
    console.log("Inserting Doctor");
    
    var user = req.body;
    console.log("Doctor is: ", JSON.stringify(user));

    query = "insert into doctor (dEmail, dPassword, dFirst, dLast, dSpecialization, dAddress, dPhone) values(?,?,?,?,?,?,?)";

    var connection = mysql.getConnection();
    var sqlquery = connection.query(query, [user.email, user.password, user.firstname, user.lastname, user.specialization, user.address, user.phone], function (err, results) {
        if (err) {
            console.log(err);
            res
                .status(500)
                .json(err);
        } else {
            console.log(results);
            console.log("Doctor inserted into Doctor Table");
            res
                .status(201)
                .json(results);
        }
    });
    console.log("SQL Query:", sqlquery.sql);
    console.log("\nConnection closed");
    connection.end();
};

module.exports.todayAppointments = function(req, res){
    var email = req.params.dEmail;
   
    query = "select * from appointments where dEmail ='" + email + "' and date = date_sub(curdate(), interval 1 day) limit 5";

    mysql.fetchData(function (err, results) {
        if (err) {
            res.status(500)
                .json(err);
        }
        else if (results.length > 0) {
            res.status(200)
                .json(results);
        }
        else {
            res.status(204)
                .json(results);
        }
    }, query);
};


module.exports.upcomingAppointments = function(req, res){
    var email = req.params.dEmail;
   
    query = "select * from getfit.appointments where dEmail ='" + email + "' and date > date_sub(curdate(), interval 1 day) order by date asc limit 3";

    mysql.fetchData(function (err, results) {
        if (err) {
            res.status(500)
                .json(err);
        }
        else if (results.length > 0) {
            res.status(200)
                .json(results);
        }
        else {
            res.status(204)
                .json(results);
        }
    }, query);
};

module.exports.previousAppointments = function(req, res){
    var email = req.params.dEmail;
   
    query = "select * from getfit.appointments where dEmail ='" + email + "' and date < date_sub(curdate(), interval 1 day) order by date desc limit 3";

    mysql.fetchData(function (err, results) {
        if (err) {
            res.status(500)
                .json(err);
        }
        else if (results.length > 0) {
            res.status(200)
                .json(results);
        }
        else {
            res.status(204)
                .json(results);
        }
    }, query);
};

module.exports.currentAppointments = function(req, res){
    var email = req.params.email;
    var dEmail = req.params.dEmail;
   
    query = "SELECT * from getfit.appointments where date >= date_sub(curdate(), interval 1 day) and dEmail = '" + dEmail + "' and email = '" + email + "' order by 'date' limit 1";

    mysql.fetchData(function (err, results) {
        if (err) {
            res.status(500)
                .json(err);
        }
        else if (results.length > 0) {
            res.status(200)
                .json(results);
        }
        else {
            res.status(204)
                .json(results);
        }
    }, query);
};

module.exports.previousUserAppointments = function(req, res){
    var email = req.params.email;
    var dEmail = req.params.dEmail;
   
    query = "SELECT * FROM getfit.appointments where date < date_sub(curdate(), interval 1 day) and dEmail = '" + dEmail + "' and email = '" + email + "'";

    mysql.fetchData(function (err, results) {
        if (err) {
            res.status(500)
                .json(err);
        }
        else if (results.length > 0) {
            res.status(200)
                .json(results);
        }
        else {
            res.status(204)
                .json(results);
        }
    }, query);
};

module.exports.appointmentDetails = function(req, res){
    var email = req.params.email;
    var dEmail = req.params.dEmail;
    var aid = req.params.aid;

   
    query = "SELECT * FROM getfit.appointments where dEmail = '" + dEmail + "' and email = '" + email + "' and aid = '" + aid + "'";

    mysql.fetchData(function (err, results) {
        if (err) {
            res.status(500)
                .json(err);
        }
        else if (results.length > 0) {
            res.status(200)
                .json(results);
        }
        else {
            res.status(204)
                .json(results);
        }
    }, query);
};

module.exports.todayAppointmentsAll = function(req, res){
    var email = req.params.dEmail;
   
    query = "select * from appointments where date = date_sub(curdate(), interval 1 day) and dEmail ='" + email + "'";

    mysql.fetchData(function (err, results) {
        if (err) {
            res.status(500)
                .json(err);
        }
        else if (results.length > 0) {
            res.status(200)
                .json(results);
        }
        else {
            res.status(204)
                .json(results);
        }
    }, query);
};


module.exports.upcomingAppointmentsAll = function(req, res){
    var email = req.params.dEmail;
   
    query = "select * from getfit.appointments where dEmail ='" + email + "' and date > date_sub(curdate(), interval 1 day) order by date asc";

    mysql.fetchData(function (err, results) {
        if (err) {
            res.status(500)
                .json(err);
        }
        else if (results.length > 0) {
            res.status(200)
                .json(results);
        }
        else {
            res.status(204)
                .json(results);
        }
    }, query);
};

module.exports.previousAppointmentsAll = function(req, res){
    var email = req.params.dEmail;
   
    query = "select * from getfit.appointments where date < date_sub(curdate(), interval 1 day) and dEmail ='" + email + "' order by date desc";

    mysql.fetchData(function (err, results) {
        if (err) {
            res.status(500)
                .json(err);
        }
        else if (results.length > 0) {
            res.status(200)
                .json(results);
        }
        else {
            res.status(204)
                .json(results);
        }
    }, query);
};

module.exports.weeklyAppointments = function(req, res){
    var email = req.params.dEmail;
   
    query = "SELECT date, count(*) as num_of_appointments FROM getfit.appointments where dEmail = '" + email + "' and date > (DATE_SUB(CURDATE(), INTERVAL 3 day)) and date < (date_add(CURDATE(), INTERVAL 3 day)) group by date";

    mysql.fetchData(function (err, results) {
        if (err) {
            res.status(500)
                .json(err);
        }
        else if (results.length > 0) {
            res.status(200)
                .json(results);
        }
        else {
            res.status(204)
                .json(results);
        }
    }, query);
};

module.exports.allPatients = function(req, res){
    var email = req.params.dEmail;
   
    query = "select * from getfit.appointments where dEmail = '" + email + "' group by email";

    mysql.fetchData(function (err, results) {
        if (err) {
            res.status(500)
                .json(err);
        }
        else if (results.length > 0) {
            res.status(200)
                .json(results);
        }
        else {
            res.status(204)
                .json(results);
        }
    }, query);
};

module.exports.insertFeedback = function (req, res) {
    console.log("Inserting Feedback");
    
    var user = req.body;
    console.log("User is: ", JSON.stringify(user));

    query = "INSERT INTO doctor_feedback (aid, dEmail, dName, email, fname, dSteps, dCalories, dDistance, dActiveminutes, date, feedback) VALUES (?,?,?,?,?,?,?,?,?,?,?)";

    var connection = mysql.getConnection();
    var sqlquery = connection.query(query, [user.aid, user.dEmail, user.dName, user.email, user.fname, user.dSteps, user.dCalories, user.dDistance, user.dActiveminutes, user.date, user.feedback,], function (err, results) {
        if (err) {
            console.log(err);
            res
                .status(500)
                .json(err);
        } else {
            console.log(results);
            console.log("Doctor inserted feedback into doctor_feedback Table");
            res
                .status(201)
                .json(results);
        }
    });
    console.log("SQL Query:", sqlquery.sql);
    console.log("\nConnection closed");
    connection.end();
};

module.exports.doctorDetails = function(req, res){
    var dEmail = req.params.dEmail;
   
    query = "SELECT * FROM doctor where dEmail = '" + dEmail + "'";

    mysql.fetchData(function (err, results) {
        if (err) {
            res.status(500)
                .json(err);
        }
        else if (results.length > 0) {
            res.status(200)
                .json(results);
        }
        else {
            res.status(204)
                .json(results);
        }
    }, query);
};

module.exports.viewFeedback = function(req, res){
    var email = req.params.email;
   
    query = "SELECT * FROM doctor_feedback where email = '" + email + "'";

    mysql.fetchData(function (err, results) {
        if (err) {
            res.status(500)
                .json(err);
        }
        else if (results.length > 0) {
            res.status(200)
                .json(results);
        }
        else {
            res.status(204)
                .json(results);
        }
    }, query);
};

module.exports.allDoctors = function(req, res){
   
    query = "SELECT * FROM doctor";

    mysql.fetchData(function (err, results) {
        if (err) {
            res.status(500)
                .json(err);
        }
        else if (results.length > 0) {
            res.status(200)
                .json(results);
        }
        else {
            res.status(204)
                .json(results);
        }
    }, query);
};

module.exports.feedback = function(req, res){
    var aid = req.params.aid;
   
    query = "SELECT * FROM getfit.doctor_feedback where aid = '" + aid + "'";

    mysql.fetchData(function (err, results) {
        if (err) {
            res.status(500)
                .json(err);
        }
        else if (results.length > 0) {
            res.status(200)
                .json(results);
        }
        else {
            res.status(204)
                .json(results);
        }
    }, query);
};