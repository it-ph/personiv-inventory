adminModule
	.controller('usersWorkStationDialogController', ['$scope', '$stateParams', '$mdDialog', 'Preloader', 'Employee', 'AssetTagService', function($scope, $stateParams, $mdDialog, Preloader, Employee, AssetTagService){
		$scope.workStation = AssetTagService.getStation();

		Employee.workstation($stateParams.workStationID)
			.success(function(data){
				$scope.show = true;
				$scope.employees = data;
			});

		$scope.cancel = function(){
			$mdDialog.cancel();
		};

		$scope.tag = function(){
			$mdDialog.hide();
		};

		$scope.transfer = function(id){
			$mdDialog.hide(id);
		}
	}]);