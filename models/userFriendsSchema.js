// Model for the user friends

module.exports = (function userFriendsSchema() {

    var mongoose = require('../db').mongoose;
    var user = require('../models/usersSchema');

    var schema = {
        useremail: {
            type: String,
            required: true
        },
        friendlist: [{
            type: Schema.ObjectId,
            ref: "user"
        }]
    };

    var collectionName = 'oscar';
    var userFriendsSchema = mongoose.Schema(schema);
    var userFriends = mongoose.model(collectionName, userFriendsSchema)

    return userFriends;
})();