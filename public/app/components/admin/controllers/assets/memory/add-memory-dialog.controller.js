adminModule
	.controller('addMemoryDialogController', ['$scope', '$state', '$mdDialog', 'Preloader', 'Memory', function($scope, $state, $mdDialog, Preloader, Memory){
		$scope.memory = {};

		$scope.memory.types = [
			{'type': 'DDR2 / DIMM'},
			{'type': 'DDR2 / SO-DIMM'},
			{'type': 'DDR3 / DIMM'},
			{'type': 'DDR3 / SO-DIMM'},
			{'type': 'DDR4 / DIMM'},
			{'type': 'DDR4 / SO-DIMM'},
		];

		$scope.memory.sizes = [
			{'size': '1GB'},
			{'size': '2GB'},
			{'size': '4GB'},
			{'size': '8GB'},
		];

		$scope.memory.DDR2_speeds = [
			{'speed':'400MHz'},
			{'speed':'533MHz'},
			{'speed':'667MHz'},
			{'speed':'800MHz'},
			{'speed':'1066MHz'},
		];

		$scope.memory.DDR3_speeds = [
			{'speed':'800MHz'},
			{'speed':'1066MHz'},
			{'speed':'1333MHz'},
			{'speed':'1600MHz'},
			{'speed':'1866MHz'},
			{'speed':'2133MHz'},
		];

		$scope.memory.DDR4_speeds = [
			{'speed':'800MHz'},
			{'speed':'1066MHz'},
			{'speed':'1333MHz'},
			{'speed':'1600MHz'},
			{'speed':'1866MHz'},
			{'speed':'2133MHz'},
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
			Memory.store($scope.memory)
				.then(function(){
					// Stops Preloader 
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		}
	}]);