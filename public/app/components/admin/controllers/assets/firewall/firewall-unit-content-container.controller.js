adminModule
	.controller('firewallUnitContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'AssetTag', function($scope, $state, $stateParams, $mdDialog, Preloader, AssetTag){
		var unitID = $stateParams.unitID;
		var query = {};

		query.component_id = unitID;
		query.component_type = 'Firewall';

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
			// clear firewall
			$scope.firewall.paginated = {};
			$scope.firewall.results = null;
			$scope.firewall.page = 2;
			AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.firewall.paginated = data.data;
				$scope.firewall.paginated.show = true;

				$scope.firewall.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.firewall.busy || ($scope.firewall.page > $scope.firewall.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.firewall.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.firewall.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.firewall.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.firewall.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.firewall.busy = false;
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
			// clear firewall
			$scope.firewall.paginated = {};
			$scope.firewall.results = null;
			$scope.firewall.page = 2;
			AssetTag.repairUnit(1, query)
			.then(function(data){
				$scope.listType = 'Under Repair'
				$scope.firewall.paginated = data.data;
				$scope.firewall.paginated.show = true;

				$scope.firewall.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.firewall.busy || ($scope.firewall.page > $scope.firewall.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.firewall.busy = true;

					// Calls the next page of pagination.
					AssetTag.repairUnit($scope.firewall.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.firewall.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.firewall.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.firewall.busy = false;
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
			// clear firewall
			$scope.firewall.paginated = {};
			$scope.firewall.results = null;
			$scope.firewall.page = 2;
			AssetTag.disposeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Disposed'
				$scope.firewall.paginated = data.data;
				$scope.firewall.paginated.show = true;

				$scope.firewall.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.firewall.busy || ($scope.firewall.page > $scope.firewall.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.firewall.busy = true;

					// Calls the next page of pagination.
					AssetTag.disposeUnit($scope.firewall.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.firewall.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.firewall.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.firewall.busy = false;
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
		 * Object for firewall
		 *
		*/
		$scope.firewall = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.firewall.page = 2;
		// 
		
		AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.firewall.paginated = data.data;
				$scope.firewall.paginated.show = true;

				$scope.firewall.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.firewall.busy || ($scope.firewall.page > $scope.firewall.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.firewall.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.firewall.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.firewall.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.firewall.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.firewall.busy = false;
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
			$scope.firewall.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.firewall.paginated.show = false;
			Preloader.preload();
			var query = {};
			query.userInput = $scope.firewall.userInput;
			query.component_id = unitID;
			query.component_type = 'Firewall';
			query.table_name = 'firewalls';
			query.property_code = 'PFWL';
			AssetTag.search(query)
				.success(function(data){
					$scope.firewall.results = data;
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
