adminModule
	.controller('cpuContentContainerController', ['$scope', 'Desktop', function($scope, Desktop){
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
		console.log('ok')
	}]);