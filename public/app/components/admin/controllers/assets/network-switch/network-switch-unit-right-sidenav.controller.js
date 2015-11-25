adminModule
	.controller('networkSwitchUnitRightSidenavController', ['$scope', '$state', '$stateParams', 'NetworkSwitch', function($scope, $state, $stateParams, NetworkSwitch){
		$scope.asset = 'Network Switch';

		NetworkSwitch.other($stateParams.unitID)
			.success(function(data){
				$scope.others = data;
			});

		$scope.show = function(id){
			$state.go('main.units', {'assetID': $stateParams.assetID, 'unitID': id});
		};
	}]);