var db = require('../db');

// npm install watson-developer-cloud
var PersonalityInsightsV2 = require('watson-developer-cloud/personality-insights/v2');

var personality_insights = new PersonalityInsightsV2({
  //you get this for your bluemix app
  username: 'xxxxxxxxxxxxxxxxxxxxx',
  password: 'xxxxxxxxxxx'

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
    // console.log('data in watModel: ',data);
    personality_insights.profile({
      text: `${data}`,
      language: 'en' },
      function (err, response) {
        if (err) {
          console.log('error:', err);
          reject(err) 
        }else {
          // console.log(JSON.stringify(response, null, 2));
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






