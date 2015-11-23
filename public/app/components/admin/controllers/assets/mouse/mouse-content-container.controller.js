adminModule
	.controller('mouseContentContainerController', ['$scope', '$mdDialog', 'Preloader', 'Mouse', function($scope, $mdDialog, Preloader, Mouse){
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
			$scope.mouse.paginated = {};
			$scope.mouse.page = 2;
			Mouse.paginate()
				.then(function(data){
					$scope.mouse.paginated = data.data;
					$scope.mouse.paginated.show = true;
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
		$scope.fab.tooltip = 'Add Mouse';
		$scope.fab.show = true;

		$scope.fab.action = function(){
		    $mdDialog.show({
		      	controller: 'addMouseDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-mouse-dialog.template.html',
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
		$scope.mouse = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.mouse.page = 2;

		Mouse.paginate()
			.then(function(data){
				$scope.mouse.paginated = data.data;
				$scope.mouse.paginated.show = true;

				$scope.mouse.paginateLoad = function(){
					// kills the function if ajax is busy or pagination reaches last page
					if($scope.mouse.busy || ($scope.mouse.page > $scope.mouse.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.mouse.busy = true;

					// Calls the next page of pagination.
					Mouse.paginate($scope.mouse.page)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.mouse.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.mouse.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.mouse.busy = false;
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
			$scope.mouse.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.mouse.paginated.show = false;
			Preloader.preload();
			Mouse.search($scope.mouse)
				.success(function(data){
					$scope.mouse.results = data;
					Preloader.stop();
				})
				.error(function(data){
					Preloader.error();
				});
		};
	}]);