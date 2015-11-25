adminModule
	.controller('macUnitContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'AssetTag', function($scope, $state, $stateParams, $mdDialog, Preloader, AssetTag){
		var unitID = $stateParams.unitID;
		var query = {};

		query.component_id = unitID;
		query.component_type = 'Mac';

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
			// clear mac
			$scope.mac.paginated = {};
			$scope.mac.results = null;
			$scope.mac.page = 2;
			AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.mac.paginated = data.data;
				$scope.mac.paginated.show = true;

				$scope.mac.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.mac.busy || ($scope.mac.page > $scope.mac.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.mac.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.mac.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.mac.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.mac.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.mac.busy = false;
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
			// clear mac
			$scope.mac.paginated = {};
			$scope.mac.results = null;
			$scope.mac.page = 2;
			AssetTag.repairUnit(1, query)
			.then(function(data){
				$scope.listType = 'Under Repair'
				$scope.mac.paginated = data.data;
				$scope.mac.paginated.show = true;

				$scope.mac.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.mac.busy || ($scope.mac.page > $scope.mac.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.mac.busy = true;

					// Calls the next page of pagination.
					AssetTag.repairUnit($scope.mac.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.mac.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.mac.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.mac.busy = false;
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
			// clear mac
			$scope.mac.paginated = {};
			$scope.mac.results = null;
			$scope.mac.page = 2;
			AssetTag.disposeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Disposed'
				$scope.mac.paginated = data.data;
				$scope.mac.paginated.show = true;

				$scope.mac.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.mac.busy || ($scope.mac.page > $scope.mac.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.mac.busy = true;

					// Calls the next page of pagination.
					AssetTag.disposeUnit($scope.mac.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.mac.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.mac.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.mac.busy = false;
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
		 * Object for mac
		 *
		*/
		$scope.mac = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.mac.page = 2;
		// 
		
		AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.mac.paginated = data.data;
				$scope.mac.paginated.show = true;

				$scope.mac.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.mac.busy || ($scope.mac.page > $scope.mac.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.mac.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.mac.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.mac.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.mac.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.mac.busy = false;
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
			$scope.mac.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.mac.paginated.show = false;
			Preloader.preload();
			var query = {};
			query.userInput = $scope.mac.userInput;
			query.component_id = unitID;
			query.component_type = 'Mac';
			query.table_name = 'macs';
			query.property_code = 'PMAC';
			AssetTag.search(query)
				.success(function(data){
					$scope.mac.results = data;
					Preloader.stop();
				})
				.error(function(data){
					Preloader.error();
				});
		};
	}]);
