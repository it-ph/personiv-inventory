adminModule
	.controller('swapAssetTagDialogController', ['$scope', '$mdDialog', 'AssetTag', 'AssetDetail', 'Preloader', 'WorkStation', function($scope, $mdDialog, AssetTag, AssetDetail, Preloader, WorkStation){
		var assetTagID = Preloader.get();
		var busy = false;
		$scope.swap = {};

		$scope.floors = [6,10];
		$scope.divisions = ['A','B'];
		$scope.types = ['Admin','Production'];

		$scope.checkSwap = function(){
			AssetTag.checkSwap($scope.swap)
				.success(function(data){
					if(data.length){
						angular.forEach(data, function(item){
							item.first_letter = item.asset.brand[0].toUpperCase();
						});

						$scope.swapItems = data.length > 1 ? data : [];
						$scope.swap.asset_tag = data.length == 1 ? data[0] : null;
						$scope.match =  true;
					}
					else{
						$scope.swap.asset_tag = null;
						$scope.match =  false;
					}
				})
				.error(function(){
					Preloader.error();
				})
		}

		$scope.cancel = function(){
			$mdDialog.cancel();
		};
		
		AssetTag.show(assetTagID)
			.then(function(data){
				$scope.assetTag = data.data;
				$scope.assetTag.first_letter = data.data.asset.brand[0].toUpperCase();
				$scope.label = data.data.property_code;
				$scope.swap.asset_type_id = data.data.asset_type_id;
				return data.data;
			})
			.then(function(assetTag){
				AssetDetail.show(assetTag.asset.id)
					.success(function(data){
						$scope.details = data;
					})
					.error(function(){
						Preloader.error();
					})

				WorkStation.others(assetTag.work_station_id)
					.success(function(data){
						$scope.workStations = data;
						return;
					})
					.error(function(){
						Preloader.error();
					})
			}, function(){
				Preloader.error();
			})


		$scope.submit = function(){
			if($scope.assetTagForm.$invalid){
				angular.forEach($scope.assetTagForm.$error, function(field){
					angular.forEach(field, function(errorField){
						errorField.$setTouched();
					});
				});
			}
			else{
				if(!busy && $scope.match){
					//  * Stores Single Record
					Preloader.saving();
					busy = true;
					AssetTag.swap(assetTagID, $scope.swap.asset_tag)
						.success(function(){
							Preloader.stop();
							busy = false;
						})
						.error(function(){
							Preloader.error();
							busy = false;
						})
				}
			}
		}

	}]);