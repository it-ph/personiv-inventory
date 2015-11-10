adminModule
	.controller('addScannerDialogController', ['$scope', '$state', '$mdDialog', 'Preloader', 'Scanner', function($scope, $state, $mdDialog, Preloader, Scanner){
		$scope.scanner = {};

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.submit = function(){
			/* Starts Preloader */
			Preloader.preload();
			/**
			 * Stores Single Record
			*/
			Scanner.store($scope.scanner)
				.then(function(){
					// Stops Preloader 
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		}
	}]);