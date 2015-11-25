adminModule
	.controller('videoCardUnitToolbarController', ['$scope', '$state', '$stateParams', 'VideoCard', function($scope, $state, $stateParams, VideoCard){
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

		VideoCard.show($stateParams.unitID)
			.success(function(data){
				$scope.toolbar.parentState = data.model;
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