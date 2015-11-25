adminModule
	.controller('portableHardDiskUnitContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'AssetTag', function($scope, $state, $stateParams, $mdDialog, Preloader, AssetTag){
		var unitID = $stateParams.unitID;
		var query = {};

		query.component_id = unitID;
		query.component_type = 'Portable Hard Disk';

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
			// clear portableHardDisk
			$scope.portableHardDisk.paginated = {};
			$scope.portableHardDisk.results = null;
			$scope.portableHardDisk.page = 2;
			AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.portableHardDisk.paginated = data.data;
				$scope.portableHardDisk.paginated.show = true;

				$scope.portableHardDisk.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.portableHardDisk.busy || ($scope.portableHardDisk.page > $scope.portableHardDisk.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.portableHardDisk.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.portableHardDisk.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.portableHardDisk.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.portableHardDisk.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.portableHardDisk.busy = false;
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
			// clear portableHardDisk
			$scope.portableHardDisk.paginated = {};
			$scope.portableHardDisk.results = null;
			$scope.portableHardDisk.page = 2;
			AssetTag.repairUnit(1, query)
			.then(function(data){
				$scope.listType = 'Under Repair'
				$scope.portableHardDisk.paginated = data.data;
				$scope.portableHardDisk.paginated.show = true;

				$scope.portableHardDisk.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.portableHardDisk.busy || ($scope.portableHardDisk.page > $scope.portableHardDisk.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.portableHardDisk.busy = true;

					// Calls the next page of pagination.
					AssetTag.repairUnit($scope.portableHardDisk.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.portableHardDisk.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.portableHardDisk.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.portableHardDisk.busy = false;
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
			// clear portableHardDisk
			$scope.portableHardDisk.paginated = {};
			$scope.portableHardDisk.results = null;
			$scope.portableHardDisk.page = 2;
			AssetTag.disposeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Disposed'
				$scope.portableHardDisk.paginated = data.data;
				$scope.portableHardDisk.paginated.show = true;

				$scope.portableHardDisk.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.portableHardDisk.busy || ($scope.portableHardDisk.page > $scope.portableHardDisk.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.portableHardDisk.busy = true;

					// Calls the next page of pagination.
					AssetTag.disposeUnit($scope.portableHardDisk.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.portableHardDisk.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.portableHardDisk.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.portableHardDisk.busy = false;
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
		 * Object for portableHardDisk
		 *
		*/
		$scope.portableHardDisk = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.portableHardDisk.page = 2;
		// 
		
		AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.portableHardDisk.paginated = data.data;
				$scope.portableHardDisk.paginated.show = true;

				$scope.portableHardDisk.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.portableHardDisk.busy || ($scope.portableHardDisk.page > $scope.portableHardDisk.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.portableHardDisk.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.portableHardDisk.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.portableHardDisk.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.portableHardDisk.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.portableHardDisk.busy = false;
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
			$scope.portableHardDisk.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.portableHardDisk.paginated.show = false;
			Preloader.preload();
			var query = {};
			query.userInput = $scope.portableHardDisk.userInput;
			query.component_id = unitID;
			query.component_type = 'Portable Hard Disk';
			query.table_name = 'portable_hard_disks';
			query.property_code = 'PPHD';
			AssetTag.search(query)
				.success(function(data){
					$scope.portableHardDisk.results = data;
					Preloader.stop();
				})
				.error(function(data){
					Preloader.error();
				});
		};
	}]);
