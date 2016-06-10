adminModule
	.controller('editAssetDialogController', ['$scope', '$stateParams', '$mdDialog', 'Asset', 'AssetDetail', 'Preloader', function($scope, $stateParams, $mdDialog, Asset, AssetDetail, Preloader){
		$scope.asset = Preloader.get();
		$scope.details = $scope.asset.details;

		$scope.label = "Edit";
		var busy = false;

		$scope.addDetail = function(){
			$scope.details.push(
				{
					'label':null,
					'value':null,
				}
			);
		}

		$scope.removeDetail = function(idx){
			$scope.details.splice(idx, 1);
		}

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.checkDuplicate = function(){
			$scope.duplicate = false;
			Asset.checkDuplicate($scope.asset, $scope.asset.id)
				.success(function(data){
					$scope.duplicate = data;
				})
		}

		$scope.submit = function(){
			if($scope.assetForm.$invalid){
				angular.forEach($scope.assetForm.$error, function(field){
					angular.forEach(field, function(errorField){
						errorField.$setTouched();
					});
				});
			}
			else{
				/* Starts Preloader */
				// Preloader.loading();
				/**
				 * Stores Single Record
				*/
				if(!busy && !$scope.duplicate){
					busy = true;

					Asset.update($scope.asset.id, $scope.asset)
						.then(function(data){
							return data.data;
						})
						.then(function(assetID){
							if(!$scope.details.length && typeof(assetID) === "string"){
								busy = false;
								Preloader.stop();
							}
							else if($scope.details.length && !typeof(assetID) === "string"){
								busy = false;
								$scope.duplicate = assetID;
							}
							else if($scope.details.length && typeof(assetID) === "string"){
								angular.forEach($scope.details, function(item){
									item.asset_id = assetID;
								});

								AssetDetail.update($scope.asset.id, $scope.details)
									.success(function(){
										// Stops Preloader
										Preloader.stop();
										busy = false;
									})
									.error(function(){
										Preloader.error()
										busy = false;
									});
							}
							else{
								busy = false;
							}
						}, function(){
							Preloader.error();
							busy = false;
						})
				}
			}
		}
	}]);