angular.module('MP.links', [])

.controller('LinksController', function ($scope, Links) {
  $scope.data = {};

  $scope.getLinks = function (){

    Links.getLinks().then((info) =>{
      // console.log("links back: ", info);
      $scope.data.links = info;
      $scope.code = info.code;
    })
  };
  $scope.getLinks();
});