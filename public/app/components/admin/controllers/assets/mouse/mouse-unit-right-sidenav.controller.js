adminModule
	.controller('mouseUnitRightSidenavController', ['$scope', '$state', '$stateParams', 'Mouse', function($scope, $state, $stateParams, Mouse){
		$scope.asset = 'Mouse';

		Mouse.other($stateParams.unitID)
			.success(function(data){
				$scope.others = data;
			});

		$scope.show = function(id){
			$state.go('main.units', {'assetID': $stateParams.assetID, 'unitID': id});
		};
	}]);