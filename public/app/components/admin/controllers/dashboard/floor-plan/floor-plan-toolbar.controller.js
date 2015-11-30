adminModule
	.controller('floorPlanToolbarController', ['$scope', '$stateParams', 'departmentService', 'Department', function($scope, $stateParams, departmentService, Department){
		/**
		 *  Object for toolbar view.
		 *
		*/
		$scope.toolbar = {};

		/**
		 * Properties and method of toolbar.
		 *
		*/
		$scope.toolbar.parentState = 'Floor Plan';

		var index = $stateParams.departmentID - 1;
		$scope.toolbar.parentState = 'Floor Plan';

		var departments = departmentService.get();
		if(!departments.length){
			Department.index()
				.success(function(data){
					departments = data;
					$scope.toolbar.childState = index > -1 ? departments[index].name : null;
				})
				.error(function(data){
					Preload.error();
				});
		}
		else{
			$scope.toolbar.childState =  index > -1 ? departments[index].name : null;
		}
	}]);