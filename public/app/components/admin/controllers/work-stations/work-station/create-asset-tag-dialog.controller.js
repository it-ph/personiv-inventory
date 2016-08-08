adminModule
	.controller('createAssetTagDialogController', ['$scope', '$stateParams', '$mdDialog', 'Preloader', 'AssetTag', 'AssetType', 'Asset', 'AssetDetail', function($scope, $stateParams, $mdDialog, Preloader, AssetTag, AssetType, Asset, AssetDetail){
		$scope.assetTag = {};
		$scope.assetTag.warranty_end = new Date();
		$scope.assetTag.work_station_id = $stateParams.workStationID;
		
		$scope.minDate = new Date();
		$scope.hasWarranty = false;

		var busy = false;

		AssetType.index()
			.success(function(data){
				$scope.assetTypes = data;
			})
			.error(function(){
				Preloader.error();
			})

		$scope.getUniqueBrands = function(idx){
			$scope.brand = null;
			$scope.assetTag.asset_id = null;
			$scope.details = [];
			$scope.assetTag.sequence = null;
			$scope.duplicate = false;

			Asset.brands($scope.assetTypes[idx].id)
				.success(function(data){
					$scope.brands = data;
				})
				.error(function(){
					Preloader.error();
				})
		}

		$scope.getAssetDetails = function(id){
			$scope.checkSequence();
			AssetDetail.show(id)
				.success(function(data){
					$scope.details = data;
				})
				.error(function(){
					Preloader.error();
				});

			AssetTag.lastPropertyCode($scope.assetTag)
				.success(function(data){
					$scope.assetTag.lastPropertyCode = data.property_code;
				})
				.error(function(){
					Preloader.error();
				});
		}

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
					busy = true;
					$scope.assetTag.warranty_end = $scope.hasWarranty ? $scope.assetTag.warranty_end.toDateString() : null;
					AssetTag.store($scope.assetTag)
						.success(function(data){
							if(!data){
								Preloader.stop();
							}
							else{
								busy = false;
							}
						})
						.error(function(){
							Preloader.error();
						})
				}
			}
		}
	}]);