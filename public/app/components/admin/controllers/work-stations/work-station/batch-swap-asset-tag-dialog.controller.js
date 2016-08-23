adminModule
	.controller('batchSwapAssetTagDialogController', ['$scope', '$mdDialog', 'AssetTag', 'AssetDetail', 'Preloader', 'WorkStation', function($scope, $mdDialog, AssetTag, AssetDetail, Preloader, WorkStation){
		var workStationID = Preloader.get();
		var busy = false;
		$scope.transfer = {};

		$scope.floors = [6,10];
		$scope.divisions = ['A','B'];
		$scope.types = ['Admin','Production'];

		$scope.getForSwap = function(id){
			WorkStation.show(id)
				.success(function(data){
					angular.forEach(data.asset_tags, function(asset_tag){
						asset_tag.first_letter = asset_tag.asset.brand.charAt(0).toUpperCase();
					});

					$scope.workStationSwap = data;
				})
		}

		
		$scope.cancel = function(){
			$mdDialog.cancel();
		};

		WorkStation.others(workStationID)
			.success(function(data){
				$scope.workStations = data;
			});
		
		WorkStation.show(workStationID)
			.success(function(data){
				angular.forEach(data.asset_tags, function(asset_tag){
					asset_tag.first_letter = asset_tag.asset.brand.charAt(0).toUpperCase();
				});

				$scope.workStation = data;
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
				//  * Stores Single Record
				Preloader.saving();

				if(!busy){
					busy = true;
					WorkStation.batchSwap(workStationID, $scope.transfer)
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