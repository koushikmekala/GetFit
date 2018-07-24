getFitApp.controller('fitbitAuthorizeController', function ($http,$location,$rootScope,$window) {
    $rootScope.isLoggedIn = false;
    this.authorize = function () {
		console.log("Calling authorize");
		$window.open("/authorize", '_self');
	}
 });