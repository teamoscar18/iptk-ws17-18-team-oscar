// Model for the user stats
module.exports = (function statSchema() {

    var mongoose = require('../db').mongoose;

    var schema = {
        useremail: {
            type: String,
            required: true
        },
        distance: {
            type: String,
            required: true
        },
        steps: {
            type: String,
            required: true
        },
        time: {
            type: String,
            required: true
        },
        average: {
            type: String,
            required: true
        },
        score: {
            type: String,
            required: true
        },
        rank: {
            type: String
        }
    };

    var collectionName = 'oscar';
    var statSchema = mongoose.Schema(schema);
    var userstat = mongoose.model(collectionName, statSchema);

    return userstat;
})();