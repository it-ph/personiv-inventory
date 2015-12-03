adminModule
	.controller('monitorUnitContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'AssetTag', function($scope, $state, $stateParams, $mdDialog, Preloader, AssetTag){
		var unitID = $stateParams.unitID;
		var query = {};

		query.component_id = unitID;
		query.component_type = 'Monitor';

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
			// clear monitor
			$scope.monitor.paginated = {};
			$scope.monitor.results = null;
			$scope.monitor.page = 2;
			AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.monitor.paginated = data.data;
				$scope.monitor.paginated.show = true;

				$scope.monitor.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.monitor.busy || ($scope.monitor.page > $scope.monitor.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.monitor.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.monitor.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.monitor.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.monitor.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.monitor.busy = false;
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
			// clear monitor
			$scope.monitor.paginated = {};
			$scope.monitor.results = null;
			$scope.monitor.page = 2;
			AssetTag.repairUnit(1, query)
			.then(function(data){
				$scope.listType = 'Under Repair'
				$scope.monitor.paginated = data.data;
				$scope.monitor.paginated.show = true;

				$scope.monitor.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.monitor.busy || ($scope.monitor.page > $scope.monitor.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.monitor.busy = true;

					// Calls the next page of pagination.
					AssetTag.repairUnit($scope.monitor.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.monitor.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.monitor.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.monitor.busy = false;
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
			// clear monitor
			$scope.monitor.paginated = {};
			$scope.monitor.results = null;
			$scope.monitor.page = 2;
			AssetTag.disposeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Disposed'
				$scope.monitor.paginated = data.data;
				$scope.monitor.paginated.show = true;

				$scope.monitor.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.monitor.busy || ($scope.monitor.page > $scope.monitor.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.monitor.busy = true;

					// Calls the next page of pagination.
					AssetTag.disposeUnit($scope.monitor.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.monitor.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.monitor.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.monitor.busy = false;
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
		 * Object for monitor
		 *
		*/
		$scope.monitor = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.monitor.page = 2;
		// 
		
		AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.monitor.paginated = data.data;
				$scope.monitor.paginated.show = true;

				$scope.monitor.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.monitor.busy || ($scope.monitor.page > $scope.monitor.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.monitor.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.monitor.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.monitor.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.monitor.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.monitor.busy = false;
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
			$scope.monitor.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.monitor.paginated.show = false;
			Preloader.preload();
			var query = {};
			query.userInput = $scope.monitor.userInput;
			query.component_id = unitID;
			query.component_type = 'Monitor';
			query.table_name = 'monitors';
			query.property_code = 'PMON';
			AssetTag.search(query)
				.success(function(data){
					$scope.monitor.results = data;
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
