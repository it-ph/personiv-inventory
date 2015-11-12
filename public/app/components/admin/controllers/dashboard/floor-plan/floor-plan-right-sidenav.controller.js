adminModule
	.controller('floorPlanRightSidenavController', ['$scope', '$state', '$stateParams', 'departmentService', 'Department',  function($scope, $state, $stateParams, departmentService, Department){
		/**
		 * Object for content view
		 *
		*/
		$scope.rightSidenav = {};

		var departments = departmentService.get();
		if(!departments.length){
			Department.index()
				.success(function(data){
					departments = data;
					$scope.rightSidenav.departments = data;
				})
				.error(function(data){
					Preload.error();
				});
		}
		else{
			$scope.rightSidenav.departments = departments;
		}

	}]);