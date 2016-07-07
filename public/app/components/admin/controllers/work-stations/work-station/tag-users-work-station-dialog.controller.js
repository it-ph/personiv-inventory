adminModule
	.controller('tagUsersWorkStationDialogController', ['$scope', '$stateParams', '$mdDialog', 'Preloader', 'Employee', 'EmployeeTag', 'AssetTagService', function($scope, $stateParams, $mdDialog, Preloader, Employee, EmployeeTag, AssetTagService){
		$scope.workStation = AssetTagService.getStation();
		$scope.employee_tag = {};
		$scope.employee_tag.work_station_id = $stateParams.workStationID;

		Employee.department($stateParams.departmentID)
			.success(function(data){
				$scope.employees = data;
			});

		$scope.cancel = function(){
			$mdDialog.cancel();
		};

		$scope.submit = function(){
			Preloader.preload();
			EmployeeTag.store($scope.employee_tag)
				.success(function(){
					//
				})
				.error(function(){
					Preloader.error();
				})
		};
	}]);