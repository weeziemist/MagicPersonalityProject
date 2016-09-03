angular.module('MP.loadingPage', [])

.controller('loadingPageController', function ($scope, $window, $location, Auth, YouTube) {

    var randomtext = ``;

    // var watsonData ={};

	$scope.$on('$viewContentLoaded', function() {
		var url = window.location.search.substring(1);
		var arrayUrl = url.split('=');
    	var oauth_token = arrayUrl[1].slice(0,(arrayUrl[1].lastIndexOf('&')));
    	var oauth_verifier = arrayUrl[2];
    	Auth.getAccessToken({oauth_token : oauth_token, oauth_verifier : oauth_verifier})
    		.then(function(resp){
                console.log("got getAccessToken")
                return resp;
    		})
            .then(function(resp){
                console.log("About to call getUserTimeline")
                return Auth.getUserTimeline();
            })
            .then(function(userTimeline){
                return Auth.twitToWatson(JSON.stringify(userTimeline));
            })
            .then(function(watData){
<<<<<<< HEAD
            // HERE WE GET THE DATA BACK FROM WATSON.....
            // CURRENTLY THE USER IS DIRECTED TO THE LINKS PAGE..                
                console.log('watData from watson: ',watData);
                console.log('watData json: ',JSON.stringify(watData));
=======

>>>>>>> 907fc7806d58125a6de2ae87919e24ca697fb8ef
                 $location.path('/links');
            })
    		.catch(function(error){
    			console.log('error in loadingPageController: ',error);
                var signInUrl = location.protocol + '//' + "localhost"  + 
                            location.host.slice(location.host.lastIndexOf(':'));
                // window.location = signInUrl;
    		});
	});

});


