adminModule
	.controller('createAssetTypeDialogController', ['$scope', '$mdDialog', 'AssetType', 'Preloader', function($scope, $mdDialog, AssetType, Preloader){
		$scope.assetType = {};
		$scope.label = "New Asset";
		var busy = false;

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.submit = function(){
			if($scope.assetTypeForm.$invalid){
				angular.forEach($scope.assetTypeForm.$error, function(field){
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
					AssetType.store($scope.assetType)
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