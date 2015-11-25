adminModule
	.controller('upsUnitContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'AssetTag', function($scope, $state, $stateParams, $mdDialog, Preloader, AssetTag){
		var unitID = $stateParams.unitID;
		var query = {};

		query.component_id = unitID;
		query.component_type = 'Uninterruptible Power Supply';

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
			// clear ups
			$scope.ups.paginated = {};
			$scope.ups.results = null;
			$scope.ups.page = 2;
			AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.ups.paginated = data.data;
				$scope.ups.paginated.show = true;

				$scope.ups.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.ups.busy || ($scope.ups.page > $scope.ups.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.ups.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.ups.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.ups.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.ups.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.ups.busy = false;
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
			// clear ups
			$scope.ups.paginated = {};
			$scope.ups.results = null;
			$scope.ups.page = 2;
			AssetTag.repairUnit(1, query)
			.then(function(data){
				$scope.listType = 'Under Repair'
				$scope.ups.paginated = data.data;
				$scope.ups.paginated.show = true;

				$scope.ups.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.ups.busy || ($scope.ups.page > $scope.ups.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.ups.busy = true;

					// Calls the next page of pagination.
					AssetTag.repairUnit($scope.ups.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.ups.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.ups.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.ups.busy = false;
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
			// clear ups
			$scope.ups.paginated = {};
			$scope.ups.results = null;
			$scope.ups.page = 2;
			AssetTag.disposeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Disposed'
				$scope.ups.paginated = data.data;
				$scope.ups.paginated.show = true;

				$scope.ups.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.ups.busy || ($scope.ups.page > $scope.ups.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.ups.busy = true;

					// Calls the next page of pagination.
					AssetTag.disposeUnit($scope.ups.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.ups.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.ups.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.ups.busy = false;
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
		 * Object for ups
		 *
		*/
		$scope.ups = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.ups.page = 2;
		// 
		
		AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.ups.paginated = data.data;
				$scope.ups.paginated.show = true;

				$scope.ups.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.ups.busy || ($scope.ups.page > $scope.ups.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.ups.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.ups.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.ups.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.ups.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.ups.busy = false;
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
			$scope.ups.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.ups.paginated.show = false;
			Preloader.preload();
			var query = {};
			query.userInput = $scope.ups.userInput;
			query.component_id = unitID;
			query.component_type = 'Uninterruptible Power Supply';
			query.table_name = 'uninterruptible_power_supplies';
			query.property_code = 'PUPS';
			AssetTag.search(query)
				.success(function(data){
					$scope.ups.results = data;
					Preloader.stop();
				})
				.error(function(data){
					Preloader.error();
				});
		};
	}]);
