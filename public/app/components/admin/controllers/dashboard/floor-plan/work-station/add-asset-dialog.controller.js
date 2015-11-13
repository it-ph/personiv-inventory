adminModule
	.controller('addAssetDialogController', ['$scope', '$state', '$mdDialog', 'Preloader', 'Desktop', function($scope, $state, $mdDialog, Preloader, Desktop){
		$scope.cpu = {};

		$scope.cancel = function(){
			$mdDialog.cancel();
		};

		$scope.submit = function(){
			/* Starts Preloader */
			Preloader.preload();
			/**
			 * Stores Single Record
			*/
			Desktop.store($scope.cpu)
				.then(function(){
					// Stops Preloader 
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		};
	}]);