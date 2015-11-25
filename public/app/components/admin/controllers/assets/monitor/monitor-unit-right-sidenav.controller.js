adminModule
	.controller('monitorUnitRightSidenavController', ['$scope', '$state', '$stateParams', 'Monitor', function($scope, $state, $stateParams, Monitor){
		$scope.asset = 'Monitor';

		Monitor.other($stateParams.unitID)
			.success(function(data){
				$scope.others = data;
			});

		$scope.show = function(id){
			$state.go('main.units', {'assetID': $stateParams.assetID, 'unitID': id});
		};
	}]);