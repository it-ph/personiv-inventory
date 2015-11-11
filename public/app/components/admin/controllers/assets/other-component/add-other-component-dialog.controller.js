adminModule
	.controller('addOtherComponentDialogController', ['$scope', '$state', '$mdDialog', 'Preloader', 'OtherComponent', function($scope, $state, $mdDialog, Preloader, OtherComponent){
		$scope.otherComponent = {};

		$scope.otherComponent.sizes = [
			{'size':'1GB'},
			{'size':'2GB'},
		];

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.submit = function(){
			/* Starts Preloader */
			Preloader.preload();
			/**
			 * Stores Single Record
			*/
			OtherComponent.store($scope.otherComponent)
				.then(function(){
					// Stops Preloader 
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		}
	}]);