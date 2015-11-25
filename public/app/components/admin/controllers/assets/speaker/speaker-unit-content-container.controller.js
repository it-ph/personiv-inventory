adminModule
	.controller('speakerUnitContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'AssetTag', function($scope, $state, $stateParams, $mdDialog, Preloader, AssetTag){
		var unitID = $stateParams.unitID;
		var query = {};

		query.component_id = unitID;
		query.component_type = 'Speaker';

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
			// clear speaker
			$scope.speaker.paginated = {};
			$scope.speaker.results = null;
			$scope.speaker.page = 2;
			AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.speaker.paginated = data.data;
				$scope.speaker.paginated.show = true;

				$scope.speaker.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.speaker.busy || ($scope.speaker.page > $scope.speaker.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.speaker.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.speaker.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.speaker.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.speaker.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.speaker.busy = false;
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
			// clear speaker
			$scope.speaker.paginated = {};
			$scope.speaker.results = null;
			$scope.speaker.page = 2;
			AssetTag.repairUnit(1, query)
			.then(function(data){
				$scope.listType = 'Under Repair'
				$scope.speaker.paginated = data.data;
				$scope.speaker.paginated.show = true;

				$scope.speaker.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.speaker.busy || ($scope.speaker.page > $scope.speaker.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.speaker.busy = true;

					// Calls the next page of pagination.
					AssetTag.repairUnit($scope.speaker.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.speaker.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.speaker.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.speaker.busy = false;
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
			// clear speaker
			$scope.speaker.paginated = {};
			$scope.speaker.results = null;
			$scope.speaker.page = 2;
			AssetTag.disposeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Disposed'
				$scope.speaker.paginated = data.data;
				$scope.speaker.paginated.show = true;

				$scope.speaker.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.speaker.busy || ($scope.speaker.page > $scope.speaker.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.speaker.busy = true;

					// Calls the next page of pagination.
					AssetTag.disposeUnit($scope.speaker.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.speaker.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.speaker.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.speaker.busy = false;
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
		 * Object for speaker
		 *
		*/
		$scope.speaker = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.speaker.page = 2;
		// 
		
		AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.speaker.paginated = data.data;
				$scope.speaker.paginated.show = true;

				$scope.speaker.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.speaker.busy || ($scope.speaker.page > $scope.speaker.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.speaker.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.speaker.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.speaker.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.speaker.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.speaker.busy = false;
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
			$scope.speaker.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.speaker.paginated.show = false;
			Preloader.preload();
			var query = {};
			query.userInput = $scope.speaker.userInput;
			query.component_id = unitID;
			query.component_type = 'Speaker';
			query.table_name = 'speakers';
			query.property_code = 'PSPK';
			AssetTag.search(query)
				.success(function(data){
					$scope.speaker.results = data;
					Preloader.stop();
				})
				.error(function(data){
					Preloader.error();
				});
		};
	}]);
