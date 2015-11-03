adminModule
	.controller('departmentToolbarController', ['$scope', '$stateParams', 'Department', 'departmentService', function($scope, $stateParams, Department, departmentService){
		/**
		 *  Object for toolbar view.
		 *
		*/
		$scope.toolbar = {};

		/**
		 * Properties and method of toolbar.
		 *
		*/

		/**
		 * Fetch the department data stored at deparments servce.
		 *
		*/
		var departments = departmentService.get();
		var index = $stateParams.departmentID - 1;

		$scope.toolbar.parentState = 'Departments';
		$scope.toolbar.childState = departments[index].name;
		
		/**
		 * Search database and look for user input depending on state.
		 *
		*/
		$scope.searchUserInput = function(){
			return;
		};

	}]);