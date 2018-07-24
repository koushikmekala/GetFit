getFitApp.controller('patientAllAppointmentsController', function ($http,$location,$scope) {
    $scope.email = localStorage.getItem("email");
    if(!$scope.email){
		$location.path('/login');
	}

$http.get('/api/user/allAppointments/'+ $scope.email).then(function (response) {

        if(response.status === 200){
            $scope.allAppointments = response.data;
            console.log("200 allAppointments Response",$scope.allAppointments);
        }
        if(response.status === 204){
            $scope.allAppointments = response.data;
            console.log("204 allAppointments Response",$scope.allAppointments, typeof($scope.allAppointments));
        }
   
});//End of doctorProfile




});