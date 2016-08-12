adminModule
	.controller('editdepartmentWorkStationDialogController', ['$scope', '$mdDialog', 'Preloader', 'WorkStation', 'DepartmentWorkStation', 'Department', function($scope, $mdDialog, Preloader, WorkStation, DepartmentWorkStation, Department){
		var workStationID = Preloader.get();
		var busy = false;

		$scope.init = function(){
			Department.index()
				.then(function(data){
					$scope.departments = data.data;
					return;
				})
				.then(function(){			
					WorkStation.show(workStationID)
						.success(function(data){
							$scope.workStation = data;
							$scope.workStation.departments = [];

							angular.forEach($scope.departments, function(item, key){
								$scope.workStation.departments.push({'department_id':null});

								DepartmentWorkStation.relation(item.id, workStationID)
									.success(function(data){
										if(data){
											$scope.workStation.departments.splice(key, 1, data);
										}
									})
							});

						})
						.error(function(){
							Preloader.error();
						})
				}, function(){
					Preloader.error();
				});
		}();

		$scope.checkIP = function(){
			$scope.duplicate = false;
			if($scope.workStation.ip_address){
				WorkStation.checkIP(workStationID, $scope.workStation)
					.success(function(data){
						$scope.duplicate = data;
					})
					.error(function(){
						Preloader.error();
					})
			}
		}

		$scope.cancel = function(){
			$mdDialog.cancel();
		};

		$scope.submit = function(){
			$scope.show = true;
			if($scope.workStationForm.$invalid){
				angular.forEach($scope.workStationForm.$error, function(field){
					angular.forEach(field, function(errorField){
						errorField.$setTouched();
					});
				});
			}
			else{
				if(!busy && !$scope.duplicate && $scope.workStation.departments.length)
				{
					busy = true;
					/* Starts Preloader */
					// Preloader.preload();
					/**
					 * Stores Single Record
					*/
					WorkStation.update(workStationID, $scope.workStation)
						.then(function(data){
							return data.data;
						})
						.then(function(data){
							if(!data){
								$scope.tags = 0;
								angular.forEach($scope.workStation.departments, function(item){
									if(item.department_id)
									{
										item.work_station_id = workStationID;
										$scope.tags+=1;
									}
								});

								if($scope.tags >= 1){
									DepartmentWorkStation.update(workStationID, $scope.workStation.departments)
										.success(function(){
											busy = false;
											Preloader.stop();
										})
										.error(function(){
											Preloader.error();
											busy = false;
										})
								}
								else{
									busy = false
								}


							}
							else{
								busy = false;
								// Preloader.stop();
							}

						}, function(){
							Preloader.error();
							busy = false;
						})
				}
			}
		};

	}]);