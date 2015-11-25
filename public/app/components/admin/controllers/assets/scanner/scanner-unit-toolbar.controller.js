adminModule
	.controller('scannerUnitToolbarController', ['$scope', '$state', '$stateParams', 'Scanner', function($scope, $state, $stateParams, Scanner){
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

		Scanner.show($stateParams.unitID)
			.success(function(data){
				$scope.toolbar.parentState = data.brand;
				$scope.toolbar.childState = data.model;
			})
			.error(function(){
				Preloader.error();
			});

		/**
		 * Search database and look for user input depending on state.
		 *
		*/
	}]);