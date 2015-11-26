adminModule
	.controller('addProjectorDialogController', ['$scope', '$state', '$mdDialog', 'Preloader', 'Projector', function($scope, $state, $mdDialog, Preloader, Projector){
		$scope.projector = {};

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.submit = function(){
			/* Starts Preloader */
			Preloader.preload();
			/**
			 * Stores Single Record
			*/
			Projector.store($scope.projector)
				.then(function(){
					// Stops Preloader 
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		}

	}]);