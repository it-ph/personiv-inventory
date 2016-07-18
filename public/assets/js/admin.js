var adminModule = angular.module('adminModule', [
	/* Shared Module */
	'sharedModule',
]);
adminModule
	.config(['$stateProvider', '$mdDateLocaleProvider',  function($stateProvider, $mdDateLocaleProvider){
		$mdDateLocaleProvider.formatDate = function(date) {
		    return moment(date).format('L');
		};
		$stateProvider
			/**
			 * Home Route
			 * Tutorial Page
			 *
			*/
			.state('main', {
				url: '/',
				views: {
					'': {
						templateUrl: '/app/components/admin/views/main.view.html',
						controller: 'mainViewController',
					},
					'left-sidenav@main': {
						templateUrl: '/app/components/admin/templates/sidenavs/main-left.sidenav.html',
						controller: 'leftSidenavController',
					},
					'toolbar@main': {
						templateUrl: '/app/components/admin/templates/toolbar.template.html',
					},
					'content-container@main': {
						templateUrl: '/app/components/admin/views/content-container.view.html',
						controller: 'mainContentContainerController',
					},
					'content@main': {
						templateUrl: '/app/components/admin/templates/content/main.content.template.html',
					},
					'right-sidenav@main': {
						templateUrl: '/app/components/admin/templates/sidenavs/dashboard-right-sidenav.template.html',
					}
				},
				onExit: ['$mdSidenav', function($mdSidenav){
					var leftSidenav = $('[md-component-id="left"]');
					if(leftSidenav.hasClass('md-closed') && leftSidenav.hasClass('md-locked-open')){
						return;
					}
					$mdSidenav('left').toggle();
				}],
			})

			.state('main.settings', {
				url: 'settings',
				views: {
					'content-container': {
						templateUrl: '/app/components/admin/views/content-container.view.html',
						controller: 'settingsContentContainerController',
					},
					'toolbar@main.settings': {
						templateUrl: '/app/components/admin/templates/toolbar.template.html',
					},
					'content@main.settings': {
						templateUrl: '/app/components/admin/templates/content/settings.content.template.html',
					},
				},
				onExit: ['$mdSidenav', function($mdSidenav){
					var leftSidenav = $('[md-component-id="left"]');
					if(leftSidenav.hasClass('md-closed') && leftSidenav.hasClass('md-locked-open')){
						return;
					}
					$mdSidenav('left').toggle();
				}],
			})

			/**
			 * Assets Routes
			 *
			*/
			.state('main.asset', {
				url: 'asset/{assetTypeID}',
				params: {'assetTypeID':null},
				views: {
					'content-container': {
						templateUrl: '/app/components/admin/views/content-container.view.html',
						controller: 'assetTypeContentController'
					},
					'toolbar@main.asset': {
						templateUrl: '/app/components/admin/templates/toolbar.template.html',
					},
					'content@main.asset': {
						templateUrl: '/app/components/admin/templates/content/assets.content.template.html',
					},
					'right-sidenav@main.asset': {
						templateUrl: '/app/components/admin/templates/sidenavs/assets-right-sidenav.template.html',
					},
					'subheader@main.asset':{
						templateUrl: '/app/components/admin/templates/subheader/asset-subheader.template.html',
					},
				},
				onExit: ['$mdSidenav', function($mdSidenav){
					var leftSidenav = $('[md-component-id="left"]');
					if(leftSidenav.hasClass('md-closed') && leftSidenav.hasClass('md-locked-open')){
						return;
					}
					$mdSidenav('left').toggle();
				}],
			})
			/**
			 * Displays floor plan of the building
			 * 
			*/
			.state('main.work-stations', {
				url: 'work-stations',
				params: {'departmentID': null},
				views: {
					'content-container': {
						templateUrl: '/app/components/admin/views/content-container.view.html',
						controller: 'workStationsContentContainerController',
					},
					'toolbar@main.work-stations': {
						templateUrl: '/app/components/admin/templates/toolbar.template.html',
					},
					'content@main.work-stations': {
						templateUrl: '/app/components/admin/templates/content/work-stations.content.template.html',
					},
					'right-sidenav@main.work-stations': {
						templateUrl : '/app/components/admin/templates/sidenavs/work-stations.sidenav.html',
					},
				},
				onExit: ['$mdSidenav', function($mdSidenav){
					var leftSidenav = $('[md-component-id="left"]');
					if(leftSidenav.hasClass('md-closed') && leftSidenav.hasClass('md-locked-open')){
						return;
					}
					$mdSidenav('left').toggle();
				}],
			})
			/**
			 * Display Work Station
			 *
			*/
			.state('main.work-station', {
				url: 'work-station/{workStationID}',
				params: {'workStationID': null},
				views: {
					'content-container': {
						templateUrl: '/app/components/admin/views/content-container.view.html',
						controller: 'workStationContentContainerController',
					},
					'toolbar@main.work-station': {
						templateUrl: '/app/components/admin/templates/toolbar.template.html',
					},
					'content@main.work-station': {
						templateUrl: '/app/components/admin/templates/content/work-station.content.template.html',
					},
					'right-sidenav@main.work-station': {
						templateUrl : '/app/components/admin/templates/sidenavs/work-station.sidenav.html',
					},
				},
				onExit: ['$mdSidenav', function($mdSidenav){
					var leftSidenav = $('[md-component-id="left"]');
					if(leftSidenav.hasClass('md-closed') && leftSidenav.hasClass('md-locked-open')){
						return;
					}
					$mdSidenav('left').toggle();
				}],
			})

			.state('main.purchase-orders', {
				url: 'purchase-orders',
				views: {
					'content-container': {
						templateUrl: '/app/components/admin/views/content-container.view.html',
						controller: 'purchaseOrdersContentContainerController',
					},
					'toolbar@main.purchase-orders': {
						templateUrl: '/app/components/admin/templates/toolbar.template.html',
					},
					'content@main.purchase-orders': {
						templateUrl: '/app/components/admin/templates/content/purchase-orders.content.template.html',
					},
				},
				onExit: ['$mdSidenav', function($mdSidenav){
					var leftSidenav = $('[md-component-id="left"]');
					if(leftSidenav.hasClass('md-closed') && leftSidenav.hasClass('md-locked-open')){
						return;
					}
					$mdSidenav('left').toggle();
				}],
			})

			.state('main.create-purchase-order', {
				url: 'purchase-order/create',
				views: {
					'content-container': {
						templateUrl: '/app/components/admin/views/content-container.view.html',
						controller: 'createPurchaseOrderContentContainerController',
					},
					'toolbar@main.create-purchase-order': {
						templateUrl: '/app/components/admin/templates/toolbar.template.html',
					},
					'content@main.create-purchase-order': {
						templateUrl: '/app/components/admin/templates/content/create-purchase-order-content.template.html',
					},
				},
				onExit: ['$mdSidenav', function($mdSidenav){
					var leftSidenav = $('[md-component-id="left"]');
					if(leftSidenav.hasClass('md-closed') && leftSidenav.hasClass('md-locked-open')){
						return;
					}
					$mdSidenav('left').toggle();
				}],
			})

			.state('main.edit-purchase-order', {
				url: 'purchase-order/{purchaseOrderID}/edit',
				params: {'purchaseOrderID': null},
				views: {
					'content-container': {
						templateUrl: '/app/components/admin/views/content-container.view.html',
						controller: 'editPurchaseOrderContentContainerController',
					},
					'toolbar@main.edit-purchase-order': {
						templateUrl: '/app/components/admin/templates/toolbar.template.html',
					},
					'content@main.edit-purchase-order': {
						templateUrl: '/app/components/admin/templates/content/create-purchase-order-content.template.html',
					},
				},
				onExit: ['$mdSidenav', function($mdSidenav){
					var leftSidenav = $('[md-component-id="left"]');
					if(leftSidenav.hasClass('md-closed') && leftSidenav.hasClass('md-locked-open')){
						return;
					}
					$mdSidenav('left').toggle();
				}],
			})

			.state('main.asset-tag-purchase-order', {
				url: 'purchase-order/{purchaseOrderID}/asset-tag',
				params: {'purchaseOrderID': null},
				views: {
					'content-container': {
						templateUrl: '/app/components/admin/views/content-container.view.html',
						controller: 'assetTagPurchaseOrderContentContainerController',
					},
					'toolbar@main.asset-tag-purchase-order': {
						templateUrl: '/app/components/admin/templates/toolbar.template.html',
					},
					'content@main.asset-tag-purchase-order': {
						templateUrl: '/app/components/admin/templates/content/asset-tag-purchase-order-content.template.html',
					},
				},
				onExit: ['$mdSidenav', function($mdSidenav){
					var leftSidenav = $('[md-component-id="left"]');
					if(leftSidenav.hasClass('md-closed') && leftSidenav.hasClass('md-locked-open')){
						return;
					}
					$mdSidenav('left').toggle();
				}],
			})
			/**
			 * Unit Routes
			 *
			*/
			.state('main.units', {
				url: 'assets/{assetID}/item/{unitID}',
				params: {'assetID':null, 'unitID':null},
				views: {
					'content-container': {
						templateUrl: '/app/components/admin/views/content-container.view.html',
						controllerProvider: ['$stateParams', 'assetService', function($stateParams, assetService){
							var index = $stateParams.assetID - 1;
							return assetService.unitContentContainerController(index);
						}]
					},
					'toolbar@main.units': {
						templateUrl: '/app/components/admin/templates/toolbar.template.html',
						controllerProvider: ['$stateParams', 'assetService', function($stateParams, assetService){
							var index = $stateParams.assetID - 1;
							return assetService.unitToolbarController(index);
						}]
					},
					'content@main.units': {
						templateUrl: '/app/components/admin/templates/content/assets-unit.content.template.html',
						// controllerProvider: ['$stateParams', 'assetService', function($stateParams, assetService){
						// 	var index = $stateParams.assetID - 1;
						// 	return assetService.unitContentController(index);
						// }]
					},
					'right-sidenav@main.units': {
						templateUrl : '/app/components/admin/templates/sidenavs/unit-right.sidenav.html',
						controllerProvider: ['$stateParams', 'assetService', function($stateParams, assetService){
							var index = $stateParams.assetID - 1;
							return assetService.unitRightSidenavController(index);
						}]
					},
				},
				onExit: ['$mdSidenav', function($mdSidenav){
					var leftSidenav = $('[md-component-id="left"]');
					if(leftSidenav.hasClass('md-closed') && leftSidenav.hasClass('md-locked-open')){
						return;
					}
					$mdSidenav('left').toggle();
				}],
			})


			/**
			 * Department Routes
			 *
			*/
			.state('main.department', {
				url: 'department/{departmentID}',
				params: {'name':null},
				views: {
					'content-container': {
						templateUrl: '/app/components/admin/views/content-container.view.html',
						controller: 'departmentContentContainerController',
					},
					'toolbar@main.department': {
						templateUrl: '/app/components/admin/templates/toolbar.template.html',
						controller: 'departmentToolbarController',
					},
					'content@main.department': {
						templateUrl: '/app/components/admin/templates/content/department.content.template.html',
					},
				},
				onExit: ['$mdSidenav', function($mdSidenav){
					var leftSidenav = $('[md-component-id="left"]');
					if(leftSidenav.hasClass('md-closed') && leftSidenav.hasClass('md-locked-open')){
						return;
					}
					$mdSidenav('left').toggle();
				}],
			})
	}]);
adminModule
	.service('AssetTagService', ['AssetTag', 'Preloader', function(AssetTag, Preloader){
		var type = null;
		var station = null;
		var id = null;
		return {
			setStation: function(data){
				station = data;
			},
			getStation: function(){
				return station;
			},
			setType: function(data){
				type = data;
			},
			getType: function(){
				return type;
			},
			setID: function(data){
				id = data;
			},
			getID: function(){
				return id;
			},
		}
	}]);
adminModule
	.service('assetService', ['$http', function($http){
		var assets = [
			{ 'controller' : 'cpu' },
			{ 'controller' : 'firewall' },
			{ 'controller' : 'hardDisk' },
			{ 'controller' : 'headset' },
			{ 'controller' : 'keyboard' },
			{ 'controller' : 'mac' },
			{ 'controller' : 'memory' },
			{ 'controller' : 'monitor' },
			{ 'controller' : 'mouse' },
			{ 'controller' : 'networkSwitch' },
			{ 'controller' : 'portableHardDisk' },
			{ 'controller' : 'printer' },
			{ 'controller' : 'projector' },
			{ 'controller' : 'router' },
			{ 'controller' : 'scanner' },
			{ 'controller' : 'software' },
			{ 'controller' : 'speaker' },
			{ 'controller' : 'telephone' },
			{ 'controller' : 'ups' },
			{ 'controller' : 'videoCard' },
			{ 'controller' : 'otherComponent' },
		];

		return{
			get: function(){
				return assets;
			},
			toolbarController: function(id){
				// returns assetNameToolbarController
				return assets[id].controller  + 'ToolbarController';
			},
			contentContainerController: function(id){
				// returns assetNameContentContainerController
				return assets[id].controller  + 'ContentContainerController';
			},
			contentController: function(id){
				// returns assetNameContentController
				return assets[id].controller  + 'ContentController';
			},
			rightSidenavController: function(id){
				// returns assetNameRightSidenavController
				return assets[id].controller  + 'RightSidenavController';
			},
			unitToolbarController: function(id){
				// returns assetNameToolbarController
				return assets[id].controller  + 'UnitToolbarController';
			},
			unitContentContainerController: function(id){
				// returns assetNameContentContainerController
				return assets[id].controller  + 'UnitContentContainerController';
			},
			unitContentController: function(id){
				// returns assetNameContentController
				return assets[id].controller  + 'UnitContentController';
			},
			unitRightSidenavController: function(id){
				// returns assetNameRightSidenavController
				return assets[id].controller  + 'UnitRightSidenavController';
			},
		};
	}]);
adminModule
	.service('departmentService', function(){
		var departments = [];

		return {
			set: function(data){
				departments = data;
			},
			get: function(){
				return departments;
			},
		};
	});
adminModule
	.service('UserService', function(){
		var user = null;

		return {
			set: function(data){
				user = data;
			},
			get: function(){
				return user;
			},
		}
	});
adminModule
	.controller('assetTypeContentController', ['$scope', '$filter', '$mdDialog', '$state', '$stateParams', 'AssetType', 'Asset', 'AssetTag', 'Preloader', function($scope, $filter, $mdDialog, $state, $stateParams, AssetType, Asset, AssetTag, Preloader){
		var assetTypeID = $stateParams.assetTypeID;
		$scope.state = $state.current.name;
		/**
		  *
		  * Object for toolbar
		  *
		*/
		$scope.toolbar = {};
		$scope.toolbar.parentState = 'Asset';
		// $scope.toolbar.childState = 'Settings';
		$scope.toolbar.items = [];
		$scope.toolbar.getItems = function(query){
			var results = query ? $filter('filter')($scope.toolbar.items, query) : $scope.toolbar.items;
			return results;
		}

		$scope.toolbar.subheader = 'Filters';

		$scope.toolbar.options = [
			{
				'label': 'Deployed',
				'icon': 'mdi-filter',
				action : function(){
					$scope.status = 'deployed';
				},
			},
			{
				'label': 'Stock',
				'icon': 'mdi-filter',
				action : function(){
					$scope.status = 'stock';
				},
			},
			{
				'label': 'Pulled Out',
				'icon': 'mdi-filter',
				action : function(){
					$scope.status = 'pulled out';
				},
			},
		]

		$scope.toolbar.refresh = function(){
			/* Starts the loading */
			$scope.status = '';
			Preloader.loading();
			$scope.init(true);
		}

		$scope.showSearchBar = function(){
	    	$scope.searchBar = true;
	    }

	    $scope.hideSearchBar = function(){
	    	$scope.searchBar = false;
	    	$scope.toolbar.searchText = '';
	    	if($scope.assetTag.searched){
	    		$scope.toolbar.refresh();
	    		$scope.assetTag.searched = false;
	    	}
	    }

	    $scope.showAssetDetails = function(id){
	    	Preloader.set(id);
	    	$mdDialog.show({
		    	controller: 'assetDetailsDialogController',
		      	templateUrl: '/app/components/admin/templates/dialogs/asset-details-dialog.template.html',
		      	parent: angular.element(document.body),
		    })
		    .then(function(data){
		    	if(data == 'edit'){
			    	$mdDialog.show({
				    	controller: 'editAssetDialogController',
				      	templateUrl: '/app/components/admin/templates/dialogs/asset-dialog.template.html',
				      	parent: angular.element(document.body),
				    })
				    .then(function(){
				    	Preloader.toastChangesSaved();
				    	$scope.toolbar.refresh();
				    })
		    	}
		    	else{
		    		var confirm = $mdDialog.confirm()
				        .title('Delete')
				        .textContent('This asset will be removed.')
				        .ariaLabel('Delete')
				        .ok('Delete')
				        .cancel('Cancel');
				    $mdDialog.show(confirm).then(function() {
				    	var assetID = Preloader.get();
				    	Asset.delete(assetID)
				    		.success(function(){
				    			$scope.toolbar.refresh();
				    			Preloader.deleted();
				    		})
				    		.error(function(){
				    			Preloader.error();
				    		})
				    }, function() {
				    	return;
				    });
		    	}

		    },function(){
		    	return;
		    })
	    }

	    $scope.purchaseOrder = function(id)
	    {
	    	$state.go('main.asset-tag-purchase-order', {'purchaseOrderID':id});
	    }

	    var pushItem = function(data, type){
	    	if(type == 'asset'){
			    var item = {};
				item.display = data.model;
				item.subItem = data.brand;
				// format
				data.first_letter = data.brand.charAt(0).toUpperCase();
				data.updated_at = new Date(data.updated_at);
	    	}
	    	else{
	    		var item = {};
				item.display = data.property_code;
				// format
				data.first_letter = data.asset.brand.charAt(0).toUpperCase();
				data.warranty_end = new Date(data.warranty_end);
				data.current_status = data.status.length ? 'Pulled Out' : (data.work_station_id ? 'Deployed' : 'Stock');
	    	}

			$scope.toolbar.items.push(item);
	    }

	    $scope.toolbar.searchAll = true;
	    $scope.toolbar.getItems = function(query){
	    	var results = query ? $filter('filter')($scope.toolbar.items, query) : $scope.toolbar.items = [];
	    	return results;
	    }

		$scope.searchUserInput = function(){
			$scope.asset.show = false;
			$scope.assetTag.paginated.show = false;
			Preloader.loading();
			$scope.toolbar.items = [];
			AssetTag.search($scope.toolbar)
				.success(function(data){
					angular.forEach(data, function(item){
						pushItem(item);
					});
					
					$scope.assetTag.results = data;
					$scope.assetTag.searched = true;
					Preloader.stop();
				})
				.error(function(){
					Preloader.error();
				});
		};

		/**
		  *
		  * Object for fab
		  *
		*/
		$scope.fab = {};
		$scope.fab.label = "Create";
		$scope.fab.icon = "mdi-plus";
		$scope.fab.action = function(){    
	        $mdDialog.show({
		    	controller: 'createAssetDialogController',
		      	templateUrl: '/app/components/admin/templates/dialogs/asset-dialog.template.html',
		      	parent: angular.element(document.body),
		    })
	        .then(function(data) {
	        	// if(data){
		        	$scope.toolbar.refresh();
	        	// }
	        }, function() {
	        	return;
	        });
		}

		$scope.editAssetTag = function(id){
			Preloader.set(id);
			$mdDialog.show({
		      	controller: 'editAssetTagDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/edit-asset-tag-dialog.template.html',
		      	parent: angular.element($('body')),
		    })
		    .then(function(){
		    	$scope.toolbar.refresh();
		    });
		};

		$scope.transferAssetTag = function(id){
			Preloader.set(id);
			$mdDialog.show({
		      	controller: 'transferAssetTagDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/transfer-asset-tag-dialog.template.html',
		      	parent: angular.element($('body')),
		    })
		    .then(function(){
		    	$scope.toolbar.refresh();
		    });
		};

		$scope.swapAssetTag = function(id){
			Preloader.set(id);
			$mdDialog.show({
		      	controller: 'swapAssetTagDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/swap-asset-dialog.template.html',
		      	parent: angular.element($('body')),
		    })
		    .then(function(){
		    	$scope.toolbar.refresh();
		    });
		};

		$scope.pullOutAssetTag = function(id){
			Preloader.set(id);
			$mdDialog.show({
		      	controller: 'pullOutAssetTagDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/pull-out-asset-dialog.template.html',
		      	parent: angular.element($('body')),
		    })
		    .then(function(){
		    	$scope.toolbar.refresh();
		    });
		};

		$scope.deleteAssetTag = function(id){
			var confirm = $mdDialog.confirm()
	        	.title('Delete')
	          	.content('Are you sure you want to delete this asset tag?')
	          	.ariaLabel('Delete Asset Tag')
	          	.ok('Delete')
	          	.cancel('Cancel');

	        $mdDialog.show(confirm).then(function() {
		      	AssetTag.delete(id)
		      		.success(function(){
		      			$scope.toolbar.refresh();
		      		})
		      		.error(function(){
		      			Preloader.error();
		      		});
		    }, function() {
		      	return;
		    });
		};

		$scope.repaired = function(id){
			var confirm = $mdDialog.confirm()
	        	.title('Repaired')
	          	.content('Confirm that this asset is repaired?')
	          	.ariaLabel('Repaired')
	          	.ok('Yes')
	          	.cancel('No');

	        $mdDialog.show(confirm).then(function() {
		      	AssetTag.repair(id)
		      		.success(function(){
		      			$scope.toolbar.refresh();
		      		})
		      		.error(function(){
		      			Preloader.error();
		      		});
		    }, function() {
		      	return;
		    });
		}

		$scope.pullOutDetails = function(id){
			Preloader.set(id);
			$mdDialog.show({
		      	controller: 'pullOutDetailsDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/pull-out-details-dialog.template.html',
		      	parent: angular.element($('body')),
		    })
		    .then(function(){
		    	$scope.toolbar.refresh();
		    });
		}
		/**
		  *
		  * Object for rightSidenav
		  *
		*/
		$scope.rightSidenav = {};
		$scope.rightSidenav.show = true;

		$scope.init = function(refresh){
			AssetType.show(assetTypeID)
				.then(function(data){
					$scope.assetType = data.data;
					$scope.toolbar.childState = data.data.type;
					return;
				})
				.then(function(){
					$scope.asset = {};
					$scope.asset.paginated = [];
					$scope.toolbar.items = [];
					// 2 is default so the next page to be loaded will be page 2 
					$scope.asset.page = 2;

					Asset.paginate(assetTypeID)
						.success(function(data){
							$scope.asset.details = data;
							$scope.asset.paginated = data.data;
							$scope.asset.show = true;

							if(data.data.length){
								// iterate over each record and set the updated_at date and first letter
								angular.forEach(data.data, function(item){
									pushItem(item, 'asset');
								});

								$scope.fab.show = true;
							}

							$scope.asset.paginateLoad = function(){
								// kills the function if ajax is busy or pagination reaches last page
								if($scope.asset.busy || ($scope.asset.page > $scope.asset.details.last_page)){
									return;
								}
								/**
								 * Executes pagination call
								 *
								*/
								// sets to true to disable pagination call if still busy.
								$scope.asset.busy = true;

								Asset.paginate(assetTypeID, $scope.asset.page)
									.success(function(data){
										// increment to call the next page for the next call
										$scope.asset.page++;
										// iterate over the paginated data and push it to the original array
										angular.forEach(data.data, function(item){
											pushItem(item, 'asset');
											$scope.asset.paginated.push(item);
										});
										// enables next call
										$scope.asset.busy = false;
									})
									.error(function(){
										Preloader.error();
									});
						}
						if(refresh){
							Preloader.stop();
							Preloader.stop();
						}
					})
					.error(function(){
						Preloader.error();
					})

					// Asset Tags
					$scope.assetTag = {};
					$scope.assetTag.paginated = [];
					$scope.toolbar.items = [];
					// 2 is default so the next page to be loaded will be page 2 
					$scope.assetTag.page = 2;

					AssetTag.paginate(assetTypeID)
						.success(function(data){
							$scope.assetTag.details = data;
							$scope.assetTag.paginated = data.data;
							$scope.assetTag.paginated.show = true;

							if(data.data.length){
								// iterate over each record and set the updated_at date and first letter
								angular.forEach(data.data, function(item){
									pushItem(item, 'asset_tag');
								});
							}

							$scope.assetTag.paginateLoad = function(){
								// kills the function if ajax is busy or pagination reaches last page
								if($scope.assetTag.busy || ($scope.assetTag.page > $scope.assetTag.details.last_page)){
									return;
								}
								/**
								 * Executes pagination call
								 *
								*/
								// sets to true to disable pagination call if still busy.
								$scope.assetTag.busy = true;

								AssetTag.paginate(assetTypeID, $scope.assetTag.page)
									.success(function(data){
										// increment to call the next page for the next call
										$scope.assetTag.page++;
										// iterate over the paginated data and push it to the original array
										angular.forEach(data.data, function(item){
											pushItem(item, 'asset_tag');
											$scope.assetTag.paginated.push(item);
										});
										// enables next call
										$scope.assetTag.busy = false;
									})
									.error(function(){
										Preloader.error();
									});
						}
						if(refresh){
							Preloader.stop();
							Preloader.stop();
						}
					})
					.error(function(){
						Preloader.error();
					})
				})
		}

		$scope.init();
	}]);
adminModule
	.controller('addEmployeeDialogController', ['$scope', '$stateParams', '$mdDialog', 'Preloader', 'Department', 'Employee', function($scope, $stateParams, $mdDialog, Preloader, Department, Employee){
		$scope.employee = {};
		$scope.employee.department_id = $stateParams.departmentID;

		Department.show($stateParams.departmentID)
			.success(function(data){
				$scope.department = data;
			});

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.submit = function(){
			/* Starts Preloader */
			Preloader.preload();
			/**
			 * Stores Single Record
			*/
			Employee.store($scope.employee)
				.then(function(){
					// Stops Preloader 
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		}

	}]);
adminModule
	.controller('departmentContentContainerController', ['$scope', '$stateParams', '$mdDialog', 'Preloader', 'Employee', 'UserService', function($scope, $stateParams, $mdDialog, Preloader, Employee, UserService){
		/**
		 * Object for subheader
		 *
		*/
		var departmentID = $stateParams.departmentID;

		$scope.subheader = {};
		$scope.subheader.state = 'departments';

		/* Refreshes the list */
		$scope.subheader.refresh = function(){
			// start preloader
			Preloader.preload();
			// clear desktop
			$scope.employee.paginated = {};
			$scope.employee.page = 2;
			Employee.paginateDepartment(departmentID)
				.then(function(data){
					$scope.employee.paginated = data.data;
					$scope.employee.paginated.show = true;
					// stop preload
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		};

		/**
		 * Object for fab
		 *
		*/
		$scope.fab = {};

		$scope.fab.icon = 'mdi-plus';
		$scope.fab.label = 'Add';
		$scope.fab.show = true;

		$scope.fab.action = function(){
		    $mdDialog.show({
		      	controller: 'addEmployeeDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-employee-dialog.template.html',
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
		$scope.rightSidenav.show = false;

		/**
		 * Object for Employee
		 *
		*/
		$scope.employee = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.employee.page = 2;
		//

		Employee.paginateDepartment(departmentID)
			.then(function(data){
				$scope.employee.paginated = data.data;
				$scope.employee.paginated.show = true;

				$scope.employee.paginateLoad = function(){
					// kills the function if ajax is busy or pagination reaches last page
					if($scope.employee.busy || ($scope.employee.page > $scope.employee.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.employee.busy = true;

					// Calls the next page of pagination.
					Employee.paginateDepartment(departmentID, $scope.employee.page)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.employee.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.employee.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.employee.busy = false;

							console.log('loaded');
						});
				}
			}, function(){
				Preloader.error();
			});

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
			$scope.employee.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.employee.paginated.show = false;
			Preloader.preload()
			Employee.search(departmentID, $scope.employee)
				.success(function(data){
					$scope.employee.results = data;
					Preloader.stop();
				})
				.error(function(data){
					Preloader.error();
				});
		};

		$scope.show = function(id){
			UserService.set(id);
			$mdDialog.show({
		      	controller: 'showEmployeeDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/show-employee-dialog.template.html',
		      	parent: angular.element($('body')),
		      	clickOutsideToClose:true,
		    });
		};
	}]);
adminModule
	.controller('departmentToolbarController', ['$scope', '$stateParams', 'Department', 'departmentService', function($scope, $stateParams, Department, departmentService){
		/**
		 *  Object for toolbar view.
		 *
		*/
		$scope.toolbar = {};

		/**
		 * Properties and method of toolbar.
		 *
		*/

		/**
		 * Fetch the department data stored at deparments servce.
		 *
		*/
		var index = $stateParams.departmentID - 1;
		$scope.toolbar.parentState = 'Departments';

		var departments = departmentService.get();
		if(!departments.length){
			Department.index()
				.success(function(data){
					departments = data;
					$scope.toolbar.childState = departments[index].name;
				})
				.error(function(data){
					Preload.error();
				});
		}
		else{
			$scope.toolbar.childState = departments[index].name;
		}
	}]);
adminModule
	.controller('showEmployeeDialogController', ['$scope', '$mdDialog', '$stateParams', 'UserService', 'EmployeeTag', 'Employee', function($scope, $mdDialog, $stateParams, UserService, EmployeeTag, Employee){
		var employeeID = UserService.get();

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		Employee.show(employeeID)
			.success(function(data){
				$scope.employee = data;
			});

		EmployeeTag.employee(employeeID)
			.success(function(data){
				$scope.workstation = data;
			});
	}]);
adminModule
	.controller('barcodeDialogController', ['$scope', '$mdDialog', function($scope, $mdDialog){
		$scope.cancel = function(){
			$mdDialog.cancel();
		}
		
		$scope.barcode = {};
		$scope.barcode.category = 'assets';
		$scope.max = 99999;
		$scope.floors = ['06', '10'];
		$scope.divisions = ['A', 'B'];
		$scope.types = [
			{'name':'Admin', 'value':'A'},
			{'name':'Production', 'value':'P'}
		];

		$scope.checkMax = function(){
			if($scope.barcode.category == 'workstation')
				$scope.max = 999;
			else
				$scope.max = 99999;
		}

		$scope.submit = function(){
			if($scope.detailsForm.$invalid){
				angular.forEach($scope.detailsForm.$error, function(field){
					angular.forEach(field, function(errorField){
						errorField.$setTouched();
					});
				});
			}
			else{
				if($scope.barcode.category == 'assets'){				
					var win = window.open('/barcode-assets/' + $scope.barcode.format + '/starting-point/' + $scope.barcode.starting_point + '/quantity/' + $scope.barcode.quantity , '_blank');
					win.focus();
				}
				else{
					var win = window.open('/barcode-work-station/' + $scope.barcode.floor + '/division/' + $scope.barcode.division + '/type/' + $scope.barcode.type + '/starting-point/' + $scope.barcode.starting_point + '/quantity/' + $scope.barcode.quantity , '_blank');
					win.focus();	
				}
				$mdDialog.hide();
			}
		}
	}]);
adminModule
	.controller('leftSidenavController', ['$scope', '$state', '$mdSidenav', 'AssetType', function($scope, $state, $mdSidenav, AssetType){
		$scope.menu = {};
		$scope.state = $state.current.name;

		$scope.menu.static = [
			{
				'state':'main',
				'icon':'mdi-view-dashboard',
				'label':'Dashboard',
			},
			{
				'state':'main.purchase-orders',
				'icon':'mdi-format-list-numbers',
				'label':'Purchase Orders',
			},
			{
				'state':'main.work-stations',
				'icon':'mdi-desktop-tower',
				'label':'Work Stations',
			},
			{
				'state':'main.settings',
				'icon':'mdi-settings',
				'label':'Settings',
			},
		];

		$scope.menu.section = [
			{
				'name':'Assets',
				'icon':'mdi-desktop-mac',
			},
		];

		$scope.menu.pages = [];

		AssetType.index()
			.success(function(data){
				$scope.menu.pages.push(data);
			})


		// set section as active
		$scope.setActive = function(index){
		 	angular.element($('[aria-label="'+ 'section-' + index + '"]').closest('li').toggleClass('active'));
		 	angular.element($('[aria-label="'+ 'section-' + index + '"]').closest('li').siblings().removeClass('active'));
		};
	}]);
adminModule
	.controller('mainContentContainerController', ['$scope', '$state', '$mdDialog', 'Preloader', 'InventoryReport', 'Activity', function($scope, $state, $mdDialog, Preloader, InventoryReport, Activity){
		/**
		 *  Object for toolbar view.
		 *
		*/
		$scope.toolbar = {};

		/**
		 * Properties and method of toolbar.
		 *
		*/
		$scope.toolbar.childState = 'Dashboard';

		$scope.toolbar.subheader = 'Options';

		$scope.toolbar.options = [
			{
				'label': 'Download Report',
				'icon': 'mdi-download',
				action : function(){
					var win = window.open('/inventory-report/', '_blank');
					win.focus();
				},
			},
			{
				'label': 'Sticker Generator',
				'icon': 'mdi-barcode',
				action : function(){
					$mdDialog.show({
				    	controller: 'barcodeDialogController',
				      	templateUrl: '/app/components/admin/templates/dialogs/barcode-dialog.template.html',
				      	parent: angular.element(document.body),
				    });
				},
			},
		];

		$scope.toolbar.refresh = function(){
			// start preloader
			Preloader.loading();
			$scope.init(true);
		}

		$scope.toolbar.hideSearchIcon = true;

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
			$scope.toolbar.searchText = '';
			$scope.searchBar = false;
		};

		$scope.rightSidenav = {};

		$scope.rightSidenav.show = true;

		$scope.show = function(id){
			Preloader.set(id);
			$mdDialog.show({
		    	controller: 'activityDialogController',
		      	templateUrl: '/app/components/admin/templates/dialogs/activity-dialog.template.html',
		      	parent: angular.element(document.body),
		      	clickOutsideToClose: true,
		    });
		}

		$scope.chartWeekly = function(data){
			console.log(data);
			// Preloader.set(data[0]);
			// $mdDialog.show({
		 //    	controller: 'chartWeeklyDialogController',
		 //      	templateUrl: '/app/components/admin/templates/dialogs/chart-weekly.template.html',
		 //      	parent: angular.element(document.body),
		 //      	clickOutsideToClose: true,
		 //    });
		}

		$scope.init = function(refresh){
			$scope.charts = [
				// Purchase Orders
				{
					'title': 'Purchase Orders',
					'monthly': {
						'labels': ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
					},
					'weekly': {
						// 'data': [],
						'labels': [],
					},
				},
				// Asset Tags
				{
					'title': 'Asset Tags',
					'monthly': {
						'labels': ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
						'series': ["Deployed", "Stock", "Pulled Out"],
					},
					'weekly': {
						'series': ["Deployed", "Stock", "Pulled Out"],
						// 'data': [],
						'labels': [],
					},
				},
				// Activities
				{
					'title': 'Activities',
					'monthly' : {
						'labels': ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
					},
					'weekly': {
						// 'data': [],
						'labels': [],
					}
				}
			];


			InventoryReport.dashboard()
				.then(function(data){
					angular.forEach(data.data.warranty, function(item){
						item.warranty_end = new Date(item.warranty_end);
					});

					$scope.dashboard = data.data;

					$scope.charts[0].monthly.data = data.data.purchase_order_array[1];
					$scope.charts[1].monthly.data = data.data.asset_tag_array[1];
					$scope.charts[2].monthly.data = data.data.activity_array[1];

					angular.forEach(data.data.week_ranges, function(date){				
						$scope.charts[0].weekly.labels.push(date);
						$scope.charts[1].weekly.labels.push(date);
						$scope.charts[2].weekly.labels.push(date);
					})

					$scope.charts[0].weekly.data = data.data.purchase_order_array[0];
					$scope.charts[1].weekly.data = data.data.asset_tag_array[0];
					$scope.charts[2].weekly.data = data.data.activity_array[0];


				})
				.then(function(){
					/**
					 * Object for Work Station
					 *
					*/
					$scope.activity = {};
					// 2 is default so the next page to be loaded will be page 2 
					$scope.activity.page = 2;

					Activity.paginate()
						.success(function(data){
							$scope.activity.details = data;
							$scope.activity.paginated = data.data;
							$scope.activity.paginated.show = true;

							if(data.data.length){
								// iterate over each record and set the updated_at date and first letter
								angular.forEach(data.data, function(item){
									item.created_at = new Date(item.created_at);
									item.first_letter = item.user.first_name[0].toUpperCase();
								});
							}

							$scope.activity.paginateLoad = function(){
								// kills the function if ajax is busy or pagination reaches last page
								if($scope.activity.busy || ($scope.activity.page > $scope.activity.details.last_page)){
									return;
								}
								/**
								 * Executes pagination call
								 *
								*/
								// sets to true to disable pagination call if still busy.
								$scope.activity.busy = true;

								// Calls the next page of pagination.
								Activity.paginate($scope.activity.page)
									.success(function(data){
										// increment the page to set up next page for next AJAX Call
										$scope.activity.page++;

										// iterate over each data then splice it to the data array
										angular.forEach(data.data, function(item, key){
											item.created_at = new Date(item.created_at);
											item.first_letter = item.user.first_name[0].toUpperCase();
											$scope.activity.paginated.push(item);
										});

										// Enables again the pagination call for next call.
										$scope.activity.busy = false;

									});
							}
							if(refresh){
								Preloader.stop();
								Preloader.stop();
							}
						})
						.error(function(){
							Preloader.error();
						});
				})
		}

		$scope.init();

	}]);
adminModule
	.controller('mainViewController', ['$scope', '$mdDialog', '$mdSidenav', 'User', 'Preloader', function($scope, $mdDialog, $mdSidenav, User, Preloader){
		/**
		 * Fetch authenticated user information
		 *
		*/
		User.index()
			.success(function(data){
				$scope.user = data;
				Preloader.setUser(data);
			});

		/**
		 * Toggles Left Sidenav
		 *
		*/
		$scope.toggleSidenav = function(menuId) {
		    $mdSidenav(menuId).toggle();
		};

		$scope.changePassword = function()
		{
			$mdDialog.show({
		      controller: 'changePasswordDialogController',
		      templateUrl: '/app/components/admin/templates/dialogs/change-password-dialog.template.html',
		      parent: angular.element(document.body),
		    })
		    .then(function(){
		    	$mdToast.show(
		    		$mdToast.simple()
				        .content('Password changed.')
				        .position('bottom right')
				        .hideDelay(3000)
		    	);
		    });
		}
	}]);
adminModule
	.controller('createPurchaseOrderContentContainerController', ['$scope', '$state', '$mdToast', 'Preloader', 'PurchaseOrder', 'AssetType', 'Asset', 'AssetDetail', 'Vendor', 'AssetPurchaseOrder', function($scope, $state, $mdToast, Preloader, PurchaseOrder, AssetType, Asset, AssetDetail, Vendor, AssetPurchaseOrder){
		/**
		  *
		  * Object for toolbar
		  *
		*/
		$scope.toolbar = {};
		$scope.toolbar.childState = 'Create Purchase Order';
		$scope.toolbar.showBack = true;
		$scope.toolbar.back = function(){
			$state.go('main.purchase-orders');
		}

		$scope.toolbar.refresh = function(){
			$state.go('main.create-purchase-order', {}, {reload:true});
		}

		$scope.toolbar.hideSearchIcon = true;

		/**
		 * Object for fab
		 *
		*/
		$scope.fab = {};

		$scope.fab.icon = 'mdi-check';
		$scope.fab.label = 'Submit';
		$scope.fab.show = true;

		$scope.fab.action = function(){
			$scope.submit();			
		};

		var busy = false;
		$scope.form = {};
		$scope.purchaseOrder = {};
		$scope.purchaseOrder.date_purchased = new Date();
		$scope.purchaseOrder.date_arrival = new Date();
		$scope.purchaseOrder.date_arrival.setDate($scope.purchaseOrder.date_arrival.getDate()+30);
		
		$scope.label = "Purchase Order";


		$scope.assets = [];

		$scope.addAsset = function(){
			$scope.assets.push(
				{
					'assetTypeIndex':null,
					'brand': null,
					'asset_id': null,
					'quantity': null,
				}
			);
		}

		$scope.removeAsset = function(idx){
			$scope.assets.splice(idx, 1);
		}

		// $scope.getUniqueContactPerson = function(idx){
		// 	$scope.contactPerson = null;
		// 	$scope.purchaseOrder.vendor_id = null;
			
		// 	Vendor.contactPersons($scope.companies[idx].id)
		// 		.success(function(data){
		// 			$scope.contactPersons = data;
		// 		})
		// 		.error(function(){
		// 			Preloader.error();
		// 		})
		// }

		// $scope.getContactNumbers = function(id){
		// 	Vendor.contactNumbers(id)
		// 		.success(function(data){
		// 			$scope.contactNumbers = data;
		// 		})
		// 		.error(function(){
		// 			Preloader.error();
		// 		})
		// }

		$scope.getUniqueBrands = function(assetTypeIndex, idx){
			$scope.assets[idx].brand = null;
			$scope.purchaseOrder.asset_id = null;
			$scope.assets[idx].details = [];

			Asset.brands($scope.assetTypes[assetTypeIndex].id)
				.success(function(data){
					$scope.assets[idx].brands = data;
				})
				.error(function(){
					Preloader.error();
				})
		}

		$scope.getAssetDetails = function(id, idx){
			AssetDetail.show(id)
				.success(function(data){
					$scope.assets[idx].details = data;
				})
				.error(function(){
					Preloader.error();
				});
		}

		$scope.submit = function(){
			if($scope.form.purchaseOrderForm.$invalid){
				angular.forEach($scope.form.purchaseOrderForm.$error, function(field){
					angular.forEach(field, function(errorField){
						errorField.$setTouched();
					});
				});
			}
			else{
				//  * Stores Single Record
				Preloader.saving();

				if(!busy){
					busy = true;
					$scope.purchaseOrder.date_purchased = $scope.purchaseOrder.date_purchased.toDateString();
					$scope.purchaseOrder.date_arrival = $scope.purchaseOrder.date_arrival.toDateString();
					
					PurchaseOrder.store($scope.purchaseOrder)
						.then(function(data){
							return data.data;
						})
						.then(function(data){
							angular.forEach($scope.assets, function(item){
								item.purchase_order_id = data.id;
							});

							AssetPurchaseOrder.store($scope.assets)
								.success(function(){
									busy = false;
									
									Preloader.stop();
									
									$mdToast.simple()
							        	.textContent('Saved successfuly.')
							        	.position('bottom right')
							        	.hideDelay(3000)
									
									$scope.toolbar.back();
								})
								.error(function(){
									busy = false;
									Preloader.error();
								});
								
						}, function(){
							busy = false;
							Preloader.error();
						});
				}
			}
		}

		$scope.init = function(){
			Vendor.index()
				.then(function(data){
					$scope.vendors = data.data;
				})
				.then(function(){
					AssetType.index()
						.success(function(data){
							$scope.assetTypes = data;
							$scope.show = true;
						})
				}, function(){
					Preloader.error();
				})

			$scope.addAsset();
		}();
	}]);
adminModule
	.controller('editPurchaseOrderContentContainerController', ['$scope', '$filter', '$state', '$stateParams', '$mdToast', 'Preloader', 'PurchaseOrder', 'AssetType', 'Asset', 'AssetDetail', 'Vendor', 'AssetPurchaseOrder', function($scope, $filter, $state, $stateParams, $mdToast, Preloader, PurchaseOrder, AssetType, Asset, AssetDetail, Vendor, AssetPurchaseOrder){
		var purchaseOrderID = $stateParams.purchaseOrderID;
		/**
		  *
		  * Object for toolbar
		  *
		*/
		$scope.toolbar = {};
		$scope.toolbar.parentState = 'Update Purchase Order';
		$scope.toolbar.showBack = true;
		$scope.toolbar.back = function(){
			$state.go('main.purchase-orders');
		}

		$scope.toolbar.refresh = function(){
			$scope.init(true);
		}

		$scope.toolbar.hideSearchIcon = true;

		/**
		 * Object for fab
		 *
		*/
		$scope.fab = {};

		$scope.fab.icon = 'mdi-check';
		$scope.fab.label = 'Submit';
		$scope.fab.show = true;

		$scope.fab.action = function(){
			$scope.submit();			
		};

		var busy = false;
		$scope.form = {};
		$scope.purchaseOrder = {};
		$scope.purchaseOrder.date_purchased = new Date();
		$scope.purchaseOrder.date_arrival = new Date();
		$scope.purchaseOrder.date_arrival.setDate($scope.purchaseOrder.date_arrival.getDate()+30);
		
		$scope.label = "Purchase Order";


		$scope.assets = [];

		$scope.addAsset = function(){
			$scope.assets.push(
				{
					'assetTypeIndex':null,
					'brand': null,
					'asset_id': null,
					'quantity': null,
				}
			);
		}

		$scope.removeAsset = function(idx){
			$scope.assets.splice(idx, 1);
		}

		// $scope.getUniqueContactPerson = function(idx){
		// 	$scope.contactPerson = null;
		// 	$scope.purchaseOrder.vendor_id = null;
			
		// 	Vendor.contactPersons($scope.companies[idx].id)
		// 		.success(function(data){
		// 			$scope.contactPersons = data;
		// 		})
		// 		.error(function(){
		// 			Preloader.error();
		// 		})
		// }

		// $scope.getContactNumbers = function(id){
		// 	Vendor.contactNumbers(id)
		// 		.success(function(data){
		// 			$scope.contactNumbers = data;
		// 		})
		// 		.error(function(){
		// 			Preloader.error();
		// 		})
		// }

		$scope.getUniqueBrands = function(assetTypeIndex, idx){
			$scope.assets[idx].brand = null;
			$scope.purchaseOrder.asset_id = null;
			$scope.assets[idx].details = [];

			Asset.brands($scope.assetTypes[assetTypeIndex].id)
				.success(function(data){
					$scope.assets[idx].brands = data;
				})
				.error(function(){
					Preloader.error();
				})
		}

		$scope.getAssetDetails = function(id, idx){
			AssetDetail.show(id)
				.success(function(data){
					$scope.assets[idx].details = data;
				})
				.error(function(){
					Preloader.error();
				});
		}

		$scope.submit = function(){
			if($scope.form.purchaseOrderForm.$invalid){
				angular.forEach($scope.form.purchaseOrderForm.$error, function(field){
					angular.forEach(field, function(errorField){
						errorField.$setTouched();
					});
				});
			}
			else{
				//  * Stores Single Record
				Preloader.saving();

				if(!busy){
					busy = true;
					$scope.purchaseOrder.date_purchased = $scope.purchaseOrder.date_purchased.toDateString();
					$scope.purchaseOrder.date_arrival = $scope.purchaseOrder.date_arrival.toDateString();
					
					PurchaseOrder.update(purchaseOrderID, $scope.purchaseOrder)
						.then(function(data){
							return data.data;
						})
						.then(function(data){
							angular.forEach($scope.assets, function(item){
								item.purchase_order_id = data.id;
							});

							AssetPurchaseOrder.update(purchaseOrderID, $scope.assets)
								.success(function(){
									busy = false;
									
									Preloader.stop();
									
									$mdToast.simple()
							        	.textContent('Saved successfuly.')
							        	.position('bottom right')
							        	.hideDelay(3000)
									
									$scope.toolbar.back();
								})
								.error(function(){
									busy = false;
									Preloader.error();
								});
								
						}, function(){
							busy = false;
							Preloader.error();
						});
				}
			}
		}

		$scope.init = function(){
			Vendor.index()
				.then(function(data){
					$scope.vendors = data.data;
					return;
				})
				.then(function(){
					AssetType.index()
						.success(function(data){
							$scope.assetTypes = data;
						})
						.error(function(){
							Preloader.error();
						})

					return;
				})
				.then(function(){
					PurchaseOrder.show(purchaseOrderID)
						.success(function(data){
							$scope.toolbar.childState = data.tracking_code ? data.tracking_code : 'N/A';
							data.date_purchased = new Date(data.date_purchased);
							data.date_arrival = new Date(data.date_arrival);

							// var company = $filter('filter')($scope.companies, {company:data.vendor.company});

							// $scope.vendorIndex = $scope.companies.indexOf(company[0]);

							// Vendor.contactPersons($scope.companies[$scope.vendorIndex].id)
							// 	.success(function(data){
							// 		$scope.contactPersons = data;

							// 		var contactPerson = $filter('filter')($scope.contactPersons, {contact_person:$scope.purchaseOrder.vendor.contact_person});

							// 		$scope.contactPerson = $scope.contactPersons[$scope.contactPersons.indexOf(contactPerson[0])].id;

							// 		$scope.getContactNumbers($scope.contactPerson);
							// 	})
							// 	.error(function(){
							// 		Preloader.error();
							// 	})

							$scope.purchaseOrder = data;
							$scope.assets = data.asset_purchase_order;

							angular.forEach($scope.assets, function(item){
								var assetType = $filter('filter')($scope.assetTypes, {type:item.asset.type.type});
								// console.log(assetType[0]);
								item.assetTypeIndex = $scope.assetTypes.indexOf(assetType[0]);

								Asset.brands($scope.assetTypes[item.assetTypeIndex].id)
									.success(function(data){
										item.brands = data;

										var brand = $filter('filter')(data, {brand:item.asset.brand});

										item.brand = item.brands[item.brands.indexOf(brand[0])].brand;
									})
									.error(function(){
										Preloader.error();
									})
							});

							$scope.show = true;
						})
						.error(function(){
							Preloader.error();
						})
				})				
		}

		$scope.init();
	}]);
adminModule
	.controller('purchaseOrdersContentContainerController', ['$scope', '$filter', '$state', '$mdDialog', 'PurchaseOrder', 'Preloader', function($scope, $filter, $state, $mdDialog, PurchaseOrder, Preloader){
		/**
		  *
		  * Object for toolbar
		  *
		*/
		$scope.toolbar = {};
		$scope.toolbar.childState = 'Purchase Orders';
	    $scope.toolbar.searchAll = true;
		$scope.toolbar.items = [];
		$scope.toolbar.getItems = function(query){
			var results = query ? $filter('filter')($scope.toolbar.items, query) : $scope.toolbar.items;
			return results;
		}

		/* Refreshes the list */
		$scope.toolbar.refresh = function(){
			// start preloader
			Preloader.loading();
			$scope.init(true);
		};

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
			$scope.searchBar = false;
			$scope.toolbar.searchText = '';
	    	if($scope.purchaseOrder.searched){
	    		$scope.toolbar.refresh();
	    		$scope.purchaseOrder.searched = false;
	    	}
		};
		
		var pushItem = function(data){
		    var item = {};
			item.display = data.vendor.company;
			item.contact_person = data.vendor.contact_person;
			item.contact_number = data.vendor.contact_number;
			// format
			data.first_letter = data.vendor.company.charAt(0).toUpperCase();
			data.updated_at = new Date(data.updated_at);
			data.date_arrival = new Date(data.date_arrival);
			data.date_purchased = new Date(data.date_purchased);

			$scope.toolbar.items.push(item);

			return data;
	    }

		$scope.searchUserInput = function(){
			$scope.purchaseOrder.paginated.show = false;
			Preloader.loading();
			PurchaseOrder.search($scope.toolbar)
				.success(function(data){
					$scope.purchaseOrder.results = data;
					Preloader.stop();
					$scope.purchaseOrder.searched = true;
				})
				.error(function(data){
					Preloader.error();
				});
		};

		$scope.createPurchaseOrder = function(){
		    $state.go('main.create-purchase-order')
		}

		$scope.editPurchaseOrder = function(id){
		    $state.go('main.edit-purchase-order', {'purchaseOrderID':id});
		}

		$scope.deletePurchaseOrder = function(id){
			var confirm = $mdDialog.confirm()
		        .title('Delete')
		        .textContent('Are you sure you want to remove this purchase order?')
		        .ariaLabel('Delete')
		        .ok('Delete')
		        .cancel('Cancel');
		    $mdDialog.show(confirm).then(function() {
		    	PurchaseOrder.delete(id)
		    		.success(function(){
		    			$scope.toolbar.refresh();
		    			Preloader.deleted();
		    		})
		    		.error(function(){
		    			Preloader.error();
		    		})
		    }, function() {
		    	return;
		    });
		}

		$scope.assetTag = function(id){
			$state.go('main.asset-tag-purchase-order', {'purchaseOrderID' : id});
		}

		/**
		 * Object for fab
		 *
		*/
		$scope.fab = {};

		$scope.fab.icon = 'mdi-plus';
		$scope.fab.label = 'Purchase Order';

		$scope.fab.action = function(){
			$scope.createPurchaseOrder();			
		};

		$scope.init = function(refresh){
			$scope.purchaseOrder = {};
			// 2 is default so the next page to be loaded will be page 2 
			$scope.purchaseOrder.page = 2;

			PurchaseOrder.paginate()
				.success(function(data){
					$scope.purchaseOrder.details = data;
					$scope.purchaseOrder.paginated = data.data;
					$scope.purchaseOrder.paginated.show = true;

					if(data.data.length){
						// iterate over each record and set the date_purchased date and first letter
						angular.forEach(data.data, function(item){
							pushItem(item);
						});

						$scope.fab.show = true;
					}

					$scope.purchaseOrder.paginateLoad = function(){
						// kills the function if ajax is busy or pagination reaches last page
						if($scope.purchaseOrder.busy || ($scope.purchaseOrder.page > $scope.purchaseOrder.details.last_page)){
							return;
						}
						/**
						 * Executes pagination call
						 *
						*/
						// sets to true to disable pagination call if still busy.
						$scope.purchaseOrder.busy = true;

						// Calls the next page of pagination.
						PurchaseOrder.paginate($scope.purchaseOrder.page)
							.success(function(data){
								// increment the page to set up next page for next AJAX Call
								$scope.purchaseOrder.page++;

								// iterate over each data then splice it to the data array
								angular.forEach(data.data, function(item, key){
									pushItem(item);
									$scope.purchaseOrder.paginated.data.push(item);
								});

								// Enables again the pagination call for next call.
								$scope.purchaseOrder.busy = false;

							});
					}
					if(refresh){
						Preloader.stop();
						Preloader.stop();
					}
				})
				.error(function(){
					Preloader.error();
				});
		}

		$scope.init();
	}]);
adminModule
	.controller('settingsContentContainerController', ['$scope', '$state', '$filter', '$mdDialog', 'Preloader', 'Department', 'AssetType', 'User', 'Vendor', function($scope, $state, $filter, $mdDialog, Preloader, Department, AssetType, User, Vendor){
		/**
		  *
		  * Object for toolbar
		  *
		*/
		$scope.toolbar = {};
		$scope.toolbar.childState = 'Settings';
		$scope.toolbar.items = [];
		$scope.toolbar.getItems = function(query){
			var results = query ? $filter('filter')($scope.toolbar.items, query) : $scope.toolbar.items;
			return results;
		}
		$scope.showSearchBar = function(){
	    	$scope.searchBar = true;
	    }

	    $scope.hideSearchBar = function(){
	    	$scope.searchBar = false;
	    	$scope.toolbar.searchText = '';
	    }
		
		/**
		  *
		  * Object for subheader
		  *
		*/
		$scope.subheader = {};
		$scope.toolbar.refresh = function(){
			/* Reset the data */
			$scope.departments = [];
			$scope.asset_types = [];
			/* Starts the loading */
			Preloader.loading();
			$scope.init(true);
		}

		/**
		  *
		  * Department Actions
		*/

		$scope.createDepartment = function(){
			$mdDialog.show({
		    	controller: 'createDepartmentDialogController',
		      	templateUrl: '/app/components/admin/templates/dialogs/department-dialog.template.html',
		      	parent: angular.element(document.body),
		    })
	        .then(function() {
	        	$scope.toolbar.refresh();
	        }, function() {
	        	return;
	        });
		}

		$scope.editDepartment = function(id){
			Preloader.set(id);
			$mdDialog.show({
		    	controller: 'editDepartmentDialogController',
		      	templateUrl: '/app/components/admin/templates/dialogs/department-dialog.template.html',
		      	parent: angular.element(document.body),
		    })
	        .then(function() {
	        	$scope.toolbar.refresh();
	        	Preloader.toastChangesSaved();
	        }, function() {
	        	return;
	        });	
		}

		$scope.deleteDepartment = function(id){
			var confirm = $mdDialog.confirm()
		        .title('Delete')
		        .textContent('This department will be removed from the list.')
		        .ariaLabel('Delete department')
		        .ok('Delete')
		        .cancel('Cancel');

		    $mdDialog.show(confirm)
		    	.then(function() {
			    	Department.delete(id)
			    		.success(function(){
			    			$scope.toolbar.refresh();
			    			Preloader.deleted();
			    		})
			    		.error(function(){
			    			Preloader.error();
			    		});
			    }, function() {
			    	return;
			    });
		}

		/**
		  *
		  * AssetType Actions
		  *
		*/

		$scope.createAssetType = function(){
			$mdDialog.show({
		    	controller: 'createAssetTypeDialogController',
		      	templateUrl: '/app/components/admin/templates/dialogs/asset-type-dialog.template.html',
		      	parent: angular.element(document.body),
		    })
	        .then(function() {
	        	$scope.toolbar.refresh();
	        	$state.go($state.current, {}, {reload:true});
	        }, function() {
	        	return;
	        });
		}

		$scope.editAssetType = function(id){
			Preloader.set(id);
			$mdDialog.show({
		    	controller: 'editAssetTypeDialogController',
		      	templateUrl: '/app/components/admin/templates/dialogs/asset-type-dialog.template.html',
		      	parent: angular.element(document.body),
		    })
	        .then(function() {
	        	$scope.toolbar.refresh();
	        	$state.go($state.current, {}, {reload:true});
	        	Preloader.toastChangesSaved();
	        }, function() {
	        	return;
	        });	
		}

		$scope.deleteAssetType = function(id){
			var confirm = $mdDialog.confirm()
		        .title('Delete')
		        .textContent('This asset will be removed from the list.')
		        .ariaLabel('Delete Asset Type')
		        .ok('Delete')
		        .cancel('Cancel');

		    $mdDialog.show(confirm)
		    	.then(function() {
			    	AssetType.delete(id)
			    		.success(function(){
			    			$scope.toolbar.refresh();
			    			$state.go($state.current, {}, {reload:true});
			    			Preloader.deleted();
			    		})
			    		.error(function(){
			    			Preloader.error();
			    		});
			    }, function() {
			    	return;
			    });
		}

		/**
		  *
		  * Users Actions
		  *
		*/
		$scope.createUser = function(){
			$mdDialog.show({
		    	controller: 'createUserDialogController',
		      	templateUrl: '/app/components/admin/templates/dialogs/user-dialog.template.html',
		      	parent: angular.element(document.body),
		    })
	        .then(function(){
	        	$scope.toolbar.refresh();
	        	$state.go($state.current, {}, {reload:true});
	        }, function() {
	        	return;
	        });
		}

		$scope.resetPassword = function(id){
			var confirm = $mdDialog.confirm()
		        .title('Reset Password')
		        .textContent('Reset the password for this account?')
		        .ariaLabel('Reset Password')
		        .ok('Reset')
		        .cancel('Cancel');

		    $mdDialog.show(confirm)
		    	.then(function() {
			    	User.resetPassword(id)
			    		.success(function(){
			    			Preloader.toastChangesSaved();
			    		})
			    		.error(function(){
			    			Preloader.error();
			    		});
			    }, function() {
			    	return;
			    });
		}

		$scope.deleteAccount = function(id){
			var confirm = $mdDialog.confirm()
		        .title('Delete Account')
		        .textContent('This account will be removed permanently.')
		        .ariaLabel('Delete Account')
		        .ok('Delete')
		        .cancel('Cancel');

		    $mdDialog.show(confirm)
		    	.then(function() {
			    	User.delete(id)
			    		.success(function(){
			    			$scope.toolbar.refresh();
			    			$state.go($state.current, {}, {reload:true});
			    			Preloader.deleted();
			    		})
			    		.error(function(){
			    			Preloader.error();
			    		});
			    }, function() {
			    	return;
			    });
		}

		/**
		  *
		  * Vendor Actions
		  *
		*/

		$scope.createVendor = function(){
			$mdDialog.show({
		    	controller: 'createVendorDialogController',
		      	templateUrl: '/app/components/admin/templates/dialogs/vendor-dialog.template.html',
		      	parent: angular.element(document.body),
		    })
	        .then(function() {
	        	$scope.toolbar.refresh();
	        }, function() {
	        	return;
	        });
		}

		$scope.editVendor = function(id){
			Preloader.set(id);
			$mdDialog.show({
		    	controller: 'editVendorDialogController',
		      	templateUrl: '/app/components/admin/templates/dialogs/vendor-dialog.template.html',
		      	parent: angular.element(document.body),
		    })
	        .then(function() {
	        	$scope.toolbar.refresh();
	        	Preloader.toastChangesSaved();
	        }, function() {
	        	return;
	        });	
		}

		$scope.deleteVendor = function(id){
			var confirm = $mdDialog.confirm()
		        .title('Delete')
		        .textContent('This vendor will be removed from the list.')
		        .ariaLabel('Delete Vendor')
		        .ok('Delete')
		        .cancel('Cancel');

		    $mdDialog.show(confirm)
		    	.then(function() {
			    	Vendor.delete(id)
			    		.success(function(){
			    			$scope.toolbar.refresh();
			    			Preloader.deleted();
			    		})
			    		.error(function(){
			    			Preloader.error();
			    		});
			    }, function() {
			    	return;
			    });
		}

		/* sets the first letter and format the date to date object */
		var formatData = function(data)
		{
			angular.forEach(data, function(item){
				item.first_letter = item.name ? item.name.charAt(0).toUpperCase() : (item.type ? item.type.charAt(0).toUpperCase() : (item.first_name ? item.first_name.charAt(0).toUpperCase() : item.company.charAt(0).toUpperCase()) );
				item.created_at = new Date(item.created_at);
			});

			return data;
		}

		/**
		  *
		  * Initial data fetching
		  *
		*/
		$scope.init = function(refresh){
			Department.index()
				.then(function(data){
					// formats the data;
					formatData(data.data);
					
					$scope.departments = data.data;

					angular.forEach(data.data, function(item){
						var toolbarItem = {};
						toolbarItem.display = item.name;
						$scope.toolbar.items.push(toolbarItem);
					});

					return;
				})
				.then(function(){
					AssetType.index()
						.success(function(data){
							// formats the data;
							formatData(data.data);

							$scope.asset_types = data;

							angular.forEach(data.data, function(item){
								var toolbarItem = {};
								toolbarItem.display = item.type;
								$scope.toolbar.items.push(toolbarItem);
							});

							$scope.toolbar.getItems();

							return;
						})

				})
				.then(function(){
					User.others()
						.success(function(data){
							formatData(data.data);

							$scope.users = data;

							angular.forEach(data.data, function(item){
								var toolbarItem = {};
								toolbarItem.display = item.first_name;
								$scope.toolbar.items.push(toolbarItem);
							});

							return;
							
							if(refresh)
							{
								Preloader.stop();
								Preloader.stop();
							}
						})
						.error(function(){
							Preloader.error();
						});

				})
				.then(function(){
					Vendor.index()
						.success(function(data){
							formatData(data.data);

							angular.forEach(data.data, function(item){
								var toolbarItem = {};
								toolbarItem.display = item.company;
								$scope.toolbar.items.push(toolbarItem);
							});

							$scope.vendors = data;

							if(refresh)
							{
								Preloader.stop();
								Preloader.stop();
							}
						})

				}, function(){
					Preloader.error();
				});
		}

		/* execute initial data fetching */
		$scope.init();
	}]);
adminModule
	.controller('addWorkStationDialogController', ['$scope', '$stateParams', '$mdDialog', 'Preloader', 'WorkStation', function($scope, $stateParams, $mdDialog, Preloader, WorkStation){
		var busy = false;
		$scope.workStation = {};
		$scope.floors = [
			{'pattern':6, 'value':'06'},
			{'pattern':10, 'value': '10'},
		];
		$scope.divisions = ['A','B'];
		$scope.types = [
			{'pattern':'Admin', 'value':'A'},
			{'pattern':'Production', 'value': 'P'},
		];

		$scope.patterns = [
			{
				'pattern' : 'A06-A-A***',
				'value' :  'A06-A-A',
				'meaning': 'Aeon 6th Floor - Division A - Admin Station Number',
			},

			{
				'pattern' : 'A06-A-P***',
				'value' :  'A06-A-P',
				'meaning': 'Aeon 6th Floor - Division A - Production Station Number',
			},

			{
				'pattern' : 'A10-A-P***',
				'value' :  'A10-A-P',
				'meaning': 'Aeon 10th Floor - Division A - Production Station Number',
			},

			{
				'pattern' : 'A06-B-A***',
				'value' :  'A06-B-A',
				'meaning': 'Aeon 6th Floor - Division B - Admin Station Number',
			},


			{
				'pattern' : 'A06-B-P***',
				'value' :  'A06-B-P',
				'meaning': 'Aeon 6th Floor - Division B - Production Station Number',
			},
		];

		$scope.cancel = function(){
			$mdDialog.cancel();
		};

		$scope.submit = function(){
			if($scope.addWorkStationForm.$invalid){
				angular.forEach($scope.addWorkStationForm.$error, function(field){
					angular.forEach(field, function(errorField){
						errorField.$setTouched();
					});
				});
			}
			else{
				if(!busy){
					busy = true;
					/* Starts Preloader */
					Preloader.saving();
					/**
					 * Stores Single Record
					*/
					WorkStation.store($scope.workStation)
						.success(function(){
							// Stops Preloader 
							busy = false;
							Preloader.stop();
						})
						.error(function(){
							busy = false;
							Preloader.error();
						})
				}
			}
		};

	}]);
adminModule
	.controller('departmentWorkStationDialogController', ['$scope', '$mdDialog', 'Preloader', 'WorkStation', 'DepartmentWorkStation', 'Department', function($scope, $mdDialog, Preloader, WorkStation, DepartmentWorkStation, Department){
		var workStationID = Preloader.get();
		var busy = false;

		$scope.init = function(){
			Department.index()
				.then(function(data){
					$scope.departments = data.data;
					return;
				})
				.then(function(){			
					WorkStation.show(workStationID)
						.success(function(data){
							$scope.workStation = data;
							$scope.workStation.departments = [];
							DepartmentWorkStation.show(workStationID)
								.success(function(data){
									$scope.workStation.departments = data;
								})
						})
						.error(function(){
							Preloader.error();
						})
				}, function(){
					Preloader.error();
				});
		}();

		$scope.checkIP = function(){
			$scope.duplicate = false;
			WorkStation.checkIP(workStationID, $scope.workStation)
				.success(function(data){
					$scope.duplicate = data;
				})
				.error(function(){
					Preloader.error();
				})
		}

		$scope.cancel = function(){
			$mdDialog.cancel();
		};

		$scope.submit = function(){
			$scope.show = true;
			if($scope.workStationForm.$invalid){
				angular.forEach($scope.workStationForm.$error, function(field){
					angular.forEach(field, function(errorField){
						errorField.$setTouched();
					});
				});
			}
			else{
				if(!busy && !$scope.duplicate && $scope.workStation.departments.length)
				{
					busy = true;
					/* Starts Preloader */
					// Preloader.preload();
					/**
					 * Stores Single Record
					*/
					WorkStation.update(workStationID, $scope.workStation)
						.then(function(data){
							return data.data;
						})
						.then(function(data){
							if(!data){
								angular.forEach($scope.workStation.departments, function(item, key){
									item.work_station_id = workStationID;
								})

								DepartmentWorkStation.store($scope.workStation.departments)
									.success(function(){
										busy = false;
										Preloader.stop();
									})
									.error(function(){
										Preloader.error();
										busy = false;
									})

							}
							else{
								busy = false;
								// Preloader.stop();
							}

						}, function(){
							Preloader.error();
							busy = false;
						})
				}
			}
		};

	}]);
adminModule
	.controller('tagWorkStationDialogController', ['$scope', '$stateParams', '$mdDialog', 'Preloader', 'WorkStation', 'WorkStationTag', 'Department', function($scope, $stateParams, $mdDialog, Preloader, WorkStation, WorkStationTag, Department){
		var departmentID = $stateParams.departmentID;
		$scope.workStationTag = {};
		$scope.workStationTag.department_id = $stateParams.departmentID;

		$scope.divisions = [
			{'name':'Block A', 'value':'A'},
			{'name':'Block B', 'value':'B'},
		];

		$scope.types = [
			{'name':'Admin', 'value':'admin'},
			{'name':'Production', 'value':'production'},
		];		

		$scope.searchWorkStations = function(){

			WorkStation.vacant($scope.workStationTag)
				.success(function(data){
					$scope.workStations = data;
				})
				.error(function(){
					Preloader.error();
				});
		}

		Department.show(departmentID)
			.success(function(data){
				$scope.department = data;
			});

		$scope.cancel = function(){
			$mdDialog.cancel();
		};

		$scope.submit = function(){
			/* Starts Preloader */
			Preloader.preload();
			/**
			 * Stores Single Record
			*/
			WorkStationTag.store($scope.workStationTag)
				.success(function(){
					// Stops Preloader 
					Preloader.stop();
				})
				.error(function(){
					Preloader.error();
				})
		};

	}]);
adminModule
	.controller('workStationsContentContainerController', ['$scope', '$filter', '$state', '$mdDialog', 'Preloader', 'WorkStation', 'Department', function($scope, $filter, $state, $mdDialog, Preloader, WorkStation, Department){
		/**
		  *
		  * Object for toolbar
		  *
		*/
		$scope.toolbar = {};
		$scope.toolbar.childState = 'Work Stations';
	    $scope.toolbar.searchAll = true;
		$scope.toolbar.items = [];
		$scope.toolbar.getItems = function(query){
			var results = query ? $filter('filter')($scope.toolbar.items, query) : $scope.toolbar.items;
			return results;
		}

		/* Refreshes the list */
		$scope.toolbar.refresh = function(){
			$scope.rightSidenav.department = '';
			// start preloader
			Preloader.loading();
			$scope.init(true);
		};

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
			$scope.searchBar = false;
			$scope.toolbar.searchText = '';
	    	if($scope.workStation.searched){
	    		$scope.toolbar.refresh();
	    		$scope.workStation.searched = false;
	    	}
		};
		
		var pushItem = function(data, type){
		    var item = {};
			item.display = data.name;
			item.subItem = data.ip_address;
			// format
			data.first_letter = data.name.charAt(4).toUpperCase();
			data.updated_at = new Date(data.updated_at);

			$scope.toolbar.items.push(item);
	    }

		$scope.searchUserInput = function(){
			$scope.workStation.paginated.show = false;
			Preloader.loading();
			WorkStation.search($scope.toolbar)
				.success(function(data){
					angular.forEach(data, function(item){
						pushItem(item);
					})
					$scope.workStation.results = data;
					Preloader.stop();
					$scope.workStation.searched = true;
				})
				.error(function(data){
					Preloader.error();
				});
		};

		$scope.createWorkStation = function(){
		    $mdDialog.show({
		      	controller: 'addWorkStationDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-work-station-dialog.template.html',
		      	parent: angular.element($('body')),
		    })
		    .then(function(){
		    	/* Refreshes the list */
		    	$scope.toolbar.refresh();
		    });
		}

		$scope.show = function(id, count){
			if(!count){
				Preloader.set(id);
				$mdDialog.show({
			      	controller: 'departmentWorkStationDialogController',
				    templateUrl: '/app/components/admin/templates/dialogs/update-work-station-dialog.template.html',
			      	parent: angular.element($('body')),
			    })
			    .then(function(){
			    	Preloader.toastChangesSaved();
			    	$state.go('main.work-station', {'workStationID':id});
			    });
			}
			else{
				$state.go('main.work-station', {'workStationID':id});
			}
		}

		/**
		 * Object for fab
		 *
		*/
		$scope.fab = {};

		$scope.fab.icon = 'mdi-plus';
		$scope.fab.label = 'Work Station';

		$scope.fab.action = function(){
			$scope.createWorkStation();			
		};


		/**
		 * Object for rightSidenav
		 *
		*/
		$scope.rightSidenav = {};
		// hides right sidenav
		$scope.rightSidenav.show = true;

		$scope.filterWorkStation = function(data){
			$scope.rightSidenav.department = data;
		};

		$scope.init = function(refresh){
			Department.index()
				.then(function(data){
					angular.forEach(data.data, function(item){
						item.first_letter = item.name.charAt(0).toUpperCase();
					})

					$scope.departments = data.data;
					return;
				})
				.then(function(){
					$scope.charts = [
						{
							'labels': ['Occupied', 'Vacant'],
							'location': '6th Floor A',
							'data': [0,0],
						},
						{
							'labels': ['Occupied', 'Vacant'],
							'location': '6th Floor B',
							'data': [0,0],
						},
						{
							'labels': ['Occupied', 'Vacant'],
							'location': '10th Floor A',
							'data': [0,0],
						},
						{
							'labels': ['Occupied', 'Vacant'],
							'location': '10th Floor B',
							'data': [0,0],
						},
					];

					WorkStation.dashboard()
						.success(function(data){
							$scope.charts[0].data[0] = data.occupied_6FA_count;
							$scope.charts[0].data[1] = data.vacant_6FA_count;
							$scope.charts[1].data[0] = data.occupied_6FB_count;
							$scope.charts[1].data[1] = data.vacant_6FB_count;
							$scope.charts[2].data[0] = data.occupied_10FA_count;
							$scope.charts[2].data[1] = data.vacant_10FA_count;
							$scope.charts[3].data[0] = data.occupied_10FB_count;
							$scope.charts[3].data[1] = data.vacant_10FB_count;
						})
						.error(function(){
							Preloader.error();
						})
				})
				.then(function(){
					/**
					 * Object for Work Station
					 *
					*/
					$scope.workStation = {};
					$scope.workStation.paginated = [];
					// 2 is default so the next page to be loaded will be page 2 
					$scope.workStation.page = 2;

					WorkStation.paginate()
						.success(function(data){
							$scope.workStation.details = data;
							$scope.workStation.paginated = data.data;
							$scope.workStation.paginated.show = true;

							if(data.data.length){
								// iterate over each record and set the updated_at date and first letter
								angular.forEach(data.data, function(item){
									pushItem(item);
								});

								$scope.fab.show = true;
							}

							$scope.workStation.paginateLoad = function(){
								// kills the function if ajax is busy or pagination reaches last page
								if($scope.workStation.busy || ($scope.workStation.page > $scope.workStation.details.last_page)){
									return;
								}
								/**
								 * Executes pagination call
								 *
								*/
								// sets to true to disable pagination call if still busy.
								$scope.workStation.busy = true;

								// Calls the next page of pagination.
								WorkStation.paginate($scope.workStation.page)
									.success(function(data){
										// increment the page to set up next page for next AJAX Call
										$scope.workStation.page++;

										// iterate over each data then splice it to the data array
										angular.forEach(data.data, function(item, key){
											pushItem(item);
											$scope.workStation.paginated.push(item);
										});

										// Enables again the pagination call for next call.
										$scope.workStation.busy = false;

									});
							}
							if(refresh){
								Preloader.stop();
								Preloader.stop();
							}
						})
						.error(function(){
							Preloader.error();
						});
				})
		}

		$scope.init();
	}]);

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

	}]);
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

		$scope.checkDuplicate = function(){
			$scope.duplicate = false;
			Asset.checkDuplicate($scope.asset)
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

					Asset.store($scope.asset)
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

								AssetDetail.store($scope.details)
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
adminModule
	.controller('pullOutDetailsDialogController', ['$scope', '$mdDialog', 'AssetTag', 'Preloader', function($scope, $mdDialog, AssetTag, Preloader){
		var assetTagID = Preloader.get();
		
		$scope.cancel = function(){
			$mdDialog.cancel();
		};

		AssetTag.statuses(assetTagID)
			.success(function(data){
				angular.forEach(data.status, function(item){
					item.created_at = new Date(item.created_at);
				});

				$scope.assetTag = data;
				$scope.label = data.property_code;

				console.log($scope.assetTag);
			})
			.error(function(){
				Preloader.error();
			});
	}]);
adminModule
	.controller('activityDialogController', ['$scope', '$mdDialog', 'Activity', 'Preloader', function($scope, $mdDialog, Activity, Preloader){
		var activityID = Preloader.get();

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		Activity.show(activityID)
			.success(function(data){
				
				$scope.activity = data;
			})
			.error(function(){
				Preloader.error()
			});
	}]);
adminModule
	.controller('changePasswordDialogController', ['$scope', '$mdDialog', 'User', 'Preloader', function($scope, $mdDialog, User, Preloader){
		$scope.password = {};

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.checkPassword = function(){
			User.checkPassword($scope.password)
				.success(function(data){
					$scope.match = data;
					$scope.show = true;
					console.log($scope.match);
				});
		}

		$scope.submit = function(){
			$scope.showErrors = true;
			if($scope.changePasswordForm.$invalid){
				angular.forEach($scope.changePasswordForm.$error, function(field){
					angular.forEach(field, function(errorField){
						errorField.$setTouched();
					});
				});
			}
			else if($scope.password.old == $scope.password.new || $scope.password.new != $scope.password.confirm)
			{
				return;
			}
			else {
				Preloader.saving();

				User.changePassword($scope.password)
					.success(function(){
						Preloader.stop();
					})
					.error(function(){
						Preloader.error();
					});
			}
		}
	}]);
adminModule
	.controller('chartWeeklyDialogController', ['$scope', '$mdDialog', 'InventoryReport', 'Preloader', function($scope, $mdDialog, InventoryReport, Preloader){
		var chart = Preloader.get();

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		InventoryReport.chartWeekly(chart)
			.success(function(data){
				$scope.chart = data;
			})
			.error(function(){
				Preloader.error()
			});
	}]);
adminModule
	.controller('assetTagPurchaseOrderContentContainerController', ['$scope', '$filter', '$state', '$stateParams', '$mdDialog', 'PurchaseOrder', 'Preloader', 'AssetTag', function($scope, $filter, $state, $stateParams, $mdDialog, PurchaseOrder, Preloader, AssetTag){
		var purchaseOrderID = $stateParams.purchaseOrderID;
		/**
		  *
		  * Object for toolbar
		  *
		*/
		$scope.toolbar = {};
		$scope.toolbar.parentState = 'Purchase Order';
		$scope.toolbar.childState = 'Asset Tags';
	    $scope.toolbar.searchAll = false;
	    $scope.toolbar.showBack = true;
	    $scope.toolbar.back = function(){
	    	$state.go('main.purchase-orders');
	    }

		/* Refreshes the list */
		$scope.toolbar.refresh = function(){
			// start preloader
			Preloader.loading();
			$scope.init(true);
		}

		/**
		 * Object for fab
		 *
		*/
		$scope.fab = {};

		$scope.fab.icon = 'mdi-plus';
		$scope.fab.label = 'Asset Tag';
		$scope.fab.show = 'True';

		$scope.fab.action = function(){
			Preloader.set($scope.purchaseOrder);
			$mdDialog.show({
		      	controller: 'addPurchaseOrderAssetTagDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-purchase-order-asset-tag-dialog.template.html',
		      	parent: angular.element($('body')),
		    })
		    .then(function(){
		    	/* Refreshes the list */
		    	$scope.toolbar.refresh();
		    });			
		}

		$scope.editAssetTag = function(id){
			Preloader.set(id);
			$mdDialog.show({
		      	controller: 'editAssetTagDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/edit-asset-tag-dialog.template.html',
		      	parent: angular.element($('body')),
		    })
		    .then(function(){
		    	$scope.toolbar.refresh();
		    });
		};

		$scope.deleteAssetTag = function(id){
			var confirm = $mdDialog.confirm()
	        	.title('Delete')
	          	.content('Are you sure you want to delete this asset tag?')
	          	.ariaLabel('Delete Asset Tag')
	          	.ok('Delete')
	          	.cancel('Cancel');

	        $mdDialog.show(confirm).then(function() {
		      	AssetTag.delete(id)
		      		.success(function(){
		      			$scope.toolbar.refresh();
		      		})
		      		.error(function(){
		      			Preloader.error();
		      		});
		    }, function() {
		      	return;
		    });
		};

		$scope.init = function(refresh){
			$scope.purchaseOrder = null;

			PurchaseOrder.show(purchaseOrderID)
				.success(function(data){
					angular.forEach(data.asset_purchase_order, function(item){
						item.chart = {};
						item.chart.data = [];
						item.chart.labels = ['Tagged','Untagged'];
						// tagged
						item.chart.data[0] =  item.asset.asset_tags.length;
						// untagged
						item.chart.data[1] = item.quantity - item.asset.asset_tags.length;
					});

					data.date_arrival = new Date(data.date_arrival);
					data.date_purchased = new Date(data.date_purchased);

					angular.forEach(data.asset_purchase_order, function(asset_purchase_order){
						angular.forEach(asset_purchase_order.asset.asset_tags, function(asset_tag){
							asset_tag.warranty_end = asset_tag.warranty_end ? new Date(asset_tag.warranty_end) : null;
							asset_tag.date_received = asset_tag.date_received ? new Date(asset_tag.date_received) : null;
						});
					});

					$scope.purchaseOrder = data;

					if(refresh){
						Preloader.stop();
						Preloader.stop();
					}
				})
				.error(function(){
					Preloader.error();
				});
		}

		$scope.init();
	}]);
adminModule
	.controller('createAssetTypeDialogController', ['$scope', '$mdDialog', 'AssetType', 'Preloader', function($scope, $mdDialog, AssetType, Preloader){
		$scope.assetType = {};
		$scope.label = "New Asset";
		var busy = false;

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.checkAssetType = function(){
			$scope.duplicate = false;
			AssetType.checkAssetType($scope.assetType)
				.success(function(data){
					$scope.duplicate = data;
				})
				.error(function(){
					Preloader.error();
				})
		}

		$scope.submit = function(){
			if($scope.assetTypeForm.$invalid){
				angular.forEach($scope.assetTypeForm.$error, function(field){
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
					AssetType.store($scope.assetType)
						.success(function(data){
							if(!data)
							{
								// Stops Preloader 
								Preloader.stop();
								busy = false;
							}
						})
						.error(function(data){
							Preloader.error();
							busy = false;
						});
				}
			}
		}
	}]);
adminModule
	.controller('createDepartmentDialogController', ['$scope', '$mdDialog', 'Department', 'Preloader', function($scope, $mdDialog, Department, Preloader){
		$scope.department = {};
		$scope.label = "New Department";
		var busy = false;

		$scope.cancel = function(){
			$mdDialog.cancel();
		}


		$scope.checkDepartment = function(){
			$scope.duplicate = false;
			Department.checkDepartment($scope.department)
				.success(function(data){
					$scope.duplicate = data;
				})
				.error(function(){
					Preloader.error();
				})
		}

		$scope.submit = function(){
			if($scope.departmentForm.$invalid){
				angular.forEach($scope.departmentForm.$error, function(field){
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
					Department.store($scope.department)
						.success(function(data){
							if(!data){
								Preloader.stop();
								busy = false;
							}
						})
						.error(function(data){
							Preloader.error();
							busy = false;
						});
				}
			}
		}
	}]);
adminModule
	.controller('createUserDialogController', ['$scope', '$mdDialog', 'User', 'Preloader', function($scope, $mdDialog, User, Preloader){
		$scope.user = {};
		$scope.user.role = 'admin';
		var busy = false;

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.checkEmail = function(){
			$scope.duplicate = false;
			User.checkEmail($scope.user)
				.success(function(data){
					$scope.duplicate = data;
				})
				.error(function(){
					Preloader.error();
				})
		}

		$scope.submit = function(){
			$scope.showErrors = true;
			if($scope.userForm.$invalid){
				angular.forEach($scope.userForm.$error, function(field){
					angular.forEach(field, function(errorField){
						errorField.$setTouched();
					});
				});
			}
			else if($scope.user.password != $scope.user.password_confirmation || $scope.duplicate)
			{
				return;
			}
			else {
				if(!busy && !$scope.duplicate)
				{
					// Preloader.saving();
					busy = true;

					User.store($scope.user)
						.success(function(data){
							if(!data){
								Preloader.stop();
								busy = false;
							}
						})
						.error(function(){
							Preloader.error();
							busy = false;
						});
				}
			}
		}
	}]);
adminModule
	.controller('createVendorDialogController', ['$scope', '$mdDialog', 'Vendor', 'Preloader', function($scope, $mdDialog, Vendor, Preloader){
		$scope.vendor = {};
		$scope.label = "New Vendor";
		var busy = false;

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.submit = function(){
			if($scope.vendorForm.$invalid){
				angular.forEach($scope.vendorForm.$error, function(field){
					angular.forEach(field, function(errorField){
						errorField.$setTouched();
					});
				});
			}
			else{
				/* Starts Preloader */
				Preloader.loading();
				/**
				 * Stores Single Record
				*/
				if(!busy){
					busy = true;
					Vendor.store($scope.vendor)
						.success(function(){
							// Stops Preloader 
							Preloader.stop();
							busy = false;
						})
						.error(function(data){
							Preloader.error();
							busy = false;
						});
				}
			}
		}
	}]);
adminModule
	.controller('editAssetTypeDialogController', ['$scope', '$mdDialog', 'AssetType', 'Preloader', function($scope, $mdDialog, AssetType, Preloader){
		var assetTypeID = Preloader.get();	
		var busy = false;
		$scope.label = "Edit Asset";

		AssetType.show(assetTypeID)
			.success(function(data){
				$scope.assetType = data;
			})
			.error(function(){
				Preloader.error();
			})

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.checkAssetType = function(){
			$scope.duplicate = false;
			AssetType.checkAssetType($scope.assetType)
				.success(function(data){
					$scope.duplicate = data;
				})
				.error(function(){
					Preloader.error();
				})
		}

		$scope.submit = function(){
			if($scope.assetTypeForm.$invalid){
				angular.forEach($scope.assetTypeForm.$error, function(field){
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
					AssetType.update(assetTypeID, $scope.assetType)
						.success(function(data){
							if(!data){
								// Stops Preloader 
								Preloader.stop();
								busy = false;
							}
						})
						.error(function(){
							Preloader.error()
							busy = false;
						});
				}
			}
		}
	}]);
adminModule
	.controller('editDepartmentDialogController', ['$scope', '$mdDialog', 'Department', 'Preloader', function($scope, $mdDialog, Department, Preloader){
		var departmentID = Preloader.get();	
		var busy = false;
		$scope.label = "Edit Department";

		Department.show(departmentID)
			.success(function(data){
				$scope.department = data;
			})
			.error(function(){
				Preloader.error();
			})

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.checkDepartment = function(){
			$scope.duplicate = false;
			Department.checkDepartment($scope.department)
				.success(function(data){
					$scope.duplicate = data;
				})
				.error(function(){
					Preloader.error();
				})
		}

		$scope.submit = function(){
			if($scope.departmentForm.$invalid){
				angular.forEach($scope.departmentForm.$error, function(field){
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
					Department.update(departmentID, $scope.department)
						.success(function(data){
							if(!data){
								// Stops Preloader 
								Preloader.stop();
								busy = false;
							}
						})
						.error(function(){
							Preloader.error();
							busy = false;
						});
				}
			}
		}
	}]);
adminModule
	.controller('editVendorDialogController', ['$scope', '$mdDialog', 'Vendor', 'Preloader', function($scope, $mdDialog, Vendor, Preloader){
		var vendorID = Preloader.get();
		var busy = false;

		Vendor.show(vendorID)
			.success(function(data){
				$scope.vendor = data;
				$scope.label = data.company;
			})
			.error(function(){
				Preloader.error();
			});

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.submit = function(){
			if($scope.vendorForm.$invalid){
				angular.forEach($scope.vendorForm.$error, function(field){
					angular.forEach(field, function(errorField){
						errorField.$setTouched();
					});
				});
			}
			else{
				/* Starts Preloader */
				Preloader.loading();
				/**
				 * Stores Single Record
				*/
				if(!busy){
					busy = true;
					Vendor.update(vendorID, $scope.vendor)
						.success(function(){
							// Stops Preloader 
							Preloader.stop();
							busy = false;
						})
						.error(function(data){
							Preloader.error();
							busy = false;
						});
				}
			}
		}
	}]);
adminModule
	.controller('assetTagDetailsDialogController', ['$scope', '$mdDialog', 'Asset', 'Preloader', function($scope, $mdDialog, Asset, Preloader){
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
	}]);
adminModule
	.controller('createAssetTagDialogController', ['$scope', '$stateParams', '$mdDialog', 'Preloader', 'AssetTag', 'AssetType', 'Asset', 'AssetDetail', function($scope, $stateParams, $mdDialog, Preloader, AssetTag, AssetType, Asset, AssetDetail){
		$scope.assetTag = {};
		$scope.assetTag.warranty_end = new Date();
		$scope.assetTag.work_station_id = $stateParams.workStationID;
		
		$scope.minDate = new Date();
		$scope.hasWarranty = true;

		var busy = false;

		AssetType.index()
			.success(function(data){
				$scope.assetTypes = data;
			})
			.error(function(){
				Preloader.error();
			})

		$scope.getUniqueBrands = function(idx){
			$scope.brand = null;
			$scope.assetTag.asset_id = null;
			$scope.details = [];
			$scope.assetTag.sequence = null;
			$scope.duplicate = false;

			Asset.brands($scope.assetTypes[idx].id)
				.success(function(data){
					$scope.brands = data;
				})
				.error(function(){
					Preloader.error();
				})
		}

		$scope.getAssetDetails = function(id){
			$scope.checkSequence();
			AssetDetail.show(id)
				.success(function(data){
					$scope.details = data;
				})
				.error(function(){
					Preloader.error();
				});

			AssetTag.lastPropertyCode($scope.assetTag)
				.success(function(data){
					$scope.assetTag.lastPropertyCode = data.property_code;
				})
				.error(function(){
					Preloader.error();
				});
		}

		$scope.checkSequence = function(){
			$scope.duplicate = false;
			AssetTag.checkSequence($scope.assetTag)
				.success(function(data){
					$scope.duplicate = data;
				})
				.error(function(){
					Preloader.error();
				})
		}

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.submit = function(){
			if($scope.assetTagForm.$invalid){
				angular.forEach($scope.assetTagForm.$error, function(field){
					angular.forEach(field, function(errorField){
						errorField.$setTouched();
					});
				});
			}
			else{
				//  * Stores Single Record
				if(!busy && !$scope.duplicate){
					busy = true;
					$scope.assetTag.warranty_end = $scope.hasWarranty ? $scope.assetTag.warranty_end.toDateString() : null;
					AssetTag.store($scope.assetTag)
						.success(function(data){
							if(!data){
								Preloader.stop();
							}
							else{
								busy = false;
							}
						})
						.error(function(){
							Preloader.error();
						})
				}
			}
		}
	}]);
adminModule
	.controller('editAssetTagDialogController', ['$scope', '$stateParams', '$mdDialog', 'Preloader', 'AssetTag', 'Asset', 'AssetDetail', 'PurchaseOrder', function($scope, $stateParams, $mdDialog, Preloader, AssetTag, Asset, AssetDetail, PurchaseOrder){		
		var assetTagID = Preloader.get();
		$scope.hasWarranty = true;

		var busy = false;

		AssetTag.show(assetTagID)
			.success(function(data){
				data.warranty_end = data.warranty_end ? new Date(data.warranty_end) : new Date();
				data.date_received = data.date_received ? new Date(data.date_received) : new Date();
				$scope.minDateWarranty = data.purchase_order ? new Date(data.purchase_order.date_purchased) : null;
				$scope.minDatePurchaseOrder = data.purchase_order ? new Date(data.purchase_order.date_purchased) : null;
				$scope.hasPurchaseOrder = data.purchase_order_id ? true : false;
				
				$scope.assetTag = data;

				AssetTag.lastPropertyCode($scope.assetTag)
					.success(function(data){
						$scope.assetTag.lastPropertyCode = data.property_code;
					})
					.error(function(){
						Preloader.error();
					});

				Asset.purchaseOrders(data.asset_id)
					.success(function(data){
						$scope.purchaseOrders = data;
					})
					.error(function(){
						Preloader.error();
					});
			})


		$scope.checkSequence = function(){
			$scope.duplicate = false;
			AssetTag.checkSequence($scope.assetTag)
				.success(function(data){
					$scope.duplicate = data;
				})
				.error(function(){
					Preloader.error();
				})
		}

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.submit = function(){
			if($scope.assetTagForm.$invalid){
				angular.forEach($scope.assetTagForm.$error, function(field){
					angular.forEach(field, function(errorField){
						errorField.$setTouched();
					});
				});
			}
			else{
				//  * Stores Single Record
				
				if(!busy && !$scope.duplicate){
					$scope.assetTag.warranty_end = $scope.hasWarranty ? $scope.assetTag.warranty_end.toDateString() : null;
					$scope.assetTag.purchase_order_id = $scope.hasPurchaseOrder ? $scope.assetTag.purchase_order_id : null;
					$scope.assetTag.date_received = $scope.assetTag.date_received ? $scope.assetTag.date_received.toDateString() : null;
					AssetTag.update(assetTagID, $scope.assetTag)
						.success(function(data){
							if(!data){
								Preloader.stop();
							}
						})
						.error(function(){
							Preloader.error();
						})
				}
			}
		}
	}]);
adminModule
	.controller('editdepartmentWorkStationDialogController', ['$scope', '$mdDialog', 'Preloader', 'WorkStation', 'DepartmentWorkStation', 'Department', function($scope, $mdDialog, Preloader, WorkStation, DepartmentWorkStation, Department){
		var workStationID = Preloader.get();
		var busy = false;

		$scope.init = function(){
			Department.index()
				.then(function(data){
					$scope.departments = data.data;
					return;
				})
				.then(function(){			
					WorkStation.show(workStationID)
						.success(function(data){
							$scope.workStation = data;
							$scope.workStation.departments = [];

							angular.forEach($scope.departments, function(item, key){
								$scope.workStation.departments.push({'department_id':null});

								DepartmentWorkStation.relation(item.id, workStationID)
									.success(function(data){
										if(data){
											$scope.workStation.departments.splice(key, 1, data);
										}
									})
							});

						})
						.error(function(){
							Preloader.error();
						})
				}, function(){
					Preloader.error();
				});
		}();

		$scope.checkIP = function(){
			$scope.duplicate = false;
			WorkStation.checkIP(workStationID, $scope.workStation)
				.success(function(data){
					$scope.duplicate = data;
				})
				.error(function(){
					Preloader.error();
				})
		}

		$scope.cancel = function(){
			$mdDialog.cancel();
		};

		$scope.submit = function(){
			$scope.show = true;
			if($scope.workStationForm.$invalid){
				angular.forEach($scope.workStationForm.$error, function(field){
					angular.forEach(field, function(errorField){
						errorField.$setTouched();
					});
				});
			}
			else{
				if(!busy && !$scope.duplicate && $scope.workStation.departments.length)
				{
					busy = true;
					/* Starts Preloader */
					// Preloader.preload();
					/**
					 * Stores Single Record
					*/
					WorkStation.update(workStationID, $scope.workStation)
						.then(function(data){
							return data.data;
						})
						.then(function(data){
							if(!data){
								$scope.tags = 0;
								angular.forEach($scope.workStation.departments, function(item){
									if(item.department_id)
									{
										item.work_station_id = workStationID;
										$scope.tags+=1;
									}
								});

								if($scope.tags >= 1){
									DepartmentWorkStation.update(workStationID, $scope.workStation.departments)
										.success(function(){
											busy = false;
											Preloader.stop();
										})
										.error(function(){
											Preloader.error();
											busy = false;
										})
								}
								else{
									busy = false
								}


							}
							else{
								busy = false;
								// Preloader.stop();
							}

						}, function(){
							Preloader.error();
							busy = false;
						})
				}
			}
		};

	}]);
adminModule
	.controller('editWorkStationDialogController', ['$scope', '$stateParams', '$mdDialog', 'Preloader', 'WorkStation', function($scope, $stateParams, $mdDialog, Preloader, WorkStation){
		var busy = false;
		$scope.workStation = {};
		$scope.floors = [
			{'pattern':6, 'value':'06'},
			{'pattern':10, 'value': '10'},
		];
		$scope.divisions = ['A','B'];
		$scope.types = [
			{'pattern':'Admin', 'value':'A'},
			{'pattern':'Production', 'value': 'P'},
		];

		$scope.patterns = [
			{
				'pattern' : 'A06-A-A***',
				'value' :  'A06-A-A',
				'meaning': 'Aeon 6th Floor - Division A - Admin Station Number',
			},

			{
				'pattern' : 'A06-A-P***',
				'value' :  'A06-A-P',
				'meaning': 'Aeon 6th Floor - Division A - Production Station Number',
			},

			{
				'pattern' : 'A10-A-P***',
				'value' :  'A10-A-P',
				'meaning': 'Aeon 10th Floor - Division A - Production Station Number',
			},

			{
				'pattern' : 'A06-B-A***',
				'value' :  'A06-B-A',
				'meaning': 'Aeon 6th Floor - Division B - Admin Station Number',
			},


			{
				'pattern' : 'A06-B-P***',
				'value' :  'A06-B-P',
				'meaning': 'Aeon 6th Floor - Division B - Production Station Number',
			},
		];

		$scope.cancel = function(){
			$mdDialog.cancel();
		};

		$scope.submit = function(){
			if($scope.addWorkStationForm.$invalid){
				angular.forEach($scope.addWorkStationForm.$error, function(field){
					angular.forEach(field, function(errorField){
						errorField.$setTouched();
					});
				});
			}
			else{
				if(!busy){
					busy = true;
					/* Starts Preloader */
					Preloader.saving();
					/**
					 * Stores Single Record
					*/
					WorkStation.store($scope.workStation)
						.success(function(){
							// Stops Preloader 
							busy = false;
							Preloader.stop();
						})
						.error(function(){
							busy = false;
							Preloader.error();
						})
				}
			}
		};

	}]);
adminModule
	.controller('pullOutAssetTagDialogController', ['$scope', '$mdDialog', 'AssetTag', 'AssetDetail', 'AssetStatus', 'Preloader', 'WorkStation', function($scope, $mdDialog, AssetTag, AssetDetail, AssetStatus, Preloader, WorkStation){
		var assetTagID = Preloader.get();
		var busy = false;

		$scope.assetTagStatus = {};

		$scope.cancel = function(){
			$mdDialog.cancel();
		};
		
		AssetTag.show(assetTagID)
			.then(function(data){
				$scope.assetTag = data.data;
				$scope.assetTag.first_letter = data.data.asset.brand[0].toUpperCase();
				$scope.assetTagStatus.id = data.data.id;
				return data.data;
			})
			.then(function(assetTag){
				AssetDetail.show(assetTag.asset.id)
					.success(function(data){
						$scope.details = data;
					})
					.error(function(){
						Preloader.error();
					})
			}, function(){
				Preloader.error();
			})


		$scope.submit = function(){
			if($scope.assetTagForm.$invalid){
				angular.forEach($scope.assetTagForm.$error, function(field){
					angular.forEach(field, function(errorField){
						errorField.$setTouched();
					});
				});
			}
			else{
				//  * Stores Single Record
				Preloader.saving();
				
				if(!busy){
					busy = true;
					AssetStatus.store($scope.assetTagStatus)
						.success(function(){
							Preloader.stop();
							busy = false;
						})
						.error(function(){
							Preloader.error();
							busy = false;
						})
				}
			}
		}

	}]);
adminModule
	.controller('swapAssetTagDialogController', ['$scope', '$mdDialog', 'AssetTag', 'AssetDetail', 'Preloader', 'WorkStation', function($scope, $mdDialog, AssetTag, AssetDetail, Preloader, WorkStation){
		var assetTagID = Preloader.get();
		var busy = false;
		$scope.swap = {};

		$scope.floors = [6,10];
		$scope.divisions = ['A','B'];
		$scope.types = ['Admin','Production'];

		$scope.checkSwap = function(){
			AssetTag.checkSwap($scope.swap)
				.success(function(data){
					if(data.length){
						angular.forEach(data, function(item){
							item.first_letter = item.asset.brand[0].toUpperCase();
						});

						$scope.swapItems = data.length > 1 ? data : [];
						$scope.swap.asset_tag = data.length == 1 ? data[0] : null;
						$scope.match =  true;
					}
					else{
						$scope.swap.asset_tag = null;
						$scope.match =  false;
					}
				})
				.error(function(){
					Preloader.error();
				})
		}

		$scope.cancel = function(){
			$mdDialog.cancel();
		};
		
		AssetTag.show(assetTagID)
			.then(function(data){
				$scope.assetTag = data.data;
				$scope.assetTag.first_letter = data.data.asset.brand[0].toUpperCase();
				$scope.label = data.data.property_code;
				$scope.swap.asset_type_id = data.data.asset_type_id;
				return data.data;
			})
			.then(function(assetTag){
				AssetDetail.show(assetTag.asset.id)
					.success(function(data){
						$scope.details = data;
					})
					.error(function(){
						Preloader.error();
					})

				WorkStation.others(assetTag.work_station_id)
					.success(function(data){
						$scope.workStations = data;
						return;
					})
					.error(function(){
						Preloader.error();
					})
			}, function(){
				Preloader.error();
			})


		$scope.submit = function(){
			if($scope.assetTagForm.$invalid){
				angular.forEach($scope.assetTagForm.$error, function(field){
					angular.forEach(field, function(errorField){
						errorField.$setTouched();
					});
				});
			}
			else{
				if(!busy && $scope.match){
					//  * Stores Single Record
					Preloader.saving();
					busy = true;
					AssetTag.swap(assetTagID, $scope.swap.asset_tag)
						.success(function(){
							Preloader.stop();
							busy = false;
						})
						.error(function(){
							Preloader.error();
							busy = false;
						})
				}
			}
		}

	}]);
adminModule
	.controller('tagUsersWorkStationDialogController', ['$scope', '$stateParams', '$mdDialog', 'Preloader', 'Employee', 'EmployeeTag', 'AssetTagService', function($scope, $stateParams, $mdDialog, Preloader, Employee, EmployeeTag, AssetTagService){
		$scope.workStation = AssetTagService.getStation();
		$scope.employee_tag = {};
		$scope.employee_tag.work_station_id = $stateParams.workStationID;

		Employee.department($stateParams.departmentID)
			.success(function(data){
				$scope.employees = data;
			});

		$scope.cancel = function(){
			$mdDialog.cancel();
		};

		$scope.submit = function(){
			Preloader.preload();
			EmployeeTag.store($scope.employee_tag)
				.success(function(){
					//
				})
				.error(function(){
					Preloader.error();
				})
		};
	}]);
adminModule
	.controller('transferAssetTagDialogController', ['$scope', '$mdDialog', 'AssetTag', 'AssetDetail', 'Preloader', 'WorkStation', function($scope, $mdDialog, AssetTag, AssetDetail, Preloader, WorkStation){
		var assetTagID = Preloader.get();
		var busy = false;
		$scope.transfer = {};

		$scope.floors = [6,10];
		$scope.divisions = ['A','B'];
		$scope.types = ['Admin','Production'];

		
		$scope.cancel = function(){
			$mdDialog.cancel();
		};

		
		AssetTag.show(assetTagID)
			.then(function(data){
				$scope.assetTag = data.data;
				$scope.assetTag.first_letter = data.data.asset.brand[0].toUpperCase();
				$scope.label = data.data.property_code;
				return data.data;
			})
			.then(function(assetTag){
				AssetDetail.show(assetTag.asset.id)
					.success(function(data){
						$scope.details = data;
					})
					.error(function(){
						Preloader.error();
					})

				WorkStation.others(assetTag.work_station_id)
					.success(function(data){
						$scope.workStations = data;
						return;
					})
					.error(function(){
						Preloader.error();
					})
			}, function(){
				Preloader.error();
			})


		$scope.submit = function(){
			if($scope.assetTagForm.$invalid){
				angular.forEach($scope.assetTagForm.$error, function(field){
					angular.forEach(field, function(errorField){
						errorField.$setTouched();
					});
				});
			}
			else{
				//  * Stores Single Record
				Preloader.saving();

				if(!busy){
					busy = true;
					AssetTag.transfer(assetTagID, $scope.transfer)
						.success(function(){
							Preloader.stop();
							busy = false;
						})
						.error(function(){
							Preloader.error();
							busy = false;
						})
				}
			}
		}

	}]);
adminModule
	.controller('transferUsersDialogController', ['$scope', '$stateParams', '$mdDialog', 'Preloader', 'EmployeeTag', 'WorkStation', 'UserService', function($scope, $stateParams, $mdDialog, Preloader, EmployeeTag, WorkStation, UserService){
		$scope.employee_tag = {};
		$scope.employee_tag.employee_tag_id = UserService.get();

		WorkStation.department($stateParams.departmentID, $stateParams.workStationID)
			.success(function(data){
				$scope.workStations = data;
			});

		EmployeeTag.show($scope.employee_tag.employee_tag_id)
			.success(function(data){
				$scope.employee = data;
				$scope.employee_tag.employee_id = data.id;
			});

		$scope.cancel = function(){
			$mdDialog.cancel();
		};

		$scope.submit = function(){
			Preloader.preload();
			EmployeeTag.update($scope.employee_tag.employee_tag_id, $scope.employee_tag)
				.success(function(){
					//
				})
				.error(function(){
					Preloader.error();
				})
		};
	}]);
adminModule
	.controller('usersWorkStationDialogController', ['$scope', '$stateParams', '$mdDialog', 'Preloader', 'Employee', 'AssetTagService', function($scope, $stateParams, $mdDialog, Preloader, Employee, AssetTagService){
		$scope.workStation = AssetTagService.getStation();

		Employee.workstation($stateParams.workStationID)
			.success(function(data){
				$scope.show = true;
				$scope.employees = data;
			});

		$scope.cancel = function(){
			$mdDialog.cancel();
		};

		$scope.tag = function(){
			$mdDialog.hide();
		};

		$scope.transfer = function(id){
			$mdDialog.hide(id);
		}
	}]);
adminModule
	.controller('workStationContentContainerController', ['$scope', '$filter', '$state', '$stateParams', '$mdDialog', 'Preloader', 'WorkStation', 'AssetTag', function($scope, $filter, $state, $stateParams, $mdDialog, Preloader, WorkStation, AssetTag){
		var workStationID = $stateParams.workStationID;

		/**
		  *
		  * Object for toolbar
		  *
		*/
		$scope.toolbar = {};
		$scope.toolbar.parentState = 'Work Stations';
	    // $scope.toolbar.searchAll = true;
		$scope.toolbar.items = [];
		$scope.toolbar.showBack = true;
		$scope.toolbar.back = function(){
			$state.go('main.work-stations');
		}
		$scope.toolbar.getItems = function(query){
			var results = query ? $filter('filter')($scope.toolbar.items, query) : $scope.toolbar.items;
			return results;
		}

		$scope.toolbar.refresh = function(){
			Preloader.loading();
			$scope.init(true);
		};

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
			$scope.searchBar = false;
			$scope.toolbar.searchText = '';
	    	if($scope.workStation.searched){
	    		$scope.toolbar.refresh();
	    		$scope.workStation.searched = false;
	    	}
		};

		$scope.rightSidenav = {};
		$scope.rightSidenav.show = true;

		$scope.editDepartmentWorkStation = function(){
			Preloader.set(workStationID);
			$mdDialog.show({
		      	controller: 'editdepartmentWorkStationDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/edit-update-work-station-dialog.template.html',
		      	parent: angular.element($('body')),
		    })
		    .then(function(){
		    	$scope.toolbar.refresh();
		    })
		}

		$scope.createAssetTag = function(){
			$mdDialog.show({
		      	controller: 'createAssetTagDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/create-asset-tag-dialog.template.html',
		      	parent: angular.element($('body')),
		    })
		    .then(function(){
		    	$scope.toolbar.refresh();
		    })
		}

		/**
		 * Object for fab
		 *
		*/
		$scope.fab = {};

		$scope.fab.icon = 'mdi-plus';
		$scope.fab.label = 'Add';
		$scope.fab.tooltip = 'Add Asset';
		// $scope.fab.show = true;

		$scope.fab.action = function(){
		    $scope.createAssetTag();
		};


		$scope.editAssetTag = function(id){
			Preloader.set(id);
			$mdDialog.show({
		      	controller: 'editAssetTagDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/edit-asset-tag-dialog.template.html',
		      	parent: angular.element($('body')),
		    })
		    .then(function(){
		    	$scope.toolbar.refresh();
		    });
		};

		$scope.transferAssetTag = function(id){
			Preloader.set(id);
			$mdDialog.show({
		      	controller: 'transferAssetTagDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/transfer-asset-tag-dialog.template.html',
		      	parent: angular.element($('body')),
		    })
		    .then(function(){
		    	$scope.toolbar.refresh();
		    });
		};

		$scope.swapAssetTag = function(id){
			Preloader.set(id);
			$mdDialog.show({
		      	controller: 'swapAssetTagDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/swap-asset-dialog.template.html',
		      	parent: angular.element($('body')),
		    })
		    .then(function(){
		    	$scope.toolbar.refresh();
		    });
		};

		$scope.pullOutAssetTag = function(id){
			Preloader.set(id);
			$mdDialog.show({
		      	controller: 'pullOutAssetTagDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/pull-out-asset-dialog.template.html',
		      	parent: angular.element($('body')),
		    })
		    .then(function(){
		    	$scope.toolbar.refresh();
		    });
		};

		$scope.deleteAssetTag = function(id){
			var confirm = $mdDialog.confirm()
	        	.title('Delete')
	          	.content('Are you sure you want to delete this asset tag?')
	          	.ariaLabel('Delete Asset Tag')
	          	.ok('Delete')
	          	.cancel('Cancel');

	        $mdDialog.show(confirm).then(function() {
		      	AssetTag.delete(id)
		      		.success(function(){
		      			$scope.toolbar.refresh();
		      		})
		      		.error(function(){
		      			Preloader.error();
		      		});
		    }, function() {
		      	return;
		    });
		};

		$scope.showDetails = function(id){
			Preloader.set(id);
			$mdDialog.show({
		      	controller: 'assetTagDetailsDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/asset-tag-details-dialog.template.html',
		      	parent: angular.element($('body')),
		      	clickOutsideToClose:true,
		    })
		}

		$scope.purchaseOrder = function(id){
			$state.go('main.asset-tag-purchase-order', {'purchaseOrderID':id});
		}

		$scope.init = function(refresh){
			WorkStation.show(workStationID)
				.success(function(data){

					angular.forEach(data.asset_tags, function(item){
						var asset_tags = {};

						asset_tags.display = item.property_code;
						asset_tags.brand = item.asset.brand;
						asset_tags.model = item.asset.model;
						asset_tags.type = item.asset.type;

						$scope.toolbar.items.push(asset_tags);
					})

					if(!data.departments.length)
					{
						Preloader.set(workStationID);
						$mdDialog.show({
					      	controller: 'editdepartmentWorkStationDialogController',
						    templateUrl: '/app/components/admin/templates/dialogs/edit-update-work-station-dialog.template.html',
					      	parent: angular.element($('body')),
					    })
					    .then(function(){
					    	$scope.toolbar.refresh();
					    }, function(){
					    	$state.go('main.work-stations');
					    })
					}

					angular.forEach(data.asset_tags , function(item){
						item.warranty_end =  item.warranty_end ? new Date(item.warranty_end) : null;
						item.first_letter = item.asset.brand.charAt(0).toUpperCase();
					})

					$scope.workStation = data;

					if(data.asset_tags.length)
					{
						$scope.fab.show = true;
					}

					$scope.toolbar.childState = data.name;
					if(refresh){
						Preloader.stop();
						Preloader.stop();
					}

					$scope.show = true;

				})
				.error(function(){
					Preloader.error();
				})
		}

		$scope.init();
	}]);

adminModule
	.controller('addPurchaseOrderAssetTagDialogController', ['$scope', '$stateParams', '$mdDialog', 'Preloader', 'AssetTag', 'Asset', 'AssetDetail', 'WorkStation', function($scope, $stateParams, $mdDialog, Preloader, AssetTag, Asset, AssetDetail, WorkStation){		
		$scope.purchaseOrder = Preloader.get();
		$scope.hasWarranty = true;
		$scope.deploy = true;
		$scope.assetTag = {};
		$scope.assetTag.purchase_order_id = $scope.purchaseOrder.id;
		$scope.assetTag.warranty_end = new Date();
		$scope.assetTag.date_received = new Date();
		$scope.assetTag.max_date = new Date();
		$scope.maxDatePurchaseOrder = new Date();
		$scope.minDatePurchaseOrder = new Date($scope.purchaseOrder.date_purchased);

		$scope.floors = [6,10];
		$scope.divisions = ['A','B'];
		$scope.types = ['Admin','Production'];

		var busy = false;

		WorkStation.index()
			.success(function(data){
				$scope.workStations = data;
			})
			.error(function(){
				Preloader.error();
			})

		$scope.checkSequence = function(){
			$scope.duplicate = false;
			AssetTag.checkSequence($scope.assetTag)
				.success(function(data){
					$scope.duplicate = data;
				})
				.error(function(){
					Preloader.error();
				})
		}

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.checkLastPropertyCode = function(){		
			AssetTag.lastPropertyCode($scope.assetTag)
				.success(function(data){
					$scope.assetTag.lastPropertyCode = data.property_code;
				})
				.error(function(){
					Preloader.error();
				});
		}

		$scope.submit = function(){
			if($scope.assetTagForm.$invalid){
				angular.forEach($scope.assetTagForm.$error, function(field){
					angular.forEach(field, function(errorField){
						errorField.$setTouched();
					});
				});
			}
			else{
				//  * Stores Single Record
				
				if(!busy && !$scope.duplicate){
					$scope.assetTag.warranty_end = $scope.hasWarranty ? $scope.assetTag.warranty_end.toDateString() : null;
					$scope.assetTag.date_received = $scope.assetTag.date_received ? $scope.assetTag.date_received.toDateString() : null;
					$scope.assetTag.work_station_id = $scope.deploy ? $scope.assetTag.work_station_id : null;
					AssetTag.store($scope.assetTag)
						.success(function(data){
							if(!data){
								Preloader.stop();
							}
						})
						.error(function(){
							Preloader.error();
						})
				}
			}
		}
	}]);
//# sourceMappingURL=admin.js.map
