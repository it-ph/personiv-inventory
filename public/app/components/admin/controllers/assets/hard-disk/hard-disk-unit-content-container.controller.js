adminModule
	.controller('hardDiskUnitContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'AssetTag', function($scope, $state, $stateParams, $mdDialog, Preloader, AssetTag){
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
			// clear hardDisk
			$scope.hardDisk.paginated = {};
			$scope.hardDisk.results = null;
			$scope.hardDisk.page = 2;
			AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.hardDisk.paginated = data.data;
				$scope.hardDisk.paginated.show = true;

				$scope.hardDisk.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.hardDisk.busy || ($scope.hardDisk.page > $scope.hardDisk.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.hardDisk.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.hardDisk.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.hardDisk.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.hardDisk.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.hardDisk.busy = false;
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
			// clear hardDisk
			$scope.hardDisk.paginated = {};
			$scope.hardDisk.results = null;
			$scope.hardDisk.page = 2;
			AssetTag.repairUnit(1, query)
			.then(function(data){
				$scope.listType = 'Under Repair'
				$scope.hardDisk.paginated = data.data;
				$scope.hardDisk.paginated.show = true;

				$scope.hardDisk.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.hardDisk.busy || ($scope.hardDisk.page > $scope.hardDisk.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.hardDisk.busy = true;

					// Calls the next page of pagination.
					AssetTag.repairUnit($scope.hardDisk.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.hardDisk.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.hardDisk.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.hardDisk.busy = false;
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
			// clear hardDisk
			$scope.hardDisk.paginated = {};
			$scope.hardDisk.results = null;
			$scope.hardDisk.page = 2;
			AssetTag.disposeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Disposed'
				$scope.hardDisk.paginated = data.data;
				$scope.hardDisk.paginated.show = true;

				$scope.hardDisk.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.hardDisk.busy || ($scope.hardDisk.page > $scope.hardDisk.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.hardDisk.busy = true;

					// Calls the next page of pagination.
					AssetTag.disposeUnit($scope.hardDisk.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.hardDisk.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.hardDisk.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.hardDisk.busy = false;
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
		 * Object for hardDisk
		 *
		*/
		$scope.hardDisk = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.hardDisk.page = 2;
		// 
		
		AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.hardDisk.paginated = data.data;
				$scope.hardDisk.paginated.show = true;

				$scope.hardDisk.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.hardDisk.busy || ($scope.hardDisk.page > $scope.hardDisk.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.hardDisk.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.hardDisk.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.hardDisk.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.hardDisk.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.hardDisk.busy = false;
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
			$scope.hardDisk.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.hardDisk.paginated.show = false;
			Preloader.preload();
			var query = {};
			query.userInput = $scope.hardDisk.userInput;
			query.component_id = unitID;
			query.component_type = 'Headset';
			query.table_name = 'headsets';
			query.property_code = 'PHDS';
			AssetTag.search(query)
				.success(function(data){
					$scope.hardDisk.results = data;
					Preloader.stop();
				})
				.error(function(data){
					Preloader.error();
				});
		};
	}]);
