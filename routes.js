module.exports = function (app) {
    var user = require('./controllers/UserController');


    app.get('/', function (req, res, next) {
        return res.send("Welcome To Oscar Rest services");
    });

    app.post('/login', user.login);  // Authenticate User

    app.post('/register', user.register); 


};