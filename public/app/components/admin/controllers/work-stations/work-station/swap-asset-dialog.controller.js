adminModule
	.controller('swapAssetDialogController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Department', 'WorkStation', 'Preloader', 'AssetTagService', 'AssetTag', function($scope, $state, $stateParams, $mdDialog, Department, WorkStation, Preloader, AssetTagService, AssetTag){
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
			.error(function(){
				Preloader.error();
			});


		$scope.showFloors = function(){
			$scope.workstations = [];
			$scope.assetTag.work_station_id = null;
			$scope.assetTag.asset_tag_id = null;
			$scope.assetTag.floor = null;
			$scope.assetTag.division = null;
			WorkStation.floors($scope.assetTag.department)
				.success(function(data){
					$scope.floors = data;
				})
		};

		$scope.showDivisions = function(){
			$scope.assetTag.work_station_id = null;
			$scope.assetTag.asset_tag_id = null;
			$scope.assetTag.division = null;
			$scope.workstations = [];
			WorkStation.divisions($scope.assetTag.department, $scope.assetTag.floor)
				.success(function(data){
					$scope.divisions = data;
				})
		};

		$scope.showWorkStations = function(){
			$scope.assetTag.work_station_id = null;
			$scope.assetTag.asset_tag_id = null;
			$scope.workstations = [];
			WorkStation.availableTransfer($scope.assetTag, $stateParams.workStationID)
				.success(function(data){
					$scope.workstations = data;
				});
		};

		$scope.showAssets = function(){
			$scope.assetTag.asset_tag_id = null;
			$scope.assetTag_tags = [];
			AssetTag.availableSwap($scope.assetTag)
				.success(function(data){
					$scope.asset_tags = data;
				});
		};


		$scope.submit = function(){
			if($scope.assetTag.component_type=='Desktop'){
				var confirm = $mdDialog.confirm()
			        .title('Would you like to include components under this unit?')
			        .content('Hard disk(s), RAM(s), video card, and softwares will be swapped along with the unit.')
			        .ok('Continue')
			        .cancel('Keep it');
			    $mdDialog.show(confirm)
			    	.then(function() {
				      	Preloader.preload();
						AssetTag.swap(assetTagID, $scope.asset)
							.success(function(swapWorkStationID){
								AssetTag.swapComponents($stateParams.workStationID, swapWorkStationID)
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
					    AssetTag.swap(assetTagID, $scope.asset)
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
				AssetTag.swap(assetTagID, $scope.asset)
					.success(function(){
						$mdDialog.hide();
					})
					.error(function(){
						Preloader.error();
					});
			}
		};
	}]);