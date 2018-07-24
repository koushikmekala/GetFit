var mysql = require('../database/db');
var https = require('https');
var finalResponse = "";

module.exports.login = function (req, res) {
    console.log('User Login');

    var email = req.params.email;
    var password = req.params.password;
    req.session.email = email;
    console.log('Email is:: %s', email);
    console.log('Password is:: %s', password);
    query = "select * from profile where email = '" + email + "' and password = '" + password + "'";

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


module.exports.insertUser = function (req, res) {
    console.log("Inserting user");

    var user = req.body;
    req.session.email = user.email;
    console.log("User is: ", JSON.stringify(user));

    query = "insert into profile (fname, lname, phone, email, password) values(?,?,?,?,?)";

    var connection = mysql.getConnection();
    var sqlquery = connection.query(query, [user.firstname, user.lastname, user.phone, user.email, user.password], function (err, results) {
        if (err) {
            console.log(err);
            res
                .status(500)
                .json(err);
        } else {
            console.log(results);
            console.log("User inserted into User Table");
            res
                .status(201)
                .json(results);
        }
    });
    console.log("SQL Query:", sqlquery.sql);
    console.log("\nConnection closed");
    connection.end();
};


module.exports.getProfile = function (req, res) {
    console.log('Get user profile');

    var email = req.params.email;

    query = "select * from profile where email = '" + email + "'";

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


module.exports.updateProfile = function (req, res) {                 //Inserting Activity data into Fitbit table in DB
    console.log("Updating profile with Fitbit data");

    var profile = req.body;
    console.log("User is: ", JSON.stringify(profile));

    query = "update profile SET dob = ?, age = ?, gender = ?, weight = ?, height = ?, averageSteps = ?, badge1Des = ?, badge1Img = ?, badge2Des = ?, badge2Img = ?, userId = ? where email = ?";

    var connection = mysql.getConnection();
    var sqlquery = connection.query(query, [profile.dob, profile.age, profile.gender, profile.weight, profile.height, profile.averageSteps, profile.badge1Des,
    profile.badge1Img, profile.badge2Des, profile.badge2Img, profile.userId, profile.email], function (err, results) {
        if (err) {
            console.log(err);
            res
                .status(500)
                .json(err);
        } else {
            res
                .status(201)
                .json(results);
        }
    });
    connection.end();

};


module.exports.getFitbit = function (req, res) {              //Getting daily fitbit data from Fibit table in DB
    console.log("Getting Fibit data from DB, getFitbit");

    var email = req.params.email;

    query = "select * from fitbit where email = '" + email + "'";

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

module.exports.insertFitbit = function (req, res) {                 //Inserting Activity data into Fitbit table in DB
    console.log("Inserting Fitbit");

    var fitbit = req.body;
    console.log("User is: ", JSON.stringify(fitbit));

    query = "insert into fitbit (steps, calories, distance, activeminutes, email) values(?,?,?,?,?)";

    var connection = mysql.getConnection();
    var sqlquery = connection.query(query, [fitbit.steps, fitbit.calories, fitbit.distance, fitbit.activeminutes, fitbit.email], function (err, results) {
        if (err) {
            console.log(err);
            res
                .status(500)
                .json(err);
        } else {
            res
                .status(201)
                .json(results);
        }
    });
    connection.end();

};



module.exports.updateFitbit = function (req, res) {                 //Updating Activity data into Fitbit table in DB
    console.log("Updating Fitbit");

    var fitbit = req.body;
    console.log("User is: ", JSON.stringify(fitbit));

    query = "update fitbit SET steps = ?, calories = ?, distance = ?, activeminutes = ? where email = ?";

    var connection = mysql.getConnection();
    var sqlquery = connection.query(query, [fitbit.steps, fitbit.calories, fitbit.distance, fitbit.activeminutes, fitbit.email], function (err, results) {
        if (err) {
            console.log(err);
            res
                .status(500)
                .json(err);
        } else {
            res
                .status(201)
                .json(results);
        }
    });
    connection.end();

};

module.exports.userData = function (req, res) {                 //Updating Activity data into Fitbit table in DB
    console.log("User Data Post to database");

    var userdata = req.body;
    console.log("User is: ", JSON.stringify(userdata));
    console.log(req.session.email);
    query = "insert into healthdata (age, gender, chest_pain_type, email, resting_bp, blood_sugar, ecg, max_heart_rate, induced_angina, cholestrol) values(?,?,?,?,?,?,?,?,?,?)";

    var connection = mysql.getConnection();
    var sqlquery = connection.query(query, [userdata.age, userdata.gender, userdata.chestpaintype, req.session.email, userdata.restingbloodpressure, userdata.fastingbloossugar, userdata.ecg, userdata.maxheartrate, userdata.inducedangina, userdata.serumcholestrol], function (err, results) {
        if (err) {
            console.log(err);
            res
                .status(500)
                .json(err);
        } else {
            console.log(results);
            console.log("User inserted into User Table");
            res
                .status(201)
                .json(results);
        }
    });
    console.log("SQL Query:", sqlquery.sql);
    console.log("\nConnection closed");
    connection.end();
};



module.exports.userPresent = function (req, res) {
    var email = req.params.email;
    var table = req.params.table;
    console.log("In present");
    query = "select * from " + table + " where email = '" + email + "'";

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


module.exports.saveFitbit = function (req, res) {
    var email = req.params.email;
    console.log("Email from saveFitbit:", email);

    query = "select * from user_access where email = '" + email + "'";

    mysql.fetchData(function (err, results) {
        console.log("from save fitbit mysql fetch", results[0]);
        if (err) {
            res.status(500)
                .json(err);
        }
        else if (results.length > 0) {
            req.session.access_token = results[0].access_token;
            req.session.refresh_token = results[0].refresh_token;
            console.log("results from save fitbit elseif:", results[0]);
            res.status(200)
                .json(results);
        }
        else {
            res.status(204)
                .json(results);
        }
    }, query);
    console.log("Save Fitbit Access Token:", req.session.access_token);


};

module.exports.goals = function (req, res) {
    console.log("In goals api");
    var email = req.params.email;
    query = "select * from goals where email='" + email + "'";

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

module.exports.health = function (req, res) {
    console.log("In health api");
    var email = req.params.email;
    query = "select * from healthdata where email='" + email + "'";

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

module.exports.bookAppointment = function (req, res) {
    console.log("Inserting Feedback");

    var user = req.body;
    console.log("User is: ", JSON.stringify(user));

    query = "INSERT INTO appointments (dEmail, email, reason, date, stroke, currentMedicine, allergies, fullname, dFullname) VALUES (?,?,?,?,?,?,?,?,?)";

    var connection = mysql.getConnection();
    var sqlquery = connection.query(query, [user.dEmail, user.email, user.reason, user.date, user.stroke, user.currentMedicine, user.allergies, user.fullname, user.dFullname], function (err, results) {
        if (err) {
            console.log(err);
            res
                .status(500)
                .json(err);
        } else {
            console.log(results);
            console.log("Appointment inserted into apppointments Table");
            res
                .status(201)
                .json(results);
        }
    });
    console.log("SQL Query:", sqlquery.sql);
    console.log("\nConnection closed");
    connection.end();
};

module.exports.allAppointments = function (req, res) {
    //  console.log("In health api");
    var email = req.params.email;
    query = "select * from appointments where email='" + email + "' order by date asc";

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

module.exports.appointmentDetails = function (req, res) {
    console.log("In appointmentDetails api");
    var aid = req.params.aid;
    query = "SELECT * FROM appointments where aid = '" + aid + "'";

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

module.exports.updateGoals = function (req, res) {
    console.log("Updating Goaqls");

    var uGoals = req.body;
    console.log("User is: ", JSON.stringify(uGoals));

    query = "UPDATE goals SET goals_steps = ?, goals_calories = ?, goals_distance= ?, goals_activeminutes = ? WHERE email = ?";

    var connection = mysql.getConnection();
    var sqlquery = connection.query(query, [uGoals.goals_steps, uGoals.goals_calories, uGoals.goals_distance, uGoals.goals_activeminutes, uGoals.email], function (err, results) {
        if (err) {
            console.log(err);
            res
                .status(500)
                .json(err);
        } else {
            res
                .status(201)
                .json(results);
        }
    });
    connection.end();

};


module.exports.insertGoals = function (req, res) {
    console.log("Inserting goals");
    
    var uGoals = req.body;
    console.log("Goals are: ", JSON.stringify(uGoals));

    query = "insert into goals (goals_steps, goals_calories, goals_distance, goals_activeminutes, email) values(?,?,?,?,?)";

    var connection = mysql.getConnection();
    var sqlquery = connection.query(query, [uGoals.goals_steps, uGoals.goals_calories, uGoals.goals_distance, uGoals.goals_activeminutes, uGoals.email], function (err, results) {
        if (err) {
            console.log(err);
            res
                .status(500)
                .json(err);
        } else {
            console.log(results);
            console.log("Goals inserted into Goals Table");
            res
                .status(201)
                .json(results);
        }
    });
    console.log("SQL Query:", sqlquery.sql);
    console.log("\nConnection closed");
    connection.end();
};

module.exports.updateHealth = function (req, res) {    
    console.log("Updating Health");

    var uHealth = req.body;
    console.log("Health Data is: ", JSON.stringify(uHealth));

    query = "UPDATE healthdata SET age = ?, gender = ?, chest_pain_type = ?, resting_bp = ?, blood_sugar = ?, ecg = ?, max_heart_rate = ?, induced_angina = ?, cholestrol = ? WHERE email = ?";

    var connection = mysql.getConnection();
    var sqlquery = connection.query(query, [uHealth.age, uHealth.gender, uHealth.chest_pain_type, uHealth.resting_bp, uHealth.blood_sugar, uHealth.ecg, uHealth.max_heart_rate, uHealth.induced_angina, uHealth.cholestrol, uHealth.email], function (err, results) {
        if (err) {
            console.log(err);
            res
                .status(500)
                .json(err);
        } else {
            res
                .status(201)
                .json(results);
        }
    });
    connection.end();

};


module.exports.giveGoals = function (req, res) {
    console.log("In predefined goals api");
    var per = req.params.per;

    if (per <= 10) {
        query = "SELECT * FROM predefined_goals WHERE category <='10'";

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
    }

    else if (per > 10 && per <= 20) {
        query = "SELECT * FROM predefined_goals WHERE category >'10' and category <='20'";

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
    }

    else if (per > 20 && per <= 30) {
        query = "SELECT * FROM predefined_goals WHERE category >'20' and category <='30'";

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
    }

    else if (per > 30 && per <= 40) {
        query = "SELECT * FROM predefined_goals WHERE category >'30' and category <='40'";

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
    }

    if (per > 40 && per <= 50) {
        query = "SELECT * FROM predefined_goals WHERE category >'40' and category <='50'";

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
    }

    else if (per > 50 && per <= 60) {
        query = "SELECT * FROM predefined_goals WHERE category >'50' and category <='60'";

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
    }

    else if (per > 60 && per <= 70) {
        query = "SELECT * FROM predefined_goals WHERE category >'60' and category <='70'";

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
    }

    else if (per > 70 && per <= 80) {
        query = "SELECT * FROM predefined_goals WHERE category >'70' and category <='80'";

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
    }

    else if (per > 80 && per <= 90) {
        query = "SELECT * FROM predefined_goals WHERE category >'80' and category <='90'";

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
    }

    else if (per > 90 && per <= 100) {
        query = "SELECT * FROM predefined_goals WHERE category >'90' and category <='100'";

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
    }

};

module.exports.checkFitbit = function (req, res) {
    var access_token = req.session.access_token;
    var refresh_token = req.session.refresh_token;
    var email = req.session.email;


    console.log("CheckFitbit Email:", email);
    console.log("CheckFitbit access_token:", access_token);
    console.log("CheckFitbit refresh_token:", refresh_token);
};

module.exports.prediction = function (req, response) {
    var email = req.params.email;
    var age, gender, chest_pain_type, resting_bp, cholestrol, fastingbloodsugar, ecg, max_heart_rate, induced_angina;
    console.log("In prediction");
    query = "select * from healthdata where email='" + email + "'";

    mysql.fetchData(function (err, results) {
        if (err) {
            response.status(500)
                .json(err);
        }
        else if (results.length > 0) {
            response.status(200)
            age = results[0].age;
            chest_pain_type = results[0].chest_pain_type;
            resting_bp = results[0].resting_bp;
            fastingbloodsugar = results[0].blood_sugar;
            ecg = results[0].ecg;
            max_heart_rate = results[0].max_heart_rate;
            induced_angina = results[0].induced_angina;
            cholestrol = results[0].cholestrol;
            if (results[0].gender === "female" || results[0].gender === "Female") {
                gender = "0";
            }
            else if (results[0].gender === "male" || results[0].gender === "Male") {
                gender = "1";
            }
            var data = {
                "Inputs": {
                    "input1":
                    {
                        "ColumnNames": ["Age", "Gender", "Chest Pain Type", "Resting BP", "Serum Cholestrol", "Fasting Blood Pressure", "ECG", "Max Heart Rate", "ST Depression"],
                        "Values": [[age, gender, chest_pain_type, resting_bp, cholestrol, fastingbloodsugar, ecg, max_heart_rate, induced_angina]]
                    },
                },
                "GlobalParameters": {
                }

            };
            var dataString = JSON.stringify(data);

            var options = {

                host: 'ussouthcentral.services.azureml.net',

                port: 443,

                path: '/workspaces/8671b8e183d84ca58badf842d26ccdc6/services/8cde3573ca814c89967265a80c84cbd9/execute?api-version=2.0',

                method: 'POST',

                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer dife/8sDvPX//LqLZI+mmy+Zfy9Kb+AL2Cs6FpexF1VYO2QI7V9Fc9GNprks4gssfcxPecDMGGZUBlfIYQkznA==' }

            };
            var reqPost = https.request(options, function (res) {
                res.on('data', function (d) {
                    finalResponse = d;
                    // process.stdout.write(d);
                    var string = finalResponse.toString();
                    response.send({ Results: string });
                });
            });
            reqPost.write(dataString);
            reqPost.end();
            reqPost.on('error', function (e) {
                console.error(e);
            });
        }
        else {
            response.status(204)
                .json(results);
        }
    }, query);

};