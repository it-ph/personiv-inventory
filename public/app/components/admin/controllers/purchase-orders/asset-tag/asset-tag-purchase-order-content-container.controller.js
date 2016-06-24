adminModule
	.controller('assetTagPurchaseOrderContentContainerController', ['$scope', '$filter', '$state', '$stateParams', '$mdDialog', 'PurchaseOrder', 'Preloader', 'AssetTag', function($scope, $filter, $state, $stateParams, $mdDialog, PurchaseOrder, Preloader, AssetTag){
		var purchaseOrderID = $stateParams.purchaseOrderID;
		/**
		  *
		  * Object for toolbar
		  *
		*/
		$scope.toolbar = {};
		$scope.toolbar.parentState = 'Purchase Orders - Asset Tag';
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
		$scope.fab.label = 'Purchase Order';

		$scope.fab.action = function(){
			$scope.submit();			
		}

		$scope.init = function(refresh){
			PurchaseOrder.show(purchaseOrderID)
				.success(function(data){
					$scope.purchaseOrder = data;
					$scope.toolbar.childState = data.id;
				})
				.error(function(){
					Preloader.error();
				});
		}

		$scope.init();
	}]);