adminModule
	.controller('transferUsersDialogController', ['$scope', '$stateParams', '$mdDialog', 'Preloader', 'EmployeeTag', 'WorkStation', 'UserService', function($scope, $stateParams, $mdDialog, Preloader, EmployeeTag, WorkStation, UserService){
		$scope.employee_tag = {};
		$scope.employee_tag.employee_tag_id = UserService.get();

		WorkStation.department($stateParams.departmentID, $stateParams.workStationID)
			.success(function(data){
				$scope.workStations = data;
			});

		EmployeeTag.show($scope.employee_tag.employee_tag_id)
			.success(function(data){
				$scope.employee = data;
				$scope.employee_tag.employee_id = data.id;
			});

		$scope.cancel = function(){
			$mdDialog.cancel();
		};

		$scope.submit = function(){
			Preloader.preload();
			EmployeeTag.update($scope.employee_tag.employee_tag_id, $scope.employee_tag)
				.success(function(){
					//
				})
				.error(function(){
					Preloader.error();
				})
		};
	}]);