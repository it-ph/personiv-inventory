adminModule
	.controller('createDepartmentDialogController', ['$scope', '$mdDialog', 'Department', 'Preloader', function($scope, $mdDialog, Department, Preloader){
		$scope.department = {};
		$scope.label = "New Department";
		var busy = false;

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.submit = function(){
			if($scope.departmentForm.$invalid){
				angular.forEach($scope.departmentForm.$error, function(field){
					angular.forEach(field, function(errorField){
						errorField.$setTouched();
					});
				});
			}
			else{
				/* Starts Preloader */
				Preloader.loading();
				/**
				 * Stores Single Record
				*/
				if(!busy){
					busy = true;
					Department.store($scope.department)
						.success(function(){
							// Stops Preloader 
							Preloader.stop();
							busy = false;
						})
						.error(function(data){
							Preloader.error();
							busy = false;
						});
				}
			}
		}
	}]);