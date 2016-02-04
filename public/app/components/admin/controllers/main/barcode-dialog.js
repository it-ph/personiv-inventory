adminModule
	.controller('barcodeDialogController', ['$scope', '$mdDialog', function($scope, $mdDialog){
		$scope.cancel = function(){
			$mdDialog.cancel();
		}
		
		$scope.barcode = {};
		$scope.barcode.category = 'assets';
		$scope.max = 99999;
		$scope.floors = ['06', '10'];
		$scope.divisions = ['A', 'B'];
		$scope.types = [
			{'name':'Admin', 'value':'A'},
			{'name':'Production', 'value':'P'}
		];

		$scope.checkMax = function(){
			if($scope.barcode.category == 'workstation')
				$scope.max = 999;
			else
				$scope.max = 99999;
		}

		$scope.submit = function(){
			if($scope.detailsForm.$invalid){
				angular.forEach($scope.detailsForm.$error, function(field){
					angular.forEach(field, function(errorField){
						errorField.$setTouched();
					});
				});
			}
			else{
				if($scope.barcode.category == 'assets'){				
					var win = window.open('/barcode-assets/' + $scope.barcode.format + '/starting-point/' + $scope.barcode.starting_point + '/quantity/' + $scope.barcode.quantity , '_blank');
					win.focus();
				}
				else{
					var win = window.open('/barcode-work-station/' + $scope.barcode.floor + '/division/' + $scope.barcode.division + '/type/' + $scope.barcode.type + '/starting-point/' + $scope.barcode.starting_point + '/quantity/' + $scope.barcode.quantity , '_blank');
					win.focus();	
				}
				$mdDialog.hide();
			}
		}
	}]);