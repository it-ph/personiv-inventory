adminModule
	.controller('portableHardDiskToolbarController', ['$scope', 'PortableHardDisk', function($scope, PortableHardDisk){
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
		$scope.toolbar.childState = 'Portable Hard Disk';
	}]);