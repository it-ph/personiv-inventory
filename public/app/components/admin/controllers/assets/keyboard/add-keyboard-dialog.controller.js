adminModule
	.controller('addKeyboardDialogController', ['$scope', '$state', '$mdDialog', 'Preloader', 'Keyboard', function($scope, $state, $mdDialog, Preloader, Keyboard){
		$scope.keyboard = {};

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.submit = function(){
			/* Starts Preloader */
			Preloader.preload();
			/**
			 * Stores Single Record
			*/
			Keyboard.store($scope.keyboard)
				.then(function(){
					// Stops Preloader 
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		}
	}]);