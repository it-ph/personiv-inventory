adminModule
	.controller('floorPlanContentController', ['$scope', '$state', '$stateParams', function($scope, $state, $stateParams){
		// onclick of 
		$scope.show = function(id){
			$state.go('main.work-station', {'departmentID':$stateParams.departmentID, 'workStationID': id});
		};
	}]);