adminModule
	.controller('memoryContentContainerController', ['$scope', '$mdDialog', 'Preloader', 'Memory', function($scope, $mdDialog, Preloader, Memory){
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
			$scope.memory.paginated = {};
			$scope.memory.page = 2;
			Memory.paginate()
				.then(function(data){
					$scope.memory.paginated = data.data;
					$scope.memory.paginated.show = true;
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
		      	controller: 'addMemoryDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-memory-dialog.template.html',
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
		$scope.memory = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.memory.page = 2;

		Memory.paginate()
			.then(function(data){
				$scope.memory.paginated = data.data;
				$scope.memory.paginated.show = true;

				$scope.memory.paginateLoad = function(){
					// kills the function if ajax is busy or pagination reaches last page
					if($scope.memory.busy || ($scope.memory.page > $scope.memory.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.memory.busy = true;

					// Calls the next page of pagination.
					Memory.paginate($scope.memory.page)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.memory.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.memory.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.memory.busy = false;
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
			$scope.memory.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.memory.paginated.show = false;
			Preloader.preload();
			Memory.search($scope.memory)
				.success(function(data){
					$scope.memory.results = data;
					Preloader.stop();
				})
				.error(function(data){
					Preloader.error();
				});
		};
	}]);