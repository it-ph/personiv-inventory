adminModule
	.controller('transferAssetDialogController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Department', 'WorkStation', 'Preloader', 'AssetTagService', 'AssetTag', function($scope, $state, $stateParams, $mdDialog, Department, WorkStation, Preloader, AssetTagService, AssetTag){
		var assetTagID = AssetTagService.getID();
		$scope.workStation = AssetTagService.getStation();
		$scope.asset = {};

		$scope.cancel = function(){
			$mdDialog.cancel();
		};

		AssetTag.specific(assetTagID)
			.success(function(data){
				$scope.assetTag = data;
			})
			.error(function(){
				Preloader.error();
			});

		Department.index()
			.success(function(data){
				$scope.departments = data
			})
			.error(function(){0
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
			if($scope.assetTag.component_type=='Desktop'){
				var confirm = $mdDialog.confirm()
			        .title('Would you like to include components under this unit?')
			        .content('Hard disk(s), RAM(s), video card, and softwares will be transfered along with the unit.')
			        .ok('Continue')
			        .cancel('Keep it');
			    $mdDialog.show(confirm)
			    	.then(function() {
				      	Preloader.preload();
						AssetTag.transfer(assetTagID, $scope.asset)
							.success(function(){
								AssetTag.transferComponents($stateParams.workStationID, $scope.asset)
									.success(function(){
										$state.go('main.work-station', {}, {reload:true});
										Preloader.stop();
									})
									.error(function(){
										Preloader.error();
									});
							})
							.error(function(){
								Preloader.error();
							});
				    }, function() {
				    	Preloader.preload();
					    AssetTag.transfer(assetTagID, $scope.asset)
							.success(function(){
								$state.go('main.work-station', {}, {reload:true});
								Preloader.stop();
							})
							.error(function(){
								Preloader.error();
							});
				    });
			}
			else {
				Preloader.preload();
				AssetTag.transfer(assetTagID, $scope.asset)
					.success(function(){
						$mdDialog.hide();
					})
					.error(function(){
						Preloader.error();
					});
			}
		}
	}]);