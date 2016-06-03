adminModule
	.controller('departmentOrAssetTypeDialogController', ['$scope', '$mdDialog', function($scope, $mdDialog){
		$scope.category = 'Department';
		$scope.label = "Choose one to create";
		
		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.submit = function(){
			$mdDialog.hide($scope.category);
		}
	}]);