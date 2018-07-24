getFitApp.controller('doctorloginController', function ($http, $window, $location, $scope ,$rootScope) {
    $rootScope.isLoggedIn = false;
    $rootScope.isDoctorLoggedIn = false;
    this.login = function () {
         if (this.email && this.password) {
            var user = {
                username: this.email,
                password: this.password
            };

            $http.get('/api/doctor/login/' + this.email + '/' + this.password).then(function (response) {
                console.log('Got status from Login Api', response.status);
                     console.log('Response', response);
                if (response.status === 200) {
                    localStorage.setItem("doctorEmail", response.data[0].dEmail);
                    localStorage.setItem("isDoctorLoggedIn", true);
                   // localStorage.setItem("isLoggedIn",true);
                    localStorage.setItem("fullname",response.data[0].dFirst +" "+ response.data[0].dLast);
                    console.log("Response:", response);
                   // $rootScope.isLoggedIn = localStorage.getItem("isLoggedIn");
                    $rootScope.fullname = localStorage.getItem("fullname");
                    $rootScope.isDoctorLoggedIn = localStorage.getItem("isDoctorLoggedIn");
                   $location.path('/doctorDashboard');
                }
                else if (response.status === 204) {
                    $scope.error = "Please enter correct details";
                }
            });
        }
    };
});