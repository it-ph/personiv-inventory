adminModule
	.controller('editAssetTagDialogController', ['$scope', '$stateParams', '$mdDialog', 'Preloader', 'AssetTag', 'Asset', 'AssetDetail', function($scope, $stateParams, $mdDialog, Preloader, AssetTag, Asset, AssetDetail){		
		var assetTagID = Preloader.get();
		$scope.hasWarranty = true;

		var busy = false;

		AssetTag.show(assetTagID)
			.success(function(data){
				data.warranty_end = data.warranty_end ? new Date(data.warranty_end) : new Date();
				$scope.minDate = new Date(data.warranty_end);
				$scope.assetTag = data;
			})

		$scope.checkSequence = function(){
			$scope.duplicate = false;
			AssetTag.checkSequence($scope.assetTag)
				.success(function(data){
					$scope.duplicate = data;
				})
				.error(function(){
					Preloader.error();
				})
		}

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.submit = function(){
			if($scope.assetTagForm.$invalid){
				angular.forEach($scope.assetTagForm.$error, function(field){
					angular.forEach(field, function(errorField){
						errorField.$setTouched();
					});
				});
			}
			else{
				//  * Stores Single Record
				
				if(!busy && !$scope.duplicate){
					$scope.assetTag.warranty_end = $scope.hasWarranty ? $scope.assetTag.warranty_end.toDateString() : null;
					AssetTag.update(assetTagID, $scope.assetTag)
						.success(function(data){
							if(!data){
								Preloader.stop();
							}
						})
						.error(function(){
							Preloader.error();
						})
				}
			}
		}
	}]);