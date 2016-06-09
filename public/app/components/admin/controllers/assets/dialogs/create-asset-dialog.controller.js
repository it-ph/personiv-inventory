adminModule
	.controller('createAssetDialogController', ['$scope', '$stateParams', '$mdDialog', 'Asset', 'AssetDetail', 'Preloader', function($scope, $stateParams, $mdDialog, Asset, AssetDetail, Preloader){
		$scope.asset = {};
		$scope.asset.asset_type_id = $stateParams.assetTypeID;
		
		$scope.details = [];
		$scope.label = "New";
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
				if(!busy){
					busy = true;
					Asset.store($scope.asset)
						.then(function(data){
							if(data.data == 0){
								$mdDialog.show(
									$mdDialog.alert()
										.parent(angular.element(document.body))
										.clickOutsideToClose(true)
								        .title('Duplicate Entry')
								        .textContent('The item you entered asset already exists.')
								        .ariaLabel('Error')
								        .ok('Got it!')
								)
							}
							else{
								return data.data;
							}
						})
						.then(function(assetID){
							if($scope.details.length){
								angular.forEach($scope.details, function(item){
									item.asset_id = assetID;
								});

								AssetDetail.store($scope.details)
									.success(function(){
										// Stops Preloader
										busy = false;
									})
									.error(function(){
										Preloader.error()
										busy = false;
									});
							}
							/* Stops the loading and returns 1 if needs to reload */
							$mdDialog.hide(1);
						}, function(){
							Preloader.error();
							busy = false;
						})
				}
			}
		}
	}]);