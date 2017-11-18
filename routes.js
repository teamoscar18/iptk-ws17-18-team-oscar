module.exports = function (app) {
    var user = require('./controllers/UserController');
    var userFriends = require('./controllers/FriendController');


    app.get('/', function (req, res, next) {
        return res.send("Welcome To Oscar Rest services");
    });

    app.post('/login', user.login);  // Authenticate User

    app.post('/register', user.register); //register user

    app.get('/getFriends', userFriends.getFriends); //fetch Friend List
	app.post('/getFriends', userFriends.getFriends); //fetch Friend List

    app.get('/searchUser', userFriends.searchUser); //search Friend By Email
    app.get('/searchFriend', userFriends.searchUser); //search Friend By Email
    app.get('/searchUserByUserName', userFriends.searchUser); //search Friend By UserName
    app.get('/searchUserByEmail', userFriends.searchUser); //search Friend By Email
    app.get('/searchFriendByUserName', userFriends.searchUser); //search Friend By UserName
    app.get('/searchFriendByEmail', userFriends.searchUser); //search Friend By Email


    app.post('/addFriend', userFriends.addFriend); //add Friend


};