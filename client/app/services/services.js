angular.module('MP.services', [])

  // Your code here
.factory('Links', function ($http) {

  function getLinks(){
    return $http({
      method: 'GET',
      url:'/api/links'
    }).then((resp) => {
        return resp.data;
    })
  }

  var rValidUrl = /^(?!mailto:)(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[0-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))|localhost)(?::\d{2,5})?(?:\/[^\s]*)?$/i;

  function isValidUrl(url) {
    return url.match(rValidUrl);
  }

  function addLink(data){
    return $http({
      method: 'POST',
      url:'/api/links',
      data: data
    }).then((resp) => {
      console.log("this is resp!",resp)
        return resp;
    }).catch((resp) =>{
      console.log("this is resp!",resp)
      return resp;
    })
  }

  return {
    getLinks: getLinks,
    addLink: addLink,
    isValidUrl: isValidUrl
  };
})
.factory('Auth', function ($http, $location, $window) {
  // Don't touch this Auth service!!!
  // it is responsible for authenticating our user
  // by exchanging the user's username and password
  // for a JWT from the server
  // that JWT is then stored in localStorage as 'com.shortly'
  // after you signin/signup open devtools, click resources,
  // then localStorage and you'll see your token from the server
  var signin = function (user) {
    console.log("I am in Auth signin")
    return $http({
      method: 'GET',
      url: '/api/users/request-token',
    })
    .then(function (resp) {
      $location.path('/loggingin');
      return resp.data;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.shortly');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.shortly');
    $location.path('/signin');
  };

  var getAccessToken = function (data) {
    console.log('getAccessToken data: ',data);
    return $http({
      method: 'POST',
      url: '/api/users/access-token',
      data: data
    })
    .then(function (resp) {
      $location.path('/loggingin');
      return resp.data;
    });
  };

  return {
    signin: signin,
    isAuth: isAuth,
    signout: signout,
    getAccessToken: getAccessToken
  };
});
