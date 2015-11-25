adminModule
	.controller('softwareUnitRightSidenavController', ['$scope', '$state', '$stateParams', 'Software', function($scope, $state, $stateParams, Software){
		$scope.asset = 'Software';

		Software.other($stateParams.unitID)
			.success(function(data){
				$scope.others = data;
			});

		$scope.show = function(id){
			$state.go('main.units', {'assetID': $stateParams.assetID, 'unitID': id});
		};
	}]);