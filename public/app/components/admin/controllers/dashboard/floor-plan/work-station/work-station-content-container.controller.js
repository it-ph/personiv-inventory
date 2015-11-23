adminModule
	.controller('workStationContentContainerController', ['$scope', '$timeout', '$stateParams', '$mdDialog', 'Preloader', 'WorkStation', 'AssetTag', 'AssetTagService', function($scope, $timeout, $stateParams, $mdDialog, Preloader, WorkStation, AssetTag, AssetTagService){
		/**
		 * Object for subheader
		 *
		*/
		var departmentID = $stateParams.departmentID;
		var workStationID = $stateParams.workStationID;

		$scope.subheader = {};
		$scope.subheader.state = 'floor-plan';

		$scope.subheader.refresh = function(){
			Preloader.preload();
			$scope.show = false;
			AssetTag.workStation(workStationID)
				.success(function(data){
					$scope.assets = data;
					Preloader.stop();
					$scope.show = true;
				})
				.error(function(){
					Preloader.error();
				});
		}

		AssetTag.workStation(workStationID)
			.success(function(data){
				$scope.assets = data;
				$scope.show = true;
			})
			.error(function(){
				Preloader.error();
			});
		/**
		 * Object for fab
		 *
		*/
		$scope.fab = {};

		$scope.fab.icon = 'mdi-plus';
		$scope.fab.label = 'Add';
		$scope.fab.tooltip = 'Add Asset';
		$scope.fab.show = true;

		$scope.fab.action = function(){
		    $mdDialog.show({
		      	controller: 'addAssetDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-asset-dialog.template.html',
		      	parent: angular.element($('body')),
		    })
		    .then(function(){
		    	$mdDialog.show({
			      	controller: 'addAssetTagDialogController',
				    templateUrl: '/app/components/admin/templates/dialogs/add-asset-tag-dialog.template.html',
			      	parent: angular.element($('body')),
			    })
			    .then(function(){
		    		$scope.subheader.refresh();
			    });
		    })
		};

		$scope.workStation = {};

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

		$scope.editAsset = function(id){
			AssetTagService.setID(id);
			$mdDialog.show({
		      	controller: 'editAssetDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/edit-asset-dialog.template.html',
		      	parent: angular.element($('body')),
		    })
		    .then(function(){
		    	$scope.subheader.refresh();
		    });
		};

		$scope.transferAsset = function(id){
			AssetTagService.setID(id);
			$mdDialog.show({
		      	controller: 'transferAssetDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/transfer-asset-dialog.template.html',
		      	parent: angular.element($('body')),
		    })
		    .then(function(){
		    	$scope.subheader.refresh();
		    });
		};

		$scope.pullOutAsset = function(id){
			AssetTagService.setID(id);
			$mdDialog.show({
		      	controller: 'pullOutAssetDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/pull-out-asset-dialog.template.html',
		      	parent: angular.element($('body')),
		    })
		    .then(function(){
		    	$scope.subheader.refresh();
		    });
		}
	}]);
