adminModule
	.controller('mainViewController', ['$scope', 'User', function($scope, User){
		/**
		 * Fetch authenticated user information
		 *
		*/
		User.index()
			.success(function(data){
				$scope.user = data;
			});
	}]);