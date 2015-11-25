adminModule
	.controller('printerUnitRightSidenavController', ['$scope', '$state', '$stateParams', 'Printer', function($scope, $state, $stateParams, Printer){
		$scope.asset = 'Printer';

		Printer.other($stateParams.unitID)
			.success(function(data){
				$scope.others = data;
			});

		$scope.show = function(id){
			$state.go('main.units', {'assetID': $stateParams.assetID, 'unitID': id});
		};
	}]);