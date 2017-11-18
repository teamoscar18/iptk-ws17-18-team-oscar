// Model for the user friends

module.exports = (function userFriendsSchema() {

    var mongoose = require('../db').mongoose;
    var Schema = mongoose.Schema;
    

    var friendsSchema = {
        useremail: {
            type: String,
            required: true
        },
        friendlist: [{
            type: Schema.Types.ObjectId,
            ref: 'users'
        }]
    };

    var collectionName = 'userfriends';
    var userFriendsSchema = mongoose.Schema(friendsSchema);
    var user = mongoose.model('users').Schema;
    var userFriends = mongoose.model(collectionName, userFriendsSchema)

    return userFriends;
})();