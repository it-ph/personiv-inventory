adminModule
	.controller('routerUnitRightSidenavController', ['$scope', '$state', '$stateParams', 'Router', function($scope, $state, $stateParams, Router){
		$scope.asset = 'Router';

		Router.other($stateParams.unitID)
			.success(function(data){
				$scope.others = data;
			});

		$scope.show = function(id){
			$state.go('main.units', {'assetID': $stateParams.assetID, 'unitID': id});
		};
	}]);