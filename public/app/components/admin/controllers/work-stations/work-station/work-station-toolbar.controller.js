adminModule
	.controller('workStationToolbarController', ['$scope', '$state', '$stateParams', 'departmentService', 'Department', 'WorkStation', 'AssetTagService', function($scope, $state, $stateParams, departmentService, Department, WorkStation, AssetTagService){
		/**
		 *  Object for toolbar view.
		 *
		*/
		$scope.toolbar = {};

		/**
		 * Properties and method of toolbar.
		 *
		*/
		var departmentID = $stateParams.departmentID;
		var index = departmentID - 1;

		$scope.toolbar.showBack = true;

		$scope.toolbar.back = function(){
			$state.go('main.floor-plan', {'departmentID': departmentID});
		};

		var departments = departmentService.get();
		if(!departments.length){
			Department.index()
				.success(function(data){
					departments = data;
					$scope.toolbar.parentState = departments[index].name;
				})
				.error(function(){
					Preload.error();
				});
		}
		else{
			$scope.toolbar.parentState = departments[index].name;
		}

		WorkStation.show($stateParams.workStationID)
			.success(function(data){
				$scope.toolbar.childState = data.name;
				AssetTagService.setStation(data.name);
			})
			.error(function(){
				Preload.error();
			});
	}]);