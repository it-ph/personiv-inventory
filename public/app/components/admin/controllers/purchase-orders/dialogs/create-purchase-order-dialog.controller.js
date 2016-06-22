adminModule
	.controller('createPurchaseOrderDialogController', ['$scope', '$stateParams', '$mdDialog', 'Preloader', 'PurchaseOrder', 'AssetType', 'Asset', 'AssetDetail', 'Vendor', 'AssetPurchaseOrder', function($scope, $stateParams, $mdDialog, Preloader, PurchaseOrder, AssetType, Asset, AssetDetail, Vendor, AssetPurchaseOrder){
		var busy = false;
		$scope.purchaseOrder = {};
		$scope.purchaseOrder.date_purchased = new Date();
		$scope.purchaseOrder.date_arrival = new Date();
		
		$scope.label = "Purchase Order";


		$scope.assets = [];

		$scope.addAsset = function(){
			$scope.assets.push(
				{
					'assetTypeIndex':null,
					'brand': null,
					'asset_id': null,
					'quantity': null,
				}
			);
		}

		$scope.removeAsset = function(idx){
			$scope.assets.splice(idx, 1);
		}


		$scope.getUniqueBrands = function(idx){
			$scope.brand = null;
			$scope.purchaseOrder.asset_id = null;
			$scope.details = [];

			Asset.brands($scope.assetTypes[idx].id)
				.success(function(data){
					$scope.assets[idx].brands = data;
				})
				.error(function(){
					Preloader.error();
				})
		}

		$scope.getAssetDetails = function(id){
			AssetDetail.show(id)
				.success(function(data){
					$scope.assets[idx].details = data;
				})
				.error(function(){
					Preloader.error();
				});
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
				Preloader.saving();

				if(!busy){
					busy = true;
					$scope.purchaseOrder.date_purchased = $scope.purchaseOrder.date_purchased.toDateString();
					$scope.purchaseOrder.date_arrival = $scope.purchaseOrder.date_arrival.toDateString();
					
					PurchaseOrder.store($scope.purchaseOrder)
						.then(function(data){
							return data.data;
						})
						.then(function(data){
							angular.forEach($scope.assets, function(item){
								item.purchase_order_id = data.id;
							});

							AssetPurchaseOrder.store($scope.assets)
								.success(function(){
									busy = false;
									Preloader.stop();
								})
								.error(function(){
									busy = false;
									Preloader.error();
								});
								
						}, function(){
							Preloader.error();
						});
				}
			}
		}

		$scope.init = function(){
			Vendor.index()
				.success(function(data){
					$scope.vendors = data;
				})
				.error(function(){
					Preloader.error();
				})

			AssetType.index()
				.success(function(data){
					$scope.assetTypes = data;
				})
				.error(function(){
					Preloader.error();
				})

			$scope.addAsset();
		}();
	}]);