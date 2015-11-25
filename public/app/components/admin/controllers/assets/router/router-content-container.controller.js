adminModule
	.controller('routerContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'Router', function($scope, $state, $stateParams, $mdDialog, Preloader, Router){
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
			$scope.router.paginated = {};
			$scope.router.page = 2;
			Router.paginate()
				.then(function(data){
					$scope.router.paginated = data.data;
					$scope.router.paginated.show = true;
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
		$scope.fab.tooltip = 'Add Router';
		$scope.fab.show = true;

		$scope.fab.action = function(){
		    $mdDialog.show({
		      	controller: 'addRouterDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-router-dialog.template.html',
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
		 * Object for router
		 *
		*/
		$scope.router = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.router.page = 2;

		Router.paginate()
			.then(function(data){
				$scope.router.paginated = data.data;
				$scope.router.paginated.show = true;

				$scope.router.paginateLoad = function(){
					// kills the function if ajax is busy or pagination reaches last page
					if($scope.router.busy || ($scope.router.page > $scope.router.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.router.busy = true;

					// Calls the next page of pagination.
					Router.paginate($scope.router.page)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.router.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.router.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.router.busy = false;
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
			$scope.router.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.router.paginated.show = false;
			Preloader.preload();
			Router.search($scope.router)
				.success(function(data){
					$scope.router.results = data;
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