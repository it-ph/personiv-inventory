adminModule
	.controller('portableHardDiskUnitRightSidenavController', ['$scope', '$state', '$stateParams', 'PortableHardDisk', function($scope, $state, $stateParams, PortableHardDisk){
		$scope.asset = 'Portable Hard Disk';

		PortableHardDisk.other($stateParams.unitID)
			.success(function(data){
				$scope.others = data;
			});

		$scope.show = function(id){
			$state.go('main.units', {'assetID': $stateParams.assetID, 'unitID': id});
		};
	}]);