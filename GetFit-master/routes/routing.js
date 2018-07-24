var FitbitApiClient = require("fitbit-node"),
    client = new FitbitApiClient("22893R", "0fa4e84dbba161062c5770e22ba5f727");

var userCtrl = require('../build/controllers/user.controller');
var doctorCtrl = require('../build/controllers/doctor.controller');
var mobileCtrl = require('../build/controllers/mobile.controller.js');

var http = require('http');
var twilio = require('twilio');
var schedule = require('node-schedule');
var mysql = require('../build/database/db');
module.exports = function (app) {


    app.get('/api/user/login/:email/:password', userCtrl.login);

    app.post('/api/user/insertUser', userCtrl.insertUser);

    app.get('/api/user/profile/:email', userCtrl.getProfile);

    app.post('/api/user/updateProfile', userCtrl.updateProfile);

    app.get('/api/user/fitbit/:email', userCtrl.getFitbit);

    app.post('/api/user/userData', userCtrl.userData);

    app.post('/api/user/insertFitbit', userCtrl.insertFitbit);

    app.post('/api/user/updateFitbit', userCtrl.updateFitbit);

    app.get('/api/user/present/:table/:email', userCtrl.userPresent);

    app.get('/api/user/goals/:email', userCtrl.goals);

    app.get('/api/user/health/:email', userCtrl.health);

    app.post('/api/user/appointment', userCtrl.bookAppointment);

    app.get('/api/user/allAppointments/:email', userCtrl.allAppointments);

    app.get('/api/user/appointmentDetails/:aid', userCtrl.appointmentDetails);

    app.post('/api/user/updateGoals', userCtrl.updateGoals);

    app.post('/api/user/insertGoals', userCtrl.insertGoals);

    app.post('/api/user/updateHealth', userCtrl.updateHealth);

    app.get('/api/user/predefined/giveGoals/:per', userCtrl.giveGoals);

    app.get('/api/user/prediction/:email', userCtrl.prediction);


    app.get("/authorize", function (req, res) {
        res.redirect(client.getAuthorizeUrl('activity heartrate location nutrition profile settings sleep social weight', 'http://ec2-52-36-212-41.us-west-2.compute.amazonaws.com:8080/callback'));
    });

    app.get("/callback", function (req, res) {
        // exchange the authorization code we just received for an access token
        client.getAccessToken(req.query.code, 'http://ec2-52-36-212-41.us-west-2.compute.amazonaws.com:8080/callback').then(function (result) {

            query = "insert into user_access (userid, access_token, email, refresh_token) values(?,?,?,?)";
            console.log("Starting the insert query");
            console.log("UserId: ", result.user_id, "AccessToken: ", result.access_token);
            console.log("Refresh token: ", result.refresh_token);

            var connection = mysql.getConnection();

            var sqlquery = connection.query(query, [result.user_id, result.access_token, req.session.email, result.refresh_token], function (err, results) {
                if (err) {
                    console.log(err);
                    res
                        .status(500)
                        .json(err);
                } else {
                    console.log("User inserted into fitbitAccess Table");
                    res
                        .redirect("/login");
                }
            });
            console.log("SQL Query:", sqlquery.sql);
            connection.end();



            // use the access token to fetch the user's profile information
            // client.get("/profile.json", result.access_token).then(function (results) {
            //     console.log("In Callback function",req.session.email);
            //     res.send(results[0]);
            // });
        }).catch(function (error) {
            res.send(error);
        });
    });

    app.get('/fitbit/save/:email', userCtrl.saveFitbit);
    app.get('/fitbit/check', userCtrl.checkFitbit);


    app.get('/fitbit/profile', function (req, res) {
        client.get("/profile.json", req.session.access_token).then(function (results) {
            res.send(results[0]);
        });

    });



    app.get('/fitbit/activity/:date', function (req, res) {

        client.get("/activities/date/" + req.params.date + ".json", req.session.access_token).then(function (results) {
            console.log(results[0]);
            res.send(results[0]);
        });

    });

    app.get('/fitbit/activities/:activity/:date', function (req, res) {
        client.get("/activities/" + req.params.activity + "/date/" + req.params.date + "/7d.json", req.session.access_token).then(function (results) {
            console.log(results[0]);
            res.send(results[0]);
        });
    });

    app.get('/fitbit/heartrate', function (req, res) {
        client.get("/activities/heart/date/today/1d.json", req.session.access_token).then(function (results) {
            console.log(results[0]);
            res.send(results[0]);
        });
    });







    //Mobile Api'save

    app.get('/users/mobile/login/:email/:password', mobileCtrl.login);

    app.get('/users/mobile/goals/:email', mobileCtrl.goals);

    app.get('/users/mobile/activity/:email', mobileCtrl.activity);

    app.get('/users/mobile/profile/:email', mobileCtrl.profile);

    app.get('/users/mobile/access/:email', mobileCtrl.access);

    app.get('/fitbit/activityWeek', function (req, res) {

        console.log(req.session.access_token);
        client.get("/activities/steps/date/today/7d.json", req.session.access_token).then(function (results) {
            res.send(results[0]);
        });

    });

    app.get('/fitbit/activityWeek1', function (req, res) {

        client.get("/activities/calories/date/today/7d.json", req.session.access_token).then(function (results) {
            res.send(results[0]);
        });

    });


    // Doctor API

    app.get('/api/doctor/login/:dEmail/:password', doctorCtrl.doctorLogin);

    app.post('/api/doctor/insertDoctor', doctorCtrl.doctorSignup);

    app.get('/api/doctor/todayAppointments/:dEmail', doctorCtrl.todayAppointments);

    app.get('/api/doctor/upcomingAppointments/:dEmail', doctorCtrl.upcomingAppointments);

    app.get('/api/doctor/previousAppointments/:dEmail', doctorCtrl.previousAppointments);

    app.get('/api/doctor/user/currentAppointments/:email/:dEmail', doctorCtrl.currentAppointments);

    app.get('/api/doctor/user/previousAppointments/:email/:dEmail', doctorCtrl.previousUserAppointments);

    app.get('/api/doctor/user/appointmentDetails/:email/:dEmail/:aid', doctorCtrl.appointmentDetails);

    app.get('/api/doctor/todayAppointmentsAll/:dEmail', doctorCtrl.todayAppointmentsAll);

    app.get('/api/doctor/upcomingAppointmentsAll/:dEmail', doctorCtrl.upcomingAppointmentsAll);

    app.get('/api/doctor/previousAppointmentsAll/:dEmail', doctorCtrl.previousAppointmentsAll);

    app.get('/api/doctor/weeklyAppointments/:dEmail', doctorCtrl.weeklyAppointments);

    app.get('/api/doctor/allPatients/:dEmail', doctorCtrl.allPatients);

    app.post('/api/doctor/insertFeedback', doctorCtrl.insertFeedback);

    app.get('/api/doctor/details/:dEmail', doctorCtrl.doctorDetails);

    app.get('/api/doctor/user/viewFeedback/:email', doctorCtrl.viewFeedback);

    app.get('/api/doctor/allDoctors', doctorCtrl.allDoctors);

    app.get('/api/doctor/feedback/:aid', doctorCtrl.feedback);


    //Twilio and Node Mailer
    var j = schedule.scheduleJob({ hour: 20, minute: 00, dayOfWeek: [0, 1, 2, 3, 4, 5, 6] }, function () {
        console.log('Time is 8 pm');

        var accountSid = 'AC86ac60a9d623d75ec3689faef50fe557'; // Your Account SID from www.twilio.com/console
        var authToken = ' badd7f3c410fee941eca09b4a0e841c9';  // Your Auth Token from www.twilio.com/console
        var client = require('twilio')(accountSid, authToken);

        query = "select * from fitbit where email='prasanna.doddapaneni@gmail.com'";

        mysql.fetchData(function (err, results) {
            if (err) {
                res.status(500)
                    .json(err);
            }
            else if (results.length > 0) {
                var steps = results[0].steps;
                var calories = results[0].calories;
                var distance = results[0].distance;
                var activeminutes = results[0].activeminutes;
                client.messages.create({
                    body: "Good Evening, Your detailed summary is here: Steps = '" + steps + "' Calories = '" + calories + "' Distance = '" + distance + "' Active Minutes = '" + activeminutes + "' Thanks for joining us. Get Fit tomorrow again. Good Night ! Buhbye !!",
                    to: '+16693503406',  // Text this number
                    from: '+13203320575' // From a valid Twilio number
                }, function (err, message) {
                    if (err) {
                        console.error(err.message);
                    }

                    console.log(message.sid);
                })

            }
            else {
                res.status(204)
                    .json(results);
            }
        }, query);

    });

    var j = schedule.scheduleJob({ hour: 20, minute: 05, dayOfWeek: [0, 1, 2, 3, 4, 5, 6] }, function () {
        console.log('Time is 8 05 pm');

        query = "select * from fitbit where email='prasanna.doddapaneni@gmail.com'";

        mysql.fetchData(function (err, results) {
            if (err) {
                res.status(500)
                    .json(err);
            }
            else if (results.length > 0) {
                var steps = results[0].steps;
                var calories = results[0].calories;
                var distance = results[0].distance;
                var activeminutes = results[0].activeminutes;
                var nodemailer = require("nodemailer");
                var smtpTransport = require('nodemailer-smtp-transport');
                var smtpransport = nodemailer.createTransport(smtpTransport({

                    service: "gmail",  // sets automatically host, port and connection security settings

                    auth: {

                        user: "roopeeshreddy@gmail.com",

                        pass: "srinadh1994"

                    }

                }));



                smtpransport.sendMail({  //email options

                    from: "Roopesh Reddy <roopeeshreddy@gmail.com>", // sender address.  Must be the same as authenticated user if using Gmail.

                    to: "Prasanna Doddapaneni<sankethdoddapaneni@gmail.com>", // receiver

                    subject: "Get Fit Notification - Today Summary", // subject

                    text: "Good Evening, Your detailed summary is here: Steps = '" + steps + "' Calories = '" + calories + "' Distance = '" + distance + "' Active Minutes = '" + activeminutes + "' Thanks for joining us. Get Fit tomorrow again. Good Night ! Buhbye !!" // body

                }, function (error, response) {  //callback

                    if (error) {

                        console.log(error);

                    } else {

                        console.log("Message sent: " + response.message);

                    }



                    // smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.

                });


            }
            else {
                res.status(204)
                    .json(results);
            }
        }, query);


    });



};