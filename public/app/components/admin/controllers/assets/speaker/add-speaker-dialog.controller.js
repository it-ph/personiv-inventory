adminModule
	.controller('addSpeakerDialogController', ['$scope', '$state', '$mdDialog', 'Preloader', 'Speaker', function($scope, $state, $mdDialog, Preloader, Speaker){
		$scope.speaker = {};

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.submit = function(){
			/* Starts Preloader */
			Preloader.preload();
			/**
			 * Stores Single Record
			*/
			Speaker.store($scope.router)
				.then(function(){
					// Stops Preloader 
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		}

	}]);