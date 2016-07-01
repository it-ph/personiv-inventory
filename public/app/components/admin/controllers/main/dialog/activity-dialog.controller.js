adminModule
	.controller('activityDialogController', ['$scope', '$mdDialog', 'Activitiy', 'Preloader', function($scope, $mdDialog, Activitiy, Preloader){
		var activityID = Preloader.get();

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		Activitiy.show(activityID)
			.success(function(data){
				
				
				$scope.activity = data;
			})
			.error(function(){
				Preloader.error()
			});
	}]);