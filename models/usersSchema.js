// Model for the users
module.exports = (function usersSchema () {

	var mongoose = require('../db').mongoose;

	var schema = {
		username: {type: String, lowercase: true, required: true},
		email: {type: String, lowercase: true, required: true},
		password: {type: String, required: true},
        hashKey: {type: String, required: true},
        age: {type: String, min: 10, max: 120, required: true},
        number: {type: String, required: true},
        state: {type: String, lowercase: true, required: true},
        city: {type: String, lowercase: true, required: true},
        imageURL: {type: String},
        verificationCode: {type: String},
        friends: [{type:String}],
        comments:[{type:String}],
        rank:[{type:String}]
	};

    var collectionName = 'users';
    var usersSchema = mongoose.Schema(schema);
    var users = mongoose.model(collectionName, usersSchema);

    return users;
})();