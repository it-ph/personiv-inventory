adminModule
	.controller('addHeadsetDialogController', ['$scope', '$state', '$mdDialog', 'Preloader', 'Headset', function($scope, $state, $mdDialog, Preloader, Headset){
		$scope.headset = {};

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.submit = function(){
			/* Starts Preloader */
			Preloader.preload();
			/**
			 * Stores Single Record
			*/
			Headset.store($scope.headset)
				.then(function(){
					// Stops Preloader 
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		}

	}]);