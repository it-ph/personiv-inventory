adminModule
	.controller('addDesktopDialogController', ['$scope', '$mdDialog', 'Desktop', function($scope, $mdDialog, Desktop){
		$scope.cpu = {};

		$scope.cancel = function(){
			$mdDialog.cancel();
		}
	}]);