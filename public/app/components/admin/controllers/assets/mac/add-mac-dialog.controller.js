adminModule
	.controller('addMacDialogController', ['$scope', '$state', '$mdDialog', 'Preloader', 'Mac', function($scope, $state, $mdDialog, Preloader, Mac){
		$scope.mac = {};

		$scope.types = [
			{'name':'iMac'},
			{'name':'Mac Mini'},
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
			Mac.store($scope.mac)
				.then(function(){
					// Stops Preloader 
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		}

	}]);