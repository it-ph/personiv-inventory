adminModule
	.controller('videoCardContentContainerController', ['$scope', '$mdDialog', 'Preloader', 'VideoCard', function($scope, $mdDialog, Preloader, VideoCard){
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
			$scope.videoCard.paginated = {};
			$scope.videoCard.page = 2;
			VideoCard.paginate()
				.then(function(data){
					$scope.videoCard.paginated = data.data;
					$scope.videoCard.paginated.show = true;
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
		$scope.fab.show = true;

		$scope.fab.action = function(){
		    $mdDialog.show({
		      	controller: 'addVideoCardDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-video-card-dialog.template.html',
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
		 * Object for videoCard
		 *
		*/
		$scope.videoCard = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.videoCard.page = 2;

		VideoCard.paginate()
			.then(function(data){
				$scope.videoCard.paginated = data.data;
				$scope.videoCard.paginated.show = true;

				$scope.videoCard.paginateLoad = function(){
					// kills the function if ajax is busy or pagination reaches last page
					if($scope.videoCard.busy || ($scope.videoCard.page > $scope.videoCard.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.videoCard.busy = true;

					// Calls the next page of pagination.
					VideoCard.paginate($scope.videoCard.page)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.videoCard.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.videoCard.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.videoCard.busy = false;
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
			$scope.videoCard.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.videoCard.paginated.show = false;
			Preloader.preload();
			VideoCard.search($scope.videoCard)
				.success(function(data){
					$scope.videoCard.results = data;
					Preloader.stop();
				})
				.error(function(data){
					Preloader.error();
				});
		};
	}]);