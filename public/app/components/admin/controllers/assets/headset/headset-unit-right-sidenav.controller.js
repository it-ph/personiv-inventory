adminModule
	.controller('headsetUnitRightSidenavController', ['$scope', '$state', '$stateParams', 'Headset', function($scope, $state, $stateParams, Headset){
		$scope.asset = 'Headset';

		Headset.other($stateParams.unitID)
			.success(function(data){
				$scope.others = data;
			});

		$scope.show = function(id){
			$state.go('main.units', {'assetID': $stateParams.assetID, 'unitID': id});
		};
	}]);