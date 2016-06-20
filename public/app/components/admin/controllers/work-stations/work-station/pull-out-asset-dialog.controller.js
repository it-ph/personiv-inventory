adminModule
	.controller('pullOutAssetTagDialogController', ['$scope', '$mdDialog', 'AssetTag', 'AssetDetail', 'AssetStatus', 'Preloader', 'WorkStation', function($scope, $mdDialog, AssetTag, AssetDetail, AssetStatus, Preloader, WorkStation){
		var assetTagID = Preloader.get();
		var busy = false;

		$scope.cancel = function(){
			$mdDialog.cancel();
		};
		
		AssetTag.show(assetTagID)
			.then(function(data){
				$scope.assetTag = data.data;
				$scope.assetTag.first_letter = data.data.asset.brand[0].toUpperCase();
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
				//  * Stores Single Record
				Preloader.saving();
				
				if(!busy){
					busy = true;
					AssetStatus.store($scope.assetTag)
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