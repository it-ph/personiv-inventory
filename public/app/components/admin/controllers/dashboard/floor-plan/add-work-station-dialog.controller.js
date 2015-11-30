adminModule
	.controller('addWorkStationDialogController', ['$scope', '$stateParams', '$mdDialog', 'Preloader', 'WorkStation', function($scope, $stateParams, $mdDialog, Preloader, WorkStation){
		$scope.workStation = {};

		$scope.patterns = [
			{
				'pattern' : 'A6-A-A***',
				'value' :  'A6-A-A',
				'meaning': 'Aeon 6th Floor - Division A - Admin Station Number',
			},

			{
				'pattern' : 'A6-A-P***',
				'value' :  'A6-A-P',
				'meaning': 'Aeon 6th Floor - Division A - Production Station Number',
			},

			{
				'pattern' : 'A6-B-A***',
				'value' :  'A6-B-A',
				'meaning': 'Aeon 6th Floor - Division B - Admin Station Number',
			},


			{
				'pattern' : 'A6-B-P***',
				'value' :  'A6-B-P',
				'meaning': 'Aeon 6th Floor - Division B - Production Station Number',
			},
		];

		$scope.cancel = function(){
			$mdDialog.cancel();
		};

		$scope.submit = function(){
			/* Starts Preloader */
			Preloader.preload();
			/**
			 * Stores Single Record
			*/
			WorkStation.store($scope.workStation)
				.success(function(){
					// Stops Preloader 
					Preloader.stop();
				})
				.error(function(){
					Preloader.error();
				})
		};

	}]);