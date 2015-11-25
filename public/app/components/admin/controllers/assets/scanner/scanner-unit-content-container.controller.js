adminModule
	.controller('scannerUnitContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'AssetTag', function($scope, $state, $stateParams, $mdDialog, Preloader, AssetTag){
		var unitID = $stateParams.unitID;
		var query = {};

		query.component_id = unitID;
		query.component_type = 'Scanner';

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
			// clear scanner
			$scope.scanner.paginated = {};
			$scope.scanner.results = null;
			$scope.scanner.page = 2;
			AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.scanner.paginated = data.data;
				$scope.scanner.paginated.show = true;

				$scope.scanner.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.scanner.busy || ($scope.scanner.page > $scope.scanner.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.scanner.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.scanner.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.scanner.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.scanner.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.scanner.busy = false;
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
			// clear scanner
			$scope.scanner.paginated = {};
			$scope.scanner.results = null;
			$scope.scanner.page = 2;
			AssetTag.repairUnit(1, query)
			.then(function(data){
				$scope.listType = 'Under Repair'
				$scope.scanner.paginated = data.data;
				$scope.scanner.paginated.show = true;

				$scope.scanner.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.scanner.busy || ($scope.scanner.page > $scope.scanner.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.scanner.busy = true;

					// Calls the next page of pagination.
					AssetTag.repairUnit($scope.scanner.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.scanner.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.scanner.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.scanner.busy = false;
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
			// clear scanner
			$scope.scanner.paginated = {};
			$scope.scanner.results = null;
			$scope.scanner.page = 2;
			AssetTag.disposeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Disposed'
				$scope.scanner.paginated = data.data;
				$scope.scanner.paginated.show = true;

				$scope.scanner.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.scanner.busy || ($scope.scanner.page > $scope.scanner.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.scanner.busy = true;

					// Calls the next page of pagination.
					AssetTag.disposeUnit($scope.scanner.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.scanner.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.scanner.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.scanner.busy = false;
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
		 * Object for scanner
		 *
		*/
		$scope.scanner = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.scanner.page = 2;
		// 
		
		AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.scanner.paginated = data.data;
				$scope.scanner.paginated.show = true;

				$scope.scanner.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.scanner.busy || ($scope.scanner.page > $scope.scanner.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.scanner.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.scanner.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.scanner.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.scanner.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.scanner.busy = false;
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
			$scope.scanner.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.scanner.paginated.show = false;
			Preloader.preload();
			var query = {};
			query.userInput = $scope.scanner.userInput;
			query.component_id = unitID;
			query.component_type = 'Scanner';
			query.table_name = 'scanners';
			query.property_code = 'PSCN';
			AssetTag.search(query)
				.success(function(data){
					$scope.scanner.results = data;
					Preloader.stop();
				})
				.error(function(data){
					Preloader.error();
				});
		};
	}]);
