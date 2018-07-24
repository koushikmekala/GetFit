getFitApp.controller('viewUserDataController', function ($http, $window, $location, $scope ,$rootScope) {
    $scope.email= localStorage.getItem("email");
    if(!$scope.email){
		$location.path('/login');
	}
    $scope.name = localStorage.getItem("fullname");
      $http.get('/api/user/health/' + $scope.email).then(function (response) {

    if(response.status === 200){
        $scope.health = response.data;
        console.log("200 health Response",$scope.health);
    }
    if(response.status === 204){
        $scope.health = response.data;
        console.log("204 health Response",$scope.health, typeof($scope.health));
    }

   });//End of current patient health


   $scope.edit = function(){
       $location.path('/editUserData');
   }
});