adminModule
	.controller('addDesktopDialogController', ['$scope', '$state', '$mdDialog', 'Preloader', 'Desktop', function($scope, $state, $mdDialog, Preloader, Desktop){
		$scope.cpu = {};

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.submit = function(){
			/* Starts Preloader */
			Preloader.preload();
			/**
			 * Stores Single Record
			*/
			Desktop.store($scope.cpu)
				.then(function(data){
					// Stops Preloader 
					Preloader.stop();
					$state.go($state.current, {}, {reload: true});
				}, function(){
					// Shows Error Message
					Preloader.error();
				});
		}

	}]);