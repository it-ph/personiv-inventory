adminModule
	.controller('speakerUnitRightSidenavController', ['$scope', '$state', '$stateParams', 'Speaker', function($scope, $state, $stateParams, Speaker){
		$scope.asset = 'Speaker';

		Speaker.other($stateParams.unitID)
			.success(function(data){
				$scope.others = data;
			});

		$scope.show = function(id){
			$state.go('main.units', {'assetID': $stateParams.assetID, 'unitID': id});
		};
	}]);