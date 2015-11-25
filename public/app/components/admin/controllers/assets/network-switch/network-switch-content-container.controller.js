adminModule
	.controller('networkSwitchContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'NetworkSwitch', function($scope, $state, $stateParams, $mdDialog, Preloader, NetworkSwitch){
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
			$scope.networkSwitch.paginated = {};
			$scope.networkSwitch.page = 2;
			NetworkSwitch.paginate()
				.then(function(data){
					$scope.networkSwitch.paginated = data.data;
					$scope.networkSwitch.paginated.show = true;
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
		$scope.fab.tooltip = 'Add Network Switch';
		$scope.fab.show = true;

		$scope.fab.action = function(){
		    $mdDialog.show({
		      	controller: 'addNetworkSwitchDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-networkSwitch-dialog.template.html',
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
		 * Object for networkSwitch
		 *
		*/
		$scope.networkSwitch = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.networkSwitch.page = 2;

		NetworkSwitch.paginate()
			.then(function(data){
				$scope.networkSwitch.paginated = data.data;
				$scope.networkSwitch.paginated.show = true;

				$scope.networkSwitch.paginateLoad = function(){
					// kills the function if ajax is busy or pagination reaches last page
					if($scope.networkSwitch.busy || ($scope.networkSwitch.page > $scope.networkSwitch.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.networkSwitch.busy = true;

					// Calls the next page of pagination.
					NetworkSwitch.paginate($scope.networkSwitch.page)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.networkSwitch.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.networkSwitch.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.networkSwitch.busy = false;
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
			$scope.networkSwitch.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.networkSwitch.paginated.show = false;
			Preloader.preload();
			NetworkSwitch.search($scope.networkSwitch)
				.success(function(data){
					$scope.networkSwitch.results = data;
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