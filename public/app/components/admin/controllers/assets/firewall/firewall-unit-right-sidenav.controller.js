adminModule
	.controller('firewallUnitRightSidenavController', ['$scope', '$state', '$stateParams', 'Firewall', function($scope, $state, $stateParams, Firewall){
		$scope.asset = 'Firewall';

		Firewall.other($stateParams.unitID)
			.success(function(data){
				$scope.others = data;
			});

		$scope.show = function(id){
			$state.go('main.units', {'assetID': $stateParams.assetID, 'unitID': id});
		};
	}]);