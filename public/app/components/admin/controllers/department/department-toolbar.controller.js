adminModule
	.controller('departmentToolbarController', ['$scope', '$stateParams', 'Department', function($scope, $stateParams, Department){
		/**
		 *  Object for toolbar view.
		 *
		*/
		$scope.toolbar = {};

		/**
		 * Properties and method of toolbar.
		 *
		*/
		$scope.toolbar.parentState = 'Departments';
		
		Department.show($stateParams.departmentID)
			.success(function(data){
				$scope.toolbar.childState = data.name;
			});

		/**
		 * Search database and look for user input depending on state.
		 *
		*/
		$scope.searchUserInput = function(){
			return;
		};

	}]);