var Wat = require('./watModel.js');

module.exports = {

  getWatsonData: function (req, res, next) {
 
    return Wat.callWat(req.body.data)
      .then(function (watResponse) {
        console.log('watResponse in watController: ',watResponse)
        res.send(watResponse);
      })
      .catch(function (error) {
        next(error);
      });
  },

  getWatsonDataTest: function (req, res, next) {
  	
    return Wat.callWatTest("big data...")
      .then(function (watResponse) {
        res.send(watResponse);
      })
      .catch(function (error) {
        next(error);
      });
  }
};
