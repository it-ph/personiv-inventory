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

		$scope.searchUserInput = function(){
			$scope.workStation.paginated.show = false;
			Preloader.loading();
			WorkStation.search($scope.toolbar)
				.success(function(data){
					angular.forEach(data, function(item){
						pushItem(item);
					})
					$scope.workStation.results = data;
					Preloader.stop();
					$scope.workStation.searched = true;
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

		$scope.show = function(id, count){
			if(!count){
				Preloader.set(id);
				$mdDialog.show({
			      	controller: 'departmentWorkStationDialogController',
				    templateUrl: '/app/components/admin/templates/dialogs/update-work-station-dialog.template.html',
			      	parent: angular.element($('body')),
			    })
			    .then(function(){
			    	Preloader.toastChangesSaved();
			    	$state.go('main.work-station', {'workStationID':id});
			    });
			}
			else{
				$state.go('main.work-station', {'workStationID':id});
			}
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

					WorkStation.dashboard()
						.success(function(data){
							$scope.charts[0].data[0] = data.occupied_6FA_count;
							$scope.charts[0].data[1] = data.vacant_6FA_count;
							$scope.charts[1].data[0] = data.occupied_6FB_count;
							$scope.charts[1].data[1] = data.vacant_6FB_count;
							$scope.charts[2].data[0] = data.occupied_10FA_count;
							$scope.charts[2].data[1] = data.vacant_10FA_count;
							$scope.charts[3].data[0] = data.occupied_10FB_count;
							$scope.charts[3].data[1] = data.vacant_10FB_count;
						})
						.error(function(){
							Preloader.error();
						})
				})
				.then(function(){
					/**
					 * Object for Work Station
					 *
					*/
					$scope.workStation = {};
					$scope.workStation.paginated = [];
					// 2 is default so the next page to be loaded will be page 2 
					$scope.workStation.page = 2;

					WorkStation.paginate()
						.success(function(data){
							$scope.workStation.details = data;
							$scope.workStation.paginated = data.data;
							$scope.workStation.paginated.show = true;

							if(data.data.length){
								// iterate over each record and set the updated_at date and first letter
								angular.forEach(data.data, function(item){
									pushItem(item);
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
											$scope.workStation.paginated.push(item);
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
