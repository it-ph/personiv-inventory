adminModule
	.controller('pullOutAssetDialogController', ['$scope', '$stateParams', '$mdDialog', 'Department', 'WorkStation', 'Preloader', 'AssetTagService', 'AssetTag', function($scope, $stateParams, $mdDialog, Department, WorkStation, Preloader, AssetTagService, AssetTag){
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
			Preloader.preload();
			AssetTag.repair(assetTagID)
				.success(function(){
					//
				})
				.error(function(){
					Preloader.error();
				});
		};

		$scope.dispose = function(){
			Preloader.preload();
			AssetTag.dispose(assetTagID)
				.success(function(){
					//
				})
				.error(function(){
					Preloader.error();
				});
		};

	}]);