adminModule
	.controller('assetTagPurchaseOrderContentContainerController', ['$scope', '$filter', '$state', '$stateParams', '$mdDialog', 'PurchaseOrder', 'Preloader', 'AssetTag', function($scope, $filter, $state, $stateParams, $mdDialog, PurchaseOrder, Preloader, AssetTag){
		var purchaseOrderID = $stateParams.purchaseOrderID;
		/**
		  *
		  * Object for toolbar
		  *
		*/
		$scope.toolbar = {};
		$scope.toolbar.parentState = 'Purchase Order';
		$scope.toolbar.childState = 'Asset Tags';
	    $scope.toolbar.searchAll = false;
	    $scope.toolbar.showBack = true;
	    $scope.toolbar.back = function(){
	    	$state.go('main.purchase-orders');
	    }

		/* Refreshes the list */
		$scope.toolbar.refresh = function(){
			// start preloader
			Preloader.loading();
			$scope.init(true);
		}

		/**
		 * Object for fab
		 *
		*/
		$scope.fab = {};

		$scope.fab.icon = 'mdi-plus';
		$scope.fab.label = 'Asset Tag';
		$scope.fab.show = 'True';

		$scope.fab.action = function(){
			Preloader.set($scope.purchaseOrder);
			$mdDialog.show({
		      	controller: 'addPurchaseOrderAssetTagDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-purchase-order-asset-tag-dialog.template.html',
		      	parent: angular.element($('body')),
		    })
		    .then(function(){
		    	/* Refreshes the list */
		    	$scope.toolbar.refresh();
		    });			
		}

		$scope.init = function(refresh){
			$scope.purchaseOrder = null;

			PurchaseOrder.show(purchaseOrderID)
				.success(function(data){
					angular.forEach(data.asset_purchase_order, function(item){
						item.chart = {};
						item.chart.data = [];
						item.chart.labels = ['Tagged','Stocks'];
						// tagged
						item.chart.data[0] =  item.asset.asset_tags.length;
						// stocks
						item.chart.data[1] = item.quantity - item.asset.asset_tags.length;
					});

					data.date_arrival = new Date(data.date_arrival);
					data.date_purchased = new Date(data.date_purchased);

					$scope.purchaseOrder = data;

					if(refresh){
						Preloader.stop();
						Preloader.stop();
					}
				})
				.error(function(){
					Preloader.error();
				});
		}

		$scope.init();
	}]);