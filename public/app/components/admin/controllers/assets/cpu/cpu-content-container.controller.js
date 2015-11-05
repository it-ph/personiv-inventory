adminModule
	.controller('cpuContentContainerController', ['$scope', '$mdDialog', 'Preloader', 'Desktop', function($scope, $mdDialog, Preloader, Desktop){
		/**
		 * Object for subheader
		 *
		*/
		$scope.subheader = {};
		$scope.subheader.state = 'assets';


		$scope.subheader.refresh = function(){
			Desktop.paginate()
		};

		/**
		 * Object for fab
		 *
		*/
		$scope.fab = {};

		$scope.fab.icon = 'mdi-plus';
		$scope.fab.label = 'Add';
		$scope.fab.show = true;

		$scope.fab.action = function(){
		    $mdDialog.show({
		      	controller: 'addDesktopDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-cpu-dialog.template.html',
		      	parent: angular.element($('body')),
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
		 * Object for Desktop
		 *
		*/
		$scope.desktop = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.desktop.page = 2;

		Desktop.paginate()
			.then(function(data){
				$scope.desktop.paginated = data.data;

				$scope.desktop.paginateLoad = function(){
					// kills the function if ajax is busy or pagination reaches last page
					if($scope.desktop.busy || ($scope.desktop.page > $scope.desktop.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.desktop.busy = true;

					// Calls the next page of pagination.
					Desktop.paginate($scope.desktop.page)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.desktop.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data, function(item, key){
								$scope.desktop.paginated.data.splice(key, 0, item);
							});

							// Enables again the pagination call for next call.
							$scope.desktop.busy = false;
							console.log('loaded');
						});
				}
			});
	}]);