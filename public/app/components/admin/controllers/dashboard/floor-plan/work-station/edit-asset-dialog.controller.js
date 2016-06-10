// adminModule
// 	.controller('editAssetDialogController', ['$scope', '$mdDialog', 'Preloader', 'AssetTagService', 'AssetTag', function($scope, $mdDialog, Preloader, AssetTagService, AssetTag){
// 		var assetTagID = AssetTagService.getID();
// 		$scope.workStation = AssetTagService.getStation();

// 		$scope.cancel = function(){
// 			$mdDialog.cancel();
// 		};

// 		AssetTag.specific(assetTagID)
// 			.success(function(data){
// 				$scope.asset = data;
// 			})
// 			.error(function(){
// 				Preloader.error();
// 			})

// 		$scope.submit = function(){
// 			// start preloader
// 			Preloader.preload();
// 			AssetTag.update(assetTagID, $scope.asset)
// 				.success(function(){
// 					$mdDialog.hide();
// 				})
// 				.error(function(){
// 					Preloader.error();
// 				});
// 		}
// 	}]);