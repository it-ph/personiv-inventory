adminModule
	.controller('projectorUnitRightSidenavController', ['$scope', '$state', '$stateParams', 'Projector', function($scope, $state, $stateParams, Projector){
		$scope.asset = 'Projector';

		Projector.other($stateParams.unitID)
			.success(function(data){
				$scope.others = data;
			});

		$scope.show = function(id){
			$state.go('main.units', {'assetID': $stateParams.assetID, 'unitID': id});
		};
	}]);