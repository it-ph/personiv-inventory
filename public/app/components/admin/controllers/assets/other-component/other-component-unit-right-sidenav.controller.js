adminModule
	.controller('otherComponentUnitRightSidenavController', ['$scope', '$state', '$stateParams', 'OtherComponent', function($scope, $state, $stateParams, OtherComponent){
		$scope.asset = 'Component';

		OtherComponent.other($stateParams.unitID)
			.success(function(data){
				$scope.others = data;
			});

		$scope.show = function(id){
			$state.go('main.units', {'assetID': $stateParams.assetID, 'unitID': id});
		};
	}]);