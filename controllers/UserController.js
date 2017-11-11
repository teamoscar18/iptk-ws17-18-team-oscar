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
                return res.send(response.setResponse(false," Error in login ", 400, err, "",""));
            }
            else if (result) {
                //comparasison
                var salt = result.hashKey;
                var hash = result.password;
                var passwordHash = bcrypt.hashSync(password, salt);


                if (bcrypt.compareSync(password, hash)) {
                    // Passwords match
                    return res.send(response.setResponse(true," login was Successfull", 200, result ,"",""));
                } else {
                    // Passwords don't match
                    return res.send(response.setResponse(false,"Email or password do not match!", 400, null,"",""));
                }
            }

            else return res.send(response.setResponse(false,"Email does not match", 400, null,"",""));
        });
        return next();
    };


};


module.exports = new usersController();