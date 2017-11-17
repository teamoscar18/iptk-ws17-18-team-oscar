// Model for the users
module.exports = (function statSchema () {
    
        var mongoose = require('../db').mongoose;
    
        var schema = {
            username: {type: String, required: true},
            distance: {type: String, required: true},
            steps: {type: String, required: true},
            time: {type: String,required: true},
            average: {type: String,required: true},
            score: {type: String,required: true},
            rank:{type:String}
        };
    
        var collectionName = 'users';
        var statSchema = mongoose.Schema(schema);
        var userstat = mongoose.model(collectionName, statSchema);
    
        return userstat;
    })();