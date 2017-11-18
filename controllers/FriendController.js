function friendController() {

    var that = this;
    var user = require('../models/usersSchema');
    var friends = require('../models/userFriendsSchema');
    var response = require('./ServiceResponse');
    var mongoose = require('../db').mongoose;


    // Get Friends
    that.getFriends = function (req, res, next) {
        var useremail = req.params.email;
        //var userfriend = req.params.userfriend;
        console.log("EMail " + useremail);
        //console.log("Password " + password)

        try {
            users.findOne({
                email: useremail
            }
            // , 
            // {
            //     friends: 1,
            //     email: 1
            // }
            , function (err, result) {

                console.log("result=" + result);
                console.log("err=" + err);
                if (err) {
                    return res.send(response.setResponse(false, " Server encountered some error, please Try again! ", 400, err, "", ""));
                } else if (result) {

                    if (result) {
                        // Passwords match
                        return res.send(response.setResponse(true, " Fechting Friends successfull ", 200, result, "", ""));
                    } else {
                        // Passwords don't match
                        return res.send(response.setResponse(false, " User does not have any friends", 400, null, "", ""));
                    }
                } else return res.send(response.setResponse(false, "User does not exist", 400, null, "", ""));
            });
            return next();
        } catch (ex) {
            console.log("Exception:" + ex);
            return res.send(response.setResponse(false, "/getFriends:Exception Occured", 400, ex, "", ""));
        }
    };

    // Search Friend
    that.searchUser = function (req, res, next) {
        try {
            users.findOne({
                email: email
            }, function (err, result) {

                console.log("result=" + result);
                console.log("err=" + err);
                if (err) {
                    return res.send(response.setResponse(false, " Server encountered some error, please Try again! ", 400, err, "", ""));
                } else if (result) {

                    if (result) {

                        return res.send(response.setResponse(true, " Fechting Friend successfull ", 200, result, "", ""));
                    } else {

                        return res.send(response.setResponse(false, " User does not exist", 400, null, "", ""));
                    }
                } else return res.send(response.setResponse(false, "User does not exist", 400, null, "", ""));
            });
        } catch (ex) {
            console.log("Exception:" + ex);
            return res.send(response.setResponse(false, "/searchUser:Exception Occured", 400, ex, "", ""));
        }
    };


};


module.exports = new friendController();