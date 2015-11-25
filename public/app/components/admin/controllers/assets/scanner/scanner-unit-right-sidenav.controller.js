adminModule
	.controller('scannerUnitRightSidenavController', ['$scope', '$state', '$stateParams', 'Scanner', function($scope, $state, $stateParams, Scanner){
		$scope.asset = 'Scanner';

		Scanner.other($stateParams.unitID)
			.success(function(data){
				$scope.others = data;
			});

		$scope.show = function(id){
			$state.go('main.units', {'assetID': $stateParams.assetID, 'unitID': id});
		};
	}]);