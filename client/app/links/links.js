angular.module('MP.links', [])

.controller('LinksController', function ($scope, $location, $sce, Links, YouTube) {
  $scope.data = {};
  $scope.urls =[];

  var queries = {
    'Openness'          : 'Blues, Jazz, Classical, folk',
    'Conscientiousness' : 'Country, Religious, Pop',
    'Extraversion'      : 'Rap, Hip-Hop, Funk, Electronic, Dance',
    'Agreeableness'     : 'Country, Religious, Pop',
    'Neuroticism'       : 'Blues, Jazz, Classical, folk'
  }

  $scope.getLinks = function (){

    Links.getLinks().then((info) =>{
      // console.log("links back: ", info);
      $scope.data.links = info;
      $scope.code = info.code;
    })
  };
  // $scope.getLinks();

  $scope.logout = function (){
    // TODO: the code below seems like a hack, try to implement this in a better way
    var signInUrl = location.protocol + '//' + "localhost"  + 
                    location.host.slice(location.host.lastIndexOf(':'));
    window.location = signInUrl;
  };

  $scope.getYouTubeData = function (){

    console.log('1. I am in links-> getYouTubeData, queries[YouTube.getTrait] ',queries[YouTube.getTrait()])

    var query = {query:queries[YouTube.getTrait()], numResults:3};
    YouTube.getYouTubeData(query)
    .then((videosData) =>{
      for (var i = 0; i < videosData.items.length; i++) {
        var tempUrl = `https://www.youtube.com/embed/${videosData.items[i].id.videoId}?autoplay`;
        $scope.urls.push($sce.trustAsResourceUrl(tempUrl));
      }
      console.log("youtube data back $scope.urls: ", $scope.urls);

    })
  };

  $scope.getYouTubeData();
});