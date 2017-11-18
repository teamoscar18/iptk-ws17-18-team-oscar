// Model for the users
module.exports = (function usersSchema() {

    var mongoose = require('../db').mongoose;

    var schema = {
        userName: {
            type: String,
            lowercase: true,
            required: true
        },
        firstName: {
            type: String,
            lowercase: true,
            required: true
        },
        lastName: {
            type: String,
            lowercase: true,
            required: true
        },
        email: {
            type: String,
            lowercase: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        hashKey: {
            type: String,
            required: true
        },
        age: {
            type: String,
            min: 10,
            max: 120,
            required: true
        },
        mobileNumber: {
            type: String
        },
        state: {
            type: String,
            lowercase: true,
            required: true
        },
        city: {
            type: String,
            lowercase: true,
            required: true
        },
        imageUrl: {
            type: String
        },
        verificationCode: {
            type: String
        },
        friends: [{ localField:'users.email',foreignField:'users.email', ref: 'users' }],
        rank: [{
            type: Number,
            default: 0
        }]
    };

    var collectionName = 'users';
    var usersSchema = mongoose.Schema(schema);
    var users = mongoose.model(collectionName, usersSchema,collectionName);

    return users;
})();