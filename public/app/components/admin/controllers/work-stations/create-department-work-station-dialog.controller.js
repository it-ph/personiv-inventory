adminModule
	.controller('createDepartmentWorkStationDialogController', ['$scope', '$mdDialog', 'Preloader', 'WorkStation', 'DepartmentWorkStation', 'Department', function($scope, $mdDialog, Preloader, WorkStation, DepartmentWorkStation, Department){
		var workStationID = Preloader.get();
		var busy = false;

		$scope.init = function(){
			WorkStation.show(workStationID)
				.success(function(data){
					$scope.workStation = data;				
				})
				.error(function(){
					Preloader.error();
				});

			Department.index()
				.success(function(data){
					$scope.departments = data;
				})
				.error(function(){
					Preloader.error();
				})
		}();

		$scope.cancel = function(){
			$mdDialog.cancel();
		};

		$scope.submit = function(){
			if($scope.workStationForm.$invalid){
				angular.forEach($scope.workStationForm.$error, function(field){
					angular.forEach(field, function(errorField){
						errorField.$setTouched();
					});
				});
			}
			else{
				if(!busy)
				{
					busy = true;
					/* Starts Preloader */
					Preloader.preload();
					/**
					 * Stores Single Record
					*/
					WorkStation.update(workStationID, $scope.workStation)
						.then(function(){
							return;
						})
						.then(function(){
							angular.forEach($scope.workStation.departments, function(item){
								item.work_station_id = workStationID;
							})

							DepartmentWorkStation.store($scope.workStation.departments)
								.success(function(){
									busy = false;
								})
								.error(function(){
									Preloader.error();
									busy = false;
								})

						}, function(){
							Preloader.error();
							busy = false;
						})
				}
			}
		};

	}]);