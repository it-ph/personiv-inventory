adminModule
	.controller('upsUnitToolbarController', ['$scope', '$state', '$stateParams', 'UPS', function($scope, $state, $stateParams, UPS){
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

		UPS.show($stateParams.unitID)
			.success(function(data){
				$scope.toolbar.parentState = data.model;
				$scope.toolbar.childState = data.wattage;
			})
			.error(function(){
				Preloader.error();
			});

		/**
		 * Search database and look for user input depending on state.
		 *
		*/
	}]);