// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Users = require('./models/user');

// Connect to the expensemanager MongoDB
mongoose.connect('mongodb://localhost:27017/expensemanager');
// Create our Express application
var app = express();

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

// Use environment defined port or 3000
var port = process.env.PORT || 3000;

// Create our Express router
var router = express.Router();

// Initial dummy route for testing
// http://localhost:3000/api
router.get('/', function(req, res) {
  res.json({ message: 'No users!' });
});

// Create a new route with the prefix /users
var usersRoute = router.route('/users');

// Create endpoint /api/users for POSTS
usersRoute.post(function(req, res) {
  // Create a new instance of the Users model
  var user = new Users();

  // Set the user properties that came from the POST data
  user.name = req.body.name;
  user.age = req.body.age;
  user.address = req.body.address;

  // Save the user and check for errors
  user.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'user added to the database!', data: user });
  });
});

// Create endpoint /api/users for GET
usersRoute.get(function(req, res) {
  // Use the Users model to find all user
  Users.find(function(err, users) {
    if (err)
      res.send(err);

    res.json(users);
  });
});

// Create a new route with the /users/:user_id prefix
var userRoute = router.route('/users/:user_id');

// Create endpoint /api/users/:user_id for GET
userRoute.get(function(req, res) {
  // Use the Users model to find a specific user
  Users.findById(req.params.user_id, function(err, user) {
    if (err)
      res.send(err);

    res.json(user);
  });
});

// Create endpoint /api/users/:user_id for PUT
userRoute.put(function(req, res) {
  // Use the Users model to find a specific user
  Users.findById(req.params.user_id, function(err, user) {
    if (err)
      res.send(err);

    // Update the existing user quantity
    user.address = req.body.address;

    // Save the user and check for errors
    user.save(function(err) {
      if (err)
        res.send(err);

      res.json(user);
    });
  });
});

// Create endpoint /api/users/:user_id for DELETE
userRoute.delete(function(req, res) {
  // Use the Users model to find a specific user and remove it
    Users.findByIdAndRemove(req.params.user_id, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'User removed from the locker!' });
  });
});

// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(port);
console.log('Insert user on port ' + port);