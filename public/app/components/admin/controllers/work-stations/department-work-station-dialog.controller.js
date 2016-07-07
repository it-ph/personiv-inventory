adminModule
	.controller('departmentWorkStationDialogController', ['$scope', '$mdDialog', 'Preloader', 'WorkStation', 'DepartmentWorkStation', 'Department', function($scope, $mdDialog, Preloader, WorkStation, DepartmentWorkStation, Department){
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
							DepartmentWorkStation.show(workStationID)
								.success(function(data){
									$scope.workStation.departments = data;
								})
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
			WorkStation.checkIP(workStationID, $scope.workStation)
				.success(function(data){
					$scope.duplicate = data;
				})
				.error(function(){
					Preloader.error();
				})
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
								angular.forEach($scope.workStation.departments, function(item, key){
									item.work_station_id = workStationID;
								})

								DepartmentWorkStation.store($scope.workStation.departments)
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