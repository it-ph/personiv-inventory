adminModule
	.controller('telephoneUnitRightSidenavController', ['$scope', '$state', '$stateParams', 'Telephone', function($scope, $state, $stateParams, Telephone){
		$scope.asset = 'Telephone';

		Telephone.other($stateParams.unitID)
			.success(function(data){
				$scope.others = data;
			});

		$scope.show = function(id){
			$state.go('main.units', {'assetID': $stateParams.assetID, 'unitID': id});
		};
	}]);