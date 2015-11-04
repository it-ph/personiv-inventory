adminModule
	.controller('hardDiskContentContainerController', ['$scope', 'Desktop', function($scope, Desktop){
		/**
		 * Object for content view
		 *
		*/
		$scope.fab = {};

		$scope.fab.icon = 'mdi-plus';
		$scope.fab.label = 'Add';

		$scope.fab.action = function(){
			return;
		};
	}]);