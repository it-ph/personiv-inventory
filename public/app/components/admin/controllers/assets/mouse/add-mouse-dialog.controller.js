adminModule
	.controller('addMouseDialogController', ['$scope', '$state', '$mdDialog', 'Preloader', 'Mouse', function($scope, $state, $mdDialog, Preloader, Mouse){
		$scope.mouse = {};

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.submit = function(){
			/* Starts Preloader */
			Preloader.preload();
			/**
			 * Stores Single Record
			*/
			Mouse.store($scope.mouse)
				.then(function(){
					// Stops Preloader 
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		}
	}]);