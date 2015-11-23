adminModule
	.controller('transferAssetDialogController', ['$scope', '$stateParams', '$mdDialog', 'Department', 'WorkStation', 'Preloader', 'AssetTagService', 'AssetTag', function($scope, $stateParams, $mdDialog, Department, WorkStation, Preloader, AssetTagService, AssetTag){
		var assetTagID = AssetTagService.getID();
		$scope.workStation = AssetTagService.getStation();

		$scope.cancel = function(){
			$mdDialog.cancel();
		};

		AssetTag.specific(assetTagID)
			.success(function(data){
				$scope.asset = data;
			})
			.error(function(){
				Preloader.error();
			});

		Department.index()
			.success(function(data){
				$scope.departments = data
			})
			.error(function(){
				Preloader.error();
			});

		$scope.showWorkStations = function(){
			WorkStation.department($scope.asset.department, $stateParams.workStationID)
				.success(function(data){
					$scope.workstations = data;
				});
		};

		$scope.submit = function(){
			// start preloader
			Preloader.preload();
			AssetTag.transfer(assetTagID, $scope.asset)
				.success(function(){
					$mdDialog.hide();
				})
				.error(function(){
					Preloader.error();
				});
		}
	}]);