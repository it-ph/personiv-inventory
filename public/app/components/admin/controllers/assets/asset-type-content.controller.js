adminModule
	.controller('assetTypeContentController', ['$scope', '$filter', '$mdDialog', '$state', '$stateParams', 'AssetType', 'Asset', 'AssetTag', 'Preloader', function($scope, $filter, $mdDialog, $state, $stateParams, AssetType, Asset, AssetTag, Preloader){
		var assetTypeID = $stateParams.assetTypeID;
		$scope.state = $state.current.name;
		$scope.showSubheader =  true;
		/**
		  *
		  * Object for toolbar
		  *
		*/
		$scope.toolbar = {};
		$scope.toolbar.parentState = 'Asset';
		$scope.toolbar.asset_type_id = assetTypeID;
		// $scope.toolbar.childState = 'Settings';
		$scope.toolbar.items = [];
		$scope.toolbar.getItems = function(query){
			var results = query ? $filter('filter')($scope.toolbar.items, query) : $scope.toolbar.items;
			return results;
		}

		$scope.toolbar.subheader = 'Filters';

		$scope.toolbar.options = [
			{
				'label': 'Deployed',
				'icon': 'mdi-filter',
				action : function(){
					$scope.status = 'deployed';
				},
			},
			{
				'label': 'Stock',
				'icon': 'mdi-filter',
				action : function(){
					$scope.status = 'stock';
				},
			},
			{
				'label': 'Pulled Out',
				'icon': 'mdi-filter',
				action : function(){
					$scope.status = 'pulled out';
				},
			},
		]

		$scope.toolbar.refresh = function(){
			/* Starts the loading */
			$scope.status = '';
			Preloader.loading();
			$scope.init(true);
		}

		$scope.showSearchBar = function(){
	    	$scope.searchBar = true;
	    }

	    $scope.hideSearchBar = function(){
	    	$scope.searchBar = false;
	    	$scope.toolbar.searchText = '';
	    	if($scope.assetTag.searched){
	    		$scope.toolbar.refresh();
	    		$scope.assetTag.searched = false;
	    	}
	    }

	    $scope.showAssetDetails = function(id){
	    	Preloader.set(id);
	    	$mdDialog.show({
		    	controller: 'assetDetailsDialogController',
		      	templateUrl: '/app/components/admin/templates/dialogs/asset-details-dialog.template.html',
		      	parent: angular.element(document.body),
		    })
		    .then(function(data){
		    	if(data == 'edit'){
			    	$mdDialog.show({
				    	controller: 'editAssetDialogController',
				      	templateUrl: '/app/components/admin/templates/dialogs/asset-dialog.template.html',
				      	parent: angular.element(document.body),
				    })
				    .then(function(){
				    	Preloader.toastChangesSaved();
				    	$scope.toolbar.refresh();
				    })
		    	}
		    	else{
		    		var confirm = $mdDialog.confirm()
				        .title('Delete')
				        .textContent('This asset will be removed.')
				        .ariaLabel('Delete')
				        .ok('Delete')
				        .cancel('Cancel');
				    $mdDialog.show(confirm).then(function() {
				    	var assetID = Preloader.get();
				    	Asset.delete(assetID)
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

		    },function(){
		    	return;
		    })
	    }

	    $scope.purchaseOrder = function(id)
	    {
	    	$state.go('main.asset-tag-purchase-order', {'purchaseOrderID':id});
	    }

	    var pushItem = function(data, type){
	    	if(type == 'asset'){
			    var item = {};
				item.display = data.model;
				item.subItem = data.brand;
				// format
				data.first_letter = data.brand.charAt(0).toUpperCase();
				data.updated_at = new Date(data.updated_at);
	    	}
	    	else{
	    		var item = {};
				item.display = data.property_code;
				// format
				data.first_letter = data.asset.brand.charAt(0).toUpperCase();
				data.warranty_end = data.warranty_end ? new Date(data.warranty_end) : null;
				data.current_status = data.status.length ? 'Pulled Out' : (data.work_station_id ? 'Deployed' : 'Stock');
	    	}

			$scope.toolbar.items.push(item);
	    }

	    $scope.toolbar.searchAll = true;
	    $scope.toolbar.getItems = function(query){
	    	var results = query ? $filter('filter')($scope.toolbar.items, query) : $scope.toolbar.items = [];
	    	return results;
	    }

		$scope.searchUserInput = function(){
			$scope.asset.show = false;
			$scope.assetTag.paginated.show = false;
			Preloader.loading();
			$scope.toolbar.items = [];
			AssetTag.search($scope.toolbar)
				.success(function(data){
					angular.forEach(data, function(item){
						pushItem(item);
					});
					
					$scope.assetTag.results = data;
					$scope.assetTag.searched = true;
					Preloader.stop();
				})
				.error(function(){
					Preloader.error();
				});
		};

		/**
		  *
		  * Object for fab
		  *
		*/
		$scope.fab = {};
		$scope.fab.label = "Create";
		$scope.fab.icon = "mdi-plus";
		$scope.fab.action = function(){    
	        $mdDialog.show({
		    	controller: 'createAssetDialogController',
		      	templateUrl: '/app/components/admin/templates/dialogs/asset-dialog.template.html',
		      	parent: angular.element(document.body),
		    })
	        .then(function(data) {
	        	// if(data){
		        	$scope.toolbar.refresh();
	        	// }
	        }, function() {
	        	return;
	        });
		}

		$scope.editAssetTag = function(id){
			Preloader.set(id);
			$mdDialog.show({
		      	controller: 'editAssetTagDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/edit-asset-tag-dialog.template.html',
		      	parent: angular.element($('body')),
		    })
		    .then(function(){
		    	$scope.toolbar.refresh();
		    });
		};

		$scope.transferAssetTag = function(id){
			Preloader.set(id);
			$mdDialog.show({
		      	controller: 'transferAssetTagDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/transfer-asset-tag-dialog.template.html',
		      	parent: angular.element($('body')),
		    })
		    .then(function(){
		    	$scope.toolbar.refresh();
		    });
		};

		$scope.swapAssetTag = function(id){
			Preloader.set(id);
			$mdDialog.show({
		      	controller: 'swapAssetTagDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/swap-asset-dialog.template.html',
		      	parent: angular.element($('body')),
		    })
		    .then(function(){
		    	$scope.toolbar.refresh();
		    });
		};

		$scope.pullOutAssetTag = function(id){
			Preloader.set(id);
			$mdDialog.show({
		      	controller: 'pullOutAssetTagDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/pull-out-asset-dialog.template.html',
		      	parent: angular.element($('body')),
		    })
		    .then(function(){
		    	$scope.toolbar.refresh();
		    });
		};

		$scope.deleteAssetTag = function(id){
			var confirm = $mdDialog.confirm()
	        	.title('Delete')
	          	.content('Are you sure you want to delete this asset tag?')
	          	.ariaLabel('Delete Asset Tag')
	          	.ok('Delete')
	          	.cancel('Cancel');

	        $mdDialog.show(confirm).then(function() {
		      	AssetTag.delete(id)
		      		.success(function(){
		      			$scope.toolbar.refresh();
		      		})
		      		.error(function(){
		      			Preloader.error();
		      		});
		    }, function() {
		      	return;
		    });
		};

		$scope.repaired = function(id){
			var confirm = $mdDialog.confirm()
	        	.title('Repaired')
	          	.content('Confirm that this asset is repaired?')
	          	.ariaLabel('Repaired')
	          	.ok('Yes')
	          	.cancel('No');

	        $mdDialog.show(confirm).then(function() {
		      	AssetTag.repair(id)
		      		.success(function(){
		      			$scope.toolbar.refresh();
		      		})
		      		.error(function(){
		      			Preloader.error();
		      		});
		    }, function() {
		      	return;
		    });
		}

		$scope.pullOutDetails = function(id){
			Preloader.set(id);
			$mdDialog.show({
		      	controller: 'pullOutDetailsDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/pull-out-details-dialog.template.html',
		      	parent: angular.element($('body')),
		    })
		    .then(function(){
		    	$scope.toolbar.refresh();
		    });
		}
		/**
		  *
		  * Object for rightSidenav
		  *
		*/
		$scope.rightSidenav = {};
		$scope.rightSidenav.show = true;

		$scope.init = function(refresh){
			AssetType.show(assetTypeID)
				.then(function(data){
					$scope.assetType = data.data;
					$scope.toolbar.childState = data.data.type;
					return;
				})
				.then(function(){
					$scope.asset = {};
					$scope.asset.paginated = [];
					$scope.toolbar.items = [];
					// 2 is default so the next page to be loaded will be page 2 
					$scope.asset.page = 2;

					Asset.paginate(assetTypeID)
						.success(function(data){
							$scope.asset.details = data;
							$scope.asset.paginated = data.data;
							$scope.asset.show = true;

							if(data.data.length){
								// iterate over each record and set the updated_at date and first letter
								angular.forEach(data.data, function(item){
									pushItem(item, 'asset');
								});

								$scope.fab.show = true;
							}

							$scope.asset.paginateLoad = function(){
								// kills the function if ajax is busy or pagination reaches last page
								if($scope.asset.busy || ($scope.asset.page > $scope.asset.details.last_page)){
									return;
								}
								/**
								 * Executes pagination call
								 *
								*/
								// sets to true to disable pagination call if still busy.
								$scope.asset.busy = true;

								Asset.paginate(assetTypeID, $scope.asset.page)
									.success(function(data){
										// increment to call the next page for the next call
										$scope.asset.page++;
										// iterate over the paginated data and push it to the original array
										angular.forEach(data.data, function(item){
											pushItem(item, 'asset');
											$scope.asset.paginated.push(item);
										});
										// enables next call
										$scope.asset.busy = false;
									})
									.error(function(){
										Preloader.error();
									});
						}
						if(refresh){
							Preloader.stop();
							Preloader.stop();
						}
					})
					.error(function(){
						Preloader.error();
					})

					// Asset Tags
					$scope.assetTag = {};
					$scope.assetTag.paginated = [];
					$scope.toolbar.items = [];
					// 2 is default so the next page to be loaded will be page 2 
					$scope.assetTag.page = 2;

					AssetTag.paginate(assetTypeID)
						.success(function(data){
							$scope.assetTag.details = data;
							$scope.assetTag.paginated = data.data;
							$scope.assetTag.paginated.show = true;

							if(data.data.length){
								// iterate over each record and set the updated_at date and first letter
								angular.forEach(data.data, function(item){
									pushItem(item, 'asset_tag');
								});
							}

							$scope.assetTag.paginateLoad = function(){
								// kills the function if ajax is busy or pagination reaches last page
								if($scope.assetTag.busy || ($scope.assetTag.page > $scope.assetTag.details.last_page)){
									return;
								}
								/**
								 * Executes pagination call
								 *
								*/
								// sets to true to disable pagination call if still busy.
								$scope.assetTag.busy = true;

								AssetTag.paginate(assetTypeID, $scope.assetTag.page)
									.success(function(data){
										// increment to call the next page for the next call
										$scope.assetTag.page++;
										// iterate over the paginated data and push it to the original array
										angular.forEach(data.data, function(item){
											pushItem(item, 'asset_tag');
											$scope.assetTag.paginated.push(item);
										});
										// enables next call
										$scope.assetTag.busy = false;
									})
									.error(function(){
										Preloader.error();
									});
						}
						if(refresh){
							Preloader.stop();
							Preloader.stop();
						}
					})
					.error(function(){
						Preloader.error();
					})
				})
		}

		$scope.init();
	}]);