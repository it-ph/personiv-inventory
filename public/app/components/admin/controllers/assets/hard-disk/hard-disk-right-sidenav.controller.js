adminModule
	.controller('hardDiskRightSidenavController', ['$scope', 'HardDisk', function($scope, HardDisk){
		/**
		 * Object for content view
		 *
		*/
		$scope.sidenav = {};

		$scope.sidenav.title = 'Hard Disk Content Initialized';
	}]);