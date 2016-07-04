adminModule
	.controller('addPurchaseOrderAssetTagDialogController', ['$scope', '$stateParams', '$mdDialog', 'Preloader', 'AssetTag', 'Asset', 'AssetDetail', 'WorkStation', function($scope, $stateParams, $mdDialog, Preloader, AssetTag, Asset, AssetDetail, WorkStation){		
		$scope.purchaseOrder = Preloader.get();
		$scope.hasWarranty = true;
		$scope.deploy = true;
		$scope.assetTag = {};
		$scope.assetTag.purchase_order_id = $scope.purchaseOrder.id;
		$scope.assetTag.warranty_end = new Date();
		$scope.assetTag.date_received = new Date();
		$scope.minDateWarranty = new Date();
		$scope.minDatePurchaseOrder = new Date($scope.purchaseOrder.date_purchased);

		$scope.floors = [6,10];
		$scope.divisions = ['A','B'];
		$scope.types = ['Admin','Production'];

		var busy = false;

		WorkStation.index()
			.success(function(data){
				$scope.workStations = data;
			})
			.error(function(){
				Preloader.error();
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

		$scope.checkLastPropertyCode = function(){		
			AssetTag.lastPropertyCode($scope.assetTag)
				.success(function(data){
					$scope.assetTag.lastPropertyCode = data.property_code;
				})
				.error(function(){
					Preloader.error();
				});
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
					$scope.assetTag.date_received = $scope.assetTag.date_received ? $scope.assetTag.date_received.toDateString() : null;
					$scope.assetTag.work_station_id = $scope.deploy ? $scope.assetTag.work_station_id : null;
					AssetTag.store($scope.assetTag)
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