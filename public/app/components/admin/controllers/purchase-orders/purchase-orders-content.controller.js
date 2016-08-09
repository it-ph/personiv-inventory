adminModule
	.controller('purchaseOrdersContentContainerController', ['$scope', '$filter', '$state', '$mdDialog', 'PurchaseOrder', 'Preloader', function($scope, $filter, $state, $mdDialog, PurchaseOrder, Preloader){
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
		    var item = {};
			item.display = data.vendor.company;
			item.contact_person = data.vendor.contact_person;
			item.contact_number = data.vendor.contact_number;
			// format
			data.first_letter = data.vendor.company.charAt(0).toUpperCase();
			data.updated_at = new Date(data.updated_at);
			data.date_arrival = new Date(data.date_arrival);
			data.date_purchased = new Date(data.date_purchased);

			$scope.toolbar.items.push(item);

			return data;
	    }

		$scope.searchUserInput = function(){
			$scope.purchaseOrder.paginated.show = false;
			Preloader.loading();
			PurchaseOrder.search($scope.toolbar)
				.success(function(data){
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

		$scope.init = function(refresh){
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
									$scope.purchaseOrder.paginated.data.push(item);
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
		}

		$scope.init();
	}]);