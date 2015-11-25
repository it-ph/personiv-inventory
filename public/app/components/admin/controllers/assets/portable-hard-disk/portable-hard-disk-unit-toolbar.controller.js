adminModule
	.controller('portableHardDiskUnitToolbarController', ['$scope', '$state', '$stateParams', 'PortableHardDisk', function($scope, $state, $stateParams, PortableHardDisk){
		/**
		 *  Object for toolbar view.
		 *
		*/
		$scope.toolbar = {};
		
		/**
		 * Properties of toolbar.
		 *
		*/

		$scope.toolbar.showBack = true;

		$scope.toolbar.back = function(){
			$state.go('main.assets', {'assetID': $stateParams.assetID});
		};

		PortableHardDisk.show($stateParams.unitID)
			.success(function(data){
				$scope.toolbar.parentState = data.model;
				$scope.toolbar.childState = data.capacity;
			})
			.error(function(){
				Preloader.error();
			});

		/**
		 * Search database and look for user input depending on state.
		 *
		*/
	}]);