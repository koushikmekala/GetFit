getFitApp.controller('userdataController', function ($http,$location,$rootScope) {
    $rootScope.isLoggedIn = false;
    this.user = {};
 
    this.edituserdata = function(){
         console.log(this.user);
        $http.post('/api/user/userData', this.user).then(function (response) {
                console.log("Status from Signup api %d", response.status);

                if (response.status === 201) {
                    
                     $location.path('/fitbitAuthorize');
                }
            }).catch(function (error) {
                console.log(error);
            });
        
    };
});