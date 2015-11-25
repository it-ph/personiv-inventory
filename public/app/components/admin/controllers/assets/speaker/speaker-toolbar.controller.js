adminModule
	.controller('speakerToolbarController', ['$scope', 'Speaker', function($scope, Speaker){
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
		$scope.toolbar.childState = 'Speaker';
	}]);