adminModule
	.controller('hardDiskContentController', ['$scope', 'HardDisk', function($scope, HardDisk){
		/**
		 * Object for content view
		 *
		*/
		$scope.content = {};

		$scope.content.title = 'Hard Disk Content Initialized';
	}]);