adminModule
	.controller('videoCardUnitRightSidenavController', ['$scope', '$state', '$stateParams', 'VideoCard', function($scope, $state, $stateParams, VideoCard){
		$scope.asset = 'VideoCard';

		VideoCard.other($stateParams.unitID)
			.success(function(data){
				$scope.others = data;
			});

		$scope.show = function(id){
			$state.go('main.units', {'assetID': $stateParams.assetID, 'unitID': id});
		};
	}]);