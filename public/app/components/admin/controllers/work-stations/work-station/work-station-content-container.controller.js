adminModule
	.controller('workStationContentContainerController', ['$scope', '$filter', '$state', '$stateParams', '$mdDialog', 'Preloader', 'WorkStation', 'AssetTag', function($scope, $filter, $state, $stateParams, $mdDialog, Preloader, WorkStation, AssetTag){
		var workStationID = $stateParams.workStationID;

		/**
		  *
		  * Object for toolbar
		  *
		*/
		$scope.toolbar = {};
		$scope.toolbar.parentState = 'Work Stations';
	    // $scope.toolbar.searchAll = true;
		$scope.toolbar.items = [];
		$scope.toolbar.showBack = true;
		$scope.toolbar.back = function(){
			$state.go('main.work-stations');
		}
		$scope.toolbar.getItems = function(query){
			var results = query ? $filter('filter')($scope.toolbar.items, query) : $scope.toolbar.items;
			return results;
		}

		$scope.toolbar.refresh = function(){
			Preloader.loading();
			$scope.init(true);
		};

		/**
		 * Reveals the search bar.
		 *
		*/
		$scope.showSearchBar = function(){
			$scope.searchBar = true;
		};

		/**
		 * Hides the search bar.
		 *
		*/
		$scope.hideSearchBar = function(){
			$scope.searchBar = false;
			$scope.toolbar.searchText = '';
	    	if($scope.workStation.searched){
	    		$scope.toolbar.refresh();
	    		$scope.workStation.searched = false;
	    	}
		};

		$scope.createAssetTag = function(){
			$mdDialog.show({
		      	controller: 'createAssetTagDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/create-asset-tag-dialog.template.html',
		      	parent: angular.element($('body')),
		    })
		    .then(function(){
		    	$scope.toolbar.refresh();
		    })
		}

		/**
		 * Object for fab
		 *
		*/
		$scope.fab = {};

		$scope.fab.icon = 'mdi-plus';
		$scope.fab.label = 'Add';
		$scope.fab.tooltip = 'Add Asset';
		// $scope.fab.show = true;

		$scope.fab.action = function(){
		    $scope.createAssetTag();
		};


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

		$scope.swapAsset = function(id){
			AssetTagService.setID(id);
			$mdDialog.show({
		      	controller: 'swapAssetDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/swap-asset-dialog.template.html',
		      	parent: angular.element($('body')),
		    })
		    .then(function(){
		    	$scope.toolbar.refresh();
		    });
		};

		$scope.pullOutAsset = function(id){
			AssetTagService.setID(id);
			$mdDialog.show({
		      	controller: 'pullOutAssetDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/pull-out-asset-dialog.template.html',
		      	parent: angular.element($('body')),
		    })
		    .then(function(){
		    	$scope.toolbar.refresh();
		    });
		};

		$scope.removeAsset = function(id){
			var confirm = $mdDialog.confirm()
	        	.title('Delete asset from records.')
	          	.content('Are you sure you want to delete this asset from our records?')
	          	.ariaLabel('Delete Asset')
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

		$scope.showDetails = function(id){
			Preloader.set(id);
			$mdDialog.show({
		      	controller: 'assetTagDetailsDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/asset-tag-details-dialog.template.html',
		      	parent: angular.element($('body')),
		      	clickOutsideToClose:true,
		    })
		}

		$scope.init = function(refresh){
			WorkStation.show(workStationID)
				.success(function(data){
					angular.forEach(data.asset_tags , function(item){
						item.warranty_end =  item.warranty_end ? new Date(item.warranty_end) : null;
						item.first_letter = item.asset.brand.charAt(0).toUpperCase();
					})

					$scope.workStation = data;

					if(data.asset_tags.length)
					{
						$scope.fab.show = true;
					}

					$scope.toolbar.childState = data.name;
					if(refresh){
						Preloader.stop();
						Preloader.stop();
					}

					$scope.show = true;

				})
				.error(function(){
					Preloader.error();
				})
		}

		$scope.init();
	}]);
