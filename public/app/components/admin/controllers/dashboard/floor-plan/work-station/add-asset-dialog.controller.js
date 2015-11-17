adminModule
	.controller('addAssetDialogController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'WorkStation', 'AssetTag', 'Desktop', 'HardDisk', 'Headset', 'Keyboard', 'Memory', 'Monitor', 'Mouse', 'Software', 'UPS', 'VideoCard', 'OtherComponent', function($scope, $state, $stateParams, $mdDialog, Preloader, WorkStation, AssetTag, Desktop, HardDisk, Headset, Keyboard, Memory, Monitor, Mouse, Software, UPS, VideoCard, OtherComponent){
		WorkStation.show($stateParams.workStationID)
			.success(function(data){
				$scope.workStation = data;
			});

		$scope.assets = [
			{
				'type': 'Desktop',
				// when user changes brand fetch all model with that brand
				brandChange: function(){
					Desktop.model($scope.assets[0])
						.success(function(data){
							$scope.assets[0].models = data;
						});
				},
			},
			{
				'type':'Hard Disk',
				brandChange: function(){
					var query = {'search':'capacity', 'brand': $scope.assets[1].brand };
					HardDisk.distinct(query)
						.success(function(data){
							$scope.assets[1].capacities = data;
						});
				},
			},
			{
				'type':'Headset',
			},
			{
				'type':'Keyboard',
			},
			{
				'type':'Memory',
			},
			{
				'type':'Monitor',
			},
			{
				'type':'Mouse',
			},
			{
				'type':'Software',
			},
			{
				'type':'Uninterruptible Power Supply',
			},
			{
				'type':'Video Card',
			},
			{
				'type':'Other Components',
			},
		];

		$scope.cancel = function(){
			$mdDialog.cancel();
		};

		$scope.submit = function(){
			/* Starts Preloader */
			Preloader.preload();
			/**
			 * Stores Single Record
			*/
			Desktop.store($scope.cpu)
				.then(function(){
					// Stops Preloader 
					Preloader.stop();
				}, function(){
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