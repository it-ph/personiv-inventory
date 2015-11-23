adminModule
	.controller('floorPlanContentContainerController', ['$scope', '$stateParams', '$mdDialog', 'Preloader', 'WorkStation', function($scope, $stateParams, $mdDialog, Preloader, WorkStation){
		/**
		 * Object for subheader
		 *
		*/
		var departmentID = $stateParams.departmentID;

		$scope.subheader = {};
		$scope.subheader.state = 'floor-plan';

		/* Refreshes the list */
		$scope.subheader.refresh = function(){
			// start preloader
			Preloader.preload();
			// clear desktop
			$scope.workStation.paginated = {};
			$scope.workStation.page = 2;
			WorkStation.paginate($stateParams.departmentID)
				.then(function(data){
					$scope.workStation.paginated = data.data;
					$scope.workStation.paginated.show = true;
					// stop preload
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		};

		/**
		 * Object for fab
		 *
		*/
		$scope.fab = {};

		$scope.fab.icon = 'mdi-plus';
		$scope.fab.label = 'Add';
		$scope.fab.tooltip = 'Add Work Station';
		$scope.fab.show = true;

		$scope.fab.action = function(){
		    $mdDialog.show({
		      	controller: 'addWorkStationDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-work-station-dialog.template.html',
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
		$scope.rightSidenav.show = true;

		/**
		 * Object for Desktop
		 *
		*/
		$scope.workStation = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.workStation.page = 2;
		//

		WorkStation.paginate(departmentID)
			.then(function(data){
				$scope.workStation.paginated = data.data;
				$scope.workStation.paginated.show = true;

				$scope.workStation.paginateLoad = function(){
					// kills the function if ajax is busy or pagination reaches last page
					if($scope.workStation.busy || ($scope.workStation.page > $scope.workStation.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.workStation.busy = true;

					// Calls the next page of pagination.
					WorkStation.paginate(departmentID, $scope.workStation.page)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.workStation.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.workStation.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.workStation.busy = false;
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
			$scope.workStation.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.workStation.paginated.show = false;
			Preloader.preload()
			WorkStation.search(departmentID, $scope.workStation)
				.success(function(data){
					$scope.workStation.results = data;
					Preloader.stop();
				})
				.error(function(data){
					Preloader.error();
				});
		};

	}]);
