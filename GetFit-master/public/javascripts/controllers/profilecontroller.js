getFitApp.controller('profileController',function($http,$window,$location,$scope){

$scope.email = localStorage.getItem("email");
if(!$scope.email){
		$location.path('/login');
	}
$http.get('/api/user/profile/'+$scope.email).then(function (resp) {
					 if (resp.status === 200) {
						
						$scope.profile = resp.data["0"];
						console.log("Profile data from DB:", $scope.profile);
						$scope.calulatedWeight = (Number($scope.profile.weight) * 2.2).toFixed(2);
                }
			});//End of get Profile


});			//End of profile controller