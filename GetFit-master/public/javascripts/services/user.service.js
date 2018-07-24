// getFitApp.service('userService', function ($http) {

//     var vm = this;
//     this.email = localStorage.getItem("email");
//     this.userGoals = function () {
//         $http.get('/api/user/goals/'+ this.email).then(function (response) {
// 			console.log("Called Fitbit Goals API");
// 			vm.recommendation = response.data[0];
//             console.log(vm.recommendation);
            
// 		});
//           console.log("RETURNED:", this.recommendation);
//         return this.recommedation;
      
//     }
    
// });



getFitApp.factory("userService", ['$http', function($http) {

    var getUserGoals = function(){
        var test= "Test";
        return test;
    };
    return{
        getUserGoals : getUserGoals
    };

}]);