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


		$scope.showFloors = function(){
			$scope.workstations = [];
			$scope.asset.work_station_id = null;
			$scope.asset.floor = null;
			$scope.asset.division = null;
			WorkStation.floors($scope.asset.department)
				.success(function(data){
					$scope.floors = data;
				})
		}

		$scope.showDivisions = function(){
			$scope.asset.work_station_id = null;
			$scope.asset.division = null;
			$scope.workstations = [];
			WorkStation.divisions($scope.asset.department, $scope.asset.floor)
				.success(function(data){
					$scope.divisions = data;
				})
		}

		$scope.showWorkStations = function(){
			$scope.asset.work_station_id = null;
			$scope.workstations = [];
			WorkStation.availableTransfer($scope.asset, $stateParams.workStationID)
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