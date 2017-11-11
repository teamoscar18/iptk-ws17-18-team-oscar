// Model for the users
module.exports = (function usersSchema () {

	var mongoose = require('../db').mongoose;

	var schema = {
		username: {type: String, required: true},
		email: {type: String, required: true},
		password: {type: String, required: true},
        hashKey: {type: String,required: true}
	};

    var collectionName = 'users';
    var usersSchema = mongoose.Schema(schema);
    var users = mongoose.model(collectionName, usersSchema);

    return users;
})();