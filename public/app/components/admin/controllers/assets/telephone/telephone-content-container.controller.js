adminModule
	.controller('telephoneContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'Telephone', function($scope, $state, $stateParams, $mdDialog, Preloader, Telephone){
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
			$scope.telephone.paginated = {};
			$scope.telephone.page = 2;
			Telephone.paginate()
				.then(function(data){
					$scope.telephone.paginated = data.data;
					$scope.telephone.paginated.show = true;
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
		$scope.fab.tooltip = 'Add Telephone';
		$scope.fab.show = true;

		$scope.fab.action = function(){
		    $mdDialog.show({
		      	controller: 'addTelephoneDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-telephone-dialog.template.html',
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
		 * Object for telephone
		 *
		*/
		$scope.telephone = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.telephone.page = 2;

		Telephone.paginate()
			.then(function(data){
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
					Telephone.paginate($scope.telephone.page)
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
			Telephone.search($scope.telephone)
				.success(function(data){
					$scope.telephone.results = data;
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