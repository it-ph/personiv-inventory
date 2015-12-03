adminModule
	.controller('softwareUnitContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'AssetTag', function($scope, $state, $stateParams, $mdDialog, Preloader, AssetTag){
		var unitID = $stateParams.unitID;
		var query = {};

		query.component_id = unitID;
		query.component_type = 'Software';

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
			// clear software
			$scope.software.paginated = {};
			$scope.software.results = null;
			$scope.software.page = 2;
			AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.software.paginated = data.data;
				$scope.software.paginated.show = true;

				$scope.software.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.software.busy || ($scope.software.page > $scope.software.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.software.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.software.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.software.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.software.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.software.busy = false;
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
			// clear software
			$scope.software.paginated = {};
			$scope.software.results = null;
			$scope.software.page = 2;
			AssetTag.repairUnit(1, query)
			.then(function(data){
				$scope.listType = 'Under Repair'
				$scope.software.paginated = data.data;
				$scope.software.paginated.show = true;

				$scope.software.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.software.busy || ($scope.software.page > $scope.software.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.software.busy = true;

					// Calls the next page of pagination.
					AssetTag.repairUnit($scope.software.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.software.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.software.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.software.busy = false;
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
			// clear software
			$scope.software.paginated = {};
			$scope.software.results = null;
			$scope.software.page = 2;
			AssetTag.disposeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Disposed'
				$scope.software.paginated = data.data;
				$scope.software.paginated.show = true;

				$scope.software.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.software.busy || ($scope.software.page > $scope.software.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.software.busy = true;

					// Calls the next page of pagination.
					AssetTag.disposeUnit($scope.software.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.software.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.software.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.software.busy = false;
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
		 * Object for software
		 *
		*/
		$scope.software = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.software.page = 2;
		// 
		
		AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.software.paginated = data.data;
				$scope.software.paginated.show = true;

				$scope.software.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.software.busy || ($scope.software.page > $scope.software.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.software.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.software.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.software.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.software.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.software.busy = false;
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
			$scope.software.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.software.paginated.show = false;
			Preloader.preload();
			var query = {};
			query.userInput = $scope.software.userInput;
			query.component_id = unitID;
			query.component_type = 'Scanner';
			query.table_name = 'scanners';
			query.property_code = 'PSWA';
			AssetTag.search(query)
				.success(function(data){
					$scope.software.results = data;
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
