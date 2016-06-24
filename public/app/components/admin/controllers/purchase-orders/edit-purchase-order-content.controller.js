adminModule
	.controller('editPurchaseOrderContentContainerController', ['$scope', '$filter', '$state', '$stateParams', '$mdToast', 'Preloader', 'PurchaseOrder', 'AssetType', 'Asset', 'AssetDetail', 'Vendor', 'AssetPurchaseOrder', function($scope, $filter, $state, $stateParams, $mdToast, Preloader, PurchaseOrder, AssetType, Asset, AssetDetail, Vendor, AssetPurchaseOrder){
		var purchaseOrderID = $stateParams.purchaseOrderID;
		/**
		  *
		  * Object for toolbar
		  *
		*/
		$scope.toolbar = {};
		$scope.toolbar.parentState = 'Update Purchase Order';
		$scope.toolbar.showBack = true;
		$scope.toolbar.back = function(){
			$state.go('main.purchase-orders');
		}

		$scope.toolbar.refresh = function(){
			$scope.init(true);
		}

		/**
		 * Object for fab
		 *
		*/
		$scope.fab = {};

		$scope.fab.icon = 'mdi-check';
		$scope.fab.label = 'Submit';
		$scope.fab.show = true;

		$scope.fab.action = function(){
			$scope.submit();			
		};

		var busy = false;
		$scope.form = {};
		$scope.purchaseOrder = {};
		$scope.purchaseOrder.date_purchased = new Date();
		$scope.purchaseOrder.date_arrival = new Date();
		$scope.purchaseOrder.date_arrival.setDate($scope.purchaseOrder.date_arrival.getDate()+30);
		
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

		$scope.getUniqueContactPerson = function(idx){
			$scope.contactPerson = null;
			$scope.purchaseOrder.vendor_id = null;
			
			Vendor.contactPersons($scope.companies[idx].id)
				.success(function(data){
					$scope.contactPersons = data;
				})
				.error(function(){
					Preloader.error();
				})
		}

		$scope.getContactNumbers = function(id){
			Vendor.contactNumbers(id)
				.success(function(data){
					$scope.contactNumbers = data;
				})
				.error(function(){
					Preloader.error();
				})
		}

		$scope.getUniqueBrands = function(assetTypeIndex, idx){
			$scope.assets[idx].brand = null;
			$scope.purchaseOrder.asset_id = null;
			$scope.assets[idx].details = [];

			Asset.brands($scope.assetTypes[assetTypeIndex].id)
				.success(function(data){
					$scope.assets[idx].brands = data;
				})
				.error(function(){
					Preloader.error();
				})
		}

		$scope.getAssetDetails = function(id, idx){
			AssetDetail.show(id)
				.success(function(data){
					$scope.assets[idx].details = data;
				})
				.error(function(){
					Preloader.error();
				});
		}

		$scope.submit = function(){
			if($scope.form.purchaseOrderForm.$invalid){
				angular.forEach($scope.form.purchaseOrderForm.$error, function(field){
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
					
					PurchaseOrder.update(purchaseOrderID, $scope.purchaseOrder)
						.then(function(data){
							return data.data;
						})
						.then(function(data){
							angular.forEach($scope.assets, function(item){
								item.purchase_order_id = data.id;
							});

							AssetPurchaseOrder.update(purchaseOrderID, $scope.assets)
								.success(function(){
									busy = false;
									
									Preloader.stop();
									
									$mdToast.simple()
							        	.textContent('Saved successfuly.')
							        	.position('bottom right')
							        	.hideDelay(3000)
									
									$scope.toolbar.back();
								})
								.error(function(){
									busy = false;
									Preloader.error();
								});
								
						}, function(){
							busy = false;
							Preloader.error();
						});
				}
			}
		}

		$scope.init = function(){
			Vendor.distinct({'distinct':'company'})
				.then(function(data){
					$scope.companies = data.data;
					return;
				})
				.then(function(){
					AssetType.index()
						.success(function(data){
							$scope.assetTypes = data;
						})
						.error(function(){
							Preloader.error();
						})

					return;
				})
				.then(function(){
					PurchaseOrder.show(purchaseOrderID)
						.success(function(data){
							$scope.toolbar.childState = data.id;
							data.date_purchased = new Date(data.date_purchased);
							data.date_arrival = new Date(data.date_arrival);

							var company = $filter('filter')($scope.companies, {company:data.vendor.company});

							$scope.vendorIndex = $scope.companies.indexOf(company[0]);

							Vendor.contactPersons($scope.companies[$scope.vendorIndex].id)
								.success(function(data){
									$scope.contactPersons = data;

									var contactPerson = $filter('filter')($scope.contactPersons, {contact_person:$scope.purchaseOrder.vendor.contact_person});

									$scope.contactPerson = $scope.contactPersons[$scope.contactPersons.indexOf(contactPerson[0])].id;

									$scope.getContactNumbers($scope.contactPerson);
								})
								.error(function(){
									Preloader.error();
								})

							$scope.purchaseOrder = data;
							$scope.assets = data.asset_purchase_order;

							angular.forEach($scope.assets, function(item){
								var assetType = $filter('filter')($scope.assetTypes, {type:item.asset.type.type});
								// console.log(assetType[0]);
								item.assetTypeIndex = $scope.assetTypes.indexOf(assetType[0]);

								Asset.brands($scope.assetTypes[item.assetTypeIndex].id)
									.success(function(data){
										item.brands = data;

										var brand = $filter('filter')(data, {brand:item.asset.brand});

										item.brand = item.brands[item.brands.indexOf(brand[0])].brand;
									})
									.error(function(){
										Preloader.error();
									})
							});

							$scope.show = true;
						})
						.error(function(){
							Preloader.error();
						})
				})				
		}

		$scope.init();
	}]);