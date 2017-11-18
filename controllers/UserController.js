function usersController() {

    var that = this;
    var users = require('../models/usersSchema');
    var response = require('./ServiceResponse');
    var bcrypt = require('bcrypt');
    var mongoose = require('../db').mongoose;


    // Login
    that.login = function (req, res, next) {
        var email = req.params.email;
        var password = req.params.password;
        console.log("EMail " + email)
        console.log("Password " + password)


        users.findOne({email: email}, function (err, result) {

            console.log("result=" + result);
            console.log("err=" + err);
            if (err) {
                return res.send(response.setResponse(false, " Error in login ", 400, err, "", ""));
            }
            else if (result) {
                //comparasison
                var salt = result.hashKey;
                var hash = result.password;
                var passwordHash = bcrypt.hashSync(password, salt);


                if (bcrypt.compareSync(password, hash)) {
                    // Passwords match
                    return res.send(response.setResponse(true, " login was Successfull", 200, result, "", ""));
                } else {
                    // Passwords don't match
                    return res.send(response.setResponse(false, "Email or password do not match!", 400, null, "", ""));
                }
            }

            else return res.send(response.setResponse(false, "Email does not match", 400, null, "", ""));
        });
        return next();
    };

    // Register User
    that.register = function (req, res, next) {
        try {

            users.find({email: req.params.email}, function (err, result) {

                if (result.length > 0) {
                    return res.send(response.setResponse(true, "User Already Registered With Given Email Address", 400, result, "", ""));
                }
                else {

                    var salt = bcrypt.genSaltSync(10);

                    var parameters = req.params;
                    var user = {
                        username: parameters.username,
                        email: parameters.email,
                        firstname: parameters.firstname,
                        lastname: parameters.lastname,
                        password: bcrypt.hashSync(req.params.password, salt),
                        hashKey: salt,
                        age: parameters.age,
                        number: parameters.number,
                        state: parameters.state,
                        city: parameters.city,
                        imageURL: parameters.imageURL,
                        verificationCode: '',
                        friends: ["mujahid.mms@gmail.com", "rafiq@gmail.com", "billy@mail.com"],
                        comments: ["This is test comment", "this is test comment 2"],
                        rank: parameters.rank
                    };

                    users.create(
                        user
                        , function (err, result) {
                            if (err) {
                                console.log(err);
                                return res.send(response.setResponse(false, "Error Occured While registering a user", 400, err, "", ""));
                            }
                            else {

                                transporter.sendMail({
                                    to: user.email,
                                    subject: "Victor City Registration Success",
                                    text: "You have successfully registered to Victor City. Exploration of World is now on tip of your hand"
                                }, function (error, info) {
                                    if (error) {
                                        console.log("UtilController that.sendEmail() Email Send error ", error);
                                    } else {
                                        console.log('UtilController that.sendEmail() Email sent: ' + info.response);
                                    }
                                });

                                return res.send(response.setResponse(true, "Registration Was successful", 200, result, "", ""));
                            }
                        });
                }
            });
            return next();

        }
        catch (ex) {
            console.log("Exception:" + ex);
            return res.send(response.setResponse(false, "/register:Exception Occured", 400, ex, "", ""));
        }
    };


};


module.exports = new usersController();