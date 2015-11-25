adminModule
	.controller('addNetworkSwitchDialogController', ['$scope', '$state', '$mdDialog', 'Preloader', 'NetworkSwitch', function($scope, $state, $mdDialog, Preloader, NetworkSwitch){
		$scope.networkSwitch = {};

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.submit = function(){
			/* Starts Preloader */
			Preloader.preload();
			/**
			 * Stores Single Record
			*/
			NetworkSwitch.store($scope.networkSwitch)
				.then(function(){
					// Stops Preloader 
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		}

	}]);