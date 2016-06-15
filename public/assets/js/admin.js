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

		$scope.toolbar.refresh = function(){
			/* Starts the loading */
			Preloader.loading();
			$scope.init(true);
		}

		$scope.showSearchBar = function(){
	    	$scope.searchBar = true;
	    }

	    $scope.hideSearchBar = function(){
	    	$scope.searchBar = false;
	    	$scope.toolbar.searchText = '';
	    	if($scope.asset.searched){
	    		$scope.toolbar.refresh();
	    		$scope.asset.searched = false;
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

	    var pushItem = function(data, type){
	    	if(type == 'asset'){
			    var item = {};
				item.display = data.brand;
				item.subItem = data.model;
				// format
				data.first_letter = data.brand.charAt(0).toUpperCase();
				data.updated_at = new Date(data.updated_at);
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
			Preloader.loading();
			$scope.toolbar.items = [];
			Asset.search($scope.toolbar)
				.success(function(data){
					angular.forEach(data, function(item){
						// pushItem(item);
					});
					
					$scope.asset.results = data;
					$scope.asset.searched = true;
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
				}, function(){
					Preloader.error();
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
	.controller('mainContentContainerController', ['$scope', '$state', '$mdDialog', 'Preloader', function($scope, $state, $mdDialog, Preloader){
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

		/**
		 * Object for subheader
		 *
		*/
		$scope.subheader = {};

		$scope.subheader.download = function(){
			// start preloader
			Preloader.preload();

			EmailReport.index()
				.success(function(){
					Preloader.stop();
				});
		};

		$scope.subheader.barcode = function(){
			$mdDialog.show({
		    	controller: 'barcodeDialogController',
		      	templateUrl: '/app/components/admin/templates/dialogs/barcode-dialog.template.html',
		      	parent: angular.element(document.body),
		    });
		}

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
			WorkStation.show(workStationID)
				.success(function(data){
					$scope.workStation = data;
					$scope.workStation.departments = [];		
				})
				.error(function(){
					Preloader.error();
				});

			Department.index()
				.success(function(data){
					$scope.departments = data;
				})
				.error(function(){
					Preloader.error();
				})
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
								angular.forEach($scope.workStation.departments, function(item){
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

					WorkStation.index()
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
											$scope.workStation.paginated.data.push(item);
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
	.controller('addDesktopDialogController', ['$scope', '$state', '$mdDialog', 'Preloader', 'Desktop', function($scope, $state, $mdDialog, Preloader, Desktop){
		$scope.cpu = {};

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

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
		}

	}]);
adminModule
	.controller('cpuContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'Desktop', function($scope, $state, $stateParams, $mdDialog, Preloader, Desktop){
		/**
		 * Object for subheader
		 *
		*/
		$scope.subheader = {};
		$scope.subheader.state = 'assets';

		/* Refreshes the list */
		$scope.subheader.refresh = function(){
			// start preloader
			Preloader.preload();
			// clear desktop
			$scope.desktop.paginated = {};
			$scope.desktop.page = 2;
			Desktop.paginate()
				.then(function(data){
					$scope.desktop.paginated = data.data;
					$scope.desktop.paginated.show = true;
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
		$scope.fab.tooltip = 'Add CPU';
		$scope.fab.show = true;

		$scope.fab.action = function(){
		    $mdDialog.show({
		      	controller: 'addDesktopDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-cpu-dialog.template.html',
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
		 * Object for Desktop
		 *
		*/
		$scope.desktop = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.desktop.page = 2;
		//

		Desktop.paginate()
			.then(function(data){
				$scope.desktop.paginated = data.data;
				$scope.desktop.paginated.show = true;

				$scope.desktop.paginateLoad = function(){
					// kills the function if ajax is busy or pagination reaches last page
					if($scope.desktop.busy || ($scope.desktop.page > $scope.desktop.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.desktop.busy = true;

					// Calls the next page of pagination.
					Desktop.paginate($scope.desktop.page)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.desktop.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.desktop.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.desktop.busy = false;
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
			$scope.desktop.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.desktop.paginated.show = false;
			Preloader.preload()
			Desktop.search($scope.desktop)
				.success(function(data){
					$scope.desktop.results = data;
					Preloader.stop();
				})
				.error(function(data){
					Preloader.error();
				});
		};

		$scope.show = function(id){
			$state.go('main.units', {'assetID': $stateParams.assetID, 'unitID':id});
		};
	}]);

adminModule
	.controller('cpuContentController', ['$scope', function($scope){
		
	}])
adminModule
	.controller('cpuRightSidenavController', ['$scope', function($scope){
		//
	}])
adminModule
	.controller('cpuToolbarController', ['$scope', 'Desktop', function($scope, Desktop){
		/**
		 *  Object for toolbar view.
		 *
		*/
		$scope.toolbar = {};
		
		/**
		 * Properties of toolbar.
		 *
		*/
		$scope.toolbar.parentState = 'Assets';
		$scope.toolbar.childState = 'CPU';

		/**
		 * Search database and look for user input depending on state.
		 *
		*/
	}]);
adminModule
	.controller('cpuUnitContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'AssetTag', function($scope, $state, $stateParams, $mdDialog, Preloader, AssetTag){
		var unitID = $stateParams.unitID;
		var query = {};

		query.component_id = unitID;
		query.component_type = 'Desktop';

		/**
		 * Object for subheader
		 *
		*/
		$scope.subheader = {};
		$scope.subheader.state = 'units';

		/* Refreshes the list */
		$scope.subheader.activeUnit = function(){
			// start preloader
			Preloader.preload();
			// clear desktop
			$scope.desktop.paginated = {};
			$scope.desktop.results = null;
			$scope.desktop.page = 2;
			AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.desktop.paginated = data.data;
				$scope.desktop.paginated.show = true;

				$scope.desktop.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.desktop.busy || ($scope.desktop.page > $scope.desktop.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.desktop.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.desktop.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.desktop.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.desktop.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.desktop.busy = false;
						});
				}
				Preloader.stop();
			}, function(){
				Preloader.error();
			});
		};

		/* Refreshes the list and change it to repair */
		$scope.subheader.repairUnit = function(){
			// start preloader
			Preloader.preload();
			// clear desktop
			$scope.desktop.paginated = {};
			$scope.desktop.results = null;
			$scope.desktop.page = 2;
			AssetTag.repairUnit(1, query)
			.then(function(data){
				$scope.listType = 'Under Repair'
				$scope.desktop.paginated = data.data;
				$scope.desktop.paginated.show = true;

				$scope.desktop.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.desktop.busy || ($scope.desktop.page > $scope.desktop.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.desktop.busy = true;

					// Calls the next page of pagination.
					AssetTag.repairUnit($scope.desktop.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.desktop.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.desktop.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.desktop.busy = false;
						});
				}
				Preloader.stop();
			}, function(){
				Preloader.error();
			});
		};

		/* Refreshes the list and change it to repair */
		$scope.subheader.disposeUnit = function(){
			// start preloader
			Preloader.preload();
			// clear desktop
			$scope.desktop.paginated = {};
			$scope.desktop.results = null;
			$scope.desktop.page = 2;
			AssetTag.disposeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Disposed'
				$scope.desktop.paginated = data.data;
				$scope.desktop.paginated.show = true;

				$scope.desktop.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.desktop.busy || ($scope.desktop.page > $scope.desktop.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.desktop.busy = true;

					// Calls the next page of pagination.
					AssetTag.disposeUnit($scope.desktop.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.desktop.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.desktop.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.desktop.busy = false;
						});
				}
				Preloader.stop();
			}, function(){
				Preloader.error();
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
		 * Object for Desktop
		 *
		*/
		$scope.desktop = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.desktop.page = 2;
		// 
		
		AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.desktop.paginated = data.data;
				$scope.desktop.paginated.show = true;

				$scope.desktop.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.desktop.busy || ($scope.desktop.page > $scope.desktop.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.desktop.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.desktop.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.desktop.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.desktop.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.desktop.busy = false;
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
			$scope.desktop.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.desktop.paginated.show = false;
			Preloader.preload();
			var query = {};
			query.userInput = $scope.desktop.userInput;
			query.component_id = unitID;
			query.component_type = 'Desktop';
			query.table_name = 'desktops';
			query.property_code = 'PCPU';
			AssetTag.search(query)
				.success(function(data){
					$scope.desktop.results = data;
					Preloader.stop();
				})
				.error(function(data){
					Preloader.error();
				});
		};

		$scope.repaired = function(id){
			var confirm = $mdDialog.confirm()
		        .title('Would you like to include components under this unit?')
		        .content('Hard disk(s), RAM(s), video card, and softwares will be marked as repaired along with the unit.')
		        .ok('Continue')
		        .cancel('Keep it');
		    $mdDialog.show(confirm)
		    	.then(function() {
			      	Preloader.preload();
					AssetTag.active(id)
						.success(function(data){
							AssetTag.activeComponents(data.work_station_id)
								.success(function(){
									$scope.subheader.repairUnit();
								})
								.error(function(){
									Preloader.error();
								});
						})
						.error(function(){
							Preloader.error();
						});
			    }, function() {
			    	Preloader.preload();
				    AssetTag.active(id)
						.success(function(){
							$scope.subheader.repairUnit();
						})
						.error(function(){
							Preloader.error();
						});
			    });
		}

		$scope.dispose = function(id){
			AssetTag.dispose(id)
				.success(function(){
					$scope.subheader.repairUnit();
				})
				.error(function(){
					Preloader.error();
				});
		}

		$scope.show = function(departmentID, workStationID){
			$state.go('main.work-station', {'departmentID': departmentID, 'workStationID':workStationID})
		}
	}]);

adminModule
	.controller('cpuUnitContentController', ['$scope', function($scope){
		
	}])
adminModule
	.controller('cpuUnitRightSidenavController', ['$scope', '$state', '$stateParams', 'Desktop', function($scope, $state, $stateParams, Desktop){
		$scope.asset = 'CPU';

		Desktop.other($stateParams.unitID)
			.success(function(data){
				$scope.others = data;
			});

		$scope.show = function(id){
			$state.go('main.units', {'assetID': $stateParams.assetID, 'unitID': id});
		};
	}]);
adminModule
	.controller('cpuUnitToolbarController', ['$scope', '$state', '$stateParams', 'Desktop', function($scope, $state, $stateParams, Desktop){
		/**
		 *  Object for toolbar view.
		 *
		*/
		$scope.toolbar = {};
		
		/**
		 * Properties of toolbar.
		 *
		*/

		$scope.toolbar.showBack = true;

		$scope.toolbar.back = function(){
			$state.go('main.assets', {'assetID': $stateParams.assetID});
		};

		Desktop.show($stateParams.unitID)
			.success(function(data){
				$scope.toolbar.parentState = data.brand;
				$scope.toolbar.childState = data.model;
			})
			.error(function(){
				Preloader.error();
			});

		/**
		 * Search database and look for user input depending on state.
		 *
		*/
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
	.controller('createAssetTypeDialogController', ['$scope', '$mdDialog', 'AssetType', 'Preloader', function($scope, $mdDialog, AssetType, Preloader){
		$scope.assetType = {};
		$scope.label = "New Asset";
		var busy = false;

		$scope.cancel = function(){
			$mdDialog.cancel();
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
				Preloader.loading();
				/**
				 * Stores Single Record
				*/
				if(!busy){
					busy = true;
					AssetType.store($scope.assetType)
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
	.controller('createDepartmentDialogController', ['$scope', '$mdDialog', 'Department', 'Preloader', function($scope, $mdDialog, Department, Preloader){
		$scope.department = {};
		$scope.label = "New Department";
		var busy = false;

		$scope.cancel = function(){
			$mdDialog.cancel();
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
				Preloader.loading();
				/**
				 * Stores Single Record
				*/
				if(!busy){
					busy = true;
					Department.store($scope.department)
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
	.controller('createUserDialogController', ['$scope', '$mdDialog', 'User', 'Preloader', function($scope, $mdDialog, User, Preloader){
		$scope.user = {};
		$scope.user.role = 'admin';

		$scope.cancel = function(){
			$mdDialog.cancel();
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
			else if($scope.user.password != $scope.user.password_confirmation)
			{
				return;
			}
			else {
				Preloader.saving();

				User.store($scope.user)
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
				Preloader.loading();
				/**
				 * Stores Single Record
				*/
				if(!busy){
					busy = true;
					AssetType.update(assetTypeID, $scope.assetType)
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
				Preloader.loading();
				/**
				 * Stores Single Record
				*/
				if(!busy){
					busy = true;
					Department.update(departmentID, $scope.department)
						.success(function(){
							// Stops Preloader 
							Preloader.stop();
							busy = false;
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
	.controller('addAssetDialogController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'WorkStation', 'AssetTag', 'AssetTagService', 'Desktop', 'HardDisk', 'Headset', 'Keyboard', 'Memory', 'Monitor', 'Mouse', 'Software', 'UPS', 'VideoCard', 'OtherComponent', function($scope, $state, $stateParams, $mdDialog, Preloader, WorkStation, AssetTag, AssetTagService, Desktop, HardDisk, Headset, Keyboard, Memory, Monitor, Mouse, Software, UPS, VideoCard, OtherComponent){
		var workStationID = $stateParams.workStationID;
		$scope.workStation = AssetTagService.getStation();
			
		$scope.components = [
			{'name': 'CPU', 'value': 'Desktop'},
			{'name': 'Firewall', 'value':'Firewall'},
			{'name': 'Hard Disk', 'value':'Hard Disk'},
			{'name': 'Headset', 'value':'Headset'},
			{'name': 'Keyboard', 'value':'Keyboard'},
			{'name': 'Mac', 'value':'Mac'},
			{'name': 'Memory', 'value':'Memory'},
			{'name': 'Monitor', 'value':'Monitor'},
			{'name': 'Mouse', 'value':'Mouse'},
			{'name': 'Network Switch', 'value':'Network Switch'},
			{'name': 'Portable Hard Disk', 'value':'Portable Hard Disk'},
			{'name': 'Printer', 'value':'Printer'},
			{'name': 'Projector', 'value':'Projector'},
			{'name': 'Router', 'value':'Router'},
			{'name': 'Scanner', 'value':'Scanner'},
			{'name': 'Software', 'value':'Software'},
			{'name': 'Speaker', 'value':'Speaker'},
			{'name': 'Telephone', 'value':'Telephone'},
			{'name': 'UPS', 'value':'Uninterruptible Power Supply'},
			{'name': 'Video Card', 'value':'Video Card'},
			{'name': 'Other Component', 'value':'Other Component'},
		];

		$scope.cancel = function(){
			$mdDialog.cancel();
		};


		$scope.submit = function(){
			AssetTagService.setType($scope.category);
			$mdDialog.hide();
		};

		
	}]);
adminModule
	.controller('addAssetTagDialogController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'WorkStation', 'AssetTag', 'AssetTagService', 'Desktop', 'Firewall', 'HardDisk', 'Headset', 'Keyboard', 'Mac', 'Memory', 'Monitor', 'Mouse', 'NetworkSwitch', 'PortableHardDisk', 'Printer', 'Projector', 'Router', 'Scanner', 'Software', 'Speaker', 'Telephone', 'UPS', 'VideoCard', 'OtherComponent', function($scope, $state, $stateParams, $mdDialog, Preloader, WorkStation, AssetTag, AssetTagService, Desktop, Firewall, HardDisk, Headset, Keyboard, Mac, Memory, Monitor, Mouse, NetworkSwitch, PortableHardDisk, Printer, Projector, Router, Scanner, Software, Speaker, Telephone, UPS, VideoCard, OtherComponent){
		var workStationID = $stateParams.workStationID;
		var brand = {'search':'brand'};
		var maker = {'search':'maker'};
		var type = {'search':'type'};
		$scope.asset_type = AssetTagService.getType();
		$scope.workStation = AssetTagService.getStation();

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

			$scope.brandChange = function(idx){				
				$scope.assets[idx].component_id = null;
				Desktop.model($scope.assets[idx])
					.success(function(data){
						$scope.assets[idx].models = data;
					});
			}
		}

		else if ($scope.asset_type == 'Firewall') {
			Firewall.distinct(brand)
				.success(function(data){
					$scope.assets[0].brands = data;
				});

			$scope.brandChange = function(idx){				
				$scope.assets[idx].component_id = null;
				Firewall.model($scope.assets[idx])
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

			$scope.brandChange = function(idx){
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

			$scope.brandChange = function(idx){
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

			$scope.brandChange = function(idx){
				$scope.assets[idx].component_id = null;
				Keyboard.model($scope.assets[idx])
					.success(function(data){
						$scope.assets[idx].models = data;
					});
			}
		}
		else if ($scope.asset_type == 'Mac') {
			Mac.distinct(type)
				.success(function(data){
					$scope.assets[0].types = data;
				});

			$scope.mactypeChange = function(idx){
				$scope.assets[idx].component_id = null;
				Mac.processor($scope.assets[idx])
					.success(function(data){
						$scope.assets[idx].processors = data;
					});
			}
		}
		else if ($scope.asset_type == 'Memory') {
			Memory.distinct(brand)
				.success(function(data){
					$scope.assets[0].brands = data;
				});

			$scope.brandChange = function(idx){
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

			$scope.brandChange = function(idx){
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

			$scope.brandChange = function(idx){
				$scope.assets[idx].component_id = null;
				Mouse.model($scope.assets[idx])
					.success(function(data){
						$scope.assets[idx].models = data;
					});
			}
		}
		else if ($scope.asset_type == 'Network Switch') {
			NetworkSwitch.distinct(brand)
				.success(function(data){
					$scope.assets[0].brands = data;
				});

			$scope.brandChange = function(idx){
				$scope.assets[idx].component_id = null;
				NetworkSwitch.model($scope.assets[idx])
					.success(function(data){
						$scope.assets[idx].models = data;
					});
			}
		}

		else if ($scope.asset_type == 'Portable Hard Disk') {
			PortableHardDisk.distinct(brand)
				.success(function(data){
					$scope.assets[0].brands = data;
				});

			$scope.brandChange = function(idx){
				$scope.assets[idx].capacity = null;
				$scope.assets[idx].models = null;
				$scope.assets[idx].component_id = null;
				var query = {'search':'capacity', 'brand': $scope.assets[idx].brand };
				PortableHardDisk.distinct(query)
					.success(function(data){
						$scope.assets[idx].capacities = data;
					});
			}
		}

		else if ($scope.asset_type == 'Printer') {
			Printer.distinct(brand)
				.success(function(data){
					$scope.assets[0].brands = data;
				});

			$scope.brandChange = function(idx){
				$scope.assets[idx].component_id = null;
				Printer.model($scope.assets[idx])
					.success(function(data){
						$scope.assets[idx].models = data;
					});
			}
		}

		else if ($scope.asset_type == 'Projector') {
			Projector.distinct(brand)
				.success(function(data){
					$scope.assets[0].brands = data;
				});

			$scope.brandChange = function(idx){
				$scope.assets[idx].component_id = null;
				Projector.model($scope.assets[idx])
					.success(function(data){
						$scope.assets[idx].models = data;
					});
			}
		}
		else if ($scope.asset_type == 'Router') {
			Router.distinct(brand)
				.success(function(data){
					$scope.assets[0].brands = data;
				});

			$scope.brandChange = function(idx){
				$scope.assets[idx].component_id = null;
				Router.model($scope.assets[idx])
					.success(function(data){
						$scope.assets[idx].models = data;
					});
			}
		}
		else if ($scope.asset_type == 'Scanner') {
			Scanner.distinct(brand)
				.success(function(data){
					$scope.assets[0].brands = data;
				});

			$scope.brandChange = function(idx){
				$scope.assets[idx].component_id = null;
				Scanner.model($scope.assets[idx])
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
		else if ($scope.asset_type == 'Speaker') {
			Speaker.distinct(brand)
				.success(function(data){
					$scope.assets[0].brands = data;
				});

			$scope.brandChange = function(idx){
				$scope.assets[idx].component_id = null;
				Speaker.model($scope.assets[idx])
					.success(function(data){
						$scope.assets[idx].models = data;
					});
			}
		}
		else if ($scope.asset_type == 'Telephone') {
			Telephone.distinct(brand)
				.success(function(data){
					$scope.assets[0].brands = data;
				});

			$scope.brandChange = function(idx){
				$scope.assets[idx].component_id = null;
				Telephone.model($scope.assets[idx])
					.success(function(data){
						$scope.assets[idx].models = data;
					});
			}
		}
		else if ($scope.asset_type == 'Uninterruptible Power Supply') {
			UPS.distinct(brand)
				.success(function(data){
					$scope.assets[0].brands = data;
				});

			$scope.brandChange = function(idx){
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

			$scope.brandChange = function(idx){
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

			$scope.brandChange = function(idx){
				$scope.assets[idx].model = null;
				OtherComponent.model($scope.assets[idx])
					.success(function(data){
						$scope.assets[idx].models = data;
					});
			}
		}

		$scope.capacityChange = function(idx, type){
			$scope.assets[idx].component_id = null;
			if(type == 'Hard Disk'){			
				HardDisk.model($scope.assets[idx])
					.success(function(data){
						$scope.assets[idx].models = data;
					});
			}
			else{
				PortableHardDisk.model($scope.assets[idx])
					.success(function(data){
						$scope.assets[idx].models = data;
					});
			}
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
				moment(item.date_purchase).format('L');
			});

			// console.log($scope.assets);

			AssetTag.storeMultiple($scope.assets)
				.success(function(){
					Preloader.stop();
				})
				.error(function(){
					Preloader.error();
				});
		};
	}]);
// adminModule
// 	.controller('editAssetDialogController', ['$scope', '$mdDialog', 'Preloader', 'AssetTagService', 'AssetTag', function($scope, $mdDialog, Preloader, AssetTagService, AssetTag){
// 		var assetTagID = AssetTagService.getID();
// 		$scope.workStation = AssetTagService.getStation();

// 		$scope.cancel = function(){
// 			$mdDialog.cancel();
// 		};

// 		AssetTag.specific(assetTagID)
// 			.success(function(data){
// 				$scope.asset = data;
// 			})
// 			.error(function(){
// 				Preloader.error();
// 			})

// 		$scope.submit = function(){
// 			// start preloader
// 			Preloader.preload();
// 			AssetTag.update(assetTagID, $scope.asset)
// 				.success(function(){
// 					$mdDialog.hide();
// 				})
// 				.error(function(){
// 					Preloader.error();
// 				});
// 		}
// 	}]);
adminModule
	.controller('transferWorkStationDialogController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'WorkStation', 'AssetTag', 'AssetTagService', 'Department', 'WorkStationTag', function($scope, $state, $stateParams, $mdDialog, Preloader, WorkStation, AssetTag, AssetTagService, Department, WorkStationTag){
		var workStationID = $stateParams.workStationID;
		var departmentID = $stateParams.departmentID;
		$scope.workStation = AssetTagService.getStation();

		$scope.workStationTag = {};
		$scope.workStationTag.work_station_id = workStationID;

		Department.others()
			.success(function(data){
				$scope.workStationTag.departments = data;
			});

		$scope.cancel = function(){
			$mdDialog.cancel();
		};

		$scope.submit = function(){
			Preloader.preload()
			WorkStationTag.update(departmentID, $scope.workStationTag)
				.success(function(data){
					$state.go('main.work-station', {'departmentID':$scope.workStationTag.department_id, 'workStationID': workStationID})
					$mdDialog.hide();
				})
				.error(function(){
					Preloader.stop();
				});
		};
	}]);
adminModule
	.controller('pullOutAssetDialogController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Department', 'WorkStation', 'Preloader', 'AssetTagService', 'AssetTag', function($scope, $state, $stateParams, $mdDialog, Department, WorkStation, Preloader, AssetTagService, AssetTag){
		var assetTagID = AssetTagService.getID();
		$scope.workStation = AssetTagService.getStation();

		$scope.cancel = function(){
			$mdDialog.cancel();
		};

		AssetTag.specific(assetTagID)
			.success(function(data){
				$scope.asset = data;
			})
			.error(function(){
				Preloader.error();
			});

		$scope.repair = function(){
			if($scope.asset.component_type == 'Desktop'){
				var confirm = $mdDialog.confirm()
			        .title('Would you like to include components under this unit?')
			        .content('Hard disk(s), RAM(s), video card, and softwares will be pulled out along with the unit.')
			        .ok('Continue')
			        .cancel('Keep it');
			    $mdDialog.show(confirm)
			    	.then(function() {
				      	Preloader.preload();
						AssetTag.repair(assetTagID)
							.success(function(){
								AssetTag.repairComponents($stateParams.workStationID)
									.success(function(){
										$state.go('main.work-station', {}, {reload:true});
										Preloader.stop();
									})
									.error(function(){
										Preloader.error();
									});
							})
							.error(function(){
								Preloader.error();
							});
				    }, function() {
				    	Preloader.preload();
					    AssetTag.repair(assetTagID)
							.success(function(){
								$state.go('main.work-station', {}, {reload:true});
								Preloader.stop();
							})
							.error(function(){
								Preloader.error();
							});
				    });
			}
			else{			
				Preloader.preload();
				AssetTag.repair(assetTagID)
					.success(function(){
						$state.go('main.work-station', {}, {reload:true});
						Preloader.stop();
					})
					.error(function(){
						Preloader.error();
					});
			}
		};

		$scope.dispose = function(){
			if($scope.asset.component_type == 'Desktop'){
				var confirm = $mdDialog.confirm()
			        .title('Would you like to include components under this unit?')
			        .content('Hard disk(s), RAM(s), video card, and softwares will be pulled out along with the unit.')
			        .ok('Continue')
			        .cancel('Keep it');
			    $mdDialog.show(confirm)
			    	.then(function() {
				      	Preloader.preload();
						AssetTag.dispose(assetTagID)
							.success(function(){
								AssetTag.disposeComponents($stateParams.workStationID)
									.success(function(){
										$state.go('main.work-station', {}, {reload:true});
										Preloader.stop();
									})
									.error(function(){
										Preloader.error();
									});
							})
							.error(function(){
								Preloader.error();
							});
				    }, function() {
				      	AssetTag.dispose(assetTagID)
							.success(function(){
								$state.go('main.work-station', {}, {reload:true});
								Preloader.stop();
							})
							.error(function(){
								Preloader.error();
							});
				    });
			}
			else{			
				Preloader.preload();
				AssetTag.dispose(assetTagID)
					.success(function(){
						$state.go('main.work-station', {}, {reload:true});
						Preloader.stop();
					})
					.error(function(){
						Preloader.error();
					});
			}
		};

	}]);
adminModule
	.controller('swapAssetDialogController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Department', 'WorkStation', 'Preloader', 'AssetTagService', 'AssetTag', function($scope, $state, $stateParams, $mdDialog, Department, WorkStation, Preloader, AssetTagService, AssetTag){
		var assetTagID = AssetTagService.getID();
		$scope.workStation = AssetTagService.getStation();
		$scope.asset = {};

		$scope.cancel = function(){
			$mdDialog.cancel();
		};

		AssetTag.specific(assetTagID)
			.success(function(data){
				$scope.assetTag = data;
			})
			.error(function(){
				Preloader.error();
			});

		Department.index()
			.success(function(data){
				$scope.departments = data
			})
			.error(function(){
				Preloader.error();
			});


		$scope.showFloors = function(){
			$scope.workstations = [];
			$scope.assetTag.work_station_id = null;
			$scope.assetTag.asset_tag_id = null;
			$scope.assetTag.floor = null;
			$scope.assetTag.division = null;
			WorkStation.floors($scope.assetTag.department)
				.success(function(data){
					$scope.floors = data;
				})
		};

		$scope.showDivisions = function(){
			$scope.assetTag.work_station_id = null;
			$scope.assetTag.asset_tag_id = null;
			$scope.assetTag.division = null;
			$scope.workstations = [];
			WorkStation.divisions($scope.assetTag.department, $scope.assetTag.floor)
				.success(function(data){
					$scope.divisions = data;
				})
		};

		$scope.showWorkStations = function(){
			$scope.assetTag.work_station_id = null;
			$scope.assetTag.asset_tag_id = null;
			$scope.workstations = [];
			WorkStation.availableTransfer($scope.assetTag, $stateParams.workStationID)
				.success(function(data){
					$scope.workstations = data;
				});
		};

		$scope.showAssets = function(){
			$scope.assetTag.asset_tag_id = null;
			$scope.assetTag_tags = [];
			AssetTag.availableSwap($scope.assetTag)
				.success(function(data){
					$scope.asset_tags = data;
				});
		};


		$scope.submit = function(){
			if($scope.assetTag.component_type=='Desktop'){
				var confirm = $mdDialog.confirm()
			        .title('Would you like to include components under this unit?')
			        .content('Hard disk(s), RAM(s), video card, and softwares will be swapped along with the unit.')
			        .ok('Continue')
			        .cancel('Keep it');
			    $mdDialog.show(confirm)
			    	.then(function() {
				      	Preloader.preload();
						AssetTag.swap(assetTagID, $scope.asset)
							.success(function(swapWorkStationID){
								AssetTag.swapComponents($stateParams.workStationID, swapWorkStationID)
									.success(function(){
										$state.go('main.work-station', {}, {reload:true});
										Preloader.stop();
									})
									.error(function(){
										Preloader.error();
									});
							})
							.error(function(){
								Preloader.error();
							});
				    }, function() {
				    	Preloader.preload();
					    AssetTag.swap(assetTagID, $scope.asset)
							.success(function(){
								$state.go('main.work-station', {}, {reload:true});
								Preloader.stop();
							})
							.error(function(){
								Preloader.error();
							});
				    });
			}
			else {
				Preloader.preload();
				AssetTag.swap(assetTagID, $scope.asset)
					.success(function(){
						$mdDialog.hide();
					})
					.error(function(){
						Preloader.error();
					});
			}
		};
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
	.controller('transferAssetDialogController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Department', 'WorkStation', 'Preloader', 'AssetTagService', 'AssetTag', function($scope, $state, $stateParams, $mdDialog, Department, WorkStation, Preloader, AssetTagService, AssetTag){
		var assetTagID = AssetTagService.getID();
		$scope.workStation = AssetTagService.getStation();
		$scope.asset = {};

		$scope.cancel = function(){
			$mdDialog.cancel();
		};

		AssetTag.specific(assetTagID)
			.success(function(data){
				$scope.assetTag = data;
			})
			.error(function(){
				Preloader.error();
			});

		Department.index()
			.success(function(data){
				$scope.departments = data
			})
			.error(function(){0
				Preloader.error();
			});


		$scope.showFloors = function(){
			$scope.workstations = [];
			$scope.asset.work_station_id = null;
			$scope.asset.floor = null;
			$scope.asset.division = null;
			WorkStation.floors($scope.asset.department)
				.success(function(data){
					$scope.floors = data;
				})
		}

		$scope.showDivisions = function(){
			$scope.asset.work_station_id = null;
			$scope.asset.division = null;
			$scope.workstations = [];
			WorkStation.divisions($scope.asset.department, $scope.asset.floor)
				.success(function(data){
					$scope.divisions = data;
				})
		}

		$scope.showWorkStations = function(){
			$scope.asset.work_station_id = null;
			$scope.workstations = [];
			WorkStation.availableTransfer($scope.asset, $stateParams.workStationID)
				.success(function(data){
					$scope.workstations = data;
				});
		};


		$scope.submit = function(){
			if($scope.assetTag.component_type=='Desktop'){
				var confirm = $mdDialog.confirm()
			        .title('Would you like to include components under this unit?')
			        .content('Hard disk(s), RAM(s), video card, and softwares will be transfered along with the unit.')
			        .ok('Continue')
			        .cancel('Keep it');
			    $mdDialog.show(confirm)
			    	.then(function() {
				      	Preloader.preload();
						AssetTag.transfer(assetTagID, $scope.asset)
							.success(function(){
								AssetTag.transferComponents($stateParams.workStationID, $scope.asset)
									.success(function(){
										$state.go('main.work-station', {}, {reload:true});
										Preloader.stop();
									})
									.error(function(){
										Preloader.error();
									});
							})
							.error(function(){
								Preloader.error();
							});
				    }, function() {
				    	Preloader.preload();
					    AssetTag.transfer(assetTagID, $scope.asset)
							.success(function(){
								$state.go('main.work-station', {}, {reload:true});
								Preloader.stop();
							})
							.error(function(){
								Preloader.error();
							});
				    });
			}
			else {
				Preloader.preload();
				AssetTag.transfer(assetTagID, $scope.asset)
					.success(function(){
						$mdDialog.hide();
					})
					.error(function(){
						Preloader.error();
					});
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
	.controller('workStationContentContainerController', ['$scope', '$filter', '$state', '$stateParams', '$mdDialog', 'Preloader', 'WorkStation', 'AssetTag', 'AssetType', function($scope, $filter, $state, $stateParams, $mdDialog, Preloader, WorkStation, AssetTag, AssetType){
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
			// .then(function(){
		 //    	$scope.subheader.refresh();
		 //    });
		};

		$scope.swapAsset = function(id){
			AssetTagService.setID(id);
			$mdDialog.show({
		      	controller: 'swapAssetDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/swap-asset-dialog.template.html',
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
		};

		$scope.removeAsset = function(id){
			var confirm = $mdDialog.confirm()
	        	.title('Delete asset from records.')
	          	.content('Are you sure you want to delete this asset from our records?')
	          	.ariaLabel('Delete Asset')
	          	.ok('Delete')
	          	.cancel('Cancel');

	        $mdDialog.show(confirm).then(function() {
		      	AssetTag.delete(id)
		      		.success(function(){
		      			$scope.subheader.refresh();
		      		})
		      		.error(function(){
		      			Preloader.error();
		      		});
		    }, function() {
		      	return;
		    });
		};

		$scope.init = function(refresh){
			AssetType.index()
				.success(function(data){
					$scope.asset_types = data;
				})
				.error(function(){
					Preloader.error();
				})

			WorkStation.show(workStationID)
				.success(function(data){
					$scope.workStation = data;

					$scope.toolbar.childState = data.name;
					if(refresh){
						Preloader.stop();
						Preloader.stop();
					}
				})
				.error(function(){
					Preloader.error();
				})
		}

		$scope.init();
	}]);

adminModule
	.controller('workStationContentController', ['$scope', '$stateParams', 'WorkStation', function($scope, $stateParams, WorkStation){
		
	}]);
//# sourceMappingURL=admin.js.map
