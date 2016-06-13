adminModule
	.controller('workStationsContentContainerController', ['$scope', '$filter', '$state', '$mdDialog', 'Preloader', 'WorkStation', 'Department', function($scope, $filter, $state, $mdDialog, Preloader, WorkStation, Department){
		/**
		  *
		  * Object for toolbar
		  *
		*/
		$scope.toolbar = {};
		$scope.toolbar.childState = 'Work Stations';
	    $scope.toolbar.searchAll = true;
		$scope.toolbar.items = [];
		$scope.toolbar.getItems = function(query){
			var results = query ? $filter('filter')($scope.toolbar.items, query) : $scope.toolbar.items;
			return results;
		}

		/* Refreshes the list */
		$scope.toolbar.refresh = function(){
			$scope.rightSidenav.department = '';
			// start preloader
			Preloader.loading();
			$scope.init(true);
		};

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
			$scope.searchBar = false;
			$scope.toolbar.searchText = '';
	    	if($scope.workStation.searched){
	    		$scope.toolbar.refresh();
	    		$scope.workStation.searched = false;
	    	}
		};
		
		var pushItem = function(data, type){
		    var item = {};
			item.display = data.name;
			item.subItem = data.ip_address;
			// format
			data.first_letter = data.name.charAt(4).toUpperCase();
			data.updated_at = new Date(data.updated_at);

			$scope.toolbar.items.push(item);
	    }

	    var chartItem = function(data){
	    	// check if work station belongs to 6th floor division A and currently occupied
			if(data.floor == 6 && data.division == 'A' && data.departments.length){
				$scope.charts[0].data[0] += 1; 
			}
			// check if work station belongs to 6th floor division A and currently vacant
			else if(data.floor == 6 && data.division == 'A' && !data.departments.length){
				$scope.charts[0].data[1] += 1; 
			}
			// check if work station belongs to 6th floor division B and currently occupied
			else if(data.floor == 6 && data.division == 'B' && data.departments.length){
				$scope.charts[1].data[0] += 1; 
			}
			// check if work station belongs to 6th floor division B and currently vacant
			else if(data.floor == 6 && data.division == 'B' && !data.departments.length){
				$scope.charts[1].data[1] += 1; 
			}
			// check if work station belongs to 10th floor division A and currently occupied
			else if(data.floor == 10 && data.division == 'A' && data.departments.length){
				$scope.charts[2].data[0] += 1; 
			}
			// check if work station belongs to 10th floor division A and currently vacant
			else if(data.floor == 10 && data.division == 'A' && !data.departments.length){
				$scope.charts[2].data[1] += 1; 
			}
			// check if work station belongs to 10th floor division B and currently occupied
			else if(data.floor == 10 && data.division == 'B' && data.departments.length){
				$scope.charts[3].data[0] += 1; 
			}
			// check if work station belongs to 10th floor division B and currently vacant
			else if(data.floor == 10 && data.division == 'B' && !data.departments.length){
				$scope.charts[3].data[1] += 1; 
			}
	    }


		$scope.searchUserInput = function(){
			$scope.workStation.paginated.show = false;
			Preloader.loading();
			WorkStation.search($scope.workStation)
				.success(function(data){
					$scope.workStation.results = data;
					Preloader.stop();
				})
				.error(function(data){
					Preloader.error();
				});
		};

		$scope.createWorkStation = function(){
		    $mdDialog.show({
		      	controller: 'addWorkStationDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-work-station-dialog.template.html',
		      	parent: angular.element($('body')),
		    })
		    .then(function(){
		    	/* Refreshes the list */
		    	$scope.toolbar.refresh();
		    });
		}
		/**
		 * Object for fab
		 *
		*/
		$scope.fab = {};

		$scope.fab.icon = 'mdi-plus';
		$scope.fab.label = 'Work Station';

		$scope.fab.action = function(){
			$scope.createWorkStation();			
		};


		/**
		 * Object for rightSidenav
		 *
		*/
		$scope.rightSidenav = {};
		// hides right sidenav
		$scope.rightSidenav.show = true;

		$scope.filterWorkStation = function(data){
			$scope.rightSidenav.department = data;
		};

		$scope.init = function(refresh){
			Department.index()
				.then(function(data){
					angular.forEach(data.data, function(item){
						item.first_letter = item.name.charAt(0).toUpperCase();
					})

					$scope.departments = data.data;
					return;
				})
				.then(function(){
					/**
					 * Object for Work Station
					 *
					*/
					$scope.workStation = {};
					// 2 is default so the next page to be loaded will be page 2 
					$scope.workStation.page = 2;

					$scope.charts = [
						{
							'labels': ['Occupied', 'Vacant'],
							'location': '6th Floor A',
							'data': [0,0],
						},
						{
							'labels': ['Occupied', 'Vacant'],
							'location': '6th Floor B',
							'data': [0,0],
						},
						{
							'labels': ['Occupied', 'Vacant'],
							'location': '10th Floor A',
							'data': [0,0],
						},
						{
							'labels': ['Occupied', 'Vacant'],
							'location': '10th Floor B',
							'data': [0,0],
						},
					];

					WorkStation.paginate()
						.success(function(data){
							$scope.workStation.details = data;
							$scope.workStation.paginated = data.data;
							$scope.workStation.paginated.show = true;

							if(data.data.length){
								// iterate over each record and set the updated_at date and first letter
								angular.forEach(data.data, function(item){
									pushItem(item);
									chartItem(item);
								});

								$scope.fab.show = true;
							}

							$scope.workStation.paginateLoad = function(){
								// kills the function if ajax is busy or pagination reaches last page
								if($scope.workStation.busy || ($scope.workStation.page > $scope.workStation.details.last_page)){
									return;
								}
								/**
								 * Executes pagination call
								 *
								*/
								// sets to true to disable pagination call if still busy.
								$scope.workStation.busy = true;

								// Calls the next page of pagination.
								WorkStation.paginate($scope.workStation.page)
									.success(function(data){
										// increment the page to set up next page for next AJAX Call
										$scope.workStation.page++;

										// iterate over each data then splice it to the data array
										angular.forEach(data.data, function(item, key){
											pushItem(item);
											chartItem(item);
											$scope.workStation.paginated.data.push(item);
										});

										// Enables again the pagination call for next call.
										$scope.workStation.busy = false;

									});
							}
							if(refresh){
								Preloader.stop();
								Preloader.stop();
							}
						})
						.error(function(){
							Preloader.error();
						});
				})
		}

		$scope.init();
	}]);
