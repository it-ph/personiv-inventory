adminModule
	.controller('pullOutAssetDialogController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Department', 'WorkStation', 'Preloader', 'AssetTagService', 'AssetTag', function($scope, $state, $stateParams, $mdDialog, Department, WorkStation, Preloader, AssetTagService, AssetTag){
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

		$scope.repair = function(){
			if($scope.asset.component_type == 'Desktop'){
				var confirm = $mdDialog.confirm()
			        .title('Would you like to include components under this unit?')
			        .content('Hard disk(s), RAM(s), video card, and softwares will be pulled out along with the unit.')
			        .ok('Continue')
			        .cancel('Keep it');
			    $mdDialog.show(confirm)
			    	.then(function() {
				      	Preloader.preload();
						AssetTag.repair(assetTagID)
							.success(function(){
								AssetTag.repairComponents($stateParams.workStationID)
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
					    AssetTag.repair(assetTagID)
							.success(function(){
								$state.go('main.work-station', {}, {reload:true});
								Preloader.stop();
							})
							.error(function(){
								Preloader.error();
							});
				    });
			}
			else{			
				Preloader.preload();
				AssetTag.repair(assetTagID)
					.success(function(){
						$state.go('main.work-station', {}, {reload:true});
						Preloader.stop();
					})
					.error(function(){
						Preloader.error();
					});
			}
		};

		$scope.dispose = function(){
			if($scope.asset.component_type == 'Desktop'){
				var confirm = $mdDialog.confirm()
			        .title('Would you like to include components under this unit?')
			        .content('Hard disk(s), RAM(s), video card, and softwares will be pulled out along with the unit.')
			        .ok('Continue')
			        .cancel('Keep it');
			    $mdDialog.show(confirm)
			    	.then(function() {
				      	Preloader.preload();
						AssetTag.dispose(assetTagID)
							.success(function(){
								AssetTag.disposeComponents($stateParams.workStationID)
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
				      	AssetTag.dispose(assetTagID)
							.success(function(){
								$state.go('main.work-station', {}, {reload:true});
								Preloader.stop();
							})
							.error(function(){
								Preloader.error();
							});
				    });
			}
			else{			
				Preloader.preload();
				AssetTag.dispose(assetTagID)
					.success(function(){
						$state.go('main.work-station', {}, {reload:true});
						Preloader.stop();
					})
					.error(function(){
						Preloader.error();
					});
			}
		};

	}]);