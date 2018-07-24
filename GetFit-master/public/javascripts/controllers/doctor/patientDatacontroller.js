getFitApp.controller('patientDataController',function($http,$window,$location,$scope,$routeParams){

    $scope.email = $routeParams.name;
    $scope.doctorEmail = localStorage.getItem("doctorEmail");
        if(!$scope.doctorEmail){
		$location.path('/doctorLogin');
	}

    $http.get('/api/user/fitbit/' + $scope.email).then(function (response) {

    if(response.status === 200){
        $scope.fitbit = response.data["0"];
        console.log("200 fitbit Response",$scope.fitbit);
    }
    if(response.status === 204){
        $scope.fitbit = response.data["0"];
        console.log("204 fitbit Response",$scope.fitbit, typeof($scope.fitbit));
    }

   });//End of Patients Fitbit detials

    $http.get('/api/doctor/user/currentAppointments/' + $scope.email +'/'+ $scope.doctorEmail).then(function (response) {

    if(response.status === 200){
        $scope.currentAppointment = response.data;
        console.log("200 Current Response",$scope.currentAppointment);
    }
    if(response.status === 204){
        $scope.currentAppointment = response.data;
        console.log("204 Current Response",$scope.currentAppointment, typeof($scope.currentAppointment));
    }

   });//End of Today's todayAppointments


   $http.get('/api/doctor/user/previousAppointments/' + $scope.email +'/'+ $scope.doctorEmail).then(function (response) {

    if(response.status === 200){
        $scope.previousAppointment = response.data;
        console.log("200 User Previous Response",$scope.previousAppointment);
    }
    if(response.status === 204){
        $scope.previousAppointment = response.data;
        console.log("204 User Previous Response",$scope.previousAppointment, typeof($scope.previousAppointment));
    }

   });//End of current user Previous Appointments


   $http.get('/api/user/goals/' + $scope.email).then(function (response) {

    if(response.status === 200){
        $scope.goals = response.data;
        console.log("200 goals Response",$scope.goals);
    }
    if(response.status === 204){
        $scope.goals = response.data;
        console.log("204 goals Response",$scope.goals, typeof($scope.goals));
    }

   });//End of current patient goals


   
    
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


   $http.get(' /api/user/profile/' + $scope.email).then(function (response) {

    if(response.status === 200){
        $scope.profile = response.data;
        console.log("200 profile Response",$scope.profile);
        $scope.calulatedWeight = (Number($scope.profile["0"].weight) * 2.2).toFixed(2);
    }
    if(response.status === 204){
        $scope.profile = response.data;
        console.log("204 profile Response",$scope.profile, typeof($scope.profile));
    }

   });//End of current patient profile
});