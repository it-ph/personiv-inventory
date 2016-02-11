adminModule
	.controller('mainContentContainerController', ['$scope', '$state', '$mdDialog', 'Preloader', 'Log', 'EmailReport', 'AssetTag', 'WorkStationTag', function($scope, $state, $mdDialog, Preloader, Log, EmailReport, AssetTag, WorkStationTag){
		/**
		 * Object for subheader
		 *
		*/
		$scope.subheader = {};
		$scope.subheader.state = 'logs';

		/* Refreshes the list */
		$scope.subheader.refresh = function(){
			// start preloader
			Preloader.preload();
			$scope.search = {};
			// clear log
			$scope.log.paginated = {};
			$scope.log.page = 2;
			Log.paginate()
				.then(function(data){
					$scope.log.paginated = data.data;
					$scope.log.paginated.show = true;
					// stop preload
					Preloader.stop();
				}, function(){
					Preloader.error();
				});


		};

		$scope.subheader.download = function(){
			// start preloader
			Preloader.preload();

			EmailReport.index()
				.success(function(){
					Preloader.stop();
				});
		};

		$scope.subheader.barcode = function(){
			$mdDialog.show({
		    	controller: 'barcodeDialogController',
		      	templateUrl: '/app/components/admin/templates/dialogs/barcode-dialog.template.html',
		      	parent: angular.element(document.body),
		    });
		}
		/**
		 * Object for log
		 *
		*/
		$scope.log = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.log.page = 2;
		//

		Log.paginate()
			.then(function(data){
				$scope.log.paginated = data.data;
				$scope.log.paginated.show = true;

				$scope.log.paginateLoad = function(){
					// kills the function if ajax is busy or pagination reaches last page
					if($scope.log.busy || ($scope.log.page > $scope.log.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.log.busy = true;

					// Calls the next page of pagination.
					Log.paginate($scope.log.page)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.log.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.log.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.log.busy = false;
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
			$scope.search.userInput = '';
			$scope.searchBar = false;
		};

		$scope.search = {};
		
		
		$scope.searchUserInput = function(){
			if($scope.search.userInput){
				$scope.search.showWorkStation = false;
				var firstLetter = $scope.search.userInput.charAt(0);
				if(firstLetter == 'p' || firstLetter == 'P'){
					Preloader.preload();
					AssetTag.searchBarcode($scope.search)
						.success(function(data){
							$scope.search.showAsset = true;
							$scope.search.result = data;
							Preloader.stop();
						})
						.error(function(){
							Preloader.error();
						});
				}
				else if(firstLetter == 'a' || firstLetter == 'A'){
					$scope.search.showAsset = false;
					Preloader.preload();
					WorkStationTag.searchBarcode($scope.search)
						.success(function(data){
							$scope.search.showWorkStation = true;
							$scope.search.result = data;
							Preloader.stop();
						})
						.error(function(){
							Preloader.error();
						});
				}
				else{
					$scope.search.show = true;
				}
			}
		};

		$scope.show = function(departmentID, workStationID){
			$state.go('main.work-station', {'departmentID': departmentID, 'workStationID':workStationID});
		};
		/**
		 * Object for content view
		 *
		*/
		$scope.fab = {};

		// $scope.fab.icon = 'mdi-plus';
		// $scope.fab.label = 'Add';
		
		$scope.fab.show = false;

		// $scope.fab.action = function(){
		// 	return;
		// };

		$scope.rightSidenav = {};
		$scope.rightSidenav.show = true;
	}]);