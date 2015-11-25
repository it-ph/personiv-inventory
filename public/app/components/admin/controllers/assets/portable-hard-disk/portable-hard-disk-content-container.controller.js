adminModule
	.controller('portableHardDiskContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'PortableHardDisk', function($scope, $state, $stateParams, $mdDialog, Preloader, PortableHardDisk){
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
			$scope.portableHardDisk.paginated = {};
			$scope.portableHardDisk.page = 2;
			PortableHardDisk.paginate()
				.then(function(data){
					$scope.portableHardDisk.paginated = data.data;
					$scope.portableHardDisk.paginated.show = true;
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
		$scope.fab.tooltip = 'Add Portable Hard Disk';
		$scope.fab.show = true;

		$scope.fab.action = function(){
		    $mdDialog.show({
		      	controller: 'addPortableHardDiskDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-portable-hard-disk-dialog.template.html',
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
		 * Object for portableHardDisk
		 *
		*/
		$scope.portableHardDisk = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.portableHardDisk.page = 2;

		PortableHardDisk.paginate()
			.then(function(data){
				$scope.portableHardDisk.paginated = data.data;
				$scope.portableHardDisk.paginated.show = true;

				$scope.portableHardDisk.paginateLoad = function(){
					// kills the function if ajax is busy or pagination reaches last page
					if($scope.portableHardDisk.busy || ($scope.portableHardDisk.page > $scope.portableHardDisk.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.portableHardDisk.busy = true;

					// Calls the next page of pagination.
					PortableHardDisk.paginate($scope.portableHardDisk.page)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.portableHardDisk.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.portableHardDisk.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.portableHardDisk.busy = false;
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
			$scope.portableHardDisk.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.portableHardDisk.paginated.show = false;
			Preloader.preload();
			PortableHardDisk.search($scope.portableHardDisk)
				.success(function(data){
					$scope.portableHardDisk.results = data;
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