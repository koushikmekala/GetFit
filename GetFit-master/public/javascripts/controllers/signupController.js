getFitApp.controller('signupController', function ($http,$location,$rootScope) {
    console.log("In signup controller");
    $rootScope.isLoggedIn = false;
    this.message = "From signup controller";
    this.signup = function () {
        console.log("In insertUser");
        if (this.firstname_signup && this.lastname_signup && this.phone_signup && this.email_signup && this.password_signup) {

            var user_signup = {
                firstname: this.firstname_signup,
                lastname: this.lastname_signup,
                phone: this.phone_signup,
                email: this.email_signup,
                password: this.password_signup
            };

            $http.post('/api/user/insertUser', user_signup).then(function (response) {
                console.log("Status from Signup api %d", response.status);

                if (response.status === 201) {
                    localStorage.setItem("signupemail",user_signup.email);
                    $location.path('/userdata');
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
    };
});