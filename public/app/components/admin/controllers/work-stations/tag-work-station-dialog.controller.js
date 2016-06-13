adminModule
	.controller('tagWorkStationDialogController', ['$scope', '$stateParams', '$mdDialog', 'Preloader', 'WorkStation', 'WorkStationTag', 'Department', function($scope, $stateParams, $mdDialog, Preloader, WorkStation, WorkStationTag, Department){
		var departmentID = $stateParams.departmentID;
		$scope.workStationTag = {};
		$scope.workStationTag.department_id = $stateParams.departmentID;

		$scope.divisions = [
			{'name':'Block A', 'value':'A'},
			{'name':'Block B', 'value':'B'},
		];

		$scope.types = [
			{'name':'Admin', 'value':'admin'},
			{'name':'Production', 'value':'production'},
		];		

		$scope.searchWorkStations = function(){

			WorkStation.vacant($scope.workStationTag)
				.success(function(data){
					$scope.workStations = data;
				})
				.error(function(){
					Preloader.error();
				});
		}

		Department.show(departmentID)
			.success(function(data){
				$scope.department = data;
			});

		$scope.cancel = function(){
			$mdDialog.cancel();
		};

		$scope.submit = function(){
			/* Starts Preloader */
			Preloader.preload();
			/**
			 * Stores Single Record
			*/
			WorkStationTag.store($scope.workStationTag)
				.success(function(){
					// Stops Preloader 
					Preloader.stop();
				})
				.error(function(){
					Preloader.error();
				})
		};

	}]);