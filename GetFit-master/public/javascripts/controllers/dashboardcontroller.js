getFitApp.controller('dashboardController', function ($http, $window, $location, $scope) {
	$scope.email = localStorage.getItem("email");
	if(!$scope.email){
		$location.path('/login');
	}
	var vm = this;
	var todayDate = new Date();
	var dateFormat = formatDate(todayDate);
	function formatDate(date) {
		var d = new Date(date),
			month = '' + (d.getMonth() + 1),
			day = '' + d.getDate(),
			year = d.getFullYear();

		if (month.length < 2) month = '0' + month;
		if (day.length < 2) day = '0' + day;
		this.date = [year, month, day].join('-');
		return this.date;
	}

	function formatDay(date) {
		var d = new Date(date),
			month = '' + (d.getMonth() + 1),
			day = '' + d.getDate(),
			year = d.getFullYear();

		if (month.length < 2) month = '0' + month;
		if (day.length < 2) day = '0' + day;
		this.date = [year, Number(month), day - 7]
		return this.date;
	}

	var dayFormat = formatDay(todayDate);

	this.updatebmi = function () {
		vm.weightinkg = (this.weightinlb * 0.453592).toFixed(2);
		vm.bmivalue = (vm.weightinkg / (vm.bmiheight)).toFixed(1);
		vm.bmidisplay = false;
		if (vm.bmivalue < 18.5 || vm.bmivalue > 25) {
			vm.bmidisplay = false;
		}
		else {
			vm.bmidisplay = true;
		}

	};


	 $http.get('/fitbit/activities/steps/' + dateFormat).then(function (response) {
		//$http.get('../../data/activities-steps7d.json').then(function (response) {
		console.log("Dash Response", response);
		$scope.weekSteps = response.data;
		var str = $scope.weekSteps["activities-steps"]["0"].dateTime;
		var res = str.split("-");

		Highcharts.chart('stepCount', {

			title: {
				text: 'Daily Step Count'
			},

			subtitle: {
				text: 'Weekly Data'
			},

			yAxis: {
				title: {
					text: 'Number of Steps'
				}
			},
			xAxis: {
				type: 'datetime'
			},
			legend: {
				layout: 'vertical',
				align: 'right',
				verticalAlign: 'middle'
			},

			plotOptions: {
				series: {
					pointStart: Date.UTC(res[0], res[1] - 1, res[2]),
					pointInterval: 24 * 3600 * 1000
				}
			},

			series: [{
				name: 'Steps',
				data: [Number($scope.weekSteps["activities-steps"]["0"].value), Number($scope.weekSteps["activities-steps"]["1"].value), Number($scope.weekSteps["activities-steps"]["2"].value),
				Number($scope.weekSteps["activities-steps"]["3"].value), Number($scope.weekSteps["activities-steps"]["4"].value), Number($scope.weekSteps["activities-steps"]["5"].value),
				Number($scope.weekSteps["activities-steps"]["6"].value)]
			}]

		});

	});

	function dayName(dStr) {
		var d = new Date(dStr);
		var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

		return days[d.getDay()];
	}

	 $http.get('/fitbit/activities/calories/' + dateFormat).then(function (response) {
	//	$http.get('../../data/activities-calories7d.json').then(function (response) {
		console.log("Calories response", response);
		$scope.weekCalories = response.data;
		var str = $scope.weekCalories["activities-calories"]["0"].dateTime;
		Number($scope.weekCalories["activities-calories"]["0"].value)
		Highcharts.chart('calories', {
			chart: {
				type: 'column'
			},
			title: {
				text: 'Calories Burnt'
			},
			subtitle: {
				text: 'Weekly Data'
			},
			xAxis: {
				type: 'category',
				labels: {
					rotation: -45,
					style: {
						fontSize: '13px',
						fontFamily: 'Verdana, sans-serif'
					}
				}
			},
			yAxis: {
				min: 0,
				title: {
					text: 'Calories'
				}
			},
			legend: {
				enabled: true
			},
			series: [{
				name: 'Calories burnt',
				data: [
					[dayName($scope.weekCalories["activities-calories"]["0"].dateTime), Number($scope.weekCalories["activities-calories"]["0"].value)],
					[dayName($scope.weekCalories["activities-calories"]["1"].dateTime), Number($scope.weekCalories["activities-calories"]["1"].value)],
					[dayName($scope.weekCalories["activities-calories"]["2"].dateTime), Number($scope.weekCalories["activities-calories"]["2"].value)],
					[dayName($scope.weekCalories["activities-calories"]["3"].dateTime), Number($scope.weekCalories["activities-calories"]["3"].value)],
					[dayName($scope.weekCalories["activities-calories"]["4"].dateTime), Number($scope.weekCalories["activities-calories"]["4"].value)],
					[dayName($scope.weekCalories["activities-calories"]["5"].dateTime), Number($scope.weekCalories["activities-calories"]["5"].value)],
					[dayName($scope.weekCalories["activities-calories"]["6"].dateTime), Number($scope.weekCalories["activities-calories"]["6"].value)]
				]
			}]
		});

	});//End of 7d calories


 $http.get('/fitbit/activities/distance/' + dateFormat).then(function (response) {
//		$http.get('../../data/activities-distance7d.json').then(function (response) {
		console.log("Distance response", response);
		
		$scope.weekDistance = response.data;
		var str = $scope.weekDistance["activities-distance"]["0"].dateTime;
		var res = str.split("-");
		
		var chart = new Highcharts.Chart({
			chart: {
				renderTo: 'activeDistance',
				type: 'column',
				options3d: {
					enabled: true,
					alpha: 15,
					beta: 15,
					depth: 50,
					viewDistance: 25
				}
			},
			title: {
				text: 'Active Distance'
			},
			subtitle: {
				text: 'Weekly Data'
			},
			yAxis: {
						title: {
							text: 'Miles'
						}
					},
					xAxis: {
						type: 'datetime'
					},
					legend: {
						layout: 'horizontal',
						align: 'center',
						verticalAlign: 'bottom'
					},

					plotOptions: {
				column: {
					depth: 25
				},
						series: {
							pointStart: Date.UTC(res[0],res[1]-1,res[2]),
							pointInterval: 24 * 3600 * 1000
						}
					},
			series: [{
					name: 'Active Distance',
				data: [Number($scope.weekDistance["activities-distance"]["0"].value), Number($scope.weekDistance["activities-distance"]["1"].value), 
				Number($scope.weekDistance["activities-distance"]["2"].value), Number($scope.weekDistance["activities-distance"]["3"].value), 
				Number($scope.weekDistance["activities-distance"]["4"].value), Number($scope.weekDistance["activities-distance"]["5"].value),
				Number($scope.weekDistance["activities-distance"]["6"].value)]
			}]
		});



	});//End of 7d active distance



//Begin of Active Minutes 7D display

$http.get('/fitbit/activities/minutesSedentary/' + dateFormat).then(function (resp1) {
//		$http.get('../../data/activities-minutesSedentary7d.json').then(function (resp1) {
			
			$scope.weekSedentary = resp1.data;

	 $http.get('/fitbit/activities/minutesLightlyActive/' + dateFormat).then(function (resp2) {
	//	$http.get('../../data/activities-minutesLightlyActive7d.json').then(function (resp2) {

				$scope.weekLightly = resp2.data;

	 $http.get('/fitbit/activities/minutesFairlyActive/' + dateFormat).then(function (resp3) {
	//	$http.get('../../data/activities-minutesFairlyActive7d.json').then(function (resp3) {
					
					$scope.weekFairly = resp3.data;


			 $http.get('/fitbit/activities/minutesVeryActive/' + dateFormat).then(function (resp4) {
		//$http.get('../../data/activities-minutesVeryActive7d.json').then(function (resp4) {

				$scope.weekVery = resp4.data;



						Highcharts.chart('activeMinutes', {

								title: {
									text: 'Active Minutes'
								},

								subtitle: {
									text: 'Weekly Data'
								},
							xAxis: {
											type: 'category',
											labels: {
												rotation: -45,
												style: {
													fontSize: '13px',
													fontFamily: 'Verdana, sans-serif'
												}
											}
										},
								yAxis: {
									title: {
										text: 'Minutes'
									}
								},
							legend: {
											enabled: true
										},

								series: [
								{
									name: 'Sedentary Minutes',
									data: [
									[dayName($scope.weekSedentary["activities-minutesSedentary"]["0"].dateTime), Number($scope.weekSedentary["activities-minutesSedentary"]["0"].value)],
									[dayName($scope.weekSedentary["activities-minutesSedentary"]["1"].dateTime), Number($scope.weekSedentary["activities-minutesSedentary"]["1"].value)],
									[dayName($scope.weekSedentary["activities-minutesSedentary"]["2"].dateTime), Number($scope.weekSedentary["activities-minutesSedentary"]["2"].value)],
									[dayName($scope.weekSedentary["activities-minutesSedentary"]["3"].dateTime), Number($scope.weekSedentary["activities-minutesSedentary"]["3"].value)],
									[dayName($scope.weekSedentary["activities-minutesSedentary"]["4"].dateTime), Number($scope.weekSedentary["activities-minutesSedentary"]["4"].value)],
									[dayName($scope.weekSedentary["activities-minutesSedentary"]["5"].dateTime), Number($scope.weekSedentary["activities-minutesSedentary"]["5"].value)],
									[dayName($scope.weekSedentary["activities-minutesSedentary"]["6"].dateTime), Number($scope.weekSedentary["activities-minutesSedentary"]["6"].value)]
										]
								}, 
								{
									name: 'Lightly Active Minutes',
									data: [
									[dayName($scope.weekLightly["activities-minutesLightlyActive"]["0"].dateTime), Number($scope.weekLightly["activities-minutesLightlyActive"]["0"].value)],
									[dayName($scope.weekLightly["activities-minutesLightlyActive"]["1"].dateTime), Number($scope.weekLightly["activities-minutesLightlyActive"]["1"].value)],
									[dayName($scope.weekLightly["activities-minutesLightlyActive"]["2"].dateTime), Number($scope.weekLightly["activities-minutesLightlyActive"]["2"].value)],
									[dayName($scope.weekLightly["activities-minutesLightlyActive"]["3"].dateTime), Number($scope.weekLightly["activities-minutesLightlyActive"]["3"].value)],
									[dayName($scope.weekLightly["activities-minutesLightlyActive"]["4"].dateTime), Number($scope.weekLightly["activities-minutesLightlyActive"]["4"].value)],
									[dayName($scope.weekLightly["activities-minutesLightlyActive"]["5"].dateTime), Number($scope.weekLightly["activities-minutesLightlyActive"]["5"].value)],
									[dayName($scope.weekLightly["activities-minutesLightlyActive"]["6"].dateTime), Number($scope.weekLightly["activities-minutesLightlyActive"]["6"].value)]
										]
								}, 
								{
									name: 'Fairly Active Minutes',
									data: [
									[dayName($scope.weekFairly["activities-minutesFairlyActive"]["0"].dateTime), Number($scope.weekFairly["activities-minutesFairlyActive"]["0"].value)],
									[dayName($scope.weekFairly["activities-minutesFairlyActive"]["1"].dateTime), Number($scope.weekFairly["activities-minutesFairlyActive"]["1"].value)],
									[dayName($scope.weekFairly["activities-minutesFairlyActive"]["2"].dateTime), Number($scope.weekFairly["activities-minutesFairlyActive"]["2"].value)],
									[dayName($scope.weekFairly["activities-minutesFairlyActive"]["3"].dateTime), Number($scope.weekFairly["activities-minutesFairlyActive"]["3"].value)],
									[dayName($scope.weekFairly["activities-minutesFairlyActive"]["4"].dateTime), Number($scope.weekFairly["activities-minutesFairlyActive"]["4"].value)],
									[dayName($scope.weekFairly["activities-minutesFairlyActive"]["5"].dateTime), Number($scope.weekFairly["activities-minutesFairlyActive"]["5"].value)],
									[dayName($scope.weekFairly["activities-minutesFairlyActive"]["6"].dateTime), Number($scope.weekFairly["activities-minutesFairlyActive"]["6"].value)]
										]
								}, 
								{
									name: 'Very Active Minutes',
									data: [
									[dayName($scope.weekVery["activities-minutesVeryActive"]["0"].dateTime), Number($scope.weekVery["activities-minutesVeryActive"]["0"].value)],
									[dayName($scope.weekVery["activities-minutesVeryActive"]["1"].dateTime), Number($scope.weekVery["activities-minutesVeryActive"]["1"].value)],
									[dayName($scope.weekVery["activities-minutesVeryActive"]["2"].dateTime), Number($scope.weekVery["activities-minutesVeryActive"]["2"].value)],
									[dayName($scope.weekVery["activities-minutesVeryActive"]["3"].dateTime), Number($scope.weekVery["activities-minutesVeryActive"]["3"].value)],
									[dayName($scope.weekVery["activities-minutesVeryActive"]["4"].dateTime), Number($scope.weekVery["activities-minutesVeryActive"]["4"].value)],
									[dayName($scope.weekVery["activities-minutesVeryActive"]["5"].dateTime), Number($scope.weekVery["activities-minutesVeryActive"]["5"].value)],
									[dayName($scope.weekVery["activities-minutesVeryActive"]["6"].dateTime), Number($scope.weekVery["activities-minutesVeryActive"]["6"].value)]
										]
								}
								
								]

							});






			});//End of Very Active Minutes


		});//End of Fairly Active Minutes


	});//End of Lightly Active Minutes


});//End of Active minutes




	$http.get('/api/user/present/fitbit/' + $scope.email).then(function (resp) {
		console.log("Checking Whether fitbit data is present or not", resp.status, $scope.email);


		 $http.get('/fitbit/activity/' + dateFormat).then(function (response) {
		//	$http.get('../../data/activity.json').then(function (response) {

			$scope.activity = response.data;
			$scope.email = localStorage.getItem("email");
			// Activity data from Fitbit
			$scope.activitySteps = $scope.activity.summary.steps;
			$scope.activityCalories = $scope.activity.summary.activityCalories;
			$scope.activityDistance = $scope.activity.summary.distances["0"].distance;
			$scope.activityMinutes = $scope.activity.summary.fairlyActiveMinutes + $scope.activity.summary.lightlyActiveMinutes + $scope.activity.summary.veryActiveMinutes;

			if ($scope.activitySteps != null && $scope.activityCalories != null && $scope.activityDistance != null && $scope.activityMinutes != null) {

				$scope.fitbit_data = {
					steps: $scope.activitySteps,
					calories: $scope.activityCalories,
					distance: $scope.activityDistance,
					activeminutes: $scope.activityMinutes,
					email: $scope.email
				};

				if (resp.status === 200) {
					console.log("Present", resp);
					console.log("Scope Fitbit data", $scope.fitbit_data);
					$http.post('/api/user/updateFitbit/', $scope.fitbit_data).then(function (response) {
						console.log("Fitbit data update", response);
						if (response.status === 200) {
							console.log("Updated values");
						}
					}).catch(function (error) {
						console.log("error");
					});

				}
				else if (resp.status === 204) {
					console.log("No Data present");

					$http.post('/api/user/insertFitbit/', $scope.fitbit_data).then(function (response) {
						console.log("Fitbit data", response);

						if (response.status === 201) {
							console.log("Inserted FITBIT data in to DB")
						}
					}).catch(function (error) {
						console.log("error");
					});
				}


				$http.get('/api/user/fitbit/' + $scope.email).then(function (response) {
					$scope.dailyActivity = response.data;
				}).catch(function (error) {
					console.log("error");
				});
			}

		});//Getting Activity from Fitbit API




	});//fitbit table data present DB



 $http.get('/fitbit/profile').then(function (response) {
	//$http.get('../../data/profile.json').then(function(response) {
		console.log("Fitbit Profile", response.data);
		$scope.profile_fitbit = response.data;
		$scope.profile_data = {
			dob: $scope.profile_fitbit.user.dateOfBirth,
			age: $scope.profile_fitbit.user.age,
			gender: $scope.profile_fitbit.user.gender,
			weight: $scope.profile_fitbit.user.weight,
			height: $scope.profile_fitbit.user.height,
			averageSteps: $scope.profile_fitbit.user.averageDailySteps,
			badge1Des: $scope.profile_fitbit.user.topBadges["0"].description,
			badge1Img: $scope.profile_fitbit.user.topBadges["0"].image125px,
			badge2Des: $scope.profile_fitbit.user.topBadges["1"].description,
			badge2Img: $scope.profile_fitbit.user.topBadges["1"].image125px,
			userId: $scope.profile_fitbit.user.encodedId,
			email: $scope.email
		};


		$http.post('/api/user/updateProfile/', $scope.profile_data).then(function (response) {

			if (response.status === 201) {
				console.log("Fitbit profile data inserted in to Profile Table");
			}

			$http.get('/api/user/profile/' + $scope.email).then(function (resp) {
				if (resp.status === 200) {

					$scope.profile = resp.data["0"];
					console.log("Profile data from DB:", $scope.profile);

					vm.weight = $scope.profile.weight;
					vm.height = $scope.profile.height;
					vm.weightinlb = ($scope.profile.weight * 2.2).toFixed(2);
					vm.heightinmeters = (vm.height / 100).toFixed(2);
					vm.bmiheight = (vm.heightinmeters * vm.heightinmeters).toFixed(2);
					vm.bmivalue = (vm.weight / (vm.bmiheight)).toFixed(1);
					vm.bmidisplay = false;
					if (vm.bmivalue < 18.5 || vm.bmivalue > 25) {
						vm.bmidisplay = false;
					}
					else {
						vm.bmidisplay = true;
					}



				}
			});//End of get Profile

		}).catch(function (error) {
			console.log("error");
		 });		//End of Update profile api call


	});			//End of Fitbit profile.json call



});//end of dashboardController