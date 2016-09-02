var db = require('../db');

// npm install watson-developer-cloud
var PersonalityInsightsV2 = require('watson-developer-cloud/personality-insights/v2');

var personality_insights = new PersonalityInsightsV2({
  //you get this for your bluemix app
<<<<<<< HEAD
  username: '',
  password: ''
=======
  username: 'xxxxxxxxxxxxxxxxxxxxx',
  password: 'xxxxxxxxxxx'
>>>>>>> 61b0bc339aff4c6a80293fd01550aade3d8e2fb3

});

// to initiate the call to the server do a post request 
// to http://192.168.1.102:3000/api/wat/watson

// the data should be sent in json format {"data": "the massive text bloob"}


var Wat = module.exports;

// use callWat(data) to get data from watson 
Wat.callWat = function(bigData){

  return new Promise(function(resolve, reject) {
    
    var data = bigData || "-_-" // <-- big data goes here
    // make a call to watson
<<<<<<< HEAD
=======
    // console.log('data in watModel: ',data);
>>>>>>> 61b0bc339aff4c6a80293fd01550aade3d8e2fb3
    personality_insights.profile({
      text: `${data}`,
      language: 'en' },
      function (err, response) {
        if (err) {
          console.log('error:', err);
          reject(err) 
        }else {
<<<<<<< HEAD
          console.log(JSON.stringify(response, null, 2));
=======
          // console.log(JSON.stringify(response, null, 2));
>>>>>>> 61b0bc339aff4c6a80293fd01550aade3d8e2fb3
          // TODO:
          // Store info in database
          resolve(JSON.stringify(response, null, 2))
        }
    });

  })

};

Wat.callWatTest = function(bigData){

  return new Promise(function(resolve, reject) {
    
    var data = bigData || "-_-" // <-- big data goes here

    // make a fake call to watson
    resolve(data)

  })

};






