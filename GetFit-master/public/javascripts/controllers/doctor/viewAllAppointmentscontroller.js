getFitApp.controller('viewAllAppointmentsController',function($http,$window,$location,$scope,$routeParams){
     $scope.doctorEmail = localStorage.getItem("doctorEmail");
         if(!$scope.doctorEmail){
		$location.path('/doctorLogin');
	}

   $http.get('/api/doctor/todayAppointmentsAll/' + $scope.doctorEmail).then(function (response) {

    if(response.status === 200){
        $scope.todayAppointmentsAll = response.data;
        console.log("200 todayAppointmentsAll Response",$scope.todayAppointmentsAll);
    }
    if(response.status === 204){
        $scope.todayAppointmentsAll = response.data;
        console.log("204 todayAppointmentsAll Response",$scope.todayAppointmentsAll, typeof($scope.todayAppointmentsAll));
    }

   });//End of Today All Appointments


   $http.get('/api/doctor/upcomingAppointmentsAll/' + $scope.doctorEmail).then(function (response) {

    if(response.status === 200){
        $scope.upcomingAppointmentsAll = response.data;
        console.log("200 upcomingAppointmentsAll Response",$scope.upcomingAppointmentsAll);
    }
    if(response.status === 204){
        $scope.upcomingAppointmentsAll = response.data;
        console.log("204 upcomingAppointmentsAll Response",$scope.upcomingAppointmentsAll, typeof($scope.upcomingAppointmentsAll));
    }

   });//End of Upcoming All Appointments



   $http.get('/api/doctor/previousAppointmentsAll/' + $scope.doctorEmail).then(function (response) {

    if(response.status === 200){
        $scope.previousAppointmentsAll = response.data;
        console.log("200 previousAppointmentsAll Response",$scope.previousAppointmentsAll);
    }
    if(response.status === 204){
        $scope.previousAppointmentsAll = response.data;
        console.log("204 previousAppointmentsAll Response",$scope.previousAppointmentsAll, typeof($scope.previousAppointmentsAll));
    }

   });//End of previous All Appointments
});