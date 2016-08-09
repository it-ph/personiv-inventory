adminModule
	.controller('assetDetailsDialogController', ['$scope', '$mdDialog', 'Asset', 'Preloader', function($scope, $mdDialog, Asset, Preloader){
		var assetID = Preloader.get();
		
		$scope.cancel = function(){
			$mdDialog.cancel();
		};

		Asset.show(assetID)
			.success(function(data){
				$scope.asset = data;
				$scope.label = data.type.type;
				$scope.asset.first_letter = data.brand[0].toUpperCase();
			})
			.error(function(){
				Preloader.error();
			});

		$scope.edit = function(){
			Preloader.set($scope.asset);
			$mdDialog.hide('edit');
		};

		$scope.delete = function(){
			Preloader.set(assetID);		
			$mdDialog.hide('delete');
		};

		$scope.search = function(){
			Preloader.set($scope.asset);
			$mdDialog.hide('search');
		};
	}]);