// Model for the user friends

module.exports = (function userFriendsSchema() {

    var mongoose = require('../db').mongoose;
    var userSchema = require('./usersSchema');
    

    var schema = {
        useremail: {
            type: String,
            required: true
        },
        friendlist: [{
            type: Schema.Types.ObjectId,
            ref: "user"
        }]
    };

    var collectionName = 'oscar';
    var userFriendsSchema = mongoose.Schema(schema);
    var user = mongoose.model(collectionName, userSchema);
    var userFriends = mongoose.model(collectionName, userFriendsSchema)

    return userFriends;
})();