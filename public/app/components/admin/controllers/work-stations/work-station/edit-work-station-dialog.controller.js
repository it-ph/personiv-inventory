adminModule
	.controller('editWorkStationDialogController', ['$scope', '$stateParams', '$mdDialog', 'Preloader', 'WorkStation', function($scope, $stateParams, $mdDialog, Preloader, WorkStation){
		var busy = false;
		$scope.workStation = {};
		$scope.floors = [
			{'pattern':6, 'value':'06'},
			{'pattern':10, 'value': '10'},
		];
		$scope.divisions = ['A','B'];
		$scope.types = [
			{'pattern':'Admin', 'value':'A'},
			{'pattern':'Production', 'value': 'P'},
		];

		$scope.patterns = [
			{
				'pattern' : 'A06-A-A***',
				'value' :  'A06-A-A',
				'meaning': 'Aeon 6th Floor - Division A - Admin Station Number',
			},

			{
				'pattern' : 'A06-A-P***',
				'value' :  'A06-A-P',
				'meaning': 'Aeon 6th Floor - Division A - Production Station Number',
			},

			{
				'pattern' : 'A10-A-P***',
				'value' :  'A10-A-P',
				'meaning': 'Aeon 10th Floor - Division A - Production Station Number',
			},

			{
				'pattern' : 'A06-B-A***',
				'value' :  'A06-B-A',
				'meaning': 'Aeon 6th Floor - Division B - Admin Station Number',
			},


			{
				'pattern' : 'A06-B-P***',
				'value' :  'A06-B-P',
				'meaning': 'Aeon 6th Floor - Division B - Production Station Number',
			},
		];

		$scope.cancel = function(){
			$mdDialog.cancel();
		};

		$scope.submit = function(){
			if($scope.addWorkStationForm.$invalid){
				angular.forEach($scope.addWorkStationForm.$error, function(field){
					angular.forEach(field, function(errorField){
						errorField.$setTouched();
					});
				});
			}
			else{
				if(!busy){
					busy = true;
					/* Starts Preloader */
					Preloader.saving();
					/**
					 * Stores Single Record
					*/
					WorkStation.store($scope.workStation)
						.success(function(){
							// Stops Preloader 
							busy = false;
							Preloader.stop();
						})
						.error(function(){
							busy = false;
							Preloader.error();
						})
				}
			}
		};

	}]);