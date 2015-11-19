adminModule
	.controller('addAssetTagDialogController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'WorkStation', 'AssetTag', 'AssetTagService', 'Desktop', 'HardDisk', 'Headset', 'Keyboard', 'Memory', 'Monitor', 'Mouse', 'Software', 'UPS', 'VideoCard', 'OtherComponent', function($scope, $state, $stateParams, $mdDialog, Preloader, WorkStation, AssetTag, AssetTagService, Desktop, HardDisk, Headset, Keyboard, Memory, Monitor, Mouse, Software, UPS, VideoCard, OtherComponent){
		var workStationID = $stateParams.workStationID;
		var brand = {'search':'brand'};
		var maker = {'search':'maker'};
		$scope.asset_type = AssetTagService.getType();
		$scope.workStation = AssetTagService.getStation();

		$scope.maxDate = new Date();
		console.log($scope.maxDate);

		$scope.cancel = function(){
			$mdDialog.cancel();
		};

		$scope.assets = [
			{ 
				'component_type' : $scope.asset_type,
			}
		];

		if ($scope.asset_type == 'Desktop') {
			Desktop.distinct(brand)
				.success(function(data){
					$scope.assets[0].brands = data;
				});

			$scope.brandChange = function(idx, type){				
				$scope.assets[idx].component_id = null;
				Desktop.model($scope.assets[idx])
					.success(function(data){
						$scope.assets[idx].models = data;
					});
			}
		}

		else if ($scope.asset_type == 'Hard Disk') {
			HardDisk.distinct(brand)
				.success(function(data){
					$scope.assets[0].brands = data;
				});

			$scope.brandChange = function(idx, type){
				$scope.assets[idx].capacity = null;
				$scope.assets[idx].models = null;
				$scope.assets[idx].component_id = null;
				var query = {'search':'capacity', 'brand': $scope.assets[idx].brand };
				HardDisk.distinct(query)
					.success(function(data){
						$scope.assets[idx].capacities = data;
					});
			}
		}
		else if ($scope.asset_type == 'Headset') {
			Headset.distinct(brand)
				.success(function(data){
					$scope.assets[0].brands = data;
				});

			$scope.brandChange = function(idx, type){
				$scope.assets[idx].component_id = null;
				Headset.model($scope.assets[idx])
					.success(function(data){
						$scope.assets[idx].models = data;
					});
			}
		}
		else if ($scope.asset_type == 'Keyboard') {
			Keyboard.distinct(brand)
				.success(function(data){
					$scope.assets[0].brands = data;
				});

			$scope.brandChange = function(idx, type){
				$scope.assets[idx].component_id = null;
				Keyboard.model($scope.assets[idx])
					.success(function(data){
						$scope.assets[idx].models = data;
					});
			}
		}
		else if ($scope.asset_type == 'Memory') {
			Memory.distinct(brand)
				.success(function(data){
					$scope.assets[0].brands = data;
				});

			$scope.brandChange = function(idx, type){
				$scope.assets[idx].memory_type = null;
				$scope.assets[idx].speeds = null;
				$scope.assets[idx].speed = null;
				$scope.assets[idx].sizes = null;
				$scope.assets[idx].component_id = null;
				var query = {'search':'type', 'brand': $scope.assets[idx].brand };
				Memory.distinct(query)
					.success(function(data){
						$scope.assets[idx].types = data;
					});
			}
		}
		else if ($scope.asset_type == 'Monitor') {
			Monitor.distinct(brand)
				.success(function(data){
					$scope.assets[0].brands = data;
				});

			$scope.brandChange = function(idx, type){
				$scope.assets[idx].component_id = null;
				Monitor.model($scope.assets[idx])
					.success(function(data){
						$scope.assets[idx].models = data;
					});
			}
		}
		else if ($scope.asset_type == 'Mouse') {
			Mouse.distinct(brand)
				.success(function(data){
					$scope.assets[0].brands = data;
				});

			$scope.brandChange = function(idx, type){
				$scope.assets[idx].component_id = null;
				Mouse.model($scope.assets[idx])
					.success(function(data){
						$scope.assets[idx].models = data;
					});
			}
		}
		else if ($scope.asset_type == 'Software') {
			Software.distinct(maker)
				.success(function(data){
					$scope.assets[0].makers = data;
				});
		}
		else if ($scope.asset_type == 'Uninterruptible Power Supply') {
			UPS.distinct(brand)
				.success(function(data){
					$scope.assets[0].brands = data;
				});

			$scope.brandChange = function(idx, type){
				$scope.assets[idx].model = null;
				UPS.model($scope.assets[idx])
					.success(function(data){
						$scope.assets[idx].models = data;
					});
			}
		}
		else if ($scope.asset_type == 'Video Card') {
			VideoCard.distinct(brand)
				.success(function(data){
					$scope.assets[0].brands = data;
				});

			$scope.brandChange = function(idx, type){
				$scope.assets[idx].component_id = null;
				$scope.assets[idx].models = null;
				$scope.assets[idx].size = null;
				var query = {'search':'size', 'brand': $scope.assets[idx].brand }
				VideoCard.distinct(query)
					.success(function(data){
						$scope.assets[idx].sizes = data;
					});
			}
		}
		else if ($scope.asset_type == 'Other Component'){
			OtherComponent.distinct(brand)
				.success(function(data){
					$scope.assets[0].brands = data;
				});

			$scope.brandChange = function(idx, type){
				$scope.assets[idx].model = null;
				OtherComponent.model($scope.assets[idx])
					.success(function(data){
						$scope.assets[idx].models = data;
					});
			}
		}

		$scope.capacityChange = function(idx){
			$scope.assets[idx].component_id = null;
			HardDisk.model($scope.assets[idx])
				.success(function(data){
					$scope.assets[idx].models = data;
				});
		};

		$scope.typeChange = function(idx){
			$scope.assets[idx].speed = null;
			$scope.assets[idx].sizes = null;
			$scope.assets[idx].component_id = null;
			var query = {'search':'speed', 'brand': $scope.assets[idx].brand, 'type': $scope.assets[idx].memory_type };
			Memory.distinct(query)
				.success(function(data){
					$scope.assets[idx].speeds = data;
				});
		}

		$scope.speedChange = function(idx){
			var query = {'search':'size', 'brand': $scope.assets[idx].brand, 'type': $scope.assets[idx].memory_type , 'speed': $scope.assets[idx].speed };
			Memory.distinct(query)
				.success(function(data){
					$scope.assets[idx].sizes = data;
				});
		}

		$scope.sizeChange = function(idx){
			$scope.assets[idx].component_id = null;
			var query = {'search':'model', 'brand': $scope.assets[idx].brand, 'size': $scope.assets[idx].size }
			VideoCard.distinct(query)
				.success(function(data){
					$scope.assets[idx].models = data;
				});
		}

		$scope.makerChange = function(idx){
			$scope.assets[idx].name = null;
			$scope.assets[idx].component_id = null;
			$scope.assets[idx].versions = null;
			var query = {'search':'name', 'maker': $scope.assets[idx].maker };
			Software.distinct(query)
				.success(function(data){
					$scope.assets[idx].names = data;
				});
		}

		$scope.nameChange = function(idx){
			$scope.assets[idx].component_id = null;
			$scope.assets[idx].versions = null;
			var query = {'search':'version', 'maker': $scope.assets[idx].maker, 'name': $scope.assets[idx].name };
			Software.distinct(query)
				.success(function(data){
					$scope.assets[idx].versions = data;
				});
		}

		$scope.addMoreComponent = function(type){
			$scope.assets.push({'component_type' : type});
			var index = $scope.assets.length - 1;

			if(type == 'Memory'){			
				Memory.distinct(brand)
					.success(function(data){
						$scope.assets[index].brands = data;
					});
			}
			else if(type == 'Monitor'){
				Monitor.distinct(brand)
					.success(function(data){
						$scope.assets[index].brands = data;
					});
			}
			else if(type == 'Software'){
				Software.distinct(maker)
					.success(function(data){
						$scope.assets[index].makers = data;
					});
			}
		}

		$scope.removeComponent = function(index){
			$scope.assets.splice(index, 1);
		}

		$scope.submit = function(){
			/* Starts Preloader */
			Preloader.preload();

			angular.forEach($scope.assets, function(item, key){
				item.work_station_id = workStationID;
			});

			AssetTag.storeMultiple($scope.assets)
				.success(function(){
					Preloader.stop();
				})
				.error(function(){
					Preloader.error();
				});
		};
	}]);