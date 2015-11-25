adminModule
	.controller('upsUnitRightSidenavController', ['$scope', '$state', '$stateParams', 'UPS', function($scope, $state, $stateParams, UPS){
		$scope.asset = 'UPS';

		UPS.other($stateParams.unitID)
			.success(function(data){
				$scope.others = data;
			});

		$scope.show = function(id){
			$state.go('main.units', {'assetID': $stateParams.assetID, 'unitID': id});
		};
	}]);