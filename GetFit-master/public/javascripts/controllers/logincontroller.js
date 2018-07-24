getFitApp.controller('loginController', function ($scope,$http,$location,$rootScope,$window) {
    console.log("In login controller");
    $rootScope.isLoggedIn = false;
    this.login = function () {
        console.log("Login function");
        if (this.email && this.password) {
            var user = {
                username: this.email,
                password: this.password
            };

            $http.get('/api/user/login/' + this.email + '/' + this.password).then(function (response) {
                console.log('Got status from Login Api', response.status);
                console.log("response in login",response.data[0]);
                if (response.status === 200) {
                    localStorage.setItem("email", response.data[0].email);
                    localStorage.setItem("isLoggedIn", true);
                    localStorage.setItem("fullname",response.data[0].fname +" "+ response.data[0].lname);
                    $rootScope.isLoggedIn = localStorage.getItem("isLoggedIn");
                     $rootScope.fullname = localStorage.getItem("fullname");
                    $http.get('/fitbit/save/' + response.data[0].email).then(function (response) {
                         $location.path('/dashboard');
                    });
                }
                else if (response.status === 204) {
                    $scope.error = "Please enter correct details";
                }
            });
        }
       
    };
});