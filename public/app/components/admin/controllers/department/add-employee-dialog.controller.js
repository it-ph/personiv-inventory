adminModule
	.controller('addEmployeeDialogController', ['$scope', '$stateParams', '$mdDialog', 'Preloader', 'Department', 'Employee', function($scope, $stateParams, $mdDialog, Preloader, Department, Employee){
		$scope.employee = {};
		$scope.employee.department_id = $stateParams.departmentID;

		Department.show($stateParams.departmentID)
			.success(function(data){
				$scope.department = data;
			});

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.submit = function(){
			/* Starts Preloader */
			Preloader.preload();
			/**
			 * Stores Single Record
			*/
			Employee.store($scope.employee)
				.then(function(){
					// Stops Preloader 
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		}

	}]);