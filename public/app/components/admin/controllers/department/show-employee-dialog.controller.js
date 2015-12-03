adminModule
	.controller('showEmployeeDialogController', ['$scope', '$mdDialog', '$stateParams', 'UserService', 'EmployeeTag', 'Employee', function($scope, $mdDialog, $stateParams, UserService, EmployeeTag, Employee){
		var employeeID = UserService.get();

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		Employee.show(employeeID)
			.success(function(data){
				$scope.employee = data;
			});

		EmployeeTag.employee(employeeID)
			.success(function(data){
				$scope.workstation = data;
			});
	}]);