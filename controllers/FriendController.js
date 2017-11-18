function friendController() {

    var that = this;
    var users = require('../models/usersSchema');
    var response = require('./ServiceResponse');
    var mongoose = require('../db').mongoose;


    // Get Friends
    that.getFriends = function (req, res, next) {
        var useremail = req.params.email;
        //var userfriend = req.params.userfriend;
        console.log("EMail " + useremail);
        //console.log("Password " + password)

        try {
            users.find({
                email: useremail
            }).populate({
                path: 'friends',
                model: 'users'
              }).exec(function (err, result) {
                
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
        var useremail = req.params.email;
        console.log("EMail " + useremail);
        try {
            users.findOne({
                email: useremail
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

    // Search Friend
    that.searchUserByUserName = function (req, res, next) {
        var username = req.params.username;
        console.log("username " + username);
        try {
            users.find({
                userName: username
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

     // add Friend
     that.addFriend = function (req, res, next) {
        var useremail = req.params.email;
        var friendemail = req.params.friendemail;
        
        console.log("EMail " + useremail);
        console.log("friendemail " + friendemail);
        try {
            var options = {upsert: true, new: true};
            var query = { email: useremail };
            users.findOne({
                email: friendemail
            }, function (err, friend) {

                console.log("result=" + friend);
                console.log("err=" + err);
                if (err) {
                    return res.send(response.setResponse(false, " Server encountered some error, please Try again! ", 400, err, "", ""));
                } else if (friend) {
                    users.findOneAndUpdate(query,{$push:{friends:mongoose.Types.ObjectId(friend._id)}},options,function (err, user) {
                        if (user) {
                            return res.send(response.setResponse(true, " adding Friend successfull ", 200, user, "", ""));
                        } else {
                            return res.send(response.setResponse(false, " User does not exist:98", 400, null, "", ""));
                        }
                    });
                } else return res.send(response.setResponse(false, "Friend user does not exist", 400, null, "", ""));
            });

           
        } catch (ex) {
            console.log("Exception:" + ex);
            return res.send(response.setResponse(false, "/addFriend:Exception Occured", 400, ex, "", ""));
        }
    };



};


module.exports = new friendController();