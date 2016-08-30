var userController = require('./userController.js');


module.exports = function (app) {
  // app === userRouter injected from middlware.js
  app.get('/request-token', userController.signin);
  app.post('/access-token', userController.getAccessToken);
  app.get('/signedin', userController.checkAuth);
};
