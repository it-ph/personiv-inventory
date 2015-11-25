adminModule
	.controller('keyboardContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'Keyboard', function($scope, $state, $stateParams, $mdDialog, Preloader, Keyboard){
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
			$scope.keyboard.paginated = {};
			$scope.keyboard.page = 2;
			Keyboard.paginate()
				.then(function(data){
					$scope.keyboard.paginated = data.data;
					$scope.keyboard.paginated.show = true;
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
		$scope.fab.tooltip = 'Add Keyboard';
		$scope.fab.show = true;

		$scope.fab.action = function(){
		    $mdDialog.show({
		      	controller: 'addKeyboardDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-keyboard-dialog.template.html',
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
		$scope.keyboard = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.keyboard.page = 2;

		Keyboard.paginate()
			.then(function(data){
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
					Keyboard.paginate($scope.keyboard.page)
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
			Keyboard.search($scope.keyboard)
				.success(function(data){
					$scope.keyboard.results = data;
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