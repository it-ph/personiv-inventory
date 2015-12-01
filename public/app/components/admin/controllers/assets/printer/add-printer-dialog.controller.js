adminModule
	.controller('addPrinterDialogController', ['$scope', '$state', '$mdDialog', 'Preloader', 'Printer', function($scope, $state, $mdDialog, Preloader, Printer){
		$scope.printer = {};

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.submit = function(){
			/* Starts Preloader */
			Preloader.preload();
			/**
			 * Stores Single Record
			*/
			Printer.store($scope.printer)
				.then(function(){
					// Stops Preloader 
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		}
	}]);