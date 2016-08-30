var db = require('../db');
var bcrypt = require('bcrypt-nodejs');
var Twitter = require("node-twitter-api");
var twitterCredentials = require('../config/twitterCredentials');
var _requestToken;
var _requestSecret;
var _accessToken;
var _accessSecret;
var User = module.exports

var twitter = new Twitter({
    consumerKey: twitterCredentials.consumerKey,
    consumerSecret: twitterCredentials.consumerSecret,
    callback: twitterCredentials.callback
});


User.findByUsername = function (username) {

  return db.collection('users').findOne({ username: username })
    .then(translateId)
  }

User.findById = function (id) {

  return db.collection('users').find({ _id: db.ObjectId(id) })
    .then(translateId)
  }

User.create = function (incomingAttrs) {

  // Copy object to avoid mutation
  var attrs = Object.assign({}, incomingAttrs);

  return hashPassword(attrs.password)
    .then(function (passwordHash) {

      attrs.password_hash = passwordHash
      delete attrs.password
      return db.collection('users').insert(attrs);
    });
  };

User.comparePassword = function (passwordHashFromDatabase, attemptedPassword) {

  return new Promise(function (resolve, reject) {

    bcrypt.compare(attemptedPassword, passwordHashFromDatabase, function(err, res) {
      if (err) reject(err)
      else     resolve(res)
    });
  })
};

function hashPassword (password) {

  return new Promise(function (resolve, reject) {

    bcrypt.hash(password, null, null, function(err, hash) {
      if (err) reject(err)
      else     resolve(hash)
    });
  })
};


function translateId (user) {
  if ( user ) {
    user.id = user._id
    delete user._id
  }
  return user
}

User.requestToken = function () {
  return new Promise(function (resolve, reject) {
    twitter.getRequestToken(function(err, requestToken, requestSecret) {
        if (err){
          console.log('I am in userModel requestToken err: ',err);
            reject(err);
        }
        else {
            _requestToken = requestToken;
            _requestSecret = requestSecret;
            resolve(requestToken);
        }
    });
  })
};

User.accessToken = function (verifier) {
    console.log('_requestToken: ',_requestToken)
    console.log('_requestSecret: ',_requestSecret)
    return new Promise(function(resolve, reject) {
      twitter.getAccessToken(_requestToken, _requestSecret, verifier, function(err, accessToken, accessSecret) {
        if (err){
          console.log('User.accessToken err: ',err)
          reject(err);
        }
        else {
          console.log('User.accessToken accessToken: ',accessToken)
          _accessToken = accessToken;
          _accessSecret = accessSecret;
          resolve(accessToken);
        }
      });
    }.bind(this));
};
