adminModule
	.controller('addAssetDialogController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'WorkStation', 'AssetTag', 'Desktop', 'HardDisk', 'Headset', 'Keyboard', 'Memory', 'Monitor', 'Mouse', 'Software', 'UPS', 'VideoCard', 'OtherComponent', function($scope, $state, $stateParams, $mdDialog, Preloader, WorkStation, AssetTag, Desktop, HardDisk, Headset, Keyboard, Memory, Monitor, Mouse, Software, UPS, VideoCard, OtherComponent){
		WorkStation.show($stateParams.workStationID)
			.success(function(data){
				$scope.workStation = data;
			});

		$scope.assets = [
			{
				'name': 'Desktop',
				'type':'desktop',

			},
			{
				'name':'Hard Disk',
				'type':'hard_disk',
			},
			{
				'name':'Headset',
				'type':'headset',
			},
			{
				'name':'Keyboard',
				'type':'keyboard',
			},
			{
				'name':'Memory',
				'type':'memory',
			},
			{
				'name':'Monitor',
				'type':'monitor',
			},
			{
				'name':'Mouse',
				'type':'mouse',
			},
			{
				'name':'Software',
				'type':'software',
			},
			{
				'name':'Uninterruptible Power Supply',
				'type':'ups',
			},
			{
				'name':'Video Card',
				'type':'video_card',
			},
			{
				'name':'Other Components',
				'type':'others',
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
		var name = {'search':'name'};

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

		Software.distinct(name)
			.success(function(data){
				$scope.assets[7].brands = data;
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