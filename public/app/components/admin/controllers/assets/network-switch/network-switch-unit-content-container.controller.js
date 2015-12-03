adminModule
	.controller('networkSwitchUnitContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'AssetTag', function($scope, $state, $stateParams, $mdDialog, Preloader, AssetTag){
		var unitID = $stateParams.unitID;
		var query = {};

		query.component_id = unitID;
		query.component_type = 'Network Switch';

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
			// clear networkSwitch
			$scope.networkSwitch.paginated = {};
			$scope.networkSwitch.results = null;
			$scope.networkSwitch.page = 2;
			AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.networkSwitch.paginated = data.data;
				$scope.networkSwitch.paginated.show = true;

				$scope.networkSwitch.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.networkSwitch.busy || ($scope.networkSwitch.page > $scope.networkSwitch.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.networkSwitch.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.networkSwitch.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.networkSwitch.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.networkSwitch.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.networkSwitch.busy = false;
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
			// clear networkSwitch
			$scope.networkSwitch.paginated = {};
			$scope.networkSwitch.results = null;
			$scope.networkSwitch.page = 2;
			AssetTag.repairUnit(1, query)
			.then(function(data){
				$scope.listType = 'Under Repair'
				$scope.networkSwitch.paginated = data.data;
				$scope.networkSwitch.paginated.show = true;

				$scope.networkSwitch.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.networkSwitch.busy || ($scope.networkSwitch.page > $scope.networkSwitch.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.networkSwitch.busy = true;

					// Calls the next page of pagination.
					AssetTag.repairUnit($scope.networkSwitch.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.networkSwitch.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.networkSwitch.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.networkSwitch.busy = false;
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
			// clear networkSwitch
			$scope.networkSwitch.paginated = {};
			$scope.networkSwitch.results = null;
			$scope.networkSwitch.page = 2;
			AssetTag.disposeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Disposed'
				$scope.networkSwitch.paginated = data.data;
				$scope.networkSwitch.paginated.show = true;

				$scope.networkSwitch.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.networkSwitch.busy || ($scope.networkSwitch.page > $scope.networkSwitch.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.networkSwitch.busy = true;

					// Calls the next page of pagination.
					AssetTag.disposeUnit($scope.networkSwitch.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.networkSwitch.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.networkSwitch.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.networkSwitch.busy = false;
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
		 * Object for networkSwitch
		 *
		*/
		$scope.networkSwitch = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.networkSwitch.page = 2;
		// 
		
		AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.networkSwitch.paginated = data.data;
				$scope.networkSwitch.paginated.show = true;

				$scope.networkSwitch.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.networkSwitch.busy || ($scope.networkSwitch.page > $scope.networkSwitch.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.networkSwitch.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.networkSwitch.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.networkSwitch.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.networkSwitch.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.networkSwitch.busy = false;
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
			$scope.networkSwitch.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.networkSwitch.paginated.show = false;
			Preloader.preload();
			var query = {};
			query.userInput = $scope.networkSwitch.userInput;
			query.component_id = unitID;
			query.component_type = 'Network Switch';
			query.table_name = 'network_switches';
			query.property_code = 'PNSW';
			AssetTag.search(query)
				.success(function(data){
					$scope.networkSwitch.results = data;
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
	}]);
