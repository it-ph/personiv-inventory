adminModule
	.controller('editWorkStationDialogController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'WorkStation', 'AssetTag', 'AssetTagService', 'Department', 'WorkStationTag', function($scope, $state, $stateParams, $mdDialog, Preloader, WorkStation, AssetTag, AssetTagService, Department, WorkStationTag){
		var workStationID = $stateParams.workStationID;
		var departmentID = $stateParams.departmentID;
		$scope.workStation = AssetTagService.getStation();

		$scope.workStationTag = {};
		$scope.workStationTag.work_station_id = workStationID;

		Department.others()
			.success(function(data){
				$scope.workStationTag.departments = data;
			});

		$scope.cancel = function(){
			$mdDialog.cancel();
		};

		$scope.submit = function(){
			Preloader.preload()
			WorkStationTag.update(departmentID, $scope.workStationTag)
				.success(function(data){
					$state.go('main.work-station', {'departmentID':$scope.workStationTag.department_id, 'workStationID': workStationID})
					$mdDialog.hide();
				})
				.error(function(){
					Preloader.stop();
				});
		};
	}]);