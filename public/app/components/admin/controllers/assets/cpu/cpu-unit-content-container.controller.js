adminModule
	.controller('cpuUnitContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'AssetTag', function($scope, $state, $stateParams, $mdDialog, Preloader, AssetTag){
		var unitID = $stateParams.unitID;
		var query = {};

		query.component_id = unitID;
		query.component_type = 'Desktop';

		/**
		 * Object for subheader
		 *
		*/
		$scope.subheader = {};
		$scope.subheader.state = 'units';

		/* Refreshes the list */
		$scope.subheader.activeUnit = function(){
			// start preloader
			Preloader.preload();
			// clear desktop
			$scope.desktop.paginated = {};
			$scope.desktop.results = null;
			$scope.desktop.page = 2;
			AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.desktop.paginated = data.data;
				$scope.desktop.paginated.show = true;

				$scope.desktop.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.desktop.busy || ($scope.desktop.page > $scope.desktop.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.desktop.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.desktop.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.desktop.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.desktop.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.desktop.busy = false;
						});
				}
				Preloader.stop();
			}, function(){
				Preloader.error();
			});
		};

		/* Refreshes the list and change it to repair */
		$scope.subheader.repairUnit = function(){
			// start preloader
			Preloader.preload();
			// clear desktop
			$scope.desktop.paginated = {};
			$scope.desktop.results = null;
			$scope.desktop.page = 2;
			AssetTag.repairUnit(1, query)
			.then(function(data){
				$scope.listType = 'Under Repair'
				$scope.desktop.paginated = data.data;
				$scope.desktop.paginated.show = true;

				$scope.desktop.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.desktop.busy || ($scope.desktop.page > $scope.desktop.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.desktop.busy = true;

					// Calls the next page of pagination.
					AssetTag.repairUnit($scope.desktop.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.desktop.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.desktop.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.desktop.busy = false;
						});
				}
				Preloader.stop();
			}, function(){
				Preloader.error();
			});
		};

		/* Refreshes the list and change it to repair */
		$scope.subheader.disposeUnit = function(){
			// start preloader
			Preloader.preload();
			// clear desktop
			$scope.desktop.paginated = {};
			$scope.desktop.results = null;
			$scope.desktop.page = 2;
			AssetTag.disposeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Disposed'
				$scope.desktop.paginated = data.data;
				$scope.desktop.paginated.show = true;

				$scope.desktop.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.desktop.busy || ($scope.desktop.page > $scope.desktop.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.desktop.busy = true;

					// Calls the next page of pagination.
					AssetTag.disposeUnit($scope.desktop.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.desktop.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.desktop.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.desktop.busy = false;
						});
				}
				Preloader.stop();
			}, function(){
				Preloader.error();
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
		$scope.desktop = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.desktop.page = 2;
		// 
		
		AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.desktop.paginated = data.data;
				$scope.desktop.paginated.show = true;

				$scope.desktop.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.desktop.busy || ($scope.desktop.page > $scope.desktop.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.desktop.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.desktop.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.desktop.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.desktop.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.desktop.busy = false;
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
			$scope.desktop.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.desktop.paginated.show = false;
			Preloader.preload();
			var query = {};
			query.userInput = $scope.desktop.userInput;
			query.component_id = unitID;
			query.component_type = 'Desktop';
			query.table_name = 'desktops';
			query.property_code = 'PCPU';
			AssetTag.search(query)
				.success(function(data){
					$scope.desktop.results = data;
					Preloader.stop();
				})
				.error(function(data){
					Preloader.error();
				});
		};

		$scope.repaired = function(id){
			AssetTag.active(id)
				.success(function(){
					$scope.subheader.repairUnit();
				})
				.error(function(){
					Preloader.error();
				});
		}

		$scope.dispose = function(id){
			AssetTag.dispose(id)
				.success(function(){
					$scope.subheader.repairUnit();
				})
				.error(function(){
					Preloader.error();
				});
		}

		$scope.show = function(departmentID, workStationID){
			$state.go('main.work-station', {'departmentID': departmentID, 'workStationID':workStationID})
		}
	}]);
