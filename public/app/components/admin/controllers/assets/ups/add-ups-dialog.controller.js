adminModule
	.controller('addUpsDialogController', ['$scope', '$state', '$mdDialog', 'Preloader', 'UPS', function($scope, $state, $mdDialog, Preloader, UPS){
		$scope.ups = {};

		$scope.ups.wattages = [
			{'wattage':'550W'},
			{'wattage':'650W'},
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
			UPS.store($scope.ups)
				.then(function(){
					// Stops Preloader 
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		}
	}]);