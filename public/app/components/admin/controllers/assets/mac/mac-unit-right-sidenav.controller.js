adminModule
	.controller('macUnitRightSidenavController', ['$scope', '$state', '$stateParams', 'Mac', function($scope, $state, $stateParams, Mac){
		$scope.asset = 'Mac';

		Mac.other($stateParams.unitID)
			.success(function(data){
				$scope.others = data;
			});

		$scope.show = function(id){
			$state.go('main.units', {'assetID': $stateParams.assetID, 'unitID': id});
		};
	}]);