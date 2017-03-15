adminModule
	.controller('purchaseOrdersContentContainerController', ['$scope', '$filter', '$state', '$mdDialog', 'PurchaseOrder', 'Preloader', 'Vendor', function($scope, $filter, $state, $mdDialog, PurchaseOrder, Preloader, Vendor){
		$scope.months = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		];

		$scope.currentMonth = $scope.months[new Date().getMonth()];

		var dateCreated = 2015;

		$scope.years = [];

		for (var i = new Date().getFullYear(); i >= dateCreated; i--) {
			$scope.years.push(i);
		};
		/**
		  *
		  * Object for toolbar
		  *
		*/
		$scope.toolbar = {};
		$scope.toolbar.childState = 'Purchase Orders';
	    $scope.toolbar.searchAll = true;
		$scope.toolbar.items = [];
		$scope.toolbar.getItems = function(query){
			var results = query ? $filter('filter')($scope.toolbar.items, query) : $scope.toolbar.items;
			return results;
		}

		/* Refreshes the list */
		$scope.toolbar.refresh = function(){
			// start preloader
			Preloader.loading();
			$scope.init(true);
		};

		// $scope.toolbar.hideSearchIcon = true;

	    $scope.rightSidenav = {};

	    $scope.rightSidenav.show = true;

		/**
		 * Reveals the search bar.
		 *
		*/
		$scope.showSearchBar = function(){
			$scope.purchaseOrder.busy = true;
			$scope.searchBar = true;
		};

		/**
		 * Hides the search bar.
		 *
		*/
		$scope.hideSearchBar = function(){
			$scope.purchaseOrder.busy = false;
			$scope.searchBar = false;
			$scope.toolbar.searchText = '';
	    	if($scope.purchaseOrder.searched){
	    		$scope.toolbar.refresh();
	    		$scope.purchaseOrder.searched = false;
	    	}
		};
		
		var pushItem = function(data){
			if(data.tracking_code)
			{
				var item = {};
				item.display = data.tracking_code;
				$scope.toolbar.items.push(item);
			}

			angular.forEach(data.asset_purchase_order, function(asset_purchase_order){
			    var item = {};
				item.display = asset_purchase_order.asset.model;
				item.brand = asset_purchase_order.asset.brand;
				$scope.toolbar.items.push(item);
			})
			// format
			data.first_letter = data.vendor.company.charAt(0).toUpperCase();
			data.updated_at = new Date(data.updated_at);
			data.date_arrival = new Date(data.date_arrival);
			data.date_purchased = new Date(data.date_purchased);
			data.month_arrival = $scope.months[data.date_arrival.getMonth()];
			data.month_purchased = $scope.months[data.date_purchased.getMonth()];
			data.year_arrival = data.date_arrival.getFullYear();
			data.year_purchased = data.date_purchased.getFullYear();

			return data;
	    }

		$scope.searchUserInput = function(){
			$scope.purchaseOrder.paginated.show = false;
			Preloader.loading();
			PurchaseOrder.search($scope.toolbar)
				.success(function(data){
					angular.forEach(data, function(item){
						pushItem(item);
					});

					$scope.purchaseOrder.results = data;
					Preloader.stop();
					$scope.purchaseOrder.searched = true;
				})
				.error(function(data){
					Preloader.error();
				});
		};

		$scope.createPurchaseOrder = function(){
		    $state.go('main.create-purchase-order')
		}

		$scope.editPurchaseOrder = function(id){
		    $state.go('main.edit-purchase-order', {'purchaseOrderID':id});
		}

		$scope.deletePurchaseOrder = function(id){
			var confirm = $mdDialog.confirm()
		        .title('Delete')
		        .textContent('Are you sure you want to remove this purchase order?')
		        .ariaLabel('Delete')
		        .ok('Delete')
		        .cancel('Cancel');
		    $mdDialog.show(confirm).then(function() {
		    	PurchaseOrder.delete(id)
		    		.success(function(){
		    			$scope.toolbar.refresh();
		    			Preloader.deleted();
		    		})
		    		.error(function(){
		    			Preloader.error();
		    		})
		    }, function() {
		    	return;
		    });
		}

		$scope.assetTag = function(id){
			$state.go('main.asset-tag-purchase-order', {'purchaseOrderID' : id});
		}

		/**
		 * Object for fab
		 *
		*/
		$scope.fab = {};

		$scope.fab.icon = 'mdi-plus';
		$scope.fab.label = 'Purchase Order';

		$scope.fab.action = function(){
			$scope.createPurchaseOrder();			
		};
		
		$scope.removeFilter = function(){
			$scope.filter = {};
		};

		$scope.searchFilter = function(){
			$scope.purchaseOrder.paginated.show = false;
			Preloader.loading();
			PurchaseOrder.filterSearch($scope.filter)
				.success(function(data){
					angular.forEach(data, function(item){
						pushItem(item);
					});

					$scope.purchaseOrder.results = data;
					Preloader.stop();
					$scope.purchaseOrder.searched = true;
				})
				.error(function(){
					Preloader.error();
				});
		}

		$scope.init = function(refresh){
			$scope.filter = {};
			
			$scope.purchaseOrder = {};
			// 2 is default so the next page to be loaded will be page 2 
			$scope.purchaseOrder.page = 2;

			PurchaseOrder.paginate()
				.success(function(data){
					$scope.purchaseOrder.details = data;
					$scope.purchaseOrder.paginated = data.data;
					$scope.purchaseOrder.paginated.show = true;

					if(data.data.length){
						// iterate over each record and set the date_purchased date and first letter
						angular.forEach(data.data, function(item){
							pushItem(item);
						});

						$scope.fab.show = true;
					}

					$scope.purchaseOrder.paginateLoad = function(){
						// kills the function if ajax is busy or pagination reaches last page
						if($scope.purchaseOrder.busy || ($scope.purchaseOrder.page > $scope.purchaseOrder.details.last_page)){
							return;
						}
						/**
						 * Executes pagination call
						 *
						*/
						// sets to true to disable pagination call if still busy.
						$scope.purchaseOrder.busy = true;

						// Calls the next page of pagination.
						PurchaseOrder.paginate($scope.purchaseOrder.page)
							.success(function(data){
								// increment the page to set up next page for next AJAX Call
								$scope.purchaseOrder.page++;

								// iterate over each data then splice it to the data array
								angular.forEach(data.data, function(item, key){
									pushItem(item);
									$scope.purchaseOrder.paginated.push(item);
								});

								// Enables again the pagination call for next call.
								$scope.purchaseOrder.busy = false;

							});
					}
					if(refresh){
						Preloader.stop();
						Preloader.stop();
					}
				})
				.error(function(){
					Preloader.error();
				});

			Vendor.index()
				.success(function(data){
					$scope.vendors = data;
				})
		}

		$scope.init();
	}]);