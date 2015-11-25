adminModule
	.controller('hardDiskUnitRightSidenavController', ['$scope', '$state', '$stateParams', 'HardDisk', function($scope, $state, $stateParams, HardDisk){
		$scope.asset = 'Hard Disk';

		HardDisk.other($stateParams.unitID)
			.success(function(data){
				$scope.others = data;
			});

		$scope.show = function(id){
			$state.go('main.units', {'assetID': $stateParams.assetID, 'unitID': id});
		};
	}]);