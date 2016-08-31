angular.module('MP.links', [])

.controller('LinksController', function ($scope, $location, Links) {
  $scope.data = {};

  $scope.getLinks = function (){

    Links.getLinks().then((info) =>{
      // console.log("links back: ", info);
      $scope.data.links = info;
      $scope.code = info.code;
    })
  };
  $scope.getLinks();

  $scope.logout = function (){
    // TODO: the code below seems like a hack, try to implement this in a better way
    var signInUrl = location.protocol + '//' + "localhost"  + 
                    location.host.slice(location.host.lastIndexOf(':'));
    window.location = signInUrl;
  };
});