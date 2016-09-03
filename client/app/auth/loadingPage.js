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
            // HERE WE GET THE DATA BACK FROM WATSON.....
            // CURRENTLY THE USER IS DIRECTED TO THE LINKS PAGE..                
                console.log('watData : ',watData);

                var big5 = watData.allTraits[2];
                console.log('big5 : ',big5);
                // determine the strongest trait in BIG5
                var maxPercent = 0;
                var saveId;
                for (var i = 0; i < big5.length; i++) {
                    if (big5[i][1] > maxPercent){
                        maxPercent = big5[i][1];
                        saveId = i;
                    }
                }

                strongTrait = big5[saveId][0];
                YouTube.setTrait(strongTrait);
                console.log("strongTrait: ",strongTrait)

                 $location.path('/links');
            })
    		.catch(function(error){
    			console.log('error in loadingPageController: ',error);
                var signInUrl = location.protocol + '//' + "localhost"  + 
                            location.host.slice(location.host.lastIndexOf(':'));
                // window.location = signInUrl;
    		});
	});

    // $scope.displayData(){

    //     // Iliya will be working in this function???
    //     // use watsonData.data ???

    //     //??????

    //     //preference
    //     //personality type
    //     //food
        

    //     //song 




    //     $location.path('/links');

    // }

});


        // Auth.getAccessToken({oauth_token : oauth_token, oauth_verifier : oauth_verifier})
        //     .then(function(resp){
        //         console.log("got getAccessToken")
        //         return resp;
        //     })
        //     .then(function(resp){
        //         console.log("About to call getUserTimeline")
        //         Auth.getUserTimeline()
        //             .then(function(userTimeline){
        //                 // console.log("Data->loadingPageController: ",userTimeline);
        //                 return userTimeline;
        //             })
        //             .then(function(userTimeline){
        //                 Auth.twitToWatson(JSON.stringify(userTimeline))
        //                     .then(function(resp){
        //                         console.log('resp from watson: ',resp);
        //                          $location.path('/links');
        //                     })
        //                     .catch(function(error){
        //                         console.log('error from watson: ',error);
        //                     })
        //             })
        //     })
        //     .catch(function(error){
        //         console.log('error in loadingPageController: ',error);
        //         $location.path('/');
        //     });