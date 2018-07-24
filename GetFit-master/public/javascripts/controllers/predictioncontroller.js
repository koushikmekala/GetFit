getFitApp.controller('predictionController', function ($location, $http, $scope) {
  var vm = this;
  $scope.email = localStorage.getItem("email");

  if (!$scope.email) {
    $location.path('/login');
  }
  this.recommendation = function () {
    $location.path('/recommendation');
  };

  var email = localStorage.getItem("email");


  // $http.get('../../data/heartRate.json').then(function (response) {
  $http.get('/api/user/health/' + email).then(function (response) {
    console.log(response.data[0]);
  });


 $http.get('/fitbit/heartrate').then(function (response) {
  // $http.get('../../data/heartRate.json').then(function (response) {
    console.log("Heart Rate response:", response.data);
    var heart = response.data["activities-heart"];
    var heartRate = heart["0"].value;
    this.heartRateValues = heartRate["heartRateZones"];
    var length = heartRateValues.length;
    var status = [];
    var minutes = [];
    for (var i = 0; i < heartRateValues.length; i++) {
      status.push(heartRateValues[i].name);
      minutes.push(heartRateValues[i].minutes);
    }
    var images = ['../../images/icons/heart.png', '../../images/icons/heart3.png', '../../images/icons/heart2.png', '../../images/icons/heart4.png']
    vm.heartstatus = status;
    vm.minutes = minutes;
    vm.img = images;
    console.log("Minutes", minutes);
    for (var i = 0; i < heartRateValues.length; i++) {
      if(minutes[i] === undefined){
        minutes[i] = 0;
      }
      console.log("After Minutes",minutes[i])
    }
  });

  $http.get('/api/user/health/' + $scope.email).then(function (response) {

    if (response.status === 200) {
      $scope.health = response.data;
      console.log("200 health Response", $scope.health);
    }
    if (response.status === 204) {
      $scope.health = response.data;
      console.log("204 health Response", $scope.health, typeof ($scope.health));
    }
  });//End of current patient health


  $http.get('/api/user/prediction/' + $scope.email).then(function (response) {
    var predictionVal = response.data.Results;
    var index = predictionVal.lastIndexOf(',');
    var colorSet;
    $scope.predictionValue = predictionVal.substring(index + 2, index + 8);
    if($scope.predictionValue <= 0.5){
      colorSet = '#00FF7F'
    }
    else{
      colorSet ='#FF3232'
    }
    var bar = new ProgressBar.Circle(donut, {
      color: colorSet,
      // This has to be the same size as the maximum width to
      // prevent clipping
      strokeWidth: 4,
      trailWidth: 1,
      easing: 'easeInOut',
      duration: 1400,
      text: {
        autoStyleContainer: false
      },
      from: { color: colorSet, width: 4 },
      to: { color: colorSet, width: 4 },
      // Set default step function for all animate calls
      step: function (state, circle) {
        circle.path.setAttribute('stroke', state.color);
        circle.path.setAttribute('stroke-width', state.width);

        var value = Math.round(circle.value() * 100);
        if (value === 0) {
          circle.setText('');
        } else {
          circle.setText(value + "%");
        }

      }
    });
    bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
    bar.text.style.fontSize = '2rem';

    bar.animate($scope.predictionValue);
  });

  var bar = new ProgressBar.Path('#heart-path', {
  easing: 'easeInOut',
  duration: 4000
});

bar.set(0);
bar.animate(1.0); 


$scope.recommendation = function () {
  $scope.per = Number($scope.predictionValue) * 100;
console.log("Percentage:", $scope.per);
    // $location.path('/recommendation');

    $http.get('/api/user/present/goals/' + $scope.email).then(function (resp) {

       $http.get('/api/user/predefined/giveGoals/'+ $scope.per).then(function(response){

            $scope.preGoals = response.data;
            console.log("200 preGoals Response",$scope.preGoals);
            
            if($scope.preGoals["0"].i_steps && $scope.preGoals["0"].i_calories && $scope.preGoals["0"].i_distance && $scope.preGoals["0"].i_activeminutes && $scope.email){
            $scope.goalsSet = {
            "goals_steps": $scope.preGoals["0"].i_steps,
            "goals_calories": $scope.preGoals["0"].i_calories,
            "goals_distance": $scope.preGoals["0"].i_distance,
            "goals_activeminutes": $scope.preGoals["0"].i_activeminutes,
            "email": $scope.email
          }

          
              if(resp.status == 200){
                console.log("200 Present Goals",$scope.goalsSet);
                $http.post('/api/user/updateGoals/', $scope.goalsSet).then(function (response) {
                    if (response.status === 201) {
                      console.log("Updated Goals");
                      $location.path('/recommendation');
                    }
                });
              }   

              if(resp.status == 204){
                console.log("204 No Goals Presents",$scope.goalsSet);
                $http.post('/api/user/insertGoals/', $scope.goalsSet).then(function (response) {
                     if (response.status === 201) {
                      console.log("Inserted Goals");
                      $location.path('/recommendation');
                    }
                });
              }   

          }//Close of If loop


      });//End of getting predifined goals



    })//End of User Present in Goals table check
  };//End of Recommendation form



});
