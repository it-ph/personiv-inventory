adminModule
	.controller('otherComponentUnitContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'AssetTag', function($scope, $state, $stateParams, $mdDialog, Preloader, AssetTag){
		var unitID = $stateParams.unitID;
		var query = {};

		query.component_id = unitID;
		query.component_type = 'Other Component';

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
			// clear otherComponent
			$scope.otherComponent.paginated = {};
			$scope.otherComponent.results = null;
			$scope.otherComponent.page = 2;
			AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
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
					AssetTag.activeUnit($scope.otherComponent.page, query)
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
				Preloader.stop();
			}, function(){
				Preloader.error();
			});
		};

		/* Refreshes the list and change it to repair */
		$scope.subheader.repairUnit = function(){
			// start preloader
			Preloader.preload();
			// clear otherComponent
			$scope.otherComponent.paginated = {};
			$scope.otherComponent.results = null;
			$scope.otherComponent.page = 2;
			AssetTag.repairUnit(1, query)
			.then(function(data){
				$scope.listType = 'Under Repair'
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
					AssetTag.repairUnit($scope.otherComponent.page, query)
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
				Preloader.stop();
			}, function(){
				Preloader.error();
			});
		};

		/* Refreshes the list and change it to repair */
		$scope.subheader.disposeUnit = function(){
			// start preloader
			Preloader.preload();
			// clear otherComponent
			$scope.otherComponent.paginated = {};
			$scope.otherComponent.results = null;
			$scope.otherComponent.page = 2;
			AssetTag.disposeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Disposed'
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
					AssetTag.disposeUnit($scope.otherComponent.page, query)
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
		 * Object for otherComponent
		 *
		*/
		$scope.otherComponent = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.otherComponent.page = 2;
		// 
		
		AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
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
					AssetTag.activeUnit($scope.otherComponent.page, query)
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
			var query = {};
			query.userInput = $scope.otherComponent.userInput;
			query.component_id = unitID;
			query.component_type = 'Other Component';
			query.table_name = 'other_components';
			query.property_code = 'POTH';
			AssetTag.search(query)
				.success(function(data){
					$scope.otherComponent.results = data;
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
