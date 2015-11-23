adminModule
	.controller('monitorContentContainerController', ['$scope', '$mdDialog', 'Preloader', 'Monitor', function($scope, $mdDialog, Preloader, Monitor){
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
			$scope.monitor.paginated = {};
			$scope.monitor.page = 2;
			Monitor.paginate()
				.then(function(data){
					$scope.monitor.paginated = data.data;
					$scope.monitor.paginated.show = true;
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
		$scope.fab.tooltip = 'Add Monitor';		
		$scope.fab.show = true;

		$scope.fab.action = function(){
		    $mdDialog.show({
		      	controller: 'addMonitorDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-monitor-dialog.template.html',
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
		$scope.monitor = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.monitor.page = 2;

		Monitor.paginate()
			.then(function(data){
				$scope.monitor.paginated = data.data;
				$scope.monitor.paginated.show = true;

				$scope.monitor.paginateLoad = function(){
					// kills the function if ajax is busy or pagination reaches last page
					if($scope.monitor.busy || ($scope.monitor.page > $scope.monitor.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.monitor.busy = true;

					// Calls the next page of pagination.
					Monitor.paginate($scope.monitor.page)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.monitor.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.monitor.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.monitor.busy = false;
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
			$scope.monitor.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.monitor.paginated.show = false;
			Preloader.preload();
			Monitor.search($scope.monitor)
				.success(function(data){
					$scope.monitor.results = data;
					Preloader.stop();
				})
				.error(function(data){
					Preloader.error();
				});
		};
	}]);