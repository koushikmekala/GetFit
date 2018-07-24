getFitApp.controller('userViewAppointmentController', function ($http,$location,$scope,$routeParams) {
    $scope.success = false;
    $scope.aid = $routeParams.aid;
    $scope.email = localStorage.getItem("email");
    if(!$scope.email){
		$location.path('/login');
	}
    $http.get('/api/user/appointmentDetails/'+ $scope.aid).then(function (response) {

        if(response.status === 200){
            $scope.appointmentDetails = response.data;
            console.log("200 appointmentDetails Response",$scope.appointmentDetails);
        }
        if(response.status === 204){
            $scope.appointmentDetails = response.data;
            console.log("204 appointmentDetails Response",$scope.appointmentDetails, typeof($scope.appointmentDetails));
        }
   
});//End of get feedback by aid
    
    $http.get('/api/doctor/feedback/'+ $scope.aid).then(function (response) {

        if(response.status === 200){
            $scope.aidFeedback = response.data;
            console.log("200 aidFeedback Response",$scope.aidFeedback);
        }
        if(response.status === 204){
            $scope.aidFeedback = response.data;
            console.log("204 aidFeedback Response",$scope.aidFeedback, typeof($scope.aidFeedback));
        }
   
});//End of get feedback by aid



$scope.updateGoals = function(){

            if ($scope.aidFeedback["0"].dSteps &&  $scope.aidFeedback["0"].dCalories && $scope.aidFeedback["0"].dDistance && $scope.aidFeedback["0"].dActiveminutes) {
            console.log("Inside");
            var book_appointment = {
                "goals_steps": $scope.aidFeedback["0"].dSteps,
                "goals_calories": $scope.aidFeedback["0"].dCalories,
                "goals_distance": $scope.aidFeedback["0"].dDistance,
                "goals_activeminutes": $scope.aidFeedback["0"].dActiveminutes,
                "email": $scope.email
            };
        console.log("Appointment JSON",book_appointment);
            $http.post('/api/user/updateGoals', book_appointment).then(function (response) {
                console.log("REsponse from updating goals", response);
                if (response.status === 201) {
                    $scope.success= true;
                    $scope.successText = "Successfully Updated your personal goals";
                    
                }
            }).catch(function (error) {
                console.log(error);
            });
        }

}

$scope.viewGoals = function(){
    $location.path('/recommendation');
}

});