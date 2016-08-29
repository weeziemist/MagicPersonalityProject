var db = require('../db');
var bcrypt = require('bcrypt-nodejs');


var User = module.exports

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
