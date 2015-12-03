adminModule
	.controller('departmentContentContainerController', ['$scope', '$stateParams', '$mdDialog', 'Preloader', 'Employee', 'UserService', function($scope, $stateParams, $mdDialog, Preloader, Employee, UserService){
		/**
		 * Object for subheader
		 *
		*/
		var departmentID = $stateParams.departmentID;

		$scope.subheader = {};
		$scope.subheader.state = 'departments';

		/* Refreshes the list */
		$scope.subheader.refresh = function(){
			// start preloader
			Preloader.preload();
			// clear desktop
			$scope.employee.paginated = {};
			$scope.employee.page = 2;
			Employee.paginateDepartment(departmentID)
				.then(function(data){
					$scope.employee.paginated = data.data;
					$scope.employee.paginated.show = true;
					// stop preload
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
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
		      	controller: 'addEmployeeDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-employee-dialog.template.html',
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
		 * Object for Employee
		 *
		*/
		$scope.employee = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.employee.page = 2;
		//

		Employee.paginateDepartment(departmentID)
			.then(function(data){
				$scope.employee.paginated = data.data;
				$scope.employee.paginated.show = true;

				$scope.employee.paginateLoad = function(){
					// kills the function if ajax is busy or pagination reaches last page
					if($scope.employee.busy || ($scope.employee.page > $scope.employee.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.employee.busy = true;

					// Calls the next page of pagination.
					Employee.paginateDepartment(departmentID, $scope.employee.page)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.employee.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.employee.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.employee.busy = false;

							console.log('loaded');
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
			$scope.employee.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.employee.paginated.show = false;
			Preloader.preload()
			Employee.search(departmentID, $scope.employee)
				.success(function(data){
					$scope.employee.results = data;
					Preloader.stop();
				})
				.error(function(data){
					Preloader.error();
				});
		};

		$scope.show = function(id){
			UserService.set(id);
			$mdDialog.show({
		      	controller: 'showEmployeeDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/show-employee-dialog.template.html',
		      	parent: angular.element($('body')),
		      	clickOutsideToClose:true,
		    });
		};
	}]);