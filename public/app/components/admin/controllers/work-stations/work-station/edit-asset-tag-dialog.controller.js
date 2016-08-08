adminModule
	.controller('editAssetTagDialogController', ['$scope', '$stateParams', '$mdDialog', 'Preloader', 'AssetTag', 'Asset', 'AssetDetail', 'PurchaseOrder', function($scope, $stateParams, $mdDialog, Preloader, AssetTag, Asset, AssetDetail, PurchaseOrder){		
		var assetTagID = Preloader.get();
		var busy = false;

		AssetTag.show(assetTagID)
			.success(function(data){
				$scope.hasWarranty = data.warranty_end ? true : false;
				data.warranty_end = data.warranty_end ? new Date(data.warranty_end) : new Date();
				data.date_received = data.date_received ? new Date(data.date_received) : new Date();
				$scope.minDateWarranty = data.purchase_order ? new Date(data.purchase_order.date_purchased) : null;
				$scope.minDatePurchaseOrder = data.purchase_order ? new Date(data.purchase_order.date_purchased) : null;
				$scope.hasPurchaseOrder = data.purchase_order_id ? true : false;
				
				$scope.assetTag = data;

				AssetTag.lastPropertyCode($scope.assetTag)
					.success(function(data){
						$scope.assetTag.lastPropertyCode = data.property_code;
					})
					.error(function(){
						Preloader.error();
					});

				Asset.purchaseOrders(data.asset_id)
					.success(function(data){
						$scope.purchaseOrders = data;
					})
					.error(function(){
						Preloader.error();
					});
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
					$scope.assetTag.purchase_order_id = $scope.hasPurchaseOrder ? $scope.assetTag.purchase_order_id : null;
					$scope.assetTag.date_received = $scope.assetTag.date_received ? $scope.assetTag.date_received.toDateString() : null;
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