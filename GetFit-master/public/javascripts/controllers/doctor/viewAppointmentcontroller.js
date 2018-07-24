getFitApp.controller('viewAppointmentController',function($http,$window,$location,$scope,$routeParams){
    $scope.email = $routeParams.email;
    $scope.aid = $routeParams.id;
    $scope.doctorEmail = localStorage.getItem("doctorEmail");
        if(!$scope.doctorEmail){
		$location.path('/doctorLogin');
	}
    var date = new Date();
    $scope.today = formatDate(date);
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

    $scope.showToday =false;
    $scope.isShow = true;
    $scope.edit = function(){
    	$scope.isShow = !$scope.isShow;
    }
    $scope.success= true;

    $http.get('/api/doctor/user/appointmentDetails/' + $scope.email + '/'+ $scope.doctorEmail + '/' + $scope.aid).then(function (response) {

    if(response.status === 200){
        $scope.appointmentId = response.data[0];
        console.log("200 AppointmentId Response",$scope.appointmentId);
        if($scope.appointmentId.date == $scope.today){
            $scope.showToday = true;
        }
    }
    if(response.status === 204){
        $scope.appointmentId = response.data[0];
        console.log("204 AppointmentId Response",$scope.appointmentId, typeof($scope.appointmentId));
    }

   });//End of Upcomming Appointments

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


    $http.get('/api/doctor/details/' +$scope.doctorEmail).then(function (response) {

        if(response.status === 200){
            $scope.doctorProfile = response.data[0];
            console.log("200 doctorProfile Response",$scope.doctorProfile);
        }
        if(response.status === 204){
            $scope.doctorProfile = response.data[0];
            console.log("204 doctorProfile Response",$scope.doctorProfile, typeof($scope.doctorProfile));
        }
            $scope.dFullname = $scope.doctorProfile.dFirst +' ' +$scope.doctorProfile.dLast;
    console.log("Dfullname",$scope.dFullname);

    });//End of doctorProfile



   $scope.updateGoals = function () {
        console.log("In Update Goals");
        if ($scope.dSteps && $scope.dCalories && $scope.dDistance && $scope.dActiveminutes && $scope.feedback) {

            var update_goals = {
                    "aid": $scope.appointmentId.aid,
                    "dEmail": $scope.appointmentId.dEmail,
                    "dName": $scope.dFullname,
                    "email": $scope.appointmentId.email,
                    "fname": $scope.appointmentId.fullname,
                    "dSteps": $scope.dSteps,
                    "dCalories": $scope.dCalories,
                    "dDistance": $scope.dDistance,
                    "dActiveminutes":$scope.dActiveminutes,
                    "date": $scope.appointmentId.date,
                    "feedback": $scope.feedback
                };

            $http.post('/api/doctor/insertFeedback', update_goals).then(function (response) {
               
                if (response.status === 201) {
                    $scope.successText = "Successfully Submitted the Feedback to the Patient";
                    $scope.success = false;
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
    };
});