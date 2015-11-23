adminModule
	.controller('scannerContentContainerController', ['$scope', '$mdDialog', 'Preloader', 'Scanner', function($scope, $mdDialog, Preloader, Scanner){
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
			$scope.scanner.paginated = {};
			$scope.scanner.page = 2;
			Scanner.paginate()
				.then(function(data){
					$scope.scanner.paginated = data.data;
					$scope.scanner.paginated.show = true;
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
		$scope.fab.tooltip = 'Add Scanner';
		$scope.fab.show = true;

		$scope.fab.action = function(){
		    $mdDialog.show({
		      	controller: 'addScannerDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-scanner-dialog.template.html',
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
		 * Object for Scanner
		 *
		*/
		$scope.scanner = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.scanner.page = 2;

		Scanner.paginate()
			.then(function(data){
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
					Scanner.paginate($scope.scanner.page)
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
			Scanner.search($scope.scanner)
				.success(function(data){
					$scope.scanner.results = data;
					Preloader.stop();
				})
				.error(function(data){
					Preloader.error();
				});
		};
	}]);