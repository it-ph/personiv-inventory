adminModule
	.controller('workStationRightSidenavController', ['$scope', '$state', '$stateParams', 'Preloader', 'WorkStation', 'Department', function($scope, $state, $stateParams, Preloader, WorkStation, Department){
		/**
		 * Object for content view
		 *
		*/
		$scope.rightSidenav = {};

		var departmentID = $stateParams.departmentID;

		WorkStation.department(departmentID, $stateParams.workStationID)
			.success(function(data){
				$scope.rightSidenav.workStations = data;
			})
			.error(function(){
				Preloader.error();
			});

		$scope.rightSidenav.show = function(workStationID){
			$state.go('main.work-station', {'departmentID': departmentID, 'workStationID': workStationID});
		};
	}]);