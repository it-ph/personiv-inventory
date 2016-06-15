adminModule
	.controller('createVendorDialogController', ['$scope', '$mdDialog', 'Vendor', 'Preloader', function($scope, $mdDialog, Vendor, Preloader){
		$scope.vendor = {};
		$scope.label = "New Vendor";
		var busy = false;

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.submit = function(){
			if($scope.vendorForm.$invalid){
				angular.forEach($scope.vendorForm.$error, function(field){
					angular.forEach(field, function(errorField){
						errorField.$setTouched();
					});
				});
			}
			else{
				/* Starts Preloader */
				Preloader.loading();
				/**
				 * Stores Single Record
				*/
				if(!busy){
					busy = true;
					Vendor.store($scope.vendor)
						.success(function(){
							// Stops Preloader 
							Preloader.stop();
							busy = false;
						})
						.error(function(data){
							Preloader.error();
							busy = false;
						});
				}
			}
		}
	}]);