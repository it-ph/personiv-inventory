adminModule
	.controller('otherComponentContentContainerController', ['$scope', '$mdDialog', 'Preloader', 'OtherComponent', function($scope, $mdDialog, Preloader, OtherComponent){
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
			$scope.otherComponent.paginated = {};
			$scope.otherComponent.page = 2;
			OtherComponent.paginate()
				.then(function(data){
					$scope.otherComponent.paginated = data.data;
					$scope.otherComponent.paginated.show = true;
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
		      	controller: 'addOtherComponentDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-other-component-dialog.template.html',
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
		 * Object for otherComponent
		 *
		*/
		$scope.otherComponent = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.otherComponent.page = 2;

		OtherComponent.paginate()
			.then(function(data){
				$scope.otherComponent.paginated = data.data;
				$scope.otherComponent.paginated.show = true;

				$scope.otherComponent.paginateLoad = function(){
					// kills the function if ajax is busy or pagination reaches last page
					if($scope.otherComponent.busy || ($scope.otherComponent.page > $scope.otherComponent.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.otherComponent.busy = true;

					// Calls the next page of pagination.
					OtherComponent.paginate($scope.otherComponent.page)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.otherComponent.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.otherComponent.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.otherComponent.busy = false;
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
			$scope.otherComponent.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.otherComponent.paginated.show = false;
			Preloader.preload();
			OtherComponent.search($scope.otherComponent)
				.success(function(data){
					$scope.otherComponent.results = data;
					Preloader.stop();
				})
				.error(function(data){
					Preloader.error();
				});
		};
	}]);