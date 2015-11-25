adminModule
	.controller('addTelephoneDialogController', ['$scope', '$state', '$mdDialog', 'Preloader', 'Telephone', function($scope, $state, $mdDialog, Preloader, Telephone){
		$scope.telephone = {};

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.submit = function(){
			/* Starts Preloader */
			Preloader.preload();
			/**
			 * Stores Single Record
			*/
			Telephone.store($scope.router)
				.then(function(){
					// Stops Preloader 
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		}

	}]);