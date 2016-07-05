adminModule
	.controller('pullOutDetailsDialogController', ['$scope', '$mdDialog', 'AssetTag', 'Preloader', function($scope, $mdDialog, AssetTag, Preloader){
		var assetTagID = Preloader.get();
		
		$scope.cancel = function(){
			$mdDialog.cancel();
		};

		AssetTag.statuses(assetTagID)
			.success(function(data){
				angular.forEach(data.status, function(item){
					item.created_at = new Date(item.created_at);
				});

				$scope.assetTag = data;
				$scope.label = data.property_code;

				console.log($scope.assetTag);
			})
			.error(function(){
				Preloader.error();
			});
	}]);