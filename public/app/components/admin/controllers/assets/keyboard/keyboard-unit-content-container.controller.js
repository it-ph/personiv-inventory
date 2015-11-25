adminModule
	.controller('keyboardUnitContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'AssetTag', function($scope, $state, $stateParams, $mdDialog, Preloader, AssetTag){
		var unitID = $stateParams.unitID;
		var query = {};

		query.component_id = unitID;
		query.component_type = 'Keyboard';

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
			// clear keyboard
			$scope.keyboard.paginated = {};
			$scope.keyboard.results = null;
			$scope.keyboard.page = 2;
			AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.keyboard.paginated = data.data;
				$scope.keyboard.paginated.show = true;

				$scope.keyboard.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.keyboard.busy || ($scope.keyboard.page > $scope.keyboard.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.keyboard.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.keyboard.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.keyboard.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.keyboard.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.keyboard.busy = false;
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
			// clear keyboard
			$scope.keyboard.paginated = {};
			$scope.keyboard.results = null;
			$scope.keyboard.page = 2;
			AssetTag.repairUnit(1, query)
			.then(function(data){
				$scope.listType = 'Under Repair'
				$scope.keyboard.paginated = data.data;
				$scope.keyboard.paginated.show = true;

				$scope.keyboard.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.keyboard.busy || ($scope.keyboard.page > $scope.keyboard.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.keyboard.busy = true;

					// Calls the next page of pagination.
					AssetTag.repairUnit($scope.keyboard.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.keyboard.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.keyboard.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.keyboard.busy = false;
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
			// clear keyboard
			$scope.keyboard.paginated = {};
			$scope.keyboard.results = null;
			$scope.keyboard.page = 2;
			AssetTag.disposeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Disposed'
				$scope.keyboard.paginated = data.data;
				$scope.keyboard.paginated.show = true;

				$scope.keyboard.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.keyboard.busy || ($scope.keyboard.page > $scope.keyboard.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.keyboard.busy = true;

					// Calls the next page of pagination.
					AssetTag.disposeUnit($scope.keyboard.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.keyboard.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.keyboard.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.keyboard.busy = false;
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
		 * Object for keyboard
		 *
		*/
		$scope.keyboard = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.keyboard.page = 2;
		// 
		
		AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.keyboard.paginated = data.data;
				$scope.keyboard.paginated.show = true;

				$scope.keyboard.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.keyboard.busy || ($scope.keyboard.page > $scope.keyboard.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.keyboard.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.keyboard.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.keyboard.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.keyboard.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.keyboard.busy = false;
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
			$scope.keyboard.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.keyboard.paginated.show = false;
			Preloader.preload();
			var query = {};
			query.userInput = $scope.keyboard.userInput;
			query.component_id = unitID;
			query.component_type = 'Keyboard';
			query.table_name = 'keyboards';
			query.property_code = 'PKBD';
			AssetTag.search(query)
				.success(function(data){
					$scope.keyboard.results = data;
					Preloader.stop();
				})
				.error(function(data){
					Preloader.error();
				});
		};
	}]);
