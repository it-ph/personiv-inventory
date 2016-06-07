adminModule
	.controller('assetTypeContentController', ['$scope', '$filter', '$state', '$stateParams', 'AssetType', 'Asset', 'Preloader', function($scope, $filter, $state, $stateParams, AssetType, Asset, Preloader){
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
		$scope.showSearchBar = function(){
	    	$scope.searchBar = true;
	    }

	    $scope.hideSearchBar = function(){
	    	$scope.searchBar = false;
	    	$scope.toolbar.searchText = '';
	    	if($scope.asset.searched){
	    		$scope.subheader.refresh();
	    		$scope.asset.searched = false;
	    	}
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
						pushItem(item);
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
		  * Object for subheader
		  *
		*/
		$scope.subheader = {};
		$scope.subheader.refresh = function(){
			/* Starts the loading */
			Preloader.loading();
			$scope.init(true);
		}

		/**
		  *
		  * Object for subheader
		  *
		*/
		$scope.subheader = {};
		$scope.subheader.refresh = function(){
			/* Starts the loading */
			Preloader.loading();
			$scope.init(true);
		}

		$scope.fab = {};
		$scope.fab.label = "Create";
		$scope.fab.icon = "mdi-plus";
		$scope.fab.action = function(){    
	        
	        // $('#main-content').animate({
	        //     scrollTop: 0
	        // }, 700);
		}
		$scope.fab.show = true;

		/**
		  *
		  * Object for subheader
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
									pushItem(item);
								});
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
											pushItem(item);
											$scope.asset.paginated.push(item);
										});
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