adminModule
	.controller('addAssetDialogController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'WorkStation', 'AssetTag', 'Desktop', 'HardDisk', 'Headset', 'Keyboard', 'Memory', 'Monitor', 'Mouse', 'Software', 'UPS', 'VideoCard', 'OtherComponent', function($scope, $state, $stateParams, $mdDialog, Preloader, WorkStation, AssetTag, Desktop, HardDisk, Headset, Keyboard, Memory, Monitor, Mouse, Software, UPS, VideoCard, OtherComponent){
		var workStationID = $stateParams.workStationID;
		WorkStation.show(workStationID)
			.success(function(data){
				$scope.workStation = data;
			});
			
		$scope.assets = [
			{
				'component_type': 'Desktop',
				// when user changes brand fetch all model with that brand
				brandChange: function(idx){
					$scope.assets[idx].component_id = null;
					Desktop.model($scope.assets[idx])
						.success(function(data){
							$scope.assets[idx].models = data;
						});
				},
			},
			{
				'component_type':'Hard Disk',
				// when user changes brand fetch all capacity with that brand
				brandChange: function(idx){
					$scope.assets[idx].capacity = null;
					$scope.assets[idx].models = null;
					$scope.assets[idx].component_id = null;
					var query = {'search':'capacity', 'brand': $scope.assets[idx].brand };
					HardDisk.distinct(query)
						.success(function(data){
							$scope.assets[idx].capacities = data;
						});
				},
				// when user changes capacity fetch all model with that brand
				capacityChange: function(idx){
					$scope.assets[idx].component_id = null;
					HardDisk.model($scope.assets[idx])
						.success(function(data){
							$scope.assets[idx].models = data;
						});
				},
			},
			{
				'component_type':'Headset',
				// when user changes brand fetch all model with that brand
				brandChange: function(idx){
					$scope.assets[idx].component_id = null;
					Headset.model($scope.assets[idx])
						.success(function(data){
							$scope.assets[idx].models = data;
						});
				},
			},
			{
				'component_type':'Keyboard',
				// when user changes brand fetch all model with that brand
				brandChange: function(idx){
					$scope.assets[idx].component_id = null;
					Keyboard.model($scope.assets[idx])
						.success(function(data){
							$scope.assets[idx].models = data;
						});
				},
			},
			{
				'component_type':'Memory',
				// when user changes brand fetch all types with that brand
				brandChange: function(idx){
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
				},
				// when user changes type fetch all speed with that brand
				typeChange: function(idx){
					$scope.assets[idx].speed = null;
					$scope.assets[idx].sizes = null;
					$scope.assets[idx].component_id = null;
					var query = {'search':'speed', 'brand': $scope.assets[idx].brand, 'type': $scope.assets[idx].memory_type };
					Memory.distinct(query)
						.success(function(data){
							$scope.assets[idx].speeds = data;
						});
				},
				// when user changes type fetch all speed with that brand
				speedChange: function(idx){
					var query = {'search':'size', 'brand': $scope.assets[idx].brand, 'type': $scope.assets[idx].memory_type , 'speed': $scope.assets[idx].speed };
					Memory.distinct(query)
						.success(function(data){
							$scope.assets[idx].sizes = data;
						});
				},
			},
			{
				'component_type':'Monitor',
				// when user changes brand fetch all model with that brand
				brandChange: function(idx){
					$scope.assets[idx].component_id = null;
					Monitor.model($scope.assets[idx])
						.success(function(data){
							$scope.assets[idx].models = data;
						});
				},

			},
			{
				'component_type':'Mouse',
				// when user changes brand fetch all model with that brand
				brandChange: function(idx){
					$scope.assets[idx].component_id = null;
					Mouse.model($scope.assets[idx])
						.success(function(data){
							$scope.assets[idx].models = data;
						});
				},
			},
			{
				'component_type':'Software',
				// when user changes maker fetch all name with that maker
				makerChange: function(idx){
					$scope.assets[idx].name = null;
					$scope.assets[idx].component_id = null;
					$scope.assets[idx].versions = null;
					var query = {'search':'name', 'maker': $scope.assets[idx].maker };
					Software.distinct(query)
						.success(function(data){
							$scope.assets[idx].names = data;
						});
				},
				// when user changes name fetch all version with that maker and name
				nameChange: function(idx){
					$scope.assets[idx].component_id = null;
					$scope.assets[idx].versions = null;
					var query = {'search':'version', 'maker': $scope.assets[idx].maker, 'name': $scope.assets[idx].name };
					Software.distinct(query)
						.success(function(data){
							$scope.assets[idx].versions = data;
						});
				},
			},
			{
				'component_type':'Uninterruptible Power Supply',
				// when user changes brand fetch all model with that brand
				brandChange: function(idx){
					$scope.assets[idx].model = null;
					UPS.model($scope.assets[idx])
						.success(function(data){
							$scope.assets[idx].models = data;
						});
				},
			},
			{
				'component_type':'Video Card',
				brandChange: function(idx){
					$scope.assets[idx].component_id = null;
					$scope.assets[idx].models = null;
					$scope.assets[idx].size = null;
					var query = {'search':'size', 'brand': $scope.assets[idx].brand }
					VideoCard.distinct(query)
						.success(function(data){
							$scope.assets[idx].sizes = data;
						});
				},
				sizeChange: function(idx){
					$scope.assets[idx].component_id = null;
					var query = {'search':'model', 'brand': $scope.assets[idx].brand, 'size': $scope.assets[idx].size }
					VideoCard.distinct(query)
						.success(function(data){
							$scope.assets[idx].models = data;
						});
				},
			},
			{
				'component_type':'Other Components',
				// when user changes brand fetch all model with that brand
				brandChange: function(idx){
					$scope.assets[idx].model = null;
					OtherComponent.model($scope.assets[idx])
						.success(function(data){
							$scope.assets[idx].models = data;
						});
				},
			},
		];

		$scope.cancel = function(){
			$mdDialog.cancel();
		};

		$scope.addMoreComponent = function(idx, type){
			console.log(idx, type)
			var data = {};
			if(type == 'Memory'){
				data = {
					'component_type':'Memory',
					// when user changes brand fetch all types with that brand
					brandChange: function(idx){
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
					},
					// when user changes type fetch all speed with that brand
					typeChange: function(idx){
						$scope.assets[idx].speed = null;
						$scope.assets[idx].sizes = null;
						$scope.assets[idx].component_id = null;
						var query = {'search':'speed', 'brand': $scope.assets[idx].brand, 'type': $scope.assets[idx].memory_type };
						Memory.distinct(query)
							.success(function(data){
								$scope.assets[idx].speeds = data;
							});
					},
					// when user changes type fetch all speed with that brand
					speedChange: function(idx){
						var query = {'search':'size', 'brand': $scope.assets[idx].brand, 'type': $scope.assets[idx].memory_type , 'speed': $scope.assets[idx].speed };
						Memory.distinct(query)
							.success(function(data){
								$scope.assets[idx].sizes = data;
							});
					},
				}
			}
			else if(type == 'Monitor'){
				data = {
					'component_type':'Monitor',
					// when user changes brand fetch all model with that brand
					brandChange: function(idx){
						$scope.assets[idx].component_id = null;
						Monitor.model($scope.assets[idx])
							.success(function(data){
								$scope.assets[idx].models = data;
							});
					},
				}
			}
			else if(type == 'Software'){
				data = {
					'component_type':'Software',
					// when user changes maker fetch all name with that maker
					makerChange: function(idx){
						$scope.assets[idx].name = null;
						$scope.assets[idx].component_id = null;
						$scope.assets[idx].versions = null;
						var query = {'search':'name', 'maker': $scope.assets[idx].maker };
						Software.distinct(query)
							.success(function(data){
								$scope.assets[idx].names = data;
							});
					},
					// when user changes name fetch all version with that maker and name
					nameChange: function(idx){
						$scope.assets[idx].component_id = null;
						$scope.assets[idx].versions = null;
						var query = {'search':'version', 'maker': $scope.assets[idx].maker, 'name': $scope.assets[idx].name };
						Software.distinct(query)
							.success(function(data){
								$scope.assets[idx].versions = data;
							});
					},
				}
			}

			$scope.assets.splice(idx, 0, data);

			if(type == 'Memory'){
				Memory.distinct(brand)
					.success(function(data){
						$scope.assets[idx].brands = data;
					});
			}
			else if(type == 'Monitor'){
				Monitor.distinct(brand)
					.success(function(data){
						$scope.assets[idx].brands = data;
					});
			}
			else if(type == 'Software'){
				Software.distinct(maker)
					.success(function(data){
						$scope.assets[idx].makers = data;
					});
			}
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

		var brand = {'search':'brand'};
		var maker = {'search':'maker'};

		// fetch all distinct components data
		Desktop.distinct(brand)
			.success(function(data){
				$scope.assets[0].brands = data;
			});

		HardDisk.distinct(brand)
			.success(function(data){
				$scope.assets[1].brands = data;
			});

		Headset.distinct(brand)
			.success(function(data){
				$scope.assets[2].brands = data;
			});

		Keyboard.distinct(brand)
			.success(function(data){
				$scope.assets[3].brands = data;
			});

		Memory.distinct(brand)
			.success(function(data){
				$scope.assets[4].brands = data;
			});

		Monitor.distinct(brand)
			.success(function(data){
				$scope.assets[5].brands = data;
			});

		Mouse.distinct(brand)
			.success(function(data){
				$scope.assets[6].brands = data;
			});

		Software.distinct(maker)
			.success(function(data){
				$scope.assets[7].makers = data;
			});

		UPS.distinct(brand)
			.success(function(data){
				$scope.assets[8].brands = data;
			});

		VideoCard.distinct(brand)
			.success(function(data){
				$scope.assets[9].brands = data;
			});

		OtherComponent.distinct(brand)
			.success(function(data){
				$scope.assets[10].brands = data;
			});
	}]);