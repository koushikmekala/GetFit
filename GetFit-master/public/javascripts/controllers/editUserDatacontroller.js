getFitApp.controller('editUserDataController', function ($http, $window, $location, $scope ,$rootScope) {
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


   $scope.updateUserData = function () {
        console.log("In Update Health Data");
        if ($scope.health['0'].age && $scope.health['0'].gender && $scope.health['0'].chest_pain_type && $scope.health['0'].resting_bp &&  $scope.health['0'].blood_sugar
                        && $scope.health['0'].ecg && $scope.health['0'].max_heart_rate && $scope.health['0'].induced_angina && $scope.health['0'].cholestrol && $scope.email) {

            var updateData = {
                    "age": $scope.health['0'].age,
                    "gender": $scope.health['0'].gender,
                    "chest_pain_type": $scope.health['0'].chest_pain_type,
                    "resting_bp": $scope.health['0'].resting_bp,
                    "blood_sugar": $scope.health['0'].blood_sugar,
                    "ecg": $scope.health['0'].ecg,
                    "max_heart_rate": $scope.health['0'].max_heart_rate,
                    "induced_angina":$scope.health['0'].induced_angina,
                    "cholestrol": $scope.health['0'].cholestrol,
                    "email": $scope.email
                };

            $http.post('/api/user/updateHealth', updateData).then(function (response) {
               
                if (response.status === 201) {
                    $scope.successText = "Successfully Updated user health data";
                    $scope.success = false;
                $location.path('/viewUserData')
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
    };
    $scope.viewData= function(){
        $location.path('/viewUserData');
    }


});