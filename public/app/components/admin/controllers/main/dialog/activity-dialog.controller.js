adminModule
	.controller('activityDialogController', ['$scope', '$mdDialog', 'Activity', 'Preloader', function($scope, $mdDialog, Activity, Preloader){
		var activityID = Preloader.get();

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		Activity.show(activityID)
			.success(function(data){
				
				$scope.activity = data;
			})
			.error(function(){
				Preloader.error()
			});
	}]);