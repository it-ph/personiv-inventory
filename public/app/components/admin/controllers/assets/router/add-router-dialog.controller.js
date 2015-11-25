adminModule
	.controller('addRouterDialogController', ['$scope', '$state', '$mdDialog', 'Preloader', 'Router', function($scope, $state, $mdDialog, Preloader, Router){
		$scope.router = {};

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.submit = function(){
			/* Starts Preloader */
			Preloader.preload();
			/**
			 * Stores Single Record
			*/
			Router.store($scope.router)
				.then(function(){
					// Stops Preloader 
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		}

	}]);