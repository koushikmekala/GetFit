getFitApp.controller('bookappointmentController', function ($http,$location,$scope) {
    $scope.email = localStorage.getItem("email");
    if(!$scope.email){
		$location.path('/login');
	}
    $scope.fullname = localStorage.getItem("fullname");
    $http.get('/api/doctor/allDoctors').then(function (response) {

        if(response.status === 200){
            $scope.doctors = response.data;
            console.log("200 doctors Response",$scope.doctors);
        }
        if(response.status === 204){
            $scope.doctors = response.data;
            console.log("204 doctors Response",$scope.doctors, typeof($scope.doctors));
        }
    $scope.doctorLength = $scope.doctors.length;
    console.log("Doctots",$scope.doctorLength);
});//End of doctorProfile

//     $http.get('/api/doctor/details/' +$scope.doctorEmail).then(function (response) {

//         if(response.status === 200){
//             $scope.doctorProfile = response.data[0];
//             console.log("200 doctorProfile Response",$scope.doctorProfile);
//         }
//         if(response.status === 204){
//             $scope.doctorProfile = response.data[0];
//             console.log("204 doctorProfile Response",$scope.doctorProfile, typeof($scope.doctorProfile));
//         }
            

// });//End of doctorProfile


function formatDate(date) {
		var d = new Date(date),
			month = '' + (d.getMonth() + 1),
			day = '' + d.getDate(),
			year = d.getFullYear();

		if (month.length < 2) month = '0' + month;
		if (day.length < 2) day = '0' + day;
		this.date = [year, month, day].join('-');
		return this.date;
	}
$scope.bookAppointment = function () {
    $scope.dFullname = $scope.selectedDoctor.dFirst + ' ' + $scope.selectedDoctor.dLast;
        console.log("Book Appointment");
        if ($scope.selectedDoctor.dEmail &&  $scope.email && $scope.reason && $scope.date && $scope.stroke && $scope.medicine && $scope.allergies && $scope.fullname) {
            console.log("Inside");
            var book_appointment = {
                "dEmail": $scope.selectedDoctor.dEmail,
                "email": $scope.email,
                "reason": $scope.reason,
                "date": formatDate($scope.date),
                "stroke": $scope.stroke,
                "currentMedicine": $scope.medicine,
                "allergies": $scope.allergies,
                "fullname": $scope.fullname,
                "dFullname" : $scope.dFullname
            };
        console.log("Appointment JSON",book_appointment);
            $http.post('/api/user/appointment', book_appointment).then(function (response) {
                console.log("REsponse from booking", response);
                if (response.status === 201) {
                    $location.path('/viewAllAppointment')
                    
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
    };

});