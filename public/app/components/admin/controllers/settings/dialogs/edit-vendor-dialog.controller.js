adminModule
	.controller('editVendorDialogController', ['$scope', '$mdDialog', 'Vendor', 'Preloader', function($scope, $mdDialog, Vendor, Preloader){
		var vendorID = Preloader.get();
		var busy = false;

		Vendor.show(vendorID)
			.success(function(data){
				$scope.vendor = data;
				$scope.label = data.company;
			})
			.error(function(){
				Preloader.error();
			});

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
					Vendor.update(vendorID, $scope.vendor)
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