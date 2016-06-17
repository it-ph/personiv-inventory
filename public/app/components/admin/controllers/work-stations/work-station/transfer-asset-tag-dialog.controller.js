adminModule
	.controller('transferAssetTagDialogController', ['$scope', '$mdDialog', 'AssetTag', 'AssetDetail', 'Preloader', 'WorkStation', function($scope, $mdDialog, AssetTag, AssetDetail, Preloader, WorkStation){
		var assetTagID = Preloader.get();
		var busy = false;
		$scope.transfer = {};

		$scope.floors = [6,10];
		$scope.divisions = ['A','B'];
		$scope.types = ['Admin','Production'];

		
		$scope.cancel = function(){
			$mdDialog.cancel();
		};

		
		AssetTag.show(assetTagID)
			.then(function(data){
				$scope.assetTag = data.data;
				$scope.assetTag.first_letter = data.data.asset.brand[0].toUpperCase();
				$scope.label = data.data.property_code;
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
				//  * Stores Single Record
				Preloader.saving();

				if(!busy){
					busy = true;
					AssetTag.transfer(assetTagID, $scope.transfer)
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