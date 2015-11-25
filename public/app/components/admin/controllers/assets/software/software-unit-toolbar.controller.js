adminModule
	.controller('softwareUnitToolbarController', ['$scope', '$state', '$stateParams', 'Software', function($scope, $state, $stateParams, Software){
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

		Software.show($stateParams.unitID)
			.success(function(data){
				$scope.toolbar.parentState = data.name;
				$scope.toolbar.childState = data.version;
			})
			.error(function(){
				Preloader.error();
			});

		/**
		 * Search database and look for user input depending on state.
		 *
		*/
	}]);