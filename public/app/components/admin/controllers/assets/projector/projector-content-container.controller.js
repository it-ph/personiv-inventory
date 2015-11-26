adminModule
	.controller('projectorContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'Projector', function($scope, $state, $stateParams, $mdDialog, Preloader, Projector){
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
			$scope.projector.paginated = {};
			$scope.projector.page = 2;
			Projector.paginate()
				.then(function(data){
					$scope.projector.paginated = data.data;
					$scope.projector.paginated.show = true;
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
		$scope.fab.tooltip = 'Add projector';
		$scope.fab.show = true;

		$scope.fab.action = function(){
		    $mdDialog.show({
		      	controller: 'addProjectorDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-projector-dialog.template.html',
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
		 * Object for projector
		 *
		*/
		$scope.projector = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.projector.page = 2;

		Projector.paginate()
			.then(function(data){
				$scope.projector.paginated = data.data;
				$scope.projector.paginated.show = true;

				$scope.projector.paginateLoad = function(){
					// kills the function if ajax is busy or pagination reaches last page
					if($scope.projector.busy || ($scope.projector.page > $scope.projector.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.projector.busy = true;

					// Calls the next page of pagination.
					Projector.paginate($scope.projector.page)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.projector.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.projector.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.projector.busy = false;
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
			$scope.projector.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.projector.paginated.show = false;
			Preloader.preload();
			Projector.search($scope.projector)
				.success(function(data){
					$scope.projector.results = data;
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