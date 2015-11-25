adminModule
	.controller('addPortableHardDiskDialogController', ['$scope', '$state', '$mdDialog', 'Preloader', 'PortableHardDisk', function($scope, $state, $mdDialog, Preloader, NetworkSwitch){
		$scope.portableHardDisk = {};

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.submit = function(){
			/* Starts Preloader */
			Preloader.preload();
			/**
			 * Stores Single Record
			*/
			PortableHardDisk.store($scope.portableHardDisk)
				.then(function(){
					// Stops Preloader 
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		}

	}]);