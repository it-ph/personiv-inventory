adminModule
	.controller('headsetContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'Headset', function($scope, $state, $stateParams, $mdDialog, Preloader, Headset){
		/**
		 * Object for subheader
		 *
		*/
		$scope.subheader = {};
		$scope.subheader.state = 'assets';

		/* Refreshes the list */
		$scope.subheader.refresh = function(){
			// start preloader
			Preloader.preload();
			// clear desktop
			$scope.headset.paginated = {};
			$scope.headset.page = 2;
			Headset.paginate()
				.then(function(data){
					$scope.headset.paginated = data.data;
					$scope.headset.paginated.show = true;
					// stop preload
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		};

		/**
		 * Object for content view
		 *
		*/
		$scope.fab = {};

		$scope.fab.icon = 'mdi-plus';
		$scope.fab.label = 'Add';
		$scope.fab.tooltip = 'Add Headset';
		$scope.fab.show = true;

		$scope.fab.action = function(){
		    $mdDialog.show({
		      	controller: 'addHeadsetDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-headset-dialog.template.html',
		      	parent: angular.element($('body')),
		    })
		    .then(function(){
		    	/* Refreshes the list */
		    	$scope.subheader.refresh();
		    });
		};

		/**
		 * Object for rightSidenav
		 *
		*/
		$scope.rightSidenav = {};
		// hides right sidenav
		$scope.rightSidenav.show = false;

		/**
		 * Object for Headset
		 *
		*/
		$scope.headset = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.headset.page = 2;

		Headset.paginate()
			.then(function(data){
				$scope.headset.paginated = data.data;
				$scope.headset.paginated.show = true;

				$scope.headset.paginateLoad = function(){
					// kills the function if ajax is busy or pagination reaches last page
					if($scope.headset.busy || ($scope.headset.page > $scope.headset.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.headset.busy = true;

					// Calls the next page of pagination.
					Headset.paginate($scope.headset.page)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.headset.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.headset.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.headset.busy = false;
						});
				}
			}, function(){
				Preloader.error();
			});
		
		/**
		 * Status of search bar.
		 *
		*/
		$scope.searchBar = false;

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
			$scope.headset.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.headset.paginated.show = false;
			Preloader.preload();
			Headset.search($scope.headset)
				.success(function(data){
					$scope.headset.results = data;
					Preloader.stop();
				})
				.error(function(data){
					Preloader.error();
				});
		};

		$scope.show = function(id){
			$state.go('main.units', {'assetID': $stateParams.assetID, 'unitID':id});
		};
	}]);