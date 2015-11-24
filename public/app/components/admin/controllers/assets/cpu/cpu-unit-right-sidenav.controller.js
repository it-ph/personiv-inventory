adminModule
	.controller('cpuUnitRightSidenavController', ['$scope', '$state', '$stateParams', 'Desktop', function($scope, $state, $stateParams, Desktop){
		$scope.asset = 'CPU';

		Desktop.other($stateParams.unitID)
			.success(function(data){
				$scope.others = data;
			});

		$scope.show = function(id){
			$state.go('main.units', {'assetID': $stateParams.assetID, 'unitID': id});
		};
	}]);