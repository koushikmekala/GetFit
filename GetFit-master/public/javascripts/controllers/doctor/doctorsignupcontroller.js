getFitApp.controller('doctorsignupController', function ($http,$location,$rootScope) {
    console.log("In signup controller");
    $rootScope.isLoggedIn = false;
    this.message = "From signup controller";
    this.signup = function () {
        console.log("In insertUser");
        if (this.firstname_signup && this.lastname_signup && this.phone_signup && this.email_signup && this.password_signup && this.specialization_signup && this.address_signup) {

            var user_signup = {
                firstname: this.firstname_signup,
                lastname: this.lastname_signup,
                phone: this.phone_signup,
                email: this.email_signup,
                password: this.password_signup,
                specialization: this.specialization_signup,
                address: this.address_signup
            };

            $http.post('/api/doctor/insertDoctor', user_signup).then(function (response) {
                console.log("Status from Signup api %d", response.status);

                if (response.status === 201) {
                    $location.path('/doctorLogin');
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
    };
});