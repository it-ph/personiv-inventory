adminModule
	.controller('firewallToolbarController', ['$scope', 'Firewall', function($scope, Firewall){
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
		$scope.toolbar.childState = 'Firewall';
	}]);