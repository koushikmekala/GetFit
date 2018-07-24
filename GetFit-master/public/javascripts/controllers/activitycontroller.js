getFitApp.controller('activityController', function ($http, $window, $location) {

    var todayDate = new Date();
    var dateFormat = formatDate(todayDate);
    var $scope = this;
    var email = localStorage.getItem("email");
    if(!email){
		$location.path('/login');
	}
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        var date = [year, month, day].join('-');
        console.log('formated date', date);
        return date;
    }

    function percentage(value, goal) {
        var percent = (value / goal) * 100;
        if (percent <= 100) {
            return Math.round(percent);
        }
        else {
            return 100;
        }
    }

   $http.get('/fitbit/activity/' + dateFormat).then(function (response) {
    //   $http.get('../../data/activity.json').then(function(response) { 
        $scope.activity = response.data;
        console.log('response from fitbit activity', $scope.activity);

        // Activity data from Fitbit
        $scope.activitySteps = $scope.activity.summary.steps;
        $scope.activityCalories = $scope.activity.summary.activityCalories;
        $scope.activityDistance = $scope.activity.summary.distances["0"].distance;
        $scope.activityMinutes = $scope.activity.summary.fairlyActiveMinutes + $scope.activity.summary.lightlyActiveMinutes + $scope.activity.summary.veryActiveMinutes;
        $scope.activityWaterconsumed;
        $scope.activityStairs;

        $http.get('/api/user/goals/' + email).then(function (response) {
            $scope.recommendation = response.data[0];
            console.log("response from goals", $scope.recommendation);

            // Goal data from DB
            $scope.goalSteps = $scope.recommendation.goals_steps;
            $scope.goalCalories = $scope.recommendation.goals_calories;
            $scope.goalMinutes = $scope.recommendation.goals_activeminutes;
            $scope.goalDistance = $scope.recommendation.goals_distance;

            // Activity Percentage completed
            $scope.activeSteps = percentage($scope.activitySteps, $scope.goalSteps);
            $scope.activeCalories = percentage($scope.activityCalories, $scope.goalCalories);
            $scope.activeDistance = percentage($scope.activityDistance, $scope.goalDistance);
            $scope.activeMinutes = percentage($scope.activityMinutes, $scope.goalMinutes);


            //Steps Gauge Configuration
            var stepgaugeconfig = liquidFillGaugeDefaultSettings();
            stepgaugeconfig.circleColor = "#76C2AF";
            stepgaugeconfig.textColor = "#4F5D73";
            stepgaugeconfig.waveTextColor = "#4F5D73";
            stepgaugeconfig.waveColor = "#76C2AF";
            stepgaugeconfig.circleThickness = 0.1;
            stepgaugeconfig.textVertPosition = 0.8;
            stepgaugeconfig.waveAnimateTime = 2000;
            stepgaugeconfig.waveHeight = 0.3;
            stepgaugeconfig.waveCount = 1;
            stepgaugeconfig.textSize = 0.75;
            this.stepgauge = loadLiquidFillGauge("stepsgauge", $scope.activeSteps, stepgaugeconfig);

            // Distance Gauge Configuration
            var distancegaugeconfig = liquidFillGaugeDefaultSettings();
            distancegaugeconfig.circleThickness = 0.1;
            distancegaugeconfig.circleColor = "#00AEEF";
            distancegaugeconfig.textColor = "#000000";
            distancegaugeconfig.waveTextColor = "#000000";
            distancegaugeconfig.waveColor = "#00AEEF";
            distancegaugeconfig.textVertPosition = 0.8;
            distancegaugeconfig.waveAnimateTime = 1000;
            distancegaugeconfig.waveHeight = 0.05;
            distancegaugeconfig.waveAnimate = true;
            distancegaugeconfig.waveRise = false;
            distancegaugeconfig.waveHeightScaling = false;
            distancegaugeconfig.waveOffset = 0.25;
            distancegaugeconfig.textSize = 0.75;
            distancegaugeconfig.waveCount = 3;
            this.distancegauge = loadLiquidFillGauge("distancesgauge", $scope.activeDistance, distancegaugeconfig);


            // Calories Gauge Configuration

            var caloriegaugeconfig = liquidFillGaugeDefaultSettings();
            caloriegaugeconfig.circleColor = "#FE684E";
            caloriegaugeconfig.textColor = "#FF4444";
            caloriegaugeconfig.waveTextColor = "#FFAAAA";
            caloriegaugeconfig.waveColor = "#FE684E";
            caloriegaugeconfig.textVertPosition = 0.8;
            caloriegaugeconfig.waveAnimateTime = 1000;
            caloriegaugeconfig.waveHeight = 0.05;
            caloriegaugeconfig.waveAnimate = true;
            caloriegaugeconfig.waveRise = false;
            caloriegaugeconfig.waveHeightScaling = false;
            caloriegaugeconfig.waveOffset = 0.25;
            caloriegaugeconfig.textSize = 0.75;
            caloriegaugeconfig.waveCount = 3;
            var caloriegauge = loadLiquidFillGauge("caloriesgauge", $scope.activeCalories, caloriegaugeconfig);

            // Exercise Gauge Configuration
            var exercisegaugeconfig = liquidFillGaugeDefaultSettings();
            exercisegaugeconfig.circleThickness = 0.1;
            exercisegaugeconfig.circleColor = "#E0995E";
            exercisegaugeconfig.textColor = "#000000";
            exercisegaugeconfig.waveTextColor = "#000000";
            exercisegaugeconfig.waveColor = "#E0995E";
            exercisegaugeconfig.textVertPosition = 0.8;
            exercisegaugeconfig.waveAnimateTime = 1000;
            exercisegaugeconfig.waveHeight = 0.05;
            exercisegaugeconfig.waveAnimate = true;
            exercisegaugeconfig.waveRise = false;
            exercisegaugeconfig.waveHeightScaling = false;
            exercisegaugeconfig.waveOffset = 0.25;
            exercisegaugeconfig.textSize = 0.75;
            exercisegaugeconfig.waveCount = 3;
            this.exercisegauge = loadLiquidFillGauge("exercisesgauge", $scope.activeMinutes, exercisegaugeconfig);



            Highcharts.chart('activity', {

                chart: {
                    type: 'solidgauge',
                    marginTop: 50
                },

                title: {
                    text: 'Today\'s Activity',
                    style: {
                        fontSize: '24px'
                    }
                },

                tooltip: {
                    borderWidth: 0,
                    backgroundColor: 'none',
                    shadow: false,
                    style: {
                        fontSize: '16px'
                    },
                    pointFormat: '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold">{point.y}%</span>',
                    positioner: function (labelWidth) {
                        return {
                            x: 200 - labelWidth / 2,
                            y: 180
                        };
                    }
                },

                pane: {
                    startAngle: 0,
                    endAngle: 360,
                    background: [{ // Track for Move
                        outerRadius: '112%',
                        innerRadius: '88%',
                        backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0.3).get(),
                        borderWidth: 0
                    }, { // Track for Exercise
                        outerRadius: '87%',
                        innerRadius: '63%',
                        backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[1]).setOpacity(0.3).get(),
                        borderWidth: 0
                    }, { // Track for Stand
                        outerRadius: '62%',
                        innerRadius: '38%',
                        backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[2]).setOpacity(0.3).get(),
                        borderWidth: 0
                    }]
                },

                yAxis: {
                    min: 0,
                    max: 100,
                    lineWidth: 0,
                    tickPositions: []
                },

                plotOptions: {
                    solidgauge: {
                        dataLabels: {
                            enabled: false
                        },
                        linecap: 'round',
                        stickyTracking: false,
                        rounded: true
                    }
                },

                series: [{
                    name: 'Steps',
                    borderColor: Highcharts.getOptions().colors[0],
                    data: [{
                        color: Highcharts.getOptions().colors[0],
                        radius: '112%',
                        innerRadius: '88%',
                        y: $scope.activeSteps
                    }]
                }, {
                    name: 'Calories',
                    borderColor: Highcharts.getOptions().colors[1],
                    data: [{
                        color: Highcharts.getOptions().colors[1],
                        radius: '87%',
                        innerRadius: '63%',
                        y: $scope.activeCalories
                    }]
                }, {
                    name: 'Distance',
                    borderColor: Highcharts.getOptions().colors[2],
                    data: [{
                        color: Highcharts.getOptions().colors[2],
                        radius: '62%',
                        innerRadius: '38%',
                        y: $scope.activeDistance
                    }]
                }]
            },

                /**
                 * In the chart load callback, add icons on top of the circular shapes
                 */
                function callback() {

                    // Move icon
                    this.renderer.path(['M', -8, 0, 'L', 8, 0, 'M', 0, -8, 'L', 8, 0, 0, 8])
                        .attr({
                            'stroke': '#303030',
                            'stroke-linecap': 'round',
                            'stroke-linejoin': 'round',
                            'stroke-width': 2,
                            'zIndex': 10
                        })
                        .translate(190, 26)
                        .add(this.series[2].group);

                    // Exercise icon
                    this.renderer.path(['M', -8, 0, 'L', 8, 0, 'M', 0, -8, 'L', 8, 0, 0, 8, 'M', 8, -8, 'L', 16, 0, 8, 8])
                        .attr({
                            'stroke': '#303030',
                            'stroke-linecap': 'round',
                            'stroke-linejoin': 'round',
                            'stroke-width': 2,
                            'zIndex': 10
                        })
                        .translate(190, 61)
                        .add(this.series[2].group);

                    // Stand icon
                    this.renderer.path(['M', 0, 8, 'L', 0, -8, 'M', -8, 0, 'L', 0, -8, 8, 0])
                        .attr({
                            'stroke': '#303030',
                            'stroke-linecap': 'round',
                            'stroke-linejoin': 'round',
                            'stroke-width': 2,
                            'zIndex': 10
                        })
                        .translate(190, 96)
                        .add(this.series[2].group);
                });

        });
    });


    // Final % values
    // var steps = this.activity.steps;
    // var calories = this.activity.activityCalories;
    // var distance = this.activity.distances[0].distance;

    function update() {
        if (Math.random() > .5) {
            return Math.round(Math.random() * 100);
        } else {
            return (Math.random() * 100).toFixed(1);
        }
    }

});