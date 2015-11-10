adminModule
	.controller('upsContentContainerController', ['$scope', '$mdDialog', 'Preloader', 'UPS', function($scope, $mdDialog, Preloader, UPS){
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
			$scope.ups.paginated = {};
			$scope.ups.page = 2;
			UPS.paginate()
				.then(function(data){
					$scope.ups.paginated = data.data;
					$scope.ups.paginated.show = true;
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
		$scope.fab.show = true;

		$scope.fab.action = function(){
		    $mdDialog.show({
		      	controller: 'addUpsDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-ups-dialog.template.html',
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
		 * Object for ups
		 *
		*/
		$scope.ups = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.ups.page = 2;

		UPS.paginate()
			.then(function(data){
				$scope.ups.paginated = data.data;
				$scope.ups.paginated.show = true;

				$scope.ups.paginateLoad = function(){
					// kills the function if ajax is busy or pagination reaches last page
					if($scope.ups.busy || ($scope.ups.page > $scope.ups.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.ups.busy = true;

					// Calls the next page of pagination.
					UPS.paginate($scope.ups.page)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.ups.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.ups.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.ups.busy = false;
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
			$scope.ups.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.ups.paginated.show = false;
			Preloader.preload();
			UPS.search($scope.ups)
				.success(function(data){
					$scope.ups.results = data;
					Preloader.stop();
				})
				.error(function(data){
					Preloader.error();
				});
		};
	}]);