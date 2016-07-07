adminModule
	.controller('chartWeeklyDialogController', ['$scope', '$mdDialog', 'InventoryReport', 'Preloader', function($scope, $mdDialog, InventoryReport, Preloader){
		var chart = Preloader.get();

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		InventoryReport.chartWeekly(chart)
			.success(function(data){
				$scope.chart = data;
			})
			.error(function(){
				Preloader.error()
			});
	}]);