getFitApp.controller('patientViewController',function($http,$window,$location,$scope,$routeParams){
    $scope.doctorEmail = localStorage.getItem("doctorEmail");
        if(!$scope.doctorEmail){
		$location.path('/doctorLogin');
	}

     $scope.searchPatient = function(search){
     	if(search === "all"){
             $scope.searchText = "";
         }
         else{
             $scope.searchText = search;
         }
        console.log("Clicked",$scope.searchText);
     }

     $http.get('/api/doctor/allPatients/' + $scope.doctorEmail).then(function (response) {

    if(response.status === 200){
        $scope.patientsAll = response.data;
        console.log("200 patientsAll Response",$scope.patientsAll);
    }
    if(response.status === 204){
        $scope.patientsAll = response.data;
        console.log("204 patientsAll Response",$scope.patientsAll, typeof($scope.patientsAll));
    }

   });//End of Upcoming All Appointments
});