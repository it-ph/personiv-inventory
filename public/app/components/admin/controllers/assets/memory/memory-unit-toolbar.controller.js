adminModule
	.controller('memoryUnitToolbarController', ['$scope', '$state', '$stateParams', 'Memory', function($scope, $state, $stateParams, Memory){
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

		Memory.show($stateParams.unitID)
			.success(function(data){
				$scope.toolbar.parentState = data.brand;
				$scope.toolbar.childState = data.size;
			})
			.error(function(){
				Preloader.error();
			});

		/**
		 * Search database and look for user input depending on state.
		 *
		*/
	}]);