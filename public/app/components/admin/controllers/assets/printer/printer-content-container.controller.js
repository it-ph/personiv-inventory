adminModule
	.controller('printerContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'Printer', function($scope, $state, $stateParams, $mdDialog, Preloader, Printer){
		/**
		 * Object for subheader
		 *
		*/
		$scope.subheader = {};
		$scope.subheader.state = 'assets';

		/* Refreshes the list */
		$scope.subheader.refresh = function(){
			// start preloader
			Preloader.preload();
			// clear desktop
			$scope.printer.paginated = {};
			$scope.printer.page = 2;
			Printer.paginate()
				.then(function(data){
					$scope.printer.paginated = data.data;
					$scope.printer.paginated.show = true;
					// stop preload
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		};

		/**
		 * Object for content view
		 *
		*/
		$scope.fab = {};

		$scope.fab.icon = 'mdi-plus';
		$scope.fab.label = 'Add';
		$scope.fab.tooltip = 'Add Printer';
		$scope.fab.show = true;

		$scope.fab.action = function(){
		    $mdDialog.show({
		      	controller: 'addPrinterDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-printer-dialog.template.html',
		      	parent: angular.element($('body')),
		    })
		    .then(function(){
		    	/* Refreshes the list */
		    	$scope.subheader.refresh();
		    });
		};

		/**
		 * Object for rightSidenav
		 *
		*/
		$scope.rightSidenav = {};
		// hides right sidenav
		$scope.rightSidenav.show = false;

		/**
		 * Object for Headset
		 *
		*/
		$scope.printer = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.printer.page = 2;

		Printer.paginate()
			.then(function(data){
				$scope.printer.paginated = data.data;
				$scope.printer.paginated.show = true;

				$scope.printer.paginateLoad = function(){
					// kills the function if ajax is busy or pagination reaches last page
					if($scope.printer.busy || ($scope.printer.page > $scope.printer.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.printer.busy = true;

					// Calls the next page of pagination.
					Printer.paginate($scope.printer.page)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.printer.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.printer.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.printer.busy = false;
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
			$scope.printer.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.printer.paginated.show = false;
			Preloader.preload();
			Printer.search($scope.printer)
				.success(function(data){
					$scope.printer.results = data;
					Preloader.stop();
				})
				.error(function(data){
					Preloader.error();
				});
		};

		$scope.show = function(id){
			$state.go('main.units', {'assetID': $stateParams.assetID, 'unitID':id});
		};
	}]);