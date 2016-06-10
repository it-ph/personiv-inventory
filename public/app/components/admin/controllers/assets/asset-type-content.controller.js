adminModule
	.controller('assetTypeContentController', ['$scope', '$filter', '$mdDialog', '$state', '$stateParams', 'AssetType', 'Asset', 'AssetTag', 'Preloader', function($scope, $filter, $mdDialog, $state, $stateParams, AssetType, Asset, AssetTag, Preloader){
		var assetTypeID = $stateParams.assetTypeID;

		/**
		  *
		  * Object for toolbar
		  *
		*/
		$scope.toolbar = {};
		$scope.toolbar.parentState = 'Asset';
		// $scope.toolbar.childState = 'Settings';
		$scope.toolbar.items = [];
		$scope.toolbar.getItems = function(query){
			var results = query ? $filter('filter')($scope.toolbar.items, query) : $scope.toolbar.items;
			return results;
		}

		$scope.toolbar.refresh = function(){
			/* Starts the loading */
			Preloader.loading();
			$scope.init(true);
		}

		$scope.showSearchBar = function(){
	    	$scope.searchBar = true;
	    }

	    $scope.hideSearchBar = function(){
	    	$scope.searchBar = false;
	    	$scope.toolbar.searchText = '';
	    	if($scope.asset.searched){
	    		$scope.toolbar.refresh();
	    		$scope.asset.searched = false;
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

	    var pushItem = function(data, type){
	    	if(type == 'asset'){
			    var item = {};
				item.display = data.brand;
				item.subItem = data.model;
				// format
				data.first_letter = data.brand.charAt(0).toUpperCase();
				data.updated_at = new Date(data.updated_at);
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
			Preloader.loading();
			$scope.toolbar.items = [];
			Asset.search($scope.toolbar)
				.success(function(data){
					angular.forEach(data, function(item){
						// pushItem(item);
					});
					
					$scope.asset.results = data;
					$scope.asset.searched = true;
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
				}, function(){
					Preloader.error();
				})
		}

		$scope.init();
	}]);