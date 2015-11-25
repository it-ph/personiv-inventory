adminModule
	.controller('memoryUnitRightSidenavController', ['$scope', '$state', '$stateParams', 'Memory', function($scope, $state, $stateParams, Memory){
		$scope.asset = 'Memory';

		Memory.other($stateParams.unitID)
			.success(function(data){
				$scope.others = data;
			});

		$scope.show = function(id){
			$state.go('main.units', {'assetID': $stateParams.assetID, 'unitID': id});
		};
	}]);