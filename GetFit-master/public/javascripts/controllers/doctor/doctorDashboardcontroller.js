getFitApp.controller('doctorDashboardController',function($http,$window,$location,$scope){
    $scope.doctorEmail = localStorage.getItem("doctorEmail");
    if(!$scope.doctorEmail){
		$location.path('/doctorLogin');
	}
    var date = new Date();
	var tdate = formatDate(date);
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

    	function dayName(dStr) {
		var d = new Date(dStr);
		var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
		return days[d.getDay()];
	}
    var monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"]; 
    $scope.todayMonth = monthNames[date.getMonth()]; 
    $scope.todayDate = date.getDate();
    $scope.todayDay = dayName(tdate);
    
    console.log("Day",$scope.todayMonth,$scope.todayDay,"Date",$scope.todayDate); 

   $http.get('/api/doctor/todayAppointments/' + $scope.doctorEmail).then(function (response) {

    if(response.status === 200){
        $scope.todayAppointment = response.data;
        console.log("200 Today Response",$scope.todayAppointment);
    }
    if(response.status === 204){
        $scope.todayAppointment = response.data;
        console.log("204 Today Response",$scope.todayAppointment, typeof($scope.todayAppointment));
    }

   });//End of Today's todayAppointments

   function getPreviousDate(date) {
	var date = new Date(date);
	date.setDate(date.getDate() - 1);
	return date;
    }
    function getNextDate(date) {
        var date = new Date(date);
        date.setDate(date.getDate() + 1);
        return date;
    }
    function getDates(date){
        var arr=new Array(7);
        var tempDate=date;
        for(i=2;i>=0;i--){
        arr[i]=getPreviousDate(tempDate);
        tempDate=getPreviousDate(tempDate);
        }
        arr[3]=date;
        tempDate=date;
        for(j=4;j<=6;j++){
        arr[j]=getNextDate(tempDate);
        tempDate=getNextDate(tempDate);
        }
        return arr;
    }
    $scope.dates = getDates(new Date());
    
    console.log("Dates",$scope.dates[0]);
   $http.get('/api/doctor/weeklyAppointments/' + $scope.doctorEmail).then(function (response) {

    if(response.status === 200){
        $scope.weeklyAppointment = response.data;
        console.log("200 weeklyAppointment Response",$scope.weeklyAppointment);
    }
    if(response.status === 204){
        $scope.weeklyAppointment = response.data;
        console.log("204 weeklyAppointment Response",$scope.weeklyAppointment, typeof($scope.weeklyAppointment));
    }
    

   });//End of Today's todayAppointments

   $http.get('/api/doctor/upcomingAppointments/' + $scope.doctorEmail).then(function (response) {

    if(response.status === 200){
        $scope.upcomingAppointment = response.data;
        console.log("200 Upcoming Response",$scope.upcomingAppointment);
    }
    if(response.status === 204){
        $scope.upcomingAppointment = response.data;
        console.log("204 Upcomming Response",$scope.upcomingAppointment, typeof($scope.upcomingAppointment));
    }

   });//End of Upcomming Appointments


   $http.get('/api/doctor/previousAppointments/' + $scope.doctorEmail).then(function (response) {

    if(response.status === 200){
        $scope.previousAppointment = response.data;
        console.log("200 Previous Response",$scope.previousgAppointment);
    }
    if(response.status === 204){
        $scope.previousAppointment = response.data;
        console.log("204 Previous Response",$scope.previousAppointment, typeof($scope.previousAppointment));
    }

   });//End of Previous Appointments



});			//End of Doctor Dashboard controller