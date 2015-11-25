adminModule
	.controller('telephoneUnitContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'AssetTag', function($scope, $state, $stateParams, $mdDialog, Preloader, AssetTag){
		var unitID = $stateParams.unitID;
		var query = {};

		query.component_id = unitID;
		query.component_type = 'Telephone';

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
			// clear telephone
			$scope.telephone.paginated = {};
			$scope.telephone.results = null;
			$scope.telephone.page = 2;
			AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.telephone.paginated = data.data;
				$scope.telephone.paginated.show = true;

				$scope.telephone.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.telephone.busy || ($scope.telephone.page > $scope.telephone.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.telephone.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.telephone.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.telephone.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.telephone.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.telephone.busy = false;
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
			// clear telephone
			$scope.telephone.paginated = {};
			$scope.telephone.results = null;
			$scope.telephone.page = 2;
			AssetTag.repairUnit(1, query)
			.then(function(data){
				$scope.listType = 'Under Repair'
				$scope.telephone.paginated = data.data;
				$scope.telephone.paginated.show = true;

				$scope.telephone.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.telephone.busy || ($scope.telephone.page > $scope.telephone.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.telephone.busy = true;

					// Calls the next page of pagination.
					AssetTag.repairUnit($scope.telephone.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.telephone.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.telephone.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.telephone.busy = false;
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
			// clear telephone
			$scope.telephone.paginated = {};
			$scope.telephone.results = null;
			$scope.telephone.page = 2;
			AssetTag.disposeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Disposed'
				$scope.telephone.paginated = data.data;
				$scope.telephone.paginated.show = true;

				$scope.telephone.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.telephone.busy || ($scope.telephone.page > $scope.telephone.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.telephone.busy = true;

					// Calls the next page of pagination.
					AssetTag.disposeUnit($scope.telephone.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.telephone.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.telephone.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.telephone.busy = false;
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
		 * Object for telephone
		 *
		*/
		$scope.telephone = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.telephone.page = 2;
		// 
		
		AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.telephone.paginated = data.data;
				$scope.telephone.paginated.show = true;

				$scope.telephone.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.telephone.busy || ($scope.telephone.page > $scope.telephone.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.telephone.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.telephone.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.telephone.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.telephone.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.telephone.busy = false;
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
			$scope.telephone.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.telephone.paginated.show = false;
			Preloader.preload();
			var query = {};
			query.userInput = $scope.telephone.userInput;
			query.component_id = unitID;
			query.component_type = 'Telephone';
			query.table_name = 'telephones';
			query.property_code = 'PTEL';
			AssetTag.search(query)
				.success(function(data){
					$scope.telephone.results = data;
					Preloader.stop();
				})
				.error(function(data){
					Preloader.error();
				});
		};
	}]);
