adminModule
	.controller('hardDiskContentContainerController', ['$scope', '$mdDialog', 'Preloader', 'HardDisk', function($scope, $mdDialog, Preloader, HardDisk){
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
			$scope.hardDisk.paginated = {};
			$scope.hardDisk.page = 2;
			HardDisk.paginate()
				.then(function(data){
					$scope.hardDisk.paginated = data.data;
					$scope.hardDisk.paginated.show = true;
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
		$scope.fab.tooltip = 'Add Hard Disk';
		$scope.fab.show = true;

		$scope.fab.action = function(){
		    $mdDialog.show({
		      	controller: 'addHardDiskDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-hard-disk-dialog.template.html',
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
		 * Object for Hard Disk
		 *
		*/
		$scope.hardDisk = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.hardDisk.page = 2;

		HardDisk.paginate()
			.then(function(data){
				$scope.hardDisk.paginated = data.data;
				$scope.hardDisk.paginated.show = true;

				$scope.hardDisk.paginateLoad = function(){
					// kills the function if ajax is busy or pagination reaches last page
					if($scope.hardDisk.busy || ($scope.hardDisk.page > $scope.hardDisk.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.hardDisk.busy = true;

					// Calls the next page of pagination.
					HardDisk.paginate($scope.hardDisk.page)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.hardDisk.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.hardDisk.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.hardDisk.busy = false;
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
			$scope.hardDisk.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.hardDisk.paginated.show = false;
			Preloader.preload();
			HardDisk.search($scope.hardDisk)
				.success(function(data){
					$scope.hardDisk.results = data;
					Preloader.stop();
				})
				.error(function(data){
					Preloader.error();
				});
		};
	}]);