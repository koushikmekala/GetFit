angular.module('angularRoutes', ['ngRoute']).config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider
        .when('/login', {
            templateUrl: '../views/login.html',
            controller: 'loginController',
            controllerAs: 'ctrl'
        })
        .when('/signup', {
            templateUrl: '../views/signup.html',
            controller: 'signupController',
            controllerAs:'ctrl'
        })

        .when('/dashboard', {
        	templateUrl: '../views/dashboard.html',
        	controller: 'dashboardController',
            controllerAs: 'ctrl'
        })

        .when('/profile', {
        	templateUrl: '../views/profile.html',
        	controller: 'profileController',
            controllerAs: 'ctrl'
        })
        .when('/activity', {
        	templateUrl: '../views/activity.html',
        	controller: 'activityController',
            controllerAs: 'ctrl'
        })
        .when('/recommendation', {
            templateUrl: '../views/recommendations.html',
            controller: 'recommendationController',
            controllerAs: 'ctrl'
        })
        .when('/userdata', {
        	templateUrl: '../views/userData.html',
        	controller: 'userdataController',
            controllerAs: 'ctrl'
        })
        .when('/prediction',{
            templateUrl: '../views/prediction.html',
        	controller: 'predictionController',
            controllerAs: 'ctrl'
        })
        
        .when('/fitbitAuthorize',{
            templateUrl: '../views/fitbitauthorize.html',
            controller: 'fitbitAuthorizeController',
            controllerAs: 'ctrl'
        })
        .when('/bookAppointment',{
            templateUrl: '../views/bookAppointment.html',
            controller: 'bookappointmentController',
            controllerAs: 'ctrl'
        })
        .when('/viewAllAppointment',{
            templateUrl: '../views/userAllAppointments.html',
            controller: 'patientAllAppointmentsController',
            controllerAs: 'ctrl'
        })
        .when('/viewAppointment/:aid',{
            templateUrl: '../views/userViewAppointment.html',
            controller: 'userViewAppointmentController',
            controllerAs: 'ctrl'
        })
        .when('/editUserData',{
            templateUrl: '../views/editUserData.html',
            controller: 'editUserDataController',
            controllerAs: 'ctrl'
        })
        .when('/viewUserData',{
            templateUrl: '../views/viewUserData.html',
            controller: 'viewUserDataController',
            controllerAs: 'ctrl'
        })


        //Doctor Routes
        .when('/doctorDashboard',{
            templateUrl: '../views/doctorDashboard.html',
        	controller: 'doctorDashboardController',
            controllerAs: 'ctrl'
        })
        .when('/doctorLogin',{
            templateUrl: '../views/doctorLogin.html',
            controller: 'doctorloginController',
            controllerAs: 'ctrl'
        })
        .when('/doctorSignup',{
            templateUrl: '../views/doctorSignup.html',
            controller: 'doctorsignupController',
            controllerAs: 'ctrl'
        })
        .when('/viewPatientData/:name',{
            templateUrl: '../views/viewPatientsData.html',
        	controller: 'patientDataController',
            controllerAs: 'ctrl'
        })
        .when('/viewPatients',{
            templateUrl: '../views/viewPatients.html',
        	controller: 'patientViewController',
            controllerAs: 'ctrl'
        })
        .when('/viewAppointment/:email/:id',{
            templateUrl: '../views/viewAppointment.html',
        	controller: 'viewAppointmentController',
            controllerAs: 'ctrl'
        })
         .when('/viewAllAppointments',{
            templateUrl: '../views/viewAllAppointments.html',
        	controller: 'viewAllAppointmentsController',
            controllerAs: 'ctrl'
        })
        .otherwise({
            redirectTo: '/'
        });
    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode(true);
}]);