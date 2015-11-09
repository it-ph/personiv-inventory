adminModule
	.controller('addMemoryDialogController', ['$scope', '$state', '$mdDialog', 'Preloader', 'Memory', function($scope, $state, $mdDialog, Preloader, Memory){
		$scope.memory = {};

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.submit = function(){
			/* Starts Preloader */
			Preloader.preload();
			/**
			 * Stores Single Record
			*/
			Memory.store($scope.memory)
				.then(function(){
					// Stops Preloader 
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		}
	}]);