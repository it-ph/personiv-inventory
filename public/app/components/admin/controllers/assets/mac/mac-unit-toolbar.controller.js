adminModule
	.controller('macUnitToolbarController', ['$scope', '$state', '$stateParams', 'Mac', function($scope, $state, $stateParams, Mac){
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

		Mac.show($stateParams.unitID)
			.success(function(data){
				$scope.toolbar.parentState = data.type;
				$scope.toolbar.childState = data.processor;
			})
			.error(function(){
				Preloader.error();
			});

		/**
		 * Search database and look for user input depending on state.
		 *
		*/
	}]);