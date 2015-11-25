adminModule
	.controller('speakerContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'Speaker', function($scope, $state, $stateParams, $mdDialog, Preloader, Speaker){
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
			$scope.speaker.paginated = {};
			$scope.speaker.page = 2;
			Speaker.paginate()
				.then(function(data){
					$scope.speaker.paginated = data.data;
					$scope.speaker.paginated.show = true;
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
		$scope.fab.tooltip = 'Add Speaker';
		$scope.fab.show = true;

		$scope.fab.action = function(){
		    $mdDialog.show({
		      	controller: 'addSpeakerDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-speaker-dialog.template.html',
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
		 * Object for speaker
		 *
		*/
		$scope.speaker = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.speaker.page = 2;

		Speaker.paginate()
			.then(function(data){
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
					Speaker.paginate($scope.speaker.page)
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
			Speaker.search($scope.speaker)
				.success(function(data){
					$scope.speaker.results = data;
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