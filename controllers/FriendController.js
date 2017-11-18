function friendController() {

    var that = this;
    var users = require('../models/usersSchema');
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
            users.find({
                email: useremail
            }, function (err, result) {

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

     // add Friend
     that.addFriend = function (req, res, next) {
        var useremail = req.params.email;
        var friendemail = req.params.friendemail;
        console.log("EMail " + useremail);
        console.log("friendemail " + friendemail);
        try {
            var options = {upsert: true, new: true};
            var query = { email: useremail };
            users.findOneAndUpdate(
                query,
                {  $addToSet: { friends: friendemail } },
                options
                , function (err, result) {

                console.log("result=" + result);
                console.log("err=" + err);
                if (err) {
                    return res.send(response.setResponse(false, " Server encountered some error, please Try again! ", 400, err, "", ""));
                } else if (result) {
                    query = { useremail: useremail };
                    friends.findOneAndUpdate(
                        query,
                        {  $set: { useremail: useremail } },
                        options
                        , function (err, result) {
                            if (result) {
                                console.log('added email address in user friendlist %s', result.friends);
                                var friend = users.findOne({email:friendemail},function(err,user){
                                    if (user) {
                                        console.log('friend exists in user table %s', user.email);
                                        friends.findOne({useremail:useremail}).populate(firend).exec(function (err, story) {
                                            if (err)res.send(response.setResponse(false, err, 400, null, "", ""));
                                            console.log('The authors age is %s', story.useremail);
                                          });
                                          console.log('friend exists in user table %s', story);                               
                                        return res.send(response.setResponse(true, " Fechting Friend successfull ", 200, result, "", ""));
                                    } else {
        
                                        return res.send(response.setResponse(false, "findOne"+useremail+" "+err, 400, null, "", ""));
                                    }
                                });
                                //return res.send(response.setResponse(true, " Fechting Friend successfull ", 200, result, "", ""));
                            } else {

                                return res.send(response.setResponse(false, "findOneAndUpdate"+useremail+" => "+err, 400, null, "", ""));
                            }
                        });
                } else return res.send(response.setResponse(false, "findOneAndUpdate"+err, 400, null, "", ""));
            });
        } catch (ex) {
            console.log("Exception:" + ex);
            return res.send(response.setResponse(false, "/addFriend:Exception Occured", 400, ex, "", ""));
        }
    };



};


module.exports = new friendController();