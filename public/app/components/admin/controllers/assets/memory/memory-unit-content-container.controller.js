adminModule
	.controller('memoryUnitContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'AssetTag', function($scope, $state, $stateParams, $mdDialog, Preloader, AssetTag){
		var unitID = $stateParams.unitID;
		var query = {};

		query.component_id = unitID;
		query.component_type = 'Memory';

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
			// clear memory
			$scope.memory.paginated = {};
			$scope.memory.results = null;
			$scope.memory.page = 2;
			AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
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
					AssetTag.activeUnit($scope.memory.page, query)
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
				Preloader.stop();
			}, function(){
				Preloader.error();
			});
		};

		/* Refreshes the list and change it to repair */
		$scope.subheader.repairUnit = function(){
			// start preloader
			Preloader.preload();
			// clear memory
			$scope.memory.paginated = {};
			$scope.memory.results = null;
			$scope.memory.page = 2;
			AssetTag.repairUnit(1, query)
			.then(function(data){
				$scope.listType = 'Under Repair'
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
					AssetTag.repairUnit($scope.memory.page, query)
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
				Preloader.stop();
			}, function(){
				Preloader.error();
			});
		};

		/* Refreshes the list and change it to repair */
		$scope.subheader.disposeUnit = function(){
			// start preloader
			Preloader.preload();
			// clear memory
			$scope.memory.paginated = {};
			$scope.memory.results = null;
			$scope.memory.page = 2;
			AssetTag.disposeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Disposed'
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
					AssetTag.disposeUnit($scope.memory.page, query)
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
		 * Object for memory
		 *
		*/
		$scope.memory = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.memory.page = 2;
		// 
		
		AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
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
					AssetTag.activeUnit($scope.memory.page, query)
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
			var query = {};
			query.userInput = $scope.memory.userInput;
			query.component_id = unitID;
			query.component_type = 'Memory';
			query.table_name = 'memories';
			query.property_code = 'PRAM';
			AssetTag.search(query)
				.success(function(data){
					$scope.memory.results = data;
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
