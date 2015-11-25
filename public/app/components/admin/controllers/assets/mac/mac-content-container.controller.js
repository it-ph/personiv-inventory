adminModule
	.controller('macContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'Mac', function($scope, $state, $stateParams, $mdDialog, Preloader, Mac){
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
			$scope.mac.paginated = {};
			$scope.mac.page = 2;
			Mac.paginate()
				.then(function(data){
					$scope.mac.paginated = data.data;
					$scope.mac.paginated.show = true;
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
		$scope.fab.tooltip = 'Add Mac';
		$scope.fab.show = true;

		$scope.fab.action = function(){
		    $mdDialog.show({
		      	controller: 'addMacDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-mac-dialog.template.html',
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
		 * Object for mac
		 *
		*/
		$scope.mac = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.mac.page = 2;

		Mac.paginate()
			.then(function(data){
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
					Mac.paginate($scope.mac.page)
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
			Mac.search($scope.mac)
				.success(function(data){
					$scope.mac.results = data;
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