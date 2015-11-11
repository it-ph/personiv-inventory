adminModule
	.controller('videoCardToolbarController', ['$scope', '$stateParams', 'VideoCard', function($scope, $stateParams, VideoCard){
		/**
		 *  Object for toolbar view.
		 *
		*/
		$scope.toolbar = {};
		
		/**
		 * Properties of toolbar.
		 *
		*/
		$scope.toolbar.parentState = 'Assets';
		$scope.toolbar.childState = 'Video Card';
	}]);