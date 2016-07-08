adminModule
	.controller('editAssetTypeDialogController', ['$scope', '$mdDialog', 'AssetType', 'Preloader', function($scope, $mdDialog, AssetType, Preloader){
		var assetTypeID = Preloader.get();	
		var busy = false;
		$scope.label = "Edit Asset";

		AssetType.show(assetTypeID)
			.success(function(data){
				$scope.assetType = data;
			})
			.error(function(){
				Preloader.error();
			})

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.checkAssetType = function(){
			$scope.duplicate = false;
			AssetType.checkAssetType($scope.assetType)
				.success(function(data){
					$scope.duplicate = data;
				})
				.error(function(){
					Preloader.error();
				})
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
				// Preloader.loading();
				/**
				 * Stores Single Record
				*/
				if(!busy && !$scope.duplicate){
					busy = true;
					AssetType.update(assetTypeID, $scope.assetType)
						.success(function(data){
							if(!data){
								// Stops Preloader 
								Preloader.stop();
								busy = false;
							}
						})
						.error(function(){
							Preloader.error()
							busy = false;
						});
				}
			}
		}
	}]);