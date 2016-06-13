adminModule
	.controller('workStationRightSidenavController', ['$scope', '$state', '$stateParams', 'Preloader', 'WorkStation', 'Department', function($scope, $state, $stateParams, Preloader, WorkStation, Department){
		/**
		 * Object for content view
		 *
		*/
		$scope.rightSidenav = {};

		var departmentID = $stateParams.departmentID;

		$scope.rightSidenav.page = 2;

		// WorkStation.departmentPaginate(departmentID, $stateParams.workStationID)
		// 	.success(function(data){
		// 		$scope.rightSidenav.workStations = data;
		// 	})
		// 	.error(function(){
		// 		Preloader.error();
		// 	});

		WorkStation.departmentPaginate(departmentID, $stateParams.workStationID)
			.then(function(data){
				$scope.rightSidenav.paginated = data.data;
				$scope.rightSidenav.paginated.show = true;

				$scope.rightSidenav.paginateLoad = function(){
					// kills the function if ajax is busy or pagination reaches last page
					if($scope.rightSidenav.busy || ($scope.rightSidenav.page > $scope.rightSidenav.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.rightSidenav.busy = true;

					// Calls the next page of pagination.
					WorkStation.departmentPaginate(departmentID, $stateParams.workStationID, $scope.rightSidenav.page)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.rightSidenav.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.rightSidenav.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.rightSidenav.busy = false;
						});
				}
			}, function(){
				Preloader.error();
			});

		$scope.rightSidenav.show = function(workStationID){
			$state.go('main.work-station', {'departmentID': departmentID, 'workStationID': workStationID});
		};
	}]);