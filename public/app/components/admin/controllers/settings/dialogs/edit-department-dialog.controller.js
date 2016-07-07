adminModule
	.controller('editDepartmentDialogController', ['$scope', '$mdDialog', 'Department', 'Preloader', function($scope, $mdDialog, Department, Preloader){
		var departmentID = Preloader.get();	
		var busy = false;
		$scope.label = "Edit Department";

		Department.show(departmentID)
			.success(function(data){
				$scope.department = data;
			})
			.error(function(){
				Preloader.error();
			})

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
					Department.update(departmentID, $scope.department)
						.success(function(){
							// Stops Preloader 
							Preloader.stop();
							busy = false;
						})
						.error(function(){
							Preloader.error();
							busy = false;
						});
				}
			}
		}
	}]);