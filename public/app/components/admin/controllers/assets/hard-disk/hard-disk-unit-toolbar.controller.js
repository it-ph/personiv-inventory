adminModule
	.controller('hardDiskUnitToolbarController', ['$scope', '$state', '$stateParams', 'HardDisk', function($scope, $state, $stateParams, HardDisk){
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

		HardDisk.show($stateParams.unitID)
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