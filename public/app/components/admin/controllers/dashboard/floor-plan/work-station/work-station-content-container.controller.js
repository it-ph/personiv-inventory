adminModule
	.controller('workStationContentContainerController', ['$scope', '$timeout', '$stateParams', '$mdDialog', 'Preloader', 'WorkStation', 'AssetTag', 'AssetTagService', function($scope, $timeout, $stateParams, $mdDialog, Preloader, WorkStation, AssetTag, AssetTagService){
		/**
		 * Object for subheader
		 *
		*/
		var departmentID = $stateParams.departmentID;
		var workStationID = $stateParams.workStationID;

		var queries = [
			{'work_station_id': workStationID, 'table_name': 'desktops', 'component_type': 'Desktop'},
			{'work_station_id': workStationID, 'table_name': 'hard_disks', 'component_type': 'Hard Disk'},
			{'work_station_id': workStationID, 'table_name': 'headsets', 'component_type': 'Headset'},
			{'work_station_id': workStationID, 'table_name': 'keyboards', 'component_type': 'Keyboard'},
			{'work_station_id': workStationID, 'table_name': 'memories', 'component_type': 'Memory'},
			{'work_station_id': workStationID, 'table_name': 'monitors', 'component_type': 'Monitor'},
			{'work_station_id': workStationID, 'table_name': 'mice', 'component_type': 'Mouse'},
			{'work_station_id': workStationID, 'table_name': 'softwares', 'component_type': 'Software'},
			{'work_station_id': workStationID, 'table_name': 'uninterruptible_power_supplies', 'component_type': 'Uninterruptible Power Supply'},
			{'work_station_id': workStationID, 'table_name': 'video_cards', 'component_type': 'Video Card'},
			{'work_station_id': workStationID, 'table_name': 'other_components', 'component_type': 'Other Component'},
		];

		$scope.subheader = {};
		$scope.subheader.state = 'floor-plan';

		$scope.subheader.refresh = function(){
			Preloader.preload();
			$scope.initAsset();
			$timeout(Preloader.stop, 2000);
		}

		// init
		$scope.initAsset = function(){
			$scope.asset = {};
			AssetTag.componentType(queries[0])
				.success(function(data){
					$scope.asset.cpus = data;
				})
				.error(function(){
					Preloader.error();
				});

			AssetTag.componentType(queries[1])
				.success(function(data){
					$scope.asset.hardDisks = data;
				})
				.error(function(){
					Preloader.error();
				});

			AssetTag.componentType(queries[2])
				.success(function(data){
					$scope.asset.headsets = data;
				})
				.error(function(){
					Preloader.error();
				});

			AssetTag.componentType(queries[3])
				.success(function(data){
					$scope.asset.keyboards = data;
				})
				.error(function(){
					Preloader.error();
				});

			AssetTag.componentType(queries[4])
				.success(function(data){
					$scope.asset.memories = data;
				})
				.error(function(){
					Preloader.error();
				});

			AssetTag.componentType(queries[5])
				.success(function(data){
					$scope.asset.monitors = data;
				})
				.error(function(){
					Preloader.error();
				});

			AssetTag.componentType(queries[6])
				.success(function(data){
					$scope.asset.mice = data;
				})
				.error(function(){
					Preloader.error();
				});

			AssetTag.componentType(queries[7])
				.success(function(data){
					$scope.asset.softwares = data;
				})
				.error(function(){
					Preloader.error();
				});

			AssetTag.componentType(queries[8])
				.success(function(data){
					$scope.asset.ups = data;
				})
				.error(function(){
					Preloader.error();
				});

			AssetTag.componentType(queries[9])
				.success(function(data){
					$scope.asset.videoCards = data;
				})
				.error(function(){
					Preloader.error();
				});

			AssetTag.componentType(queries[10])
				.success(function(data){
					$scope.asset.otherComponents = data;
				})
				.error(function(){
					Preloader.error();
				});
		}

		$scope.initAsset();
		/**
		 * Object for fab
		 *
		*/
		$scope.fab = {};

		$scope.fab.icon = 'mdi-plus';
		$scope.fab.label = 'Add';
		$scope.fab.show = false;

		$scope.fab.action = function(){
		    $mdDialog.show({
		      	controller: 'addAssetDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-asset-dialog.template.html',
		      	parent: angular.element($('body')),
		    })
		    .then(function(){
		    	/* Refreshes the list */
		    	$scope.subheader.refresh();
		    });
		};

		/**
		 * Object for rightSidenav
		 *
		*/
		$scope.rightSidenav = {};
		// hides right sidenav
		$scope.rightSidenav.show = true;

		/**
		 * Status of search bar.
		 *
		*/
		$scope.searchBar = false;

		/**
		 * Reveals the search bar.
		 *
		*/
		$scope.showSearchBar = function(){
			$scope.searchBar = true;
		};

		/**
		 * Hides the search bar.
		 *
		*/
		$scope.hideSearchBar = function(){
			$scope.workStation.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			// $scope.workStation.paginated.show = false;
			// Preloader.preload()
			// WorkStation.search(departmentID, $scope.workStation)
			// 	.success(function(data){
			// 		$scope.workStation.results = data;
			// 		Preloader.stop();
			// 	})
			// 	.error(function(data){
			// 		Preloader.error();
			// 	});
		};
	

		$scope.showAddAssetDialog = function(type){
			AssetTagService.setType(type);
			$mdDialog.show({
		      	controller: 'addAssetTagDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-asset-tag-dialog.template.html',
		      	parent: angular.element($('body')),
		    })
		}
	}]);
