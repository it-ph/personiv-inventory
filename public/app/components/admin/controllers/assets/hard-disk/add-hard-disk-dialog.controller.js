adminModule
	.controller('addHardDiskDialogController', ['$scope', '$state', '$mdDialog', 'Preloader', 'HardDisk', function($scope, $state, $mdDialog, Preloader, HardDisk){
		$scope.hardDisk = {};

		$scope.hardDisk.capacities = [
			{'capacity':'160GB'},
			{'capacity':'320GB'},
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
			HardDisk.store($scope.hardDisk)
				.then(function(){
					// Stops Preloader 
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		}

	}]);