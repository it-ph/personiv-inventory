adminModule
	.controller('workStationContentContainerController', ['$scope', '$filter', '$state', '$stateParams', '$mdDialog', 'Preloader', 'WorkStation', 'AssetTag', 'AssetType', function($scope, $filter, $state, $stateParams, $mdDialog, Preloader, WorkStation, AssetTag, AssetType){
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
		    $mdDialog.show({
		      	controller: 'addAssetDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-asset-dialog.template.html',
		      	parent: angular.element($('body')),
		    })
		    .then(function(){
		    	$mdDialog.show({
			      	controller: 'addAssetTagDialogController',
				    templateUrl: '/app/components/admin/templates/dialogs/add-asset-tag-dialog.template.html',
			      	parent: angular.element($('body')),
			    })
			    .then(function(){
		    		$scope.subheader.refresh();
			    });
		    })
		};


		$scope.editAsset = function(id){
			AssetTagService.setID(id);
			$mdDialog.show({
		      	controller: 'editAssetDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/edit-asset-dialog.template.html',
		      	parent: angular.element($('body')),
		    })
		    .then(function(){
		    	$scope.subheader.refresh();
		    });
		};

		$scope.transferAsset = function(id){
			AssetTagService.setID(id);
			$mdDialog.show({
		      	controller: 'transferAssetDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/transfer-asset-dialog.template.html',
		      	parent: angular.element($('body')),
		    })
			// .then(function(){
		 //    	$scope.subheader.refresh();
		 //    });
		};

		$scope.swapAsset = function(id){
			AssetTagService.setID(id);
			$mdDialog.show({
		      	controller: 'swapAssetDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/swap-asset-dialog.template.html',
		      	parent: angular.element($('body')),
		    })
		    .then(function(){
		    	$scope.subheader.refresh();
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
		    	$scope.subheader.refresh();
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
		      			$scope.subheader.refresh();
		      		})
		      		.error(function(){
		      			Preloader.error();
		      		});
		    }, function() {
		      	return;
		    });
		};

		$scope.init = function(refresh){
			AssetType.index()
				.success(function(data){
					$scope.asset_types = data;
				})
				.error(function(){
					Preloader.error();
				})

			WorkStation.show(workStationID)
				.success(function(data){
					$scope.workStation = data;

					$scope.toolbar.childState = data.name;
					if(refresh){
						Preloader.stop();
						Preloader.stop();
					}
				})
				.error(function(){
					Preloader.error();
				})
		}

		$scope.init();
	}]);
