adminModule
	.controller('addPortableHardDiskDialogController', ['$scope', '$state', '$mdDialog', 'Preloader', 'PortableHardDisk', function($scope, $state, $mdDialog, Preloader, PortableHardDisk){
		$scope.portableHardDisk = {};

		$scope.portableHardDisk.capacities = [
			{'capacity':'500GB'},
			{'capacity':'650GB'},
			{'capacity':'1.0TB'},
			{'capacity':'2.0TB'},
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
			PortableHardDisk.store($scope.portableHardDisk)
				.then(function(){
					// Stops Preloader 
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		}

	}]);