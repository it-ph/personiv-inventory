adminModule
	.controller('firewallContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'Firewall', function($scope, $state, $stateParams, $mdDialog, Preloader, Firewall){
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
			$scope.firewall.paginated = {};
			$scope.firewall.page = 2;
			Firewall.paginate()
				.then(function(data){
					$scope.firewall.paginated = data.data;
					$scope.firewall.paginated.show = true;
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
		$scope.fab.tooltip = 'Add Firewall';
		$scope.fab.show = true;

		$scope.fab.action = function(){
		    $mdDialog.show({
		      	controller: 'addFirewallDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-firewall-dialog.template.html',
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
		 * Object for Firewall
		 *
		*/
		$scope.firewall = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.firewall.page = 2;

		Firewall.paginate()
			.then(function(data){
				$scope.firewall.paginated = data.data;
				$scope.firewall.paginated.show = true;

				$scope.firewall.paginateLoad = function(){
					// kills the function if ajax is busy or pagination reaches last page
					if($scope.firewall.busy || ($scope.firewall.page > $scope.firewall.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.firewall.busy = true;

					// Calls the next page of pagination.
					Firewall.paginate($scope.firewall.page)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.firewall.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.firewall.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.firewall.busy = false;
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
			$scope.firewall.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.firewall.paginated.show = false;
			Preloader.preload();
			Firewall.search($scope.firewall)
				.success(function(data){
					$scope.firewall.results = data;
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