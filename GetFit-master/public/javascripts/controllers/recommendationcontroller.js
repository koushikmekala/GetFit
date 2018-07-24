getFitApp.controller('recommendationController',function($http,$window,$location,$scope){
   var vm = this;
   this.email = localStorage.getItem("email");
   $scope.email = localStorage.getItem("email");
   if(!$scope.email){
		$location.path('/login');
	}

   $http.get('/api/user/goals/'+ this.email).then(function (response) {
			console.log("Called Fitbit Goals API");
			vm.recommendation = response.data[0];
            console.log(vm.recommendation);
		});

    
});