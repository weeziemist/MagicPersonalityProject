angular.module('MP.loadingPage', [])

.controller('loadingPageController', function ($scope, $window, $location, Auth) {

	$scope.$on('$viewContentLoaded', function() {
		var url = window.location.search.substring(1);
		var array = url.split('=');
    	var oauth_token = array[1].slice(0,(array[1].lastIndexOf('&')));
    	var oauth_verifier = array[2];
    	Auth.getAccessToken({oauth_token : oauth_token, oauth_verifier : oauth_verifier})
    		.then(function(resp){
                console.log("got getAccessToken")
                return resp;
    		})
            .then(function(resp){
                console.log("About to call getUserTimeline")
                Auth.getUserTimeline()
                    .then(function(data){
                        console.log("Data->loadingPageController: ",data);
                         $location.path('/links');
                    })
            })
    		.catch(function(error){
    			console.log('error in loadingPageController: ',error);
                $location.path('/');
    		});
	});

});
