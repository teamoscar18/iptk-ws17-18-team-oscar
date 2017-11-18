module.exports = function (app) {
    var user = require('./controllers/UserController');
    var userFriends = require('./controllers/FriendController');


    app.get('/', function (req, res, next) {
        return res.send("Welcome To Oscar Rest services");
    });

    app.post('/login', user.login);  // Authenticate User

    app.post('/register', user.register); //register user

    app.get('/getFriends', userFriends.getFriends); //fetch Friend List

    app.get('/searchUser', userFriends.searchUser); //search Friend
    app.get('/searchFriend', userFriends.searchUser); //search Friend

    app.post('/addFriend', userFriends.addFriend); //add Friend


};