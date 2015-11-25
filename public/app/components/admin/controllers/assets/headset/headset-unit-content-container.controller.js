adminModule
	.controller('headsetUnitContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'AssetTag', function($scope, $state, $stateParams, $mdDialog, Preloader, AssetTag){
		var unitID = $stateParams.unitID;
		var query = {};

		query.component_id = unitID;
		query.component_type = 'Headset';

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
			// clear headset
			$scope.headset.paginated = {};
			$scope.headset.results = null;
			$scope.headset.page = 2;
			AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.headset.paginated = data.data;
				$scope.headset.paginated.show = true;

				$scope.headset.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.headset.busy || ($scope.headset.page > $scope.headset.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.headset.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.headset.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.headset.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.headset.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.headset.busy = false;
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
			// clear headset
			$scope.headset.paginated = {};
			$scope.headset.results = null;
			$scope.headset.page = 2;
			AssetTag.repairUnit(1, query)
			.then(function(data){
				$scope.listType = 'Under Repair'
				$scope.headset.paginated = data.data;
				$scope.headset.paginated.show = true;

				$scope.headset.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.headset.busy || ($scope.headset.page > $scope.headset.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.headset.busy = true;

					// Calls the next page of pagination.
					AssetTag.repairUnit($scope.headset.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.headset.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.headset.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.headset.busy = false;
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
			// clear headset
			$scope.headset.paginated = {};
			$scope.headset.results = null;
			$scope.headset.page = 2;
			AssetTag.disposeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Disposed'
				$scope.headset.paginated = data.data;
				$scope.headset.paginated.show = true;

				$scope.headset.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.headset.busy || ($scope.headset.page > $scope.headset.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.headset.busy = true;

					// Calls the next page of pagination.
					AssetTag.disposeUnit($scope.headset.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.headset.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.headset.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.headset.busy = false;
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
		 * Object for headset
		 *
		*/
		$scope.headset = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.headset.page = 2;
		// 
		
		AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.headset.paginated = data.data;
				$scope.headset.paginated.show = true;

				$scope.headset.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.headset.busy || ($scope.headset.page > $scope.headset.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.headset.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.headset.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.headset.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.headset.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.headset.busy = false;
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
			$scope.headset.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.headset.paginated.show = false;
			Preloader.preload();
			var query = {};
			query.userInput = $scope.headset.userInput;
			query.component_id = unitID;
			query.component_type = 'Headset';
			query.table_name = 'headsets';
			query.property_code = 'PHDS';
			AssetTag.search(query)
				.success(function(data){
					$scope.headset.results = data;
					Preloader.stop();
				})
				.error(function(data){
					Preloader.error();
				});
		};
	}]);
