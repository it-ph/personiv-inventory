adminModule
	.controller('addSoftwareDialogController', ['$scope', '$state', '$mdDialog', 'Preloader', 'Software', function($scope, $state, $mdDialog, Preloader, Software){
		$scope.software = {};

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.submit = function(){
			/* Starts Preloader */
			Preloader.preload();
			/**
			 * Stores Single Record
			*/
			Software.store($scope.software)
				.then(function(){
					// Stops Preloader 
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		}
	}]);