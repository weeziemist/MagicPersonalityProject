var User = require('./userModel.js'),
    Q    = require('q'),
    jwt  = require('jwt-simple');

module.exports = {
  signin: function (req, res, next) {
    var username = req.body.username,
        password = req.body.password;

    // var findUser = Q.nbind(User.findOne, User);
    User.findByUsername(username)
      .then(function (user) {
        if (!user) {
          next(new Error('User does not exist'));
        } else {
          return User.comparePassword(user.password_hash, password)
            .then(function(foundUser) {
              console.log("foundUser: ", foundUser)
              if (foundUser) {
                var token = jwt.encode(user, 'secret');
                res.json({token: token});
              } else {
                return next(new Error('No user'));
              }
            });
        }
      })
      .catch(function (error) {
        next(error);
      });
  },

  signup: function (req, res, next) {
    var username  = req.body.username,
        password  = req.body.password,
        create,
        newUser;

    // var findOne = Q.nbind(User.findOne, User);

    // check to see if user already exists
    User.findByUsername({username: username})
      .then(function(user) {
        if (user) {
          next(new Error('User already exist!'));
        } else {
          // make a new user if not one
          // create = Q.nbind(User.create, User);
          newUser = {
            username: username,
            password: password
          };
          return User.create(newUser);
        }
      })
      .then(function (user) {
        // create token to send back for auth
        var token = jwt.encode(user, 'secret');
        // res.status(201).send(JSON.stringify({token: token}));
        res.json({token: token});
      })
      .catch(function (error) {
        console.log("error in User.findByUsername: ", error);
        next(error);
      });
  },

  checkAuth: function (req, res, next) {
    // checking to see if the user is authenticated
    // grab the token in the header is any
    // then decode the token, which we end up being the user object
    // check to see if that user exists in the database
    var token = req.headers['x-access-token'];
    if (!token) {
      next(new Error('No token'));
    } else {
      var user = jwt.decode(token, 'secret');
      // var findUser = Q.nbind(User.findOne, User);
      User.findByUsername({username: user.username})
        .then(function (foundUser) {
          if (foundUser) {
            res.status(200).send();
          } else {
            res.status(401).send();
          }
        })
        .catch(function (error) {
          next(error);
        });
    }
  }
};
