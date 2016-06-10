adminModule
	.controller('createUserDialogController', ['$scope', '$mdDialog', 'User', 'Preloader', function($scope, $mdDialog, User, Preloader){
		$scope.user = {};
		$scope.user.role = 'admin';

		$scope.cancel = function(){
			$mdDialog.cancel();
		}


		$scope.submit = function(){
			$scope.showErrors = true;
			if($scope.userForm.$invalid){
				angular.forEach($scope.userForm.$error, function(field){
					angular.forEach(field, function(errorField){
						errorField.$setTouched();
					});
				});
			}
			else if($scope.user.password != $scope.user.password_confirmation)
			{
				return;
			}
			else {
				Preloader.saving();

				User.store($scope.user)
					.success(function(){
						Preloader.stop();
					})
					.error(function(){
						Preloader.error();
					});
			}
		}
	}]);