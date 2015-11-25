adminModule
	.controller('keyboardUnitRightSidenavController', ['$scope', '$state', '$stateParams', 'Keyboard', function($scope, $state, $stateParams, Keyboard){
		$scope.asset = 'Keyboard';

		Keyboard.other($stateParams.unitID)
			.success(function(data){
				$scope.others = data;
			});

		$scope.show = function(id){
			$state.go('main.units', {'assetID': $stateParams.assetID, 'unitID': id});
		};
	}]);