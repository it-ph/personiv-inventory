adminModule
	.controller('addFirewallDialogController', ['$scope', '$state', '$mdDialog', 'Preloader', 'Firewall', function($scope, $state, $mdDialog, Preloader, Firewall){
		$scope.firewall = {};

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.submit = function(){
			/* Starts Preloader */
			Preloader.preload();
			/**
			 * Stores Single Record
			*/
			Firewall.store($scope.firewall)
				.then(function(){
					// Stops Preloader 
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		}

	}]);