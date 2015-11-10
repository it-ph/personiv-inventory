adminModule
	.controller('addMonitorDialogController', ['$scope', '$state', '$mdDialog', 'Preloader', 'Monitor', function($scope, $state, $mdDialog, Preloader, Monitor){
		$scope.monitor = {};

		$scope.monitor.sizes = [
			{'size':'16"'},
			{'size':'16.5"'},
			{'size':'17"'},
			{'size':'17.5"'},
			{'size':'18"'},
			{'size':'18.5"'},
			{'size':'19"'},
			{'size':'19.5"'},
			{'size':'20"'},
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
			Monitor.store($scope.monitor)
				.then(function(){
					// Stops Preloader 
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		}
	}]);