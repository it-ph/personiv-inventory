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
				brandChange: function(){
					$scope.assets[0].component_id = null;
					Desktop.model($scope.assets[0])
						.success(function(data){
							$scope.assets[0].models = data;
						});
				},
			},
			{
				'component_type':'Hard Disk',
				// when user changes brand fetch all capacity with that brand
				brandChange: function(){
					$scope.assets[1].capacity = null;
					$scope.assets[1].models = null;
					$scope.assets[1].component_id = null;
					var query = {'search':'capacity', 'brand': $scope.assets[1].brand };
					HardDisk.distinct(query)
						.success(function(data){
							$scope.assets[1].capacities = data;
						});
				},
				// when user changes capacity fetch all model with that brand
				capacityChange: function(){
					$scope.assets[1].component_id = null;
					HardDisk.model($scope.assets[1])
						.success(function(data){
							$scope.assets[1].models = data;
						});
				},
			},
			{
				'component_type':'Headset',
				// when user changes brand fetch all model with that brand
				brandChange: function(){
					$scope.assets[2].component_id = null;
					Headset.model($scope.assets[2])
						.success(function(data){
							$scope.assets[2].models = data;
						});
				},
			},
			{
				'component_type':'Keyboard',
				// when user changes brand fetch all model with that brand
				brandChange: function(){
					$scope.assets[3].component_id = null;
					Keyboard.model($scope.assets[3])
						.success(function(data){
							$scope.assets[3].models = data;
						});
				},
			},
			{
				'component_type':'Memory',
				// when user changes brand fetch all types with that brand
				brandChange: function(){
					$scope.assets[4].memory_type = null;
					$scope.assets[4].speeds = null;
					$scope.assets[4].speed = null;
					$scope.assets[4].sizes = null;
					$scope.assets[4].component_id = null;
					var query = {'search':'type', 'brand': $scope.assets[4].brand };
					Memory.distinct(query)
						.success(function(data){
							$scope.assets[4].types = data;
						});
				},
				// when user changes type fetch all speed with that brand
				typeChange: function(){
					$scope.assets[4].speed = null;
					$scope.assets[4].sizes = null;
					$scope.assets[4].component_id = null;
					var query = {'search':'speed', 'brand': $scope.assets[4].brand, 'type': $scope.assets[4].memory_type };
					Memory.distinct(query)
						.success(function(data){
							$scope.assets[4].speeds = data;
						});
				},
				// when user changes type fetch all speed with that brand
				speedChange: function(){
					var query = {'search':'size', 'brand': $scope.assets[4].brand, 'type': $scope.assets[4].memory_type , 'speed': $scope.assets[4].speed };
					Memory.distinct(query)
						.success(function(data){
							$scope.assets[4].sizes = data;
						});
				},
			},
			{
				'component_type':'Monitor',
				// when user changes brand fetch all model with that brand
				brandChange: function(){
					$scope.assets[5].component_id = null;
					Monitor.model($scope.assets[5])
						.success(function(data){
							$scope.assets[5].models = data;
						});
				},

			},
			{
				'component_type':'Mouse',
				// when user changes brand fetch all model with that brand
				brandChange: function(){
					$scope.assets[6].component_id = null;
					Mouse.model($scope.assets[6])
						.success(function(data){
							$scope.assets[6].models = data;
						});
				},
			},
			{
				'component_type':'Software',
				// when user changes maker fetch all name with that maker
				makerChange: function(){
					$scope.assets[7].name = null;
					$scope.assets[7].component_id = null;
					$scope.assets[7].versions = null;
					var query = {'search':'name', 'maker': $scope.assets[7].maker };
					Software.distinct(query)
						.success(function(data){
							$scope.assets[7].names = data;
						});
				},
				// when user changes name fetch all version with that maker and name
				nameChange: function(){
					$scope.assets[7].component_id = null;
					$scope.assets[7].versions = null;
					var query = {'search':'version', 'maker': $scope.assets[7].maker, 'name': $scope.assets[7].name };
					Software.distinct(query)
						.success(function(data){
							$scope.assets[7].versions = data;
						});
				},
			},
			{
				'component_type':'Uninterruptible Power Supply',
				// when user changes brand fetch all model with that brand
				brandChange: function(){
					$scope.assets[8].model = null;
					UPS.model($scope.assets[8])
						.success(function(data){
							$scope.assets[8].models = data;
						});
				},
			},
			{
				'component_type':'Video Card',
				brandChange: function(){
					$scope.assets[9].component_id = null;
					$scope.assets[9].models = null;
					$scope.assets[9].size = null;
					var query = {'search':'size', 'brand': $scope.assets[9].brand }
					VideoCard.distinct(query)
						.success(function(data){
							$scope.assets[9].sizes = data;
						});
				},
				sizeChange: function(){
					$scope.assets[9].component_id = null;
					var query = {'search':'model', 'brand': $scope.assets[9].brand, 'size': $scope.assets[9].size }
					VideoCard.distinct(query)
						.success(function(data){
							$scope.assets[9].models = data;
						});
				},
			},
			{
				'component_type':'Other Components',
				// when user changes brand fetch all model with that brand
				brandChange: function(){
					$scope.assets[10].model = null;
					OtherComponent.model($scope.assets[10])
						.success(function(data){
							$scope.assets[10].models = data;
						});
				},
			},
		];

		$scope.cancel = function(){
			$mdDialog.cancel();
		};

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