// Model for the user friends

module.exports = (function userFriendsSchema() {

    var mongoose = require('../db').mongoose;
    var users = require('./usersSchema')(mongoose);
    var usersSchema = mongoose.model('users').schema;
    var Schema = mongoose.Schema;
    
    

    var friendsSchema = {
        useremail: {
            type: String,
            required: true
        },
        friendlist: [{type: Schema.Types.ObjectId, ref:'users'}]
    };

    var collectionName = 'userfriends';
    //var users = mongoose.model('users',usersSchema);
    var userFriendsSchema = mongoose.Schema(friendsSchema);   
    var userFriends = mongoose.model(collectionName, userFriendsSchema);

    return userFriends;
})();