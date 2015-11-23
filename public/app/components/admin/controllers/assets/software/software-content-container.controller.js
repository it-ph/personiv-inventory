adminModule
	.controller('softwareContentContainerController', ['$scope', '$mdDialog', 'Preloader', 'Software', function($scope, $mdDialog, Preloader, Software){
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
			$scope.software.paginated = {};
			$scope.software.page = 2;
			Software.paginate()
				.then(function(data){
					$scope.software.paginated = data.data;
					$scope.software.paginated.show = true;
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
		$scope.fab.tooltip = 'Add Software';
		$scope.fab.show = true;

		$scope.fab.action = function(){
		    $mdDialog.show({
		      	controller: 'addSoftwareDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-software-dialog.template.html',
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
		 * Object for software
		 *
		*/
		$scope.software = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.software.page = 2;

		Software.paginate()
			.then(function(data){
				$scope.software.paginated = data.data;
				$scope.software.paginated.show = true;

				$scope.software.paginateLoad = function(){
					// kills the function if ajax is busy or pagination reaches last page
					if($scope.software.busy || ($scope.software.page > $scope.software.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.software.busy = true;

					// Calls the next page of pagination.
					Software.paginate($scope.software.page)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.software.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.software.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.software.busy = false;
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
			$scope.software.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.software.paginated.show = false;
			Preloader.preload();
			Software.search($scope.software)
				.success(function(data){
					$scope.software.results = data;
					Preloader.stop();
				})
				.error(function(data){
					Preloader.error();
				});
		};
	}]);