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
						controller: 'mainToolbarController',
					},
					'content-container@main': {
						templateUrl: '/app/components/admin/views/content-container.view.html',
						controller: 'mainContentContainerController',
					},
					'content@main': {
						templateUrl: '/app/components/admin/templates/content/main.content.template.html',
						// controller: 'mainContentController',	
					},
					'right-sidenav@main': {
						templateUrl : '/app/components/admin/templates/sidenavs/main-right.sidenav.html',
						controller: 'mainRightSidenavController',
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
			 * Dashboard Routes
			 * 
			*/

			/**
			 * Displays charts of inventory
			 * 
			*/
			.state('main.analysis', {
				url: 'dashboard/analysis',
				views: {
					'toolbar': {
						templateUrl: '/app/components/admin/templates/toolbar.template.html',
						controller: 'analysisToolbarController',
					},
					'content': {
						templateUrl: '/app/components/admin/templates/content/analysis.content.template.html',
						controller: 'analysisContentController',
					},
					'right-sidenav': {
						templateUrl : '/app/components/admin/templates/sidenavs/main-right.sidenav.html',
						controller: 'analysisRightSidenavController',
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
			.state('main.floor-plan', {
				url: 'dashboard/floor-plan/{departmentID}',
				params: {'departmentID': null},
				views: {
					'content-container': {
						templateUrl: '/app/components/admin/views/content-container.view.html',
						controller: 'floorPlanContentContainerController',
					},
					'toolbar@main.floor-plan': {
						templateUrl: '/app/components/admin/templates/toolbar.template.html',
						controller: 'floorPlanToolbarController',
					},
					'content@main.floor-plan': {
						templateUrl: '/app/components/admin/templates/content/floor-plan.content.template.html',
						// controller: 'floorPlanContentController',
					},
					'right-sidenav@main.floor-plan': {
						templateUrl : '/app/components/admin/templates/sidenavs/main-right.sidenav.html',
						controller: 'floorPlanRightSidenavController',
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
				url: 'dashboard/floor-plan/{departmentID}/work-station/{workStationID}',
				params: {'departmentID':null, 'workStationID': null},
				views: {
					'content-container': {
						templateUrl: '/app/components/admin/views/content-container.view.html',
						controller: 'workStationContentContainerController',
					},
					'toolbar@main.work-station': {
						templateUrl: '/app/components/admin/templates/toolbar.template.html',
						controller: 'workStationToolbarController',
					},
					'content@main.work-station': {
						templateUrl: '/app/components/admin/templates/content/work-station.content.template.html',
						// controller: 'workStationContentController',
					},
					'right-sidenav@main.work-station': {
						templateUrl : '/app/components/admin/templates/sidenavs/work-station-right.sidenav.html',
						controller: 'workStationRightSidenavController',
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
			.state('main.assets', {
				url: 'assets/{assetID}',
				params: {'assetID':null},
				views: {
					'content-container': {
						templateUrl: '/app/components/admin/views/content-container.view.html',
						controllerProvider: ['$stateParams', 'assetService', function($stateParams, assetService){
							var index = $stateParams.assetID - 1;
							return assetService.contentContainerController(index);
						}]
					},
					'toolbar@main.assets': {
						templateUrl: '/app/components/admin/templates/toolbar.template.html',
						controllerProvider: ['$stateParams', 'assetService', function($stateParams, assetService){
							var index = $stateParams.assetID - 1;
							return assetService.toolbarController(index);
						}]
					},
					'content@main.assets': {
						templateUrl: '/app/components/admin/templates/content/assets.content.template.html',
						// controllerProvider: ['$stateParams', 'assetService', function($stateParams, assetService){
						// 	var index = $stateParams.assetID - 1;
						// 	return assetService.contentController(index);
						// }]
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
	.controller('leftSidenavController', ['$scope', '$mdSidenav', 'Department', 'departmentService', function($scope, $mdSidenav, Department, departmentService){
		$scope.menu = {};

		$scope.menu.section = [
			{
				'name':'Dashboard',
			},
			{
				'name':'Assets',
			},
			{
				'name':'Departments',
			},
		];

		$scope.menu.pages = [
			/* 0 */
			[
				// {
				// 	'name':'Analysis',
				// 	'state':'main.analysis',
				// },
				{
					'name':'Floor Plan',
					'state':'main.floor-plan',
				},
			],
			/* 1 */
			[
				{
					'name': 'CPU',
					'state':'main.assets',
					'id': 1
				},
				{
					'name': 'Firewall',
					'state':'main.assets',
					'id': 2
				},
				{
					'name': 'Hard Disk',
					'state':'main.assets',
					'id': 3
				},
				{
					'name': 'Headset',
					'state':'main.assets',
					'id': 4
				},
				{
					'name': 'Keyboard',
					'state':'main.assets',
					'id': 5
				},
				{
					'name': 'Mac Computer',
					'state':'main.assets',
					'id': 6
				},
				{
					'name': 'Memory',
					'state':'main.assets',
					'id': 7
				},
				{
					'name': 'Monitor',
					'state':'main.assets',
					'id': 8
				},
				{
					'name': 'Mouse',
					'state':'main.assets',
					'id': 9
				},
				{
					'name': 'Network Switch',
					'state':'main.assets',
					'id': 10
				},
				{
					'name': 'Portable Hard Disk',
					'state':'main.assets',
					'id': 11
				},
				{
					'name': 'Printer',
					'state':'main.assets',
					'id': 12
				},
				{
					'name': 'Projector',
					'state':'main.assets',
					'id': 13
				},
				{
					'name': 'Router',
					'state':'main.assets',
					'id': 14
				},
				{
					'name': 'Scanner',
					'state':'main.assets',
					'id': 15
				},
				{
					'name': 'Software',
					'state':'main.assets',
					'id': 16
				},
				{
					'name': 'Speaker',
					'state':'main.assets',
					'id': 17
				},
				{
					'name': 'Telephone',
					'state':'main.assets',
					'id': 18
				},
				{
					'name': 'UPS',
					'state':'main.assets',
					'id': 19
				},
				{
					'name': 'Video Card',
					'state':'main.assets',
					'id': 20
				},
				{
					'name': 'Other Components',
					'state':'main.assets',
					'id': 21
				},
			],
		];

		/* AJAX Request Department */
		Department.index()
			.success(function(data){
				$scope.menu.pages.push(data);
				this.index = $scope.menu.pages.length - 1;
				/* Save the department on service for future use */
				departmentService.set($scope.menu.pages[this.index]);
			});

		// set section as active
		$scope.setActive = function(index){
		 	angular.element($('[aria-label="'+ 'section-' + index + '"]').closest('li').toggleClass('active'));
		 	angular.element($('[aria-label="'+ 'section-' + index + '"]').closest('li').siblings().removeClass('active'));
		};
	}]);
adminModule
	.controller('mainContentContainerController', ['$scope', '$state', 'Preloader', 'Log', function($scope, $state, Preloader, Log){
		/**
		 * Object for subheader
		 *
		*/
		$scope.subheader = {};
		$scope.subheader.state = 'logs';

		/* Refreshes the list */
		$scope.subheader.refresh = function(){
			// start preloader
			Preloader.preload();
			// clear log
			$scope.log.paginated = {};
			$scope.log.page = 2;
			Log.paginate()
				.then(function(data){
					$scope.log.paginated = data.data;
					$scope.log.paginated.show = true;
					// stop preload
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		};
		/**
		 * Object for log
		 *
		*/
		$scope.log = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.log.page = 2;
		//

		Log.paginate()
			.then(function(data){
				$scope.log.paginated = data.data;
				$scope.log.paginated.show = true;

				$scope.log.paginateLoad = function(){
					// kills the function if ajax is busy or pagination reaches last page
					if($scope.log.busy || ($scope.log.page > $scope.log.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.log.busy = true;

					// Calls the next page of pagination.
					Log.paginate($scope.log.page)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.log.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.log.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.log.busy = false;
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
			$scope.log.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			// $scope.log.paginated.show = false;
			// Preloader.preload()
			// Log.search($scope.log)
			// 	.success(function(data){
			// 		$scope.log.results = data;
			// 		Preloader.stop();
			// 	})
			// 	.error(function(data){
			// 		Preloader.error();
			// 	});
		};

		$scope.show = function(id){
			$state.go('main.units', {'assetID': $stateParams.assetID, 'unitID':id});
		};
		/**
		 * Object for content view
		 *
		*/
		$scope.fab = {};

		// $scope.fab.icon = 'mdi-plus';
		// $scope.fab.label = 'Add';
		
		$scope.fab.show = false;

		// $scope.fab.action = function(){
		// 	return;
		// };
	}]);
adminModule
	.controller('mainContentController', ['$scope', function($scope){
		/**
		 * Object for content view
		 *
		*/
		$scope.content = {};

		$scope.content.title = 'Coming Soon...';
	}]);
adminModule
	.controller('mainRightSidenavController', ['$scope', function($scope){
		/**
		 * Object of Right Sidenav
		 *
		*/
		$scope.sidenav = {};

		$scope.sidenav.title = 'Right Sidenav Initialized';
	}]);
adminModule
	.controller('mainToolbarController', ['$scope', '$state', function($scope, $state){
		/**
		 *  Object for toolbar view.
		 *
		*/
		$scope.toolbar = {};

		/**
		 * Properties and method of toolbar.
		 *
		*/
		$scope.toolbar.childState = 'Home';
	}]);
adminModule
	.controller('mainViewController', ['$scope', '$mdSidenav', 'User', function($scope, $mdSidenav, User){
		/**
		 * Fetch authenticated user information
		 *
		*/
		User.index()
			.success(function(data){
				$scope.user = data;
			});

		/**
		 * Toggles Left Sidenav
		 *
		*/
		$scope.toggleSidenav = function(menuId) {
		    $mdSidenav(menuId).toggle();
		};
	}]);
adminModule
	.controller('toolbarController', ['$scope', '$mdSidenav', function($scope, $mdSidenav){
		$scope.toolbar = {};

		$scope.toolbar.parentState = 'Home';
	}]);
adminModule
	.controller('addWorkStationDialogController', ['$scope', '$stateParams', '$mdDialog', 'Preloader', 'WorkStation', function($scope, $stateParams, $mdDialog, Preloader, WorkStation){
		$scope.workStation = {};

		$scope.patterns = [
			{
				'pattern' : 'A6-A-A***',
				'value' :  'A6-A-A',
				'meaning': 'Aeon 6th Floor - Division A - Admin Station Number',
			},

			{
				'pattern' : 'A6-A-P***',
				'value' :  'A6-A-P',
				'meaning': 'Aeon 6th Floor - Division A - Production Station Number',
			},

			{
				'pattern' : 'A6-B-A***',
				'value' :  'A6-B-A',
				'meaning': 'Aeon 6th Floor - Division B - Admin Station Number',
			},


			{
				'pattern' : 'A6-B-P***',
				'value' :  'A6-B-P',
				'meaning': 'Aeon 6th Floor - Division B - Production Station Number',
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
			WorkStation.store($scope.workStation)
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
	.controller('floorPlanContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'WorkStation', 'WorkStationTag', function($scope, $state, $stateParams, $mdDialog, Preloader, WorkStation, WorkStationTag){
		/**
		 * Object for subheader
		 *
		*/
		var departmentID = $stateParams.departmentID;

		$scope.subheader = {};
		$scope.subheader.state = 'floor-plan';

		/* Refreshes the list */
		$scope.subheader.refresh = function(){
			// start preloader
			Preloader.preload();
			// clear desktop
			$scope.workStation.paginated = {};
			$scope.workStation.page = 2;
			$scope.workStation.type = '';
			$scope.workStation.division = '';
			if(departmentID){
				WorkStation.paginateDepartment(departmentID)
					.then(function(data){
						$scope.workStation.paginated = data.data;
						$scope.workStation.paginated.show = true;
						// stop preload
						Preloader.stop();
					}, function(){
						Preloader.error();
					});
			}
			else{
				WorkStation.paginate()
				.then(function(data){
					$scope.workStation.paginated = data.data;
					$scope.workStation.paginated.show = true;
					// stop preload
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
			}
		};

		/**
		 * Object for fab
		 *
		*/
		$scope.fab = {};

		$scope.fab.icon = 'mdi-plus';
		$scope.fab.label = 'Add';
		$scope.fab.tooltip = 'Add Work Station';
		$scope.fab.show = true;

		$scope.fab.action = function(){
			if(!departmentID){
			    $mdDialog.show({
			      	controller: 'addWorkStationDialogController',
				    templateUrl: '/app/components/admin/templates/dialogs/add-work-station-dialog.template.html',
			      	parent: angular.element($('body')),
			    })
			    .then(function(){
			    	/* Refreshes the list */
			    	$scope.subheader.refresh();
			    });
			}
			else{
				$mdDialog.show({
			      	controller: 'tagWorkStationDialogController',
				    templateUrl: '/app/components/admin/templates/dialogs/tag-work-station-dialog.template.html',
			      	parent: angular.element($('body')),
			    })
			    .then(function(){
			    	/* Refreshes the list */
			    	$scope.subheader.refresh();
			    });
			}
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
		$scope.workStation = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.workStation.page = 2;
		//

		if(departmentID){
			WorkStation.paginateDepartment(departmentID)
				.then(function(data){
					$scope.workStation.paginated = data.data;
					$scope.workStation.paginated.show = true;

					$scope.workStation.paginateLoad = function(){
						// kills the function if ajax is busy or pagination reaches last page
						if($scope.workStation.busy || ($scope.workStation.page > $scope.workStation.paginated.last_page)){
							return;
						}
						/**
						 * Executes pagination call
						 *
						*/
						// sets to true to disable pagination call if still busy.
						$scope.workStation.busy = true;

						// Calls the next page of pagination.
						WorkStation.paginateDepartment(departmentID, $scope.workStation.page)
							.then(function(data){
								// increment the page to set up next page for next AJAX Call
								$scope.workStation.page++;

								// iterate over each data then splice it to the data array
								angular.forEach(data.data.data, function(item, key){
									$scope.workStation.paginated.data.push(item);
								});

								// Enables again the pagination call for next call.
								$scope.workStation.busy = false;
							});
					}
				}, function(){
					Preloader.error();
				});
		}
		else{
			WorkStation.paginate()
				.then(function(data){
					$scope.workStation.paginated = data.data;
					$scope.workStation.paginated.show = true;

					$scope.workStation.paginateLoad = function(){
						// kills the function if ajax is busy or pagination reaches last page
						if($scope.workStation.busy || ($scope.workStation.page > $scope.workStation.paginated.last_page)){
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
							.then(function(data){
								// increment the page to set up next page for next AJAX Call
								$scope.workStation.page++;

								// iterate over each data then splice it to the data array
								angular.forEach(data.data.data, function(item, key){
									$scope.workStation.paginated.data.push(item);
								});

								// Enables again the pagination call for next call.
								$scope.workStation.busy = false;
							});
					}
				}, function(){
					Preloader.error();
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
			$scope.workStation.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.workStation.paginated.show = false;
			Preloader.preload()
			if(departmentID){			
				WorkStation.searchDepartment(departmentID, $scope.workStation)
					.success(function(data){
						$scope.workStation.results = data;
						Preloader.stop();
					})
					.error(function(data){
						Preloader.error();
					});
			}
			else{
				WorkStation.search($scope.workStation)
					.success(function(data){
						$scope.workStation.results = data;
						Preloader.stop();
					})
					.error(function(data){
						Preloader.error();
					});
			}
		};

		// onclick of 
		$scope.show = function(workStationID){
			if($stateParams.departmentID){
				$state.go('main.work-station', {'departmentID':$stateParams.departmentID, 'workStationID': workStationID});
			}
			else{
				Preloader.preload();
				WorkStationTag.workstation(workStationID)
					.success(function(data){
						if(data.department_id){
							$state.go('main.work-station', {'departmentID':data.department_id, 'workStationID': workStationID});
							Preloader.stop();
						}
						else{
							$mdDialog.show(
						      	$mdDialog.alert()
							        .parent(angular.element($('body')))
							        .clickOutsideToClose(true)
							        .title('Vacant Work Station')
							        .content('This work station is vacant and not under any department.')
							        .ariaLabel('Vacant Work Station')
							        .ok('Got it!')
						    );
						}
					})
					.error(function(){
						Preloader.error();
					});
			}
		};

	}]);

adminModule
	.controller('floorPlanContentController', ['$scope', '$state', '$stateParams', function($scope, $state, $stateParams){
		
	}]);
adminModule
	.controller('floorPlanRightSidenavController', ['$scope', '$state', '$stateParams', 'departmentService', 'Department',  function($scope, $state, $stateParams, departmentService, Department){
		/**
		 * Object for content view
		 *
		*/
		$scope.rightSidenav = {};

		var departments = departmentService.get();
		if(!departments.length){
			Department.index()
				.success(function(data){
					departments = data;
					$scope.rightSidenav.departments = data;
				})
				.error(function(data){
					Preload.error();
				});
		}
		else{
			$scope.rightSidenav.departments = departments;
		}

	}]);
adminModule
	.controller('floorPlanToolbarController', ['$scope', '$stateParams', 'departmentService', 'Department', function($scope, $stateParams, departmentService, Department){
		/**
		 *  Object for toolbar view.
		 *
		*/
		$scope.toolbar = {};

		/**
		 * Properties and method of toolbar.
		 *
		*/
		$scope.toolbar.parentState = 'Floor Plan';

		var index = $stateParams.departmentID - 1;
		$scope.toolbar.parentState = 'Floor Plan';

		var departments = departmentService.get();
		if(!departments.length){
			Department.index()
				.success(function(data){
					departments = data;
					$scope.toolbar.childState = index > -1 ? departments[index].name : null;
				})
				.error(function(data){
					Preload.error();
				});
		}
		else{
			$scope.toolbar.childState =  index > -1 ? departments[index].name : null;
		}
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
	.controller('analysisContentController', ['$scope', function($scope){
		/**
		 * Object for content view
		 *
		*/
		$scope.content = {};

		$scope.content.title = 'Analysis Content Initialized';
	}]);
adminModule
	.controller('analysisRightSidenavController', ['$scope', function($scope){
		/**
		 * Object for content view
		 *
		*/
		$scope.sidenav = {};

		$scope.sidenav.title = 'Analysis Right Sidenav Initialized';
	}]);
adminModule
	.controller('analysisToolbarController', ['$scope', function($scope){
		/**
		 *  Object for toolbar view.
		 *
		*/
		$scope.toolbar = {};

		/**
		 * Properties and method of toolbar.
		 *
		*/
		$scope.toolbar.parentState = 'Dashboard';
		$scope.toolbar.childState = 'Analysis';

		/**
		 * Search database and look for user input depending on state.
		 *
		*/
		$scope.searchUserInput = function(){
			return;
		};
	}]);
adminModule
	.controller('addFirewallDialogController', ['$scope', '$state', '$mdDialog', 'Preloader', 'Firewall', function($scope, $state, $mdDialog, Preloader, Firewall){
		$scope.firewall = {};

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.submit = function(){
			/* Starts Preloader */
			Preloader.preload();
			/**
			 * Stores Single Record
			*/
			Firewall.store($scope.firewall)
				.then(function(){
					// Stops Preloader 
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		}

	}]);
adminModule
	.controller('firewallContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'Firewall', function($scope, $state, $stateParams, $mdDialog, Preloader, Firewall){
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
			$scope.firewall.paginated = {};
			$scope.firewall.page = 2;
			Firewall.paginate()
				.then(function(data){
					$scope.firewall.paginated = data.data;
					$scope.firewall.paginated.show = true;
					// stop preload
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		};

		/**
		 * Object for content view
		 *
		*/
		$scope.fab = {};

		$scope.fab.icon = 'mdi-plus';
		$scope.fab.label = 'Add';
		$scope.fab.tooltip = 'Add Firewall';
		$scope.fab.show = true;

		$scope.fab.action = function(){
		    $mdDialog.show({
		      	controller: 'addFirewallDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-firewall-dialog.template.html',
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
		 * Object for Firewall
		 *
		*/
		$scope.firewall = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.firewall.page = 2;

		Firewall.paginate()
			.then(function(data){
				$scope.firewall.paginated = data.data;
				$scope.firewall.paginated.show = true;

				$scope.firewall.paginateLoad = function(){
					// kills the function if ajax is busy or pagination reaches last page
					if($scope.firewall.busy || ($scope.firewall.page > $scope.firewall.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.firewall.busy = true;

					// Calls the next page of pagination.
					Firewall.paginate($scope.firewall.page)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.firewall.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.firewall.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.firewall.busy = false;
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
			$scope.firewall.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.firewall.paginated.show = false;
			Preloader.preload();
			Firewall.search($scope.firewall)
				.success(function(data){
					$scope.firewall.results = data;
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
	.controller('firewallToolbarController', ['$scope', 'Firewall', function($scope, Firewall){
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
		$scope.toolbar.childState = 'Firewall';
	}]);
adminModule
	.controller('firewallUnitContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'AssetTag', function($scope, $state, $stateParams, $mdDialog, Preloader, AssetTag){
		var unitID = $stateParams.unitID;
		var query = {};

		query.component_id = unitID;
		query.component_type = 'Firewall';

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
			// clear firewall
			$scope.firewall.paginated = {};
			$scope.firewall.results = null;
			$scope.firewall.page = 2;
			AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.firewall.paginated = data.data;
				$scope.firewall.paginated.show = true;

				$scope.firewall.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.firewall.busy || ($scope.firewall.page > $scope.firewall.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.firewall.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.firewall.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.firewall.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.firewall.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.firewall.busy = false;
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
			// clear firewall
			$scope.firewall.paginated = {};
			$scope.firewall.results = null;
			$scope.firewall.page = 2;
			AssetTag.repairUnit(1, query)
			.then(function(data){
				$scope.listType = 'Under Repair'
				$scope.firewall.paginated = data.data;
				$scope.firewall.paginated.show = true;

				$scope.firewall.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.firewall.busy || ($scope.firewall.page > $scope.firewall.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.firewall.busy = true;

					// Calls the next page of pagination.
					AssetTag.repairUnit($scope.firewall.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.firewall.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.firewall.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.firewall.busy = false;
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
			// clear firewall
			$scope.firewall.paginated = {};
			$scope.firewall.results = null;
			$scope.firewall.page = 2;
			AssetTag.disposeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Disposed'
				$scope.firewall.paginated = data.data;
				$scope.firewall.paginated.show = true;

				$scope.firewall.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.firewall.busy || ($scope.firewall.page > $scope.firewall.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.firewall.busy = true;

					// Calls the next page of pagination.
					AssetTag.disposeUnit($scope.firewall.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.firewall.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.firewall.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.firewall.busy = false;
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
		 * Object for firewall
		 *
		*/
		$scope.firewall = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.firewall.page = 2;
		// 
		
		AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.firewall.paginated = data.data;
				$scope.firewall.paginated.show = true;

				$scope.firewall.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.firewall.busy || ($scope.firewall.page > $scope.firewall.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.firewall.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.firewall.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.firewall.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.firewall.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.firewall.busy = false;
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
			$scope.firewall.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.firewall.paginated.show = false;
			Preloader.preload();
			var query = {};
			query.userInput = $scope.firewall.userInput;
			query.component_id = unitID;
			query.component_type = 'Firewall';
			query.table_name = 'firewalls';
			query.property_code = 'PFWL';
			AssetTag.search(query)
				.success(function(data){
					$scope.firewall.results = data;
					Preloader.stop();
				})
				.error(function(data){
					Preloader.error();
				});
		};

		$scope.repaired = function(id){
			AssetTag.active(id)
				.success(function(){
					$scope.subheader.repairUnit();
				})
				.error(function(){
					Preloader.error();
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
	}]);

adminModule
	.controller('firewallUnitRightSidenavController', ['$scope', '$state', '$stateParams', 'Firewall', function($scope, $state, $stateParams, Firewall){
		$scope.asset = 'Firewall';

		Firewall.other($stateParams.unitID)
			.success(function(data){
				$scope.others = data;
			});

		$scope.show = function(id){
			$state.go('main.units', {'assetID': $stateParams.assetID, 'unitID': id});
		};
	}]);
adminModule
	.controller('firewallUnitToolbarController', ['$scope', '$state', '$stateParams', 'Firewall', function($scope, $state, $stateParams, Firewall){
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

		Firewall.show($stateParams.unitID)
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
			AssetTag.active(id)
				.success(function(){
					$scope.subheader.repairUnit();
				})
				.error(function(){
					Preloader.error();
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
	.controller('addKeyboardDialogController', ['$scope', '$state', '$mdDialog', 'Preloader', 'Keyboard', function($scope, $state, $mdDialog, Preloader, Keyboard){
		$scope.keyboard = {};

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.submit = function(){
			/* Starts Preloader */
			Preloader.preload();
			/**
			 * Stores Single Record
			*/
			Keyboard.store($scope.keyboard)
				.then(function(){
					// Stops Preloader 
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		}
	}]);
adminModule
	.controller('keyboardContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'Keyboard', function($scope, $state, $stateParams, $mdDialog, Preloader, Keyboard){
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
			$scope.keyboard.paginated = {};
			$scope.keyboard.page = 2;
			Keyboard.paginate()
				.then(function(data){
					$scope.keyboard.paginated = data.data;
					$scope.keyboard.paginated.show = true;
					// stop preload
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		};

		/**
		 * Object for content view
		 *
		*/
		$scope.fab = {};

		$scope.fab.icon = 'mdi-plus';
		$scope.fab.label = 'Add';
		$scope.fab.tooltip = 'Add Keyboard';
		$scope.fab.show = true;

		$scope.fab.action = function(){
		    $mdDialog.show({
		      	controller: 'addKeyboardDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-keyboard-dialog.template.html',
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
		 * Object for Headset
		 *
		*/
		$scope.keyboard = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.keyboard.page = 2;

		Keyboard.paginate()
			.then(function(data){
				$scope.keyboard.paginated = data.data;
				$scope.keyboard.paginated.show = true;

				$scope.keyboard.paginateLoad = function(){
					// kills the function if ajax is busy or pagination reaches last page
					if($scope.keyboard.busy || ($scope.keyboard.page > $scope.keyboard.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.keyboard.busy = true;

					// Calls the next page of pagination.
					Keyboard.paginate($scope.keyboard.page)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.keyboard.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.keyboard.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.keyboard.busy = false;
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
			$scope.keyboard.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.keyboard.paginated.show = false;
			Preloader.preload();
			Keyboard.search($scope.keyboard)
				.success(function(data){
					$scope.keyboard.results = data;
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
	.controller('keyboardToolbarController', ['$scope', '$stateParams', 'Keyboard', function($scope, $stateParams, Keyboard){
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
		$scope.toolbar.childState = 'Keyboard';
	}]);
adminModule
	.controller('keyboardUnitContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'AssetTag', function($scope, $state, $stateParams, $mdDialog, Preloader, AssetTag){
		var unitID = $stateParams.unitID;
		var query = {};

		query.component_id = unitID;
		query.component_type = 'Keyboard';

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
			// clear keyboard
			$scope.keyboard.paginated = {};
			$scope.keyboard.results = null;
			$scope.keyboard.page = 2;
			AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.keyboard.paginated = data.data;
				$scope.keyboard.paginated.show = true;

				$scope.keyboard.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.keyboard.busy || ($scope.keyboard.page > $scope.keyboard.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.keyboard.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.keyboard.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.keyboard.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.keyboard.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.keyboard.busy = false;
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
			// clear keyboard
			$scope.keyboard.paginated = {};
			$scope.keyboard.results = null;
			$scope.keyboard.page = 2;
			AssetTag.repairUnit(1, query)
			.then(function(data){
				$scope.listType = 'Under Repair'
				$scope.keyboard.paginated = data.data;
				$scope.keyboard.paginated.show = true;

				$scope.keyboard.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.keyboard.busy || ($scope.keyboard.page > $scope.keyboard.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.keyboard.busy = true;

					// Calls the next page of pagination.
					AssetTag.repairUnit($scope.keyboard.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.keyboard.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.keyboard.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.keyboard.busy = false;
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
			// clear keyboard
			$scope.keyboard.paginated = {};
			$scope.keyboard.results = null;
			$scope.keyboard.page = 2;
			AssetTag.disposeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Disposed'
				$scope.keyboard.paginated = data.data;
				$scope.keyboard.paginated.show = true;

				$scope.keyboard.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.keyboard.busy || ($scope.keyboard.page > $scope.keyboard.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.keyboard.busy = true;

					// Calls the next page of pagination.
					AssetTag.disposeUnit($scope.keyboard.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.keyboard.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.keyboard.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.keyboard.busy = false;
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
		 * Object for keyboard
		 *
		*/
		$scope.keyboard = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.keyboard.page = 2;
		// 
		
		AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.keyboard.paginated = data.data;
				$scope.keyboard.paginated.show = true;

				$scope.keyboard.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.keyboard.busy || ($scope.keyboard.page > $scope.keyboard.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.keyboard.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.keyboard.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.keyboard.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.keyboard.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.keyboard.busy = false;
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
			$scope.keyboard.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.keyboard.paginated.show = false;
			Preloader.preload();
			var query = {};
			query.userInput = $scope.keyboard.userInput;
			query.component_id = unitID;
			query.component_type = 'Keyboard';
			query.table_name = 'keyboards';
			query.property_code = 'PKBD';
			AssetTag.search(query)
				.success(function(data){
					$scope.keyboard.results = data;
					Preloader.stop();
				})
				.error(function(data){
					Preloader.error();
				});
		};

		$scope.repaired = function(id){
			AssetTag.active(id)
				.success(function(){
					$scope.subheader.repairUnit();
				})
				.error(function(){
					Preloader.error();
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
	}]);

adminModule
	.controller('keyboardUnitRightSidenavController', ['$scope', '$state', '$stateParams', 'Keyboard', function($scope, $state, $stateParams, Keyboard){
		$scope.asset = 'Keyboard';

		Keyboard.other($stateParams.unitID)
			.success(function(data){
				$scope.others = data;
			});

		$scope.show = function(id){
			$state.go('main.units', {'assetID': $stateParams.assetID, 'unitID': id});
		};
	}]);
adminModule
	.controller('keyboardUnitToolbarController', ['$scope', '$state', '$stateParams', 'Keyboard', function($scope, $state, $stateParams, Keyboard){
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

		Keyboard.show($stateParams.unitID)
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
	.controller('addHardDiskDialogController', ['$scope', '$state', '$mdDialog', 'Preloader', 'HardDisk', function($scope, $state, $mdDialog, Preloader, HardDisk){
		$scope.hardDisk = {};

		$scope.hardDisk.capacities = [
			{'capacity':'160GB'},
			{'capacity':'320GB'},
			{'capacity':'500GB'},
			{'capacity':'650GB'},
			{'capacity':'1.0TB'},
			{'capacity':'2.0TB'},
		];

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.submit = function(){
			/* Starts Preloader */
			Preloader.preload();
			/**
			 * Stores Single Record
			*/
			HardDisk.store($scope.hardDisk)
				.then(function(){
					// Stops Preloader 
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		}

	}]);
adminModule
	.controller('hardDiskContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'HardDisk', function($scope, $state, $stateParams, $mdDialog, Preloader, HardDisk){
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
			$scope.hardDisk.paginated = {};
			$scope.hardDisk.page = 2;
			HardDisk.paginate()
				.then(function(data){
					$scope.hardDisk.paginated = data.data;
					$scope.hardDisk.paginated.show = true;
					// stop preload
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		};

		/**
		 * Object for content view
		 *
		*/
		$scope.fab = {};

		$scope.fab.icon = 'mdi-plus';
		$scope.fab.label = 'Add';
		$scope.fab.tooltip = 'Add Hard Disk';
		$scope.fab.show = true;

		$scope.fab.action = function(){
		    $mdDialog.show({
		      	controller: 'addHardDiskDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-hard-disk-dialog.template.html',
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
		 * Object for Hard Disk
		 *
		*/
		$scope.hardDisk = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.hardDisk.page = 2;

		HardDisk.paginate()
			.then(function(data){
				$scope.hardDisk.paginated = data.data;
				$scope.hardDisk.paginated.show = true;

				$scope.hardDisk.paginateLoad = function(){
					// kills the function if ajax is busy or pagination reaches last page
					if($scope.hardDisk.busy || ($scope.hardDisk.page > $scope.hardDisk.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.hardDisk.busy = true;

					// Calls the next page of pagination.
					HardDisk.paginate($scope.hardDisk.page)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.hardDisk.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.hardDisk.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.hardDisk.busy = false;
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
			$scope.hardDisk.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.hardDisk.paginated.show = false;
			Preloader.preload();
			HardDisk.search($scope.hardDisk)
				.success(function(data){
					$scope.hardDisk.results = data;
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
	.controller('hardDiskToolbarController', ['$scope', 'HardDisk', function($scope, HardDisk){
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
		$scope.toolbar.childState = 'Hard Disk';
	}]);
adminModule
	.controller('hardDiskUnitContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'AssetTag', function($scope, $state, $stateParams, $mdDialog, Preloader, AssetTag){
		var unitID = $stateParams.unitID;
		var query = {};

		query.component_id = unitID;
		query.component_type = 'Headset';

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
			// clear hardDisk
			$scope.hardDisk.paginated = {};
			$scope.hardDisk.results = null;
			$scope.hardDisk.page = 2;
			AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.hardDisk.paginated = data.data;
				$scope.hardDisk.paginated.show = true;

				$scope.hardDisk.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.hardDisk.busy || ($scope.hardDisk.page > $scope.hardDisk.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.hardDisk.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.hardDisk.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.hardDisk.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.hardDisk.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.hardDisk.busy = false;
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
			// clear hardDisk
			$scope.hardDisk.paginated = {};
			$scope.hardDisk.results = null;
			$scope.hardDisk.page = 2;
			AssetTag.repairUnit(1, query)
			.then(function(data){
				$scope.listType = 'Under Repair'
				$scope.hardDisk.paginated = data.data;
				$scope.hardDisk.paginated.show = true;

				$scope.hardDisk.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.hardDisk.busy || ($scope.hardDisk.page > $scope.hardDisk.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.hardDisk.busy = true;

					// Calls the next page of pagination.
					AssetTag.repairUnit($scope.hardDisk.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.hardDisk.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.hardDisk.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.hardDisk.busy = false;
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
			// clear hardDisk
			$scope.hardDisk.paginated = {};
			$scope.hardDisk.results = null;
			$scope.hardDisk.page = 2;
			AssetTag.disposeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Disposed'
				$scope.hardDisk.paginated = data.data;
				$scope.hardDisk.paginated.show = true;

				$scope.hardDisk.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.hardDisk.busy || ($scope.hardDisk.page > $scope.hardDisk.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.hardDisk.busy = true;

					// Calls the next page of pagination.
					AssetTag.disposeUnit($scope.hardDisk.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.hardDisk.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.hardDisk.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.hardDisk.busy = false;
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
		 * Object for hardDisk
		 *
		*/
		$scope.hardDisk = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.hardDisk.page = 2;
		// 
		
		AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.hardDisk.paginated = data.data;
				$scope.hardDisk.paginated.show = true;

				$scope.hardDisk.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.hardDisk.busy || ($scope.hardDisk.page > $scope.hardDisk.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.hardDisk.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.hardDisk.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.hardDisk.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.hardDisk.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.hardDisk.busy = false;
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
			$scope.hardDisk.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.hardDisk.paginated.show = false;
			Preloader.preload();
			var query = {};
			query.userInput = $scope.hardDisk.userInput;
			query.component_id = unitID;
			query.component_type = 'Headset';
			query.table_name = 'headsets';
			query.property_code = 'PHDS';
			AssetTag.search(query)
				.success(function(data){
					$scope.hardDisk.results = data;
					Preloader.stop();
				})
				.error(function(data){
					Preloader.error();
				});
		};

		$scope.repaired = function(id){
			AssetTag.active(id)
				.success(function(){
					$scope.subheader.repairUnit();
				})
				.error(function(){
					Preloader.error();
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
	}]);

adminModule
	.controller('hardDiskUnitRightSidenavController', ['$scope', '$state', '$stateParams', 'HardDisk', function($scope, $state, $stateParams, HardDisk){
		$scope.asset = 'Hard Disk';

		HardDisk.other($stateParams.unitID)
			.success(function(data){
				$scope.others = data;
			});

		$scope.show = function(id){
			$state.go('main.units', {'assetID': $stateParams.assetID, 'unitID': id});
		};
	}]);
adminModule
	.controller('hardDiskUnitToolbarController', ['$scope', '$state', '$stateParams', 'HardDisk', function($scope, $state, $stateParams, HardDisk){
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

		HardDisk.show($stateParams.unitID)
			.success(function(data){
				$scope.toolbar.parentState = data.model;
				$scope.toolbar.childState = data.capacity;
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
	.controller('addHeadsetDialogController', ['$scope', '$state', '$mdDialog', 'Preloader', 'Headset', function($scope, $state, $mdDialog, Preloader, Headset){
		$scope.headset = {};

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.submit = function(){
			/* Starts Preloader */
			Preloader.preload();
			/**
			 * Stores Single Record
			*/
			Headset.store($scope.headset)
				.then(function(){
					// Stops Preloader 
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		}

	}]);
adminModule
	.controller('headsetContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'Headset', function($scope, $state, $stateParams, $mdDialog, Preloader, Headset){
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
			$scope.headset.paginated = {};
			$scope.headset.page = 2;
			Headset.paginate()
				.then(function(data){
					$scope.headset.paginated = data.data;
					$scope.headset.paginated.show = true;
					// stop preload
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		};

		/**
		 * Object for content view
		 *
		*/
		$scope.fab = {};

		$scope.fab.icon = 'mdi-plus';
		$scope.fab.label = 'Add';
		$scope.fab.tooltip = 'Add Headset';
		$scope.fab.show = true;

		$scope.fab.action = function(){
		    $mdDialog.show({
		      	controller: 'addHeadsetDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-headset-dialog.template.html',
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
		 * Object for Headset
		 *
		*/
		$scope.headset = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.headset.page = 2;

		Headset.paginate()
			.then(function(data){
				$scope.headset.paginated = data.data;
				$scope.headset.paginated.show = true;

				$scope.headset.paginateLoad = function(){
					// kills the function if ajax is busy or pagination reaches last page
					if($scope.headset.busy || ($scope.headset.page > $scope.headset.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.headset.busy = true;

					// Calls the next page of pagination.
					Headset.paginate($scope.headset.page)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.headset.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.headset.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.headset.busy = false;
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
			$scope.headset.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.headset.paginated.show = false;
			Preloader.preload();
			Headset.search($scope.headset)
				.success(function(data){
					$scope.headset.results = data;
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
	.controller('headsetToolbarController', ['$scope', 'Headset', function($scope, Headset){
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
		$scope.toolbar.childState = 'Headset';
	}]);
adminModule
	.controller('headsetUnitContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'AssetTag', function($scope, $state, $stateParams, $mdDialog, Preloader, AssetTag){
		var unitID = $stateParams.unitID;
		var query = {};

		query.component_id = unitID;
		query.component_type = 'Headset';

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
			// clear headset
			$scope.headset.paginated = {};
			$scope.headset.results = null;
			$scope.headset.page = 2;
			AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.headset.paginated = data.data;
				$scope.headset.paginated.show = true;

				$scope.headset.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.headset.busy || ($scope.headset.page > $scope.headset.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.headset.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.headset.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.headset.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.headset.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.headset.busy = false;
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
			// clear headset
			$scope.headset.paginated = {};
			$scope.headset.results = null;
			$scope.headset.page = 2;
			AssetTag.repairUnit(1, query)
			.then(function(data){
				$scope.listType = 'Under Repair'
				$scope.headset.paginated = data.data;
				$scope.headset.paginated.show = true;

				$scope.headset.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.headset.busy || ($scope.headset.page > $scope.headset.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.headset.busy = true;

					// Calls the next page of pagination.
					AssetTag.repairUnit($scope.headset.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.headset.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.headset.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.headset.busy = false;
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
			// clear headset
			$scope.headset.paginated = {};
			$scope.headset.results = null;
			$scope.headset.page = 2;
			AssetTag.disposeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Disposed'
				$scope.headset.paginated = data.data;
				$scope.headset.paginated.show = true;

				$scope.headset.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.headset.busy || ($scope.headset.page > $scope.headset.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.headset.busy = true;

					// Calls the next page of pagination.
					AssetTag.disposeUnit($scope.headset.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.headset.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.headset.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.headset.busy = false;
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
		 * Object for headset
		 *
		*/
		$scope.headset = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.headset.page = 2;
		// 
		
		AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.headset.paginated = data.data;
				$scope.headset.paginated.show = true;

				$scope.headset.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.headset.busy || ($scope.headset.page > $scope.headset.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.headset.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.headset.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.headset.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.headset.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.headset.busy = false;
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
			$scope.headset.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.headset.paginated.show = false;
			Preloader.preload();
			var query = {};
			query.userInput = $scope.headset.userInput;
			query.component_id = unitID;
			query.component_type = 'Headset';
			query.table_name = 'headsets';
			query.property_code = 'PHDS';
			AssetTag.search(query)
				.success(function(data){
					$scope.headset.results = data;
					Preloader.stop();
				})
				.error(function(data){
					Preloader.error();
				});
		};

		$scope.repaired = function(id){
			AssetTag.active(id)
				.success(function(){
					$scope.subheader.repairUnit();
				})
				.error(function(){
					Preloader.error();
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
	}]);

adminModule
	.controller('headsetUnitRightSidenavController', ['$scope', '$state', '$stateParams', 'Headset', function($scope, $state, $stateParams, Headset){
		$scope.asset = 'Headset';

		Headset.other($stateParams.unitID)
			.success(function(data){
				$scope.others = data;
			});

		$scope.show = function(id){
			$state.go('main.units', {'assetID': $stateParams.assetID, 'unitID': id});
		};
	}]);
adminModule
	.controller('headsetUnitToolbarController', ['$scope', '$state', '$stateParams', 'Headset', function($scope, $state, $stateParams, Headset){
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

		Headset.show($stateParams.unitID)
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
	.controller('addMemoryDialogController', ['$scope', '$state', '$mdDialog', 'Preloader', 'Memory', function($scope, $state, $mdDialog, Preloader, Memory){
		$scope.memory = {};

		$scope.memory.types = [
			{'type': 'DDR2 / DIMM'},
			{'type': 'DDR2 / SO-DIMM'},
			{'type': 'DDR3 / DIMM'},
			{'type': 'DDR3 / SO-DIMM'},
		];

		$scope.memory.sizes = [
			{'size': '1GB'},
			{'size': '2GB'},
			{'size': '4GB'},
			{'size': '8GB'},
		];

		$scope.memory.DDR2_speeds = [
			{'speed':'400MHz'},
			{'speed':'533MHz'},
			{'speed':'667MHz'},
			{'speed':'800MHz'},
			{'speed':'1066MHz'},
		];

		$scope.memory.DDR3_speeds = [
			{'speed':'800MHz'},
			{'speed':'1066MHz'},
			{'speed':'1333MHz'},
			{'speed':'1600MHz'},
			{'speed':'1866MHz'},
			{'speed':'2133MHz'},
		];

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.submit = function(){
			/* Starts Preloader */
			Preloader.preload();
			/**
			 * Stores Single Record
			*/
			Memory.store($scope.memory)
				.then(function(){
					// Stops Preloader 
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		}
	}]);
adminModule
	.controller('memoryContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'Memory', function($scope, $state, $stateParams, $mdDialog, Preloader, Memory){
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
			$scope.memory.paginated = {};
			$scope.memory.page = 2;
			Memory.paginate()
				.then(function(data){
					$scope.memory.paginated = data.data;
					$scope.memory.paginated.show = true;
					// stop preload
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		};

		/**
		 * Object for content view
		 *
		*/
		$scope.fab = {};

		$scope.fab.icon = 'mdi-plus';
		$scope.fab.label = 'Add';
		$scope.fab.tooltip = 'Add Memory';
		$scope.fab.show = true;

		$scope.fab.action = function(){
		    $mdDialog.show({
		      	controller: 'addMemoryDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-memory-dialog.template.html',
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
		 * Object for Headset
		 *
		*/
		$scope.memory = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.memory.page = 2;

		Memory.paginate()
			.then(function(data){
				$scope.memory.paginated = data.data;
				$scope.memory.paginated.show = true;

				$scope.memory.paginateLoad = function(){
					// kills the function if ajax is busy or pagination reaches last page
					if($scope.memory.busy || ($scope.memory.page > $scope.memory.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.memory.busy = true;

					// Calls the next page of pagination.
					Memory.paginate($scope.memory.page)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.memory.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.memory.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.memory.busy = false;
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
			$scope.memory.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.memory.paginated.show = false;
			Preloader.preload();
			Memory.search($scope.memory)
				.success(function(data){
					$scope.memory.results = data;
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
	.controller('memoryToolbarController', ['$scope', '$stateParams', 'Memory', function($scope, $stateParams, Memory){
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
		$scope.toolbar.childState = 'Memory';
	}]);
adminModule
	.controller('memoryUnitContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'AssetTag', function($scope, $state, $stateParams, $mdDialog, Preloader, AssetTag){
		var unitID = $stateParams.unitID;
		var query = {};

		query.component_id = unitID;
		query.component_type = 'Memory';

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
			// clear memory
			$scope.memory.paginated = {};
			$scope.memory.results = null;
			$scope.memory.page = 2;
			AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.memory.paginated = data.data;
				$scope.memory.paginated.show = true;

				$scope.memory.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.memory.busy || ($scope.memory.page > $scope.memory.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.memory.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.memory.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.memory.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.memory.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.memory.busy = false;
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
			// clear memory
			$scope.memory.paginated = {};
			$scope.memory.results = null;
			$scope.memory.page = 2;
			AssetTag.repairUnit(1, query)
			.then(function(data){
				$scope.listType = 'Under Repair'
				$scope.memory.paginated = data.data;
				$scope.memory.paginated.show = true;

				$scope.memory.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.memory.busy || ($scope.memory.page > $scope.memory.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.memory.busy = true;

					// Calls the next page of pagination.
					AssetTag.repairUnit($scope.memory.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.memory.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.memory.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.memory.busy = false;
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
			// clear memory
			$scope.memory.paginated = {};
			$scope.memory.results = null;
			$scope.memory.page = 2;
			AssetTag.disposeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Disposed'
				$scope.memory.paginated = data.data;
				$scope.memory.paginated.show = true;

				$scope.memory.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.memory.busy || ($scope.memory.page > $scope.memory.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.memory.busy = true;

					// Calls the next page of pagination.
					AssetTag.disposeUnit($scope.memory.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.memory.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.memory.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.memory.busy = false;
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
		 * Object for memory
		 *
		*/
		$scope.memory = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.memory.page = 2;
		// 
		
		AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.memory.paginated = data.data;
				$scope.memory.paginated.show = true;

				$scope.memory.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.memory.busy || ($scope.memory.page > $scope.memory.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.memory.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.memory.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.memory.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.memory.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.memory.busy = false;
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
			$scope.memory.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.memory.paginated.show = false;
			Preloader.preload();
			var query = {};
			query.userInput = $scope.memory.userInput;
			query.component_id = unitID;
			query.component_type = 'Memory';
			query.table_name = 'memories';
			query.property_code = 'PRAM';
			AssetTag.search(query)
				.success(function(data){
					$scope.memory.results = data;
					Preloader.stop();
				})
				.error(function(data){
					Preloader.error();
				});
		};

		$scope.repaired = function(id){
			AssetTag.active(id)
				.success(function(){
					$scope.subheader.repairUnit();
				})
				.error(function(){
					Preloader.error();
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
	}]);

adminModule
	.controller('memoryUnitRightSidenavController', ['$scope', '$state', '$stateParams', 'Memory', function($scope, $state, $stateParams, Memory){
		$scope.asset = 'Memory';

		Memory.other($stateParams.unitID)
			.success(function(data){
				$scope.others = data;
			});

		$scope.show = function(id){
			$state.go('main.units', {'assetID': $stateParams.assetID, 'unitID': id});
		};
	}]);
adminModule
	.controller('memoryUnitToolbarController', ['$scope', '$state', '$stateParams', 'Memory', function($scope, $state, $stateParams, Memory){
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

		Memory.show($stateParams.unitID)
			.success(function(data){
				$scope.toolbar.parentState = data.brand;
				$scope.toolbar.childState = data.size;
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
	.controller('addMacDialogController', ['$scope', '$state', '$mdDialog', 'Preloader', 'Mac', function($scope, $state, $mdDialog, Preloader, Mac){
		$scope.mac = {};

		$scope.types = [
			{'name':'iMac'},
			{'name':'Mac Mini'},
		];

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.submit = function(){
			/* Starts Preloader */
			Preloader.preload();
			/**
			 * Stores Single Record
			*/
			Mac.store($scope.mac)
				.then(function(){
					// Stops Preloader 
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		}

	}]);
adminModule
	.controller('macContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'Mac', function($scope, $state, $stateParams, $mdDialog, Preloader, Mac){
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
			$scope.mac.paginated = {};
			$scope.mac.page = 2;
			Mac.paginate()
				.then(function(data){
					$scope.mac.paginated = data.data;
					$scope.mac.paginated.show = true;
					// stop preload
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		};

		/**
		 * Object for content view
		 *
		*/
		$scope.fab = {};

		$scope.fab.icon = 'mdi-plus';
		$scope.fab.label = 'Add';
		$scope.fab.tooltip = 'Add Mac';
		$scope.fab.show = true;

		$scope.fab.action = function(){
		    $mdDialog.show({
		      	controller: 'addMacDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-mac-dialog.template.html',
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
		 * Object for mac
		 *
		*/
		$scope.mac = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.mac.page = 2;

		Mac.paginate()
			.then(function(data){
				$scope.mac.paginated = data.data;
				$scope.mac.paginated.show = true;

				$scope.mac.paginateLoad = function(){
					// kills the function if ajax is busy or pagination reaches last page
					if($scope.mac.busy || ($scope.mac.page > $scope.mac.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.mac.busy = true;

					// Calls the next page of pagination.
					Mac.paginate($scope.mac.page)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.mac.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.mac.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.mac.busy = false;
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
			$scope.mac.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.mac.paginated.show = false;
			Preloader.preload();
			Mac.search($scope.mac)
				.success(function(data){
					$scope.mac.results = data;
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
	.controller('macToolbarController', ['$scope', 'Mac', function($scope, Mac){
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
		$scope.toolbar.childState = 'Mac';
	}]);
adminModule
	.controller('macUnitContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'AssetTag', function($scope, $state, $stateParams, $mdDialog, Preloader, AssetTag){
		var unitID = $stateParams.unitID;
		var query = {};

		query.component_id = unitID;
		query.component_type = 'Mac';

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
			// clear mac
			$scope.mac.paginated = {};
			$scope.mac.results = null;
			$scope.mac.page = 2;
			AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.mac.paginated = data.data;
				$scope.mac.paginated.show = true;

				$scope.mac.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.mac.busy || ($scope.mac.page > $scope.mac.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.mac.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.mac.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.mac.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.mac.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.mac.busy = false;
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
			// clear mac
			$scope.mac.paginated = {};
			$scope.mac.results = null;
			$scope.mac.page = 2;
			AssetTag.repairUnit(1, query)
			.then(function(data){
				$scope.listType = 'Under Repair'
				$scope.mac.paginated = data.data;
				$scope.mac.paginated.show = true;

				$scope.mac.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.mac.busy || ($scope.mac.page > $scope.mac.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.mac.busy = true;

					// Calls the next page of pagination.
					AssetTag.repairUnit($scope.mac.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.mac.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.mac.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.mac.busy = false;
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
			// clear mac
			$scope.mac.paginated = {};
			$scope.mac.results = null;
			$scope.mac.page = 2;
			AssetTag.disposeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Disposed'
				$scope.mac.paginated = data.data;
				$scope.mac.paginated.show = true;

				$scope.mac.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.mac.busy || ($scope.mac.page > $scope.mac.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.mac.busy = true;

					// Calls the next page of pagination.
					AssetTag.disposeUnit($scope.mac.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.mac.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.mac.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.mac.busy = false;
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
		 * Object for mac
		 *
		*/
		$scope.mac = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.mac.page = 2;
		// 
		
		AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.mac.paginated = data.data;
				$scope.mac.paginated.show = true;

				$scope.mac.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.mac.busy || ($scope.mac.page > $scope.mac.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.mac.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.mac.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.mac.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.mac.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.mac.busy = false;
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
			$scope.mac.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.mac.paginated.show = false;
			Preloader.preload();
			var query = {};
			query.userInput = $scope.mac.userInput;
			query.component_id = unitID;
			query.component_type = 'Mac';
			query.table_name = 'macs';
			query.property_code = 'PMAC';
			AssetTag.search(query)
				.success(function(data){
					$scope.mac.results = data;
					Preloader.stop();
				})
				.error(function(data){
					Preloader.error();
				});
		};

		$scope.repaired = function(id){
			AssetTag.active(id)
				.success(function(){
					$scope.subheader.repairUnit();
				})
				.error(function(){
					Preloader.error();
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
	}]);

adminModule
	.controller('macUnitRightSidenavController', ['$scope', '$state', '$stateParams', 'Mac', function($scope, $state, $stateParams, Mac){
		$scope.asset = 'Mac';

		Mac.other($stateParams.unitID)
			.success(function(data){
				$scope.others = data;
			});

		$scope.show = function(id){
			$state.go('main.units', {'assetID': $stateParams.assetID, 'unitID': id});
		};
	}]);
adminModule
	.controller('macUnitToolbarController', ['$scope', '$state', '$stateParams', 'Mac', function($scope, $state, $stateParams, Mac){
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

		Mac.show($stateParams.unitID)
			.success(function(data){
				$scope.toolbar.parentState = data.type;
				$scope.toolbar.childState = data.processor;
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
	.controller('addOtherComponentDialogController', ['$scope', '$state', '$mdDialog', 'Preloader', 'OtherComponent', function($scope, $state, $mdDialog, Preloader, OtherComponent){
		$scope.otherComponent = {};

		$scope.otherComponent.sizes = [
			{'size':'1GB'},
			{'size':'2GB'},
		];

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.submit = function(){
			/* Starts Preloader */
			Preloader.preload();
			/**
			 * Stores Single Record
			*/
			OtherComponent.store($scope.otherComponent)
				.then(function(){
					// Stops Preloader 
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		}
	}]);
adminModule
	.controller('otherComponentContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'OtherComponent', function($scope, $state, $stateParams, $mdDialog, Preloader, OtherComponent){
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
			$scope.otherComponent.paginated = {};
			$scope.otherComponent.page = 2;
			OtherComponent.paginate()
				.then(function(data){
					$scope.otherComponent.paginated = data.data;
					$scope.otherComponent.paginated.show = true;
					// stop preload
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		};

		/**
		 * Object for content view
		 *
		*/
		$scope.fab = {};

		$scope.fab.icon = 'mdi-plus';
		$scope.fab.label = 'Add';
		$scope.fab.tooltip = 'Add Other Component';
		$scope.fab.show = true;

		$scope.fab.action = function(){
		    $mdDialog.show({
		      	controller: 'addOtherComponentDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-other-component-dialog.template.html',
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
		 * Object for otherComponent
		 *
		*/
		$scope.otherComponent = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.otherComponent.page = 2;

		OtherComponent.paginate()
			.then(function(data){
				$scope.otherComponent.paginated = data.data;
				$scope.otherComponent.paginated.show = true;

				$scope.otherComponent.paginateLoad = function(){
					// kills the function if ajax is busy or pagination reaches last page
					if($scope.otherComponent.busy || ($scope.otherComponent.page > $scope.otherComponent.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.otherComponent.busy = true;

					// Calls the next page of pagination.
					OtherComponent.paginate($scope.otherComponent.page)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.otherComponent.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.otherComponent.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.otherComponent.busy = false;
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
			$scope.otherComponent.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.otherComponent.paginated.show = false;
			Preloader.preload();
			OtherComponent.search($scope.otherComponent)
				.success(function(data){
					$scope.otherComponent.results = data;
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
	.controller('otherComponentToolbarController', ['$scope', '$stateParams', 'OtherComponent', function($scope, $stateParams, OtherComponent){
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
		$scope.toolbar.childState = 'Other Component';
	}]);
adminModule
	.controller('otherComponentUnitContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'AssetTag', function($scope, $state, $stateParams, $mdDialog, Preloader, AssetTag){
		var unitID = $stateParams.unitID;
		var query = {};

		query.component_id = unitID;
		query.component_type = 'Other Component';

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
			// clear otherComponent
			$scope.otherComponent.paginated = {};
			$scope.otherComponent.results = null;
			$scope.otherComponent.page = 2;
			AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.otherComponent.paginated = data.data;
				$scope.otherComponent.paginated.show = true;

				$scope.otherComponent.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.otherComponent.busy || ($scope.otherComponent.page > $scope.otherComponent.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.otherComponent.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.otherComponent.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.otherComponent.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.otherComponent.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.otherComponent.busy = false;
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
			// clear otherComponent
			$scope.otherComponent.paginated = {};
			$scope.otherComponent.results = null;
			$scope.otherComponent.page = 2;
			AssetTag.repairUnit(1, query)
			.then(function(data){
				$scope.listType = 'Under Repair'
				$scope.otherComponent.paginated = data.data;
				$scope.otherComponent.paginated.show = true;

				$scope.otherComponent.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.otherComponent.busy || ($scope.otherComponent.page > $scope.otherComponent.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.otherComponent.busy = true;

					// Calls the next page of pagination.
					AssetTag.repairUnit($scope.otherComponent.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.otherComponent.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.otherComponent.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.otherComponent.busy = false;
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
			// clear otherComponent
			$scope.otherComponent.paginated = {};
			$scope.otherComponent.results = null;
			$scope.otherComponent.page = 2;
			AssetTag.disposeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Disposed'
				$scope.otherComponent.paginated = data.data;
				$scope.otherComponent.paginated.show = true;

				$scope.otherComponent.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.otherComponent.busy || ($scope.otherComponent.page > $scope.otherComponent.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.otherComponent.busy = true;

					// Calls the next page of pagination.
					AssetTag.disposeUnit($scope.otherComponent.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.otherComponent.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.otherComponent.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.otherComponent.busy = false;
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
		 * Object for otherComponent
		 *
		*/
		$scope.otherComponent = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.otherComponent.page = 2;
		// 
		
		AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.otherComponent.paginated = data.data;
				$scope.otherComponent.paginated.show = true;

				$scope.otherComponent.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.otherComponent.busy || ($scope.otherComponent.page > $scope.otherComponent.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.otherComponent.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.otherComponent.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.otherComponent.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.otherComponent.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.otherComponent.busy = false;
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
			$scope.otherComponent.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.otherComponent.paginated.show = false;
			Preloader.preload();
			var query = {};
			query.userInput = $scope.otherComponent.userInput;
			query.component_id = unitID;
			query.component_type = 'Other Component';
			query.table_name = 'other_components';
			query.property_code = 'POTH';
			AssetTag.search(query)
				.success(function(data){
					$scope.otherComponent.results = data;
					Preloader.stop();
				})
				.error(function(data){
					Preloader.error();
				});
		};

		$scope.repaired = function(id){
			AssetTag.active(id)
				.success(function(){
					$scope.subheader.repairUnit();
				})
				.error(function(){
					Preloader.error();
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
	}]);

adminModule
	.controller('otherComponentUnitRightSidenavController', ['$scope', '$state', '$stateParams', 'OtherComponent', function($scope, $state, $stateParams, OtherComponent){
		$scope.asset = 'Component';

		OtherComponent.other($stateParams.unitID)
			.success(function(data){
				$scope.others = data;
			});

		$scope.show = function(id){
			$state.go('main.units', {'assetID': $stateParams.assetID, 'unitID': id});
		};
	}]);
adminModule
	.controller('otherComponentUnitToolbarController', ['$scope', '$state', '$stateParams', 'OtherComponent', function($scope, $state, $stateParams, OtherComponent){
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

		OtherComponent.show($stateParams.unitID)
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
	.controller('addMonitorDialogController', ['$scope', '$state', '$mdDialog', 'Preloader', 'Monitor', function($scope, $state, $mdDialog, Preloader, Monitor){
		$scope.monitor = {};

		$scope.monitor.sizes = [
			{'size':'16"'},
			{'size':'16.5"'},
			{'size':'17"'},
			{'size':'17.5"'},
			{'size':'18"'},
			{'size':'18.5"'},
			{'size':'19"'},
			{'size':'19.5"'},
			{'size':'20"'},
		];

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.submit = function(){
			/* Starts Preloader */
			Preloader.preload();
			/**
			 * Stores Single Record
			*/
			Monitor.store($scope.monitor)
				.then(function(){
					// Stops Preloader 
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		}
	}]);
adminModule
	.controller('monitorContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'Monitor', function($scope, $state, $stateParams, $mdDialog, Preloader, Monitor){
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
			$scope.monitor.paginated = {};
			$scope.monitor.page = 2;
			Monitor.paginate()
				.then(function(data){
					$scope.monitor.paginated = data.data;
					$scope.monitor.paginated.show = true;
					// stop preload
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		};

		/**
		 * Object for content view
		 *
		*/
		$scope.fab = {};

		$scope.fab.icon = 'mdi-plus';
		$scope.fab.label = 'Add';
		$scope.fab.tooltip = 'Add Monitor';		
		$scope.fab.show = true;

		$scope.fab.action = function(){
		    $mdDialog.show({
		      	controller: 'addMonitorDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-monitor-dialog.template.html',
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
		 * Object for Headset
		 *
		*/
		$scope.monitor = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.monitor.page = 2;

		Monitor.paginate()
			.then(function(data){
				$scope.monitor.paginated = data.data;
				$scope.monitor.paginated.show = true;

				$scope.monitor.paginateLoad = function(){
					// kills the function if ajax is busy or pagination reaches last page
					if($scope.monitor.busy || ($scope.monitor.page > $scope.monitor.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.monitor.busy = true;

					// Calls the next page of pagination.
					Monitor.paginate($scope.monitor.page)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.monitor.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.monitor.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.monitor.busy = false;
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
			$scope.monitor.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.monitor.paginated.show = false;
			Preloader.preload();
			Monitor.search($scope.monitor)
				.success(function(data){
					$scope.monitor.results = data;
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
	.controller('monitorToolbarController', ['$scope', '$stateParams', 'Monitor', function($scope, $stateParams, Monitor){
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
		$scope.toolbar.childState = 'Monitor';
	}]);
adminModule
	.controller('monitorUnitContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'AssetTag', function($scope, $state, $stateParams, $mdDialog, Preloader, AssetTag){
		var unitID = $stateParams.unitID;
		var query = {};

		query.component_id = unitID;
		query.component_type = 'Monitor';

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
			// clear monitor
			$scope.monitor.paginated = {};
			$scope.monitor.results = null;
			$scope.monitor.page = 2;
			AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.monitor.paginated = data.data;
				$scope.monitor.paginated.show = true;

				$scope.monitor.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.monitor.busy || ($scope.monitor.page > $scope.monitor.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.monitor.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.monitor.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.monitor.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.monitor.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.monitor.busy = false;
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
			// clear monitor
			$scope.monitor.paginated = {};
			$scope.monitor.results = null;
			$scope.monitor.page = 2;
			AssetTag.repairUnit(1, query)
			.then(function(data){
				$scope.listType = 'Under Repair'
				$scope.monitor.paginated = data.data;
				$scope.monitor.paginated.show = true;

				$scope.monitor.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.monitor.busy || ($scope.monitor.page > $scope.monitor.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.monitor.busy = true;

					// Calls the next page of pagination.
					AssetTag.repairUnit($scope.monitor.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.monitor.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.monitor.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.monitor.busy = false;
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
			// clear monitor
			$scope.monitor.paginated = {};
			$scope.monitor.results = null;
			$scope.monitor.page = 2;
			AssetTag.disposeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Disposed'
				$scope.monitor.paginated = data.data;
				$scope.monitor.paginated.show = true;

				$scope.monitor.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.monitor.busy || ($scope.monitor.page > $scope.monitor.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.monitor.busy = true;

					// Calls the next page of pagination.
					AssetTag.disposeUnit($scope.monitor.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.monitor.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.monitor.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.monitor.busy = false;
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
		 * Object for monitor
		 *
		*/
		$scope.monitor = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.monitor.page = 2;
		// 
		
		AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.monitor.paginated = data.data;
				$scope.monitor.paginated.show = true;

				$scope.monitor.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.monitor.busy || ($scope.monitor.page > $scope.monitor.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.monitor.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.monitor.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.monitor.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.monitor.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.monitor.busy = false;
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
			$scope.monitor.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.monitor.paginated.show = false;
			Preloader.preload();
			var query = {};
			query.userInput = $scope.monitor.userInput;
			query.component_id = unitID;
			query.component_type = 'Monitor';
			query.table_name = 'monitors';
			query.property_code = 'PMON';
			AssetTag.search(query)
				.success(function(data){
					$scope.monitor.results = data;
					Preloader.stop();
				})
				.error(function(data){
					Preloader.error();
				});
		};

		$scope.repaired = function(id){
			AssetTag.active(id)
				.success(function(){
					$scope.subheader.repairUnit();
				})
				.error(function(){
					Preloader.error();
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
	}]);

adminModule
	.controller('monitorUnitRightSidenavController', ['$scope', '$state', '$stateParams', 'Monitor', function($scope, $state, $stateParams, Monitor){
		$scope.asset = 'Monitor';

		Monitor.other($stateParams.unitID)
			.success(function(data){
				$scope.others = data;
			});

		$scope.show = function(id){
			$state.go('main.units', {'assetID': $stateParams.assetID, 'unitID': id});
		};
	}]);
adminModule
	.controller('monitorUnitToolbarController', ['$scope', '$state', '$stateParams', 'Monitor', function($scope, $state, $stateParams, Monitor){
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

		Monitor.show($stateParams.unitID)
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
	.controller('addMouseDialogController', ['$scope', '$state', '$mdDialog', 'Preloader', 'Mouse', function($scope, $state, $mdDialog, Preloader, Mouse){
		$scope.mouse = {};

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.submit = function(){
			/* Starts Preloader */
			Preloader.preload();
			/**
			 * Stores Single Record
			*/
			Mouse.store($scope.mouse)
				.then(function(){
					// Stops Preloader 
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		}
	}]);
adminModule
	.controller('mouseContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'Mouse', function($scope, $state, $stateParams, $mdDialog, Preloader, Mouse){
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
			$scope.mouse.paginated = {};
			$scope.mouse.page = 2;
			Mouse.paginate()
				.then(function(data){
					$scope.mouse.paginated = data.data;
					$scope.mouse.paginated.show = true;
					// stop preload
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		};

		/**
		 * Object for content view
		 *
		*/
		$scope.fab = {};

		$scope.fab.icon = 'mdi-plus';
		$scope.fab.label = 'Add';
		$scope.fab.tooltip = 'Add Mouse';
		$scope.fab.show = true;

		$scope.fab.action = function(){
		    $mdDialog.show({
		      	controller: 'addMouseDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-mouse-dialog.template.html',
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
		 * Object for Headset
		 *
		*/
		$scope.mouse = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.mouse.page = 2;

		Mouse.paginate()
			.then(function(data){
				$scope.mouse.paginated = data.data;
				$scope.mouse.paginated.show = true;

				$scope.mouse.paginateLoad = function(){
					// kills the function if ajax is busy or pagination reaches last page
					if($scope.mouse.busy || ($scope.mouse.page > $scope.mouse.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.mouse.busy = true;

					// Calls the next page of pagination.
					Mouse.paginate($scope.mouse.page)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.mouse.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.mouse.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.mouse.busy = false;
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
			$scope.mouse.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.mouse.paginated.show = false;
			Preloader.preload();
			Mouse.search($scope.mouse)
				.success(function(data){
					$scope.mouse.results = data;
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
	.controller('mouseToolbarController', ['$scope', '$stateParams', 'Mouse', function($scope, $stateParams, Mouse){
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
		$scope.toolbar.childState = 'Mouse';
	}]);
adminModule
	.controller('mouseUnitContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'AssetTag', function($scope, $state, $stateParams, $mdDialog, Preloader, AssetTag){
		var unitID = $stateParams.unitID;
		var query = {};

		query.component_id = unitID;
		query.component_type = 'Mouse';

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
			// clear mouse
			$scope.mouse.paginated = {};
			$scope.mouse.results = null;
			$scope.mouse.page = 2;
			AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.mouse.paginated = data.data;
				$scope.mouse.paginated.show = true;

				$scope.mouse.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.mouse.busy || ($scope.mouse.page > $scope.mouse.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.mouse.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.mouse.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.mouse.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.mouse.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.mouse.busy = false;
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
			// clear mouse
			$scope.mouse.paginated = {};
			$scope.mouse.results = null;
			$scope.mouse.page = 2;
			AssetTag.repairUnit(1, query)
			.then(function(data){
				$scope.listType = 'Under Repair'
				$scope.mouse.paginated = data.data;
				$scope.mouse.paginated.show = true;

				$scope.mouse.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.mouse.busy || ($scope.mouse.page > $scope.mouse.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.mouse.busy = true;

					// Calls the next page of pagination.
					AssetTag.repairUnit($scope.mouse.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.mouse.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.mouse.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.mouse.busy = false;
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
			// clear mouse
			$scope.mouse.paginated = {};
			$scope.mouse.results = null;
			$scope.mouse.page = 2;
			AssetTag.disposeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Disposed'
				$scope.mouse.paginated = data.data;
				$scope.mouse.paginated.show = true;

				$scope.mouse.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.mouse.busy || ($scope.mouse.page > $scope.mouse.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.mouse.busy = true;

					// Calls the next page of pagination.
					AssetTag.disposeUnit($scope.mouse.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.mouse.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.mouse.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.mouse.busy = false;
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
		 * Object for mouse
		 *
		*/
		$scope.mouse = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.mouse.page = 2;
		// 
		
		AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.mouse.paginated = data.data;
				$scope.mouse.paginated.show = true;

				$scope.mouse.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.mouse.busy || ($scope.mouse.page > $scope.mouse.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.mouse.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.mouse.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.mouse.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.mouse.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.mouse.busy = false;
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
			$scope.mouse.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.mouse.paginated.show = false;
			Preloader.preload();
			var query = {};
			query.userInput = $scope.mouse.userInput;
			query.component_id = unitID;
			query.component_type = 'Mouse';
			query.table_name = 'mice';
			query.property_code = 'PMSE';
			AssetTag.search(query)
				.success(function(data){
					$scope.mouse.results = data;
					Preloader.stop();
				})
				.error(function(data){
					Preloader.error();
				});
		};

		$scope.repaired = function(id){
			AssetTag.active(id)
				.success(function(){
					$scope.subheader.repairUnit();
				})
				.error(function(){
					Preloader.error();
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
	}]);

adminModule
	.controller('mouseUnitRightSidenavController', ['$scope', '$state', '$stateParams', 'Mouse', function($scope, $state, $stateParams, Mouse){
		$scope.asset = 'Mouse';

		Mouse.other($stateParams.unitID)
			.success(function(data){
				$scope.others = data;
			});

		$scope.show = function(id){
			$state.go('main.units', {'assetID': $stateParams.assetID, 'unitID': id});
		};
	}]);
adminModule
	.controller('mouseUnitToolbarController', ['$scope', '$state', '$stateParams', 'Mouse', function($scope, $state, $stateParams, Mouse){
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

		Mouse.show($stateParams.unitID)
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
	.controller('addPortableHardDiskDialogController', ['$scope', '$state', '$mdDialog', 'Preloader', 'PortableHardDisk', function($scope, $state, $mdDialog, Preloader, PortableHardDisk){
		$scope.portableHardDisk = {};

		$scope.portableHardDisk.capacities = [
			{'capacity':'500GB'},
			{'capacity':'650GB'},
			{'capacity':'1.0TB'},
			{'capacity':'2.0TB'},
		];

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.submit = function(){
			/* Starts Preloader */
			Preloader.preload();
			/**
			 * Stores Single Record
			*/
			PortableHardDisk.store($scope.portableHardDisk)
				.then(function(){
					// Stops Preloader 
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		}

	}]);
adminModule
	.controller('portableHardDiskContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'PortableHardDisk', function($scope, $state, $stateParams, $mdDialog, Preloader, PortableHardDisk){
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
			$scope.portableHardDisk.paginated = {};
			$scope.portableHardDisk.page = 2;
			PortableHardDisk.paginate()
				.then(function(data){
					$scope.portableHardDisk.paginated = data.data;
					$scope.portableHardDisk.paginated.show = true;
					// stop preload
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		};

		/**
		 * Object for content view
		 *
		*/
		$scope.fab = {};

		$scope.fab.icon = 'mdi-plus';
		$scope.fab.label = 'Add';
		$scope.fab.tooltip = 'Add Portable Hard Disk';
		$scope.fab.show = true;

		$scope.fab.action = function(){
		    $mdDialog.show({
		      	controller: 'addPortableHardDiskDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-portable-hard-disk-dialog.template.html',
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
		 * Object for portableHardDisk
		 *
		*/
		$scope.portableHardDisk = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.portableHardDisk.page = 2;

		PortableHardDisk.paginate()
			.then(function(data){
				$scope.portableHardDisk.paginated = data.data;
				$scope.portableHardDisk.paginated.show = true;

				$scope.portableHardDisk.paginateLoad = function(){
					// kills the function if ajax is busy or pagination reaches last page
					if($scope.portableHardDisk.busy || ($scope.portableHardDisk.page > $scope.portableHardDisk.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.portableHardDisk.busy = true;

					// Calls the next page of pagination.
					PortableHardDisk.paginate($scope.portableHardDisk.page)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.portableHardDisk.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.portableHardDisk.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.portableHardDisk.busy = false;
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
			$scope.portableHardDisk.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.portableHardDisk.paginated.show = false;
			Preloader.preload();
			PortableHardDisk.search($scope.portableHardDisk)
				.success(function(data){
					$scope.portableHardDisk.results = data;
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
	.controller('portableHardDiskToolbarController', ['$scope', 'PortableHardDisk', function($scope, PortableHardDisk){
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
		$scope.toolbar.childState = 'Portable Hard Disk';
	}]);
adminModule
	.controller('portableHardDiskUnitContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'AssetTag', function($scope, $state, $stateParams, $mdDialog, Preloader, AssetTag){
		var unitID = $stateParams.unitID;
		var query = {};

		query.component_id = unitID;
		query.component_type = 'Portable Hard Disk';

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
			// clear portableHardDisk
			$scope.portableHardDisk.paginated = {};
			$scope.portableHardDisk.results = null;
			$scope.portableHardDisk.page = 2;
			AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.portableHardDisk.paginated = data.data;
				$scope.portableHardDisk.paginated.show = true;

				$scope.portableHardDisk.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.portableHardDisk.busy || ($scope.portableHardDisk.page > $scope.portableHardDisk.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.portableHardDisk.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.portableHardDisk.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.portableHardDisk.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.portableHardDisk.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.portableHardDisk.busy = false;
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
			// clear portableHardDisk
			$scope.portableHardDisk.paginated = {};
			$scope.portableHardDisk.results = null;
			$scope.portableHardDisk.page = 2;
			AssetTag.repairUnit(1, query)
			.then(function(data){
				$scope.listType = 'Under Repair'
				$scope.portableHardDisk.paginated = data.data;
				$scope.portableHardDisk.paginated.show = true;

				$scope.portableHardDisk.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.portableHardDisk.busy || ($scope.portableHardDisk.page > $scope.portableHardDisk.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.portableHardDisk.busy = true;

					// Calls the next page of pagination.
					AssetTag.repairUnit($scope.portableHardDisk.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.portableHardDisk.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.portableHardDisk.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.portableHardDisk.busy = false;
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
			// clear portableHardDisk
			$scope.portableHardDisk.paginated = {};
			$scope.portableHardDisk.results = null;
			$scope.portableHardDisk.page = 2;
			AssetTag.disposeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Disposed'
				$scope.portableHardDisk.paginated = data.data;
				$scope.portableHardDisk.paginated.show = true;

				$scope.portableHardDisk.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.portableHardDisk.busy || ($scope.portableHardDisk.page > $scope.portableHardDisk.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.portableHardDisk.busy = true;

					// Calls the next page of pagination.
					AssetTag.disposeUnit($scope.portableHardDisk.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.portableHardDisk.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.portableHardDisk.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.portableHardDisk.busy = false;
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
		 * Object for portableHardDisk
		 *
		*/
		$scope.portableHardDisk = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.portableHardDisk.page = 2;
		// 
		
		AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.portableHardDisk.paginated = data.data;
				$scope.portableHardDisk.paginated.show = true;

				$scope.portableHardDisk.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.portableHardDisk.busy || ($scope.portableHardDisk.page > $scope.portableHardDisk.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.portableHardDisk.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.portableHardDisk.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.portableHardDisk.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.portableHardDisk.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.portableHardDisk.busy = false;
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
			$scope.portableHardDisk.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.portableHardDisk.paginated.show = false;
			Preloader.preload();
			var query = {};
			query.userInput = $scope.portableHardDisk.userInput;
			query.component_id = unitID;
			query.component_type = 'Portable Hard Disk';
			query.table_name = 'portable_hard_disks';
			query.property_code = 'PPHD';
			AssetTag.search(query)
				.success(function(data){
					$scope.portableHardDisk.results = data;
					Preloader.stop();
				})
				.error(function(data){
					Preloader.error();
				});
		};

		$scope.repaired = function(id){
			AssetTag.active(id)
				.success(function(){
					$scope.subheader.repairUnit();
				})
				.error(function(){
					Preloader.error();
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
	}]);

adminModule
	.controller('portableHardDiskUnitRightSidenavController', ['$scope', '$state', '$stateParams', 'PortableHardDisk', function($scope, $state, $stateParams, PortableHardDisk){
		$scope.asset = 'Portable Hard Disk';

		PortableHardDisk.other($stateParams.unitID)
			.success(function(data){
				$scope.others = data;
			});

		$scope.show = function(id){
			$state.go('main.units', {'assetID': $stateParams.assetID, 'unitID': id});
		};
	}]);
adminModule
	.controller('portableHardDiskUnitToolbarController', ['$scope', '$state', '$stateParams', 'PortableHardDisk', function($scope, $state, $stateParams, PortableHardDisk){
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

		PortableHardDisk.show($stateParams.unitID)
			.success(function(data){
				$scope.toolbar.parentState = data.model;
				$scope.toolbar.childState = data.capacity;
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
	.controller('addRouterDialogController', ['$scope', '$state', '$mdDialog', 'Preloader', 'Router', function($scope, $state, $mdDialog, Preloader, Router){
		$scope.router = {};

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.submit = function(){
			/* Starts Preloader */
			Preloader.preload();
			/**
			 * Stores Single Record
			*/
			Router.store($scope.router)
				.then(function(){
					// Stops Preloader 
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		}

	}]);
adminModule
	.controller('routerContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'Router', function($scope, $state, $stateParams, $mdDialog, Preloader, Router){
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
			$scope.router.paginated = {};
			$scope.router.page = 2;
			Router.paginate()
				.then(function(data){
					$scope.router.paginated = data.data;
					$scope.router.paginated.show = true;
					// stop preload
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		};

		/**
		 * Object for content view
		 *
		*/
		$scope.fab = {};

		$scope.fab.icon = 'mdi-plus';
		$scope.fab.label = 'Add';
		$scope.fab.tooltip = 'Add Router';
		$scope.fab.show = true;

		$scope.fab.action = function(){
		    $mdDialog.show({
		      	controller: 'addRouterDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-router-dialog.template.html',
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
		 * Object for router
		 *
		*/
		$scope.router = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.router.page = 2;

		Router.paginate()
			.then(function(data){
				$scope.router.paginated = data.data;
				$scope.router.paginated.show = true;

				$scope.router.paginateLoad = function(){
					// kills the function if ajax is busy or pagination reaches last page
					if($scope.router.busy || ($scope.router.page > $scope.router.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.router.busy = true;

					// Calls the next page of pagination.
					Router.paginate($scope.router.page)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.router.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.router.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.router.busy = false;
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
			$scope.router.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.router.paginated.show = false;
			Preloader.preload();
			Router.search($scope.router)
				.success(function(data){
					$scope.router.results = data;
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
	.controller('routerToolbarController', ['$scope', 'Router', function($scope, Router){
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
		$scope.toolbar.childState = 'Router';
	}]);
adminModule
	.controller('routerUnitContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'AssetTag', function($scope, $state, $stateParams, $mdDialog, Preloader, AssetTag){
		var unitID = $stateParams.unitID;
		var query = {};

		query.component_id = unitID;
		query.component_type = 'Router';

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
			// clear router
			$scope.router.paginated = {};
			$scope.router.results = null;
			$scope.router.page = 2;
			AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.router.paginated = data.data;
				$scope.router.paginated.show = true;

				$scope.router.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.router.busy || ($scope.router.page > $scope.router.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.router.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.router.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.router.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.router.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.router.busy = false;
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
			// clear router
			$scope.router.paginated = {};
			$scope.router.results = null;
			$scope.router.page = 2;
			AssetTag.repairUnit(1, query)
			.then(function(data){
				$scope.listType = 'Under Repair'
				$scope.router.paginated = data.data;
				$scope.router.paginated.show = true;

				$scope.router.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.router.busy || ($scope.router.page > $scope.router.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.router.busy = true;

					// Calls the next page of pagination.
					AssetTag.repairUnit($scope.router.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.router.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.router.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.router.busy = false;
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
			// clear router
			$scope.router.paginated = {};
			$scope.router.results = null;
			$scope.router.page = 2;
			AssetTag.disposeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Disposed'
				$scope.router.paginated = data.data;
				$scope.router.paginated.show = true;

				$scope.router.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.router.busy || ($scope.router.page > $scope.router.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.router.busy = true;

					// Calls the next page of pagination.
					AssetTag.disposeUnit($scope.router.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.router.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.router.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.router.busy = false;
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
		 * Object for router
		 *
		*/
		$scope.router = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.router.page = 2;
		// 
		
		AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.router.paginated = data.data;
				$scope.router.paginated.show = true;

				$scope.router.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.router.busy || ($scope.router.page > $scope.router.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.router.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.router.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.router.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.router.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.router.busy = false;
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
			$scope.router.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.router.paginated.show = false;
			Preloader.preload();
			var query = {};
			query.userInput = $scope.router.userInput;
			query.component_id = unitID;
			query.component_type = 'Router';
			query.table_name = 'routers';
			query.property_code = 'PRTR';
			AssetTag.search(query)
				.success(function(data){
					$scope.router.results = data;
					Preloader.stop();
				})
				.error(function(data){
					Preloader.error();
				});
		};

		$scope.repaired = function(id){
			AssetTag.active(id)
				.success(function(){
					$scope.subheader.repairUnit();
				})
				.error(function(){
					Preloader.error();
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
	}]);

adminModule
	.controller('routerUnitRightSidenavController', ['$scope', '$state', '$stateParams', 'Router', function($scope, $state, $stateParams, Router){
		$scope.asset = 'Router';

		Router.other($stateParams.unitID)
			.success(function(data){
				$scope.others = data;
			});

		$scope.show = function(id){
			$state.go('main.units', {'assetID': $stateParams.assetID, 'unitID': id});
		};
	}]);
adminModule
	.controller('routerUnitToolbarController', ['$scope', '$state', '$stateParams', 'Router', function($scope, $state, $stateParams, Router){
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

		Router.show($stateParams.unitID)
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
	.controller('addProjectorDialogController', ['$scope', '$state', '$mdDialog', 'Preloader', 'Projector', function($scope, $state, $mdDialog, Preloader, Projector){
		$scope.projector = {};

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.submit = function(){
			/* Starts Preloader */
			Preloader.preload();
			/**
			 * Stores Single Record
			*/
			Projector.store($scope.projector)
				.then(function(){
					// Stops Preloader 
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		}

	}]);
adminModule
	.controller('projectorContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'Projector', function($scope, $state, $stateParams, $mdDialog, Preloader, Projector){
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
			$scope.projector.paginated = {};
			$scope.projector.page = 2;
			Projector.paginate()
				.then(function(data){
					$scope.projector.paginated = data.data;
					$scope.projector.paginated.show = true;
					// stop preload
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		};

		/**
		 * Object for content view
		 *
		*/
		$scope.fab = {};

		$scope.fab.icon = 'mdi-plus';
		$scope.fab.label = 'Add';
		$scope.fab.tooltip = 'Add projector';
		$scope.fab.show = true;

		$scope.fab.action = function(){
		    $mdDialog.show({
		      	controller: 'addProjectorDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-projector-dialog.template.html',
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
		 * Object for projector
		 *
		*/
		$scope.projector = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.projector.page = 2;

		Projector.paginate()
			.then(function(data){
				$scope.projector.paginated = data.data;
				$scope.projector.paginated.show = true;

				$scope.projector.paginateLoad = function(){
					// kills the function if ajax is busy or pagination reaches last page
					if($scope.projector.busy || ($scope.projector.page > $scope.projector.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.projector.busy = true;

					// Calls the next page of pagination.
					Projector.paginate($scope.projector.page)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.projector.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.projector.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.projector.busy = false;
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
			$scope.projector.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.projector.paginated.show = false;
			Preloader.preload();
			Projector.search($scope.projector)
				.success(function(data){
					$scope.projector.results = data;
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
	.controller('projectorToolbarController', ['$scope', 'Projector', function($scope, Projector){
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
		$scope.toolbar.childState = 'Projector';
	}]);
adminModule
	.controller('projectorUnitContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'AssetTag', function($scope, $state, $stateParams, $mdDialog, Preloader, AssetTag){
		var unitID = $stateParams.unitID;
		var query = {};

		query.component_id = unitID;
		query.component_type = 'Projector';

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
			// clear projector
			$scope.projector.paginated = {};
			$scope.projector.results = null;
			$scope.projector.page = 2;
			AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.projector.paginated = data.data;
				$scope.projector.paginated.show = true;

				$scope.projector.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.projector.busy || ($scope.projector.page > $scope.projector.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.projector.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.projector.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.projector.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.projector.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.projector.busy = false;
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
			// clear projector
			$scope.projector.paginated = {};
			$scope.projector.results = null;
			$scope.projector.page = 2;
			AssetTag.repairUnit(1, query)
			.then(function(data){
				$scope.listType = 'Under Repair'
				$scope.projector.paginated = data.data;
				$scope.projector.paginated.show = true;

				$scope.projector.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.projector.busy || ($scope.projector.page > $scope.projector.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.projector.busy = true;

					// Calls the next page of pagination.
					AssetTag.repairUnit($scope.projector.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.projector.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.projector.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.projector.busy = false;
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
			// clear projector
			$scope.projector.paginated = {};
			$scope.projector.results = null;
			$scope.projector.page = 2;
			AssetTag.disposeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Disposed'
				$scope.projector.paginated = data.data;
				$scope.projector.paginated.show = true;

				$scope.projector.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.projector.busy || ($scope.projector.page > $scope.projector.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.projector.busy = true;

					// Calls the next page of pagination.
					AssetTag.disposeUnit($scope.projector.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.projector.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.projector.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.projector.busy = false;
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
		 * Object for projector
		 *
		*/
		$scope.projector = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.projector.page = 2;
		// 
		
		AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.projector.paginated = data.data;
				$scope.projector.paginated.show = true;

				$scope.projector.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.projector.busy || ($scope.projector.page > $scope.projector.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.projector.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.projector.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.projector.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.projector.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.projector.busy = false;
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
			$scope.projector.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.projector.paginated.show = false;
			Preloader.preload();
			var query = {};
			query.userInput = $scope.projector.userInput;
			query.component_id = unitID;
			query.component_type = 'Projector';
			query.table_name = 'projectors';
			query.property_code = 'PPRJ';
			AssetTag.search(query)
				.success(function(data){
					$scope.projector.results = data;
					Preloader.stop();
				})
				.error(function(data){
					Preloader.error();
				});
		};

		$scope.repaired = function(id){
			AssetTag.active(id)
				.success(function(){
					$scope.subheader.repairUnit();
				})
				.error(function(){
					Preloader.error();
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
	}]);

adminModule
	.controller('projectorUnitRightSidenavController', ['$scope', '$state', '$stateParams', 'Projector', function($scope, $state, $stateParams, Projector){
		$scope.asset = 'Projector';

		Projector.other($stateParams.unitID)
			.success(function(data){
				$scope.others = data;
			});

		$scope.show = function(id){
			$state.go('main.units', {'assetID': $stateParams.assetID, 'unitID': id});
		};
	}]);
adminModule
	.controller('projectorUnitToolbarController', ['$scope', '$state', '$stateParams', 'Projector', function($scope, $state, $stateParams, Projector){
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

		Projector.show($stateParams.unitID)
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
	.controller('addPrinterDialogController', ['$scope', '$state', '$mdDialog', 'Preloader', 'Printer', function($scope, $state, $mdDialog, Preloader, Printer){
		$scope.printer = {};

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.submit = function(){
			/* Starts Preloader */
			Preloader.preload();
			/**
			 * Stores Single Record
			*/
			Printer.store($scope.printer)
				.then(function(){
					// Stops Preloader 
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		}
	}]);
adminModule
	.controller('printerContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'Printer', function($scope, $state, $stateParams, $mdDialog, Preloader, Printer){
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
			$scope.printer.paginated = {};
			$scope.printer.page = 2;
			Printer.paginate()
				.then(function(data){
					$scope.printer.paginated = data.data;
					$scope.printer.paginated.show = true;
					// stop preload
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		};

		/**
		 * Object for content view
		 *
		*/
		$scope.fab = {};

		$scope.fab.icon = 'mdi-plus';
		$scope.fab.label = 'Add';
		$scope.fab.tooltip = 'Add Printer';
		$scope.fab.show = true;

		$scope.fab.action = function(){
		    $mdDialog.show({
		      	controller: 'addPrinterDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-printer-dialog.template.html',
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
		 * Object for Headset
		 *
		*/
		$scope.printer = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.printer.page = 2;

		Printer.paginate()
			.then(function(data){
				$scope.printer.paginated = data.data;
				$scope.printer.paginated.show = true;

				$scope.printer.paginateLoad = function(){
					// kills the function if ajax is busy or pagination reaches last page
					if($scope.printer.busy || ($scope.printer.page > $scope.printer.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.printer.busy = true;

					// Calls the next page of pagination.
					Printer.paginate($scope.printer.page)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.printer.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.printer.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.printer.busy = false;
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
			$scope.printer.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.printer.paginated.show = false;
			Preloader.preload();
			Printer.search($scope.printer)
				.success(function(data){
					$scope.printer.results = data;
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
	.controller('printerToolbarController', ['$scope', '$stateParams', 'Printer', function($scope, $stateParams, Printer){
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
		$scope.toolbar.childState = 'Printer';
	}]);
adminModule
	.controller('printerUnitContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'AssetTag', function($scope, $state, $stateParams, $mdDialog, Preloader, AssetTag){
		var unitID = $stateParams.unitID;
		var query = {};

		query.component_id = unitID;
		query.component_type = 'Printer';

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
			// clear printer
			$scope.printer.paginated = {};
			$scope.printer.results = null;
			$scope.printer.page = 2;
			AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.printer.paginated = data.data;
				$scope.printer.paginated.show = true;

				$scope.printer.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.printer.busy || ($scope.printer.page > $scope.printer.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.printer.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.printer.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.printer.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.printer.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.printer.busy = false;
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
			// clear printer
			$scope.printer.paginated = {};
			$scope.printer.results = null;
			$scope.printer.page = 2;
			AssetTag.repairUnit(1, query)
			.then(function(data){
				$scope.listType = 'Under Repair'
				$scope.printer.paginated = data.data;
				$scope.printer.paginated.show = true;

				$scope.printer.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.printer.busy || ($scope.printer.page > $scope.printer.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.printer.busy = true;

					// Calls the next page of pagination.
					AssetTag.repairUnit($scope.printer.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.printer.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.printer.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.printer.busy = false;
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
			// clear printer
			$scope.printer.paginated = {};
			$scope.printer.results = null;
			$scope.printer.page = 2;
			AssetTag.disposeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Disposed'
				$scope.printer.paginated = data.data;
				$scope.printer.paginated.show = true;

				$scope.printer.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.printer.busy || ($scope.printer.page > $scope.printer.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.printer.busy = true;

					// Calls the next page of pagination.
					AssetTag.disposeUnit($scope.printer.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.printer.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.printer.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.printer.busy = false;
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
		 * Object for printer
		 *
		*/
		$scope.printer = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.printer.page = 2;
		// 
		
		AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.printer.paginated = data.data;
				$scope.printer.paginated.show = true;

				$scope.printer.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.printer.busy || ($scope.printer.page > $scope.printer.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.printer.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.printer.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.printer.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.printer.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.printer.busy = false;
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
			$scope.printer.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.printer.paginated.show = false;
			Preloader.preload();
			var query = {};
			query.userInput = $scope.printer.userInput;
			query.component_id = unitID;
			query.component_type = 'Printer';
			query.table_name = 'printers';
			query.property_code = 'PPRT';
			AssetTag.search(query)
				.success(function(data){
					$scope.printer.results = data;
					Preloader.stop();
				})
				.error(function(data){
					Preloader.error();
				});
		};

		$scope.repaired = function(id){
			AssetTag.active(id)
				.success(function(){
					$scope.subheader.repairUnit();
				})
				.error(function(){
					Preloader.error();
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
	}]);

adminModule
	.controller('printerUnitRightSidenavController', ['$scope', '$state', '$stateParams', 'Printer', function($scope, $state, $stateParams, Printer){
		$scope.asset = 'Printer';

		Printer.other($stateParams.unitID)
			.success(function(data){
				$scope.others = data;
			});

		$scope.show = function(id){
			$state.go('main.units', {'assetID': $stateParams.assetID, 'unitID': id});
		};
	}]);
adminModule
	.controller('printerUnitToolbarController', ['$scope', '$state', '$stateParams', 'Printer', function($scope, $state, $stateParams, Printer){
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

		Printer.show($stateParams.unitID)
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
	.controller('addScannerDialogController', ['$scope', '$state', '$mdDialog', 'Preloader', 'Scanner', function($scope, $state, $mdDialog, Preloader, Scanner){
		$scope.scanner = {};

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.submit = function(){
			/* Starts Preloader */
			Preloader.preload();
			/**
			 * Stores Single Record
			*/
			Scanner.store($scope.scanner)
				.then(function(){
					// Stops Preloader 
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		}
	}]);
adminModule
	.controller('scannerContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'Scanner', function($scope, $state, $stateParams, $mdDialog, Preloader, Scanner){
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
			$scope.scanner.paginated = {};
			$scope.scanner.page = 2;
			Scanner.paginate()
				.then(function(data){
					$scope.scanner.paginated = data.data;
					$scope.scanner.paginated.show = true;
					// stop preload
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		};

		/**
		 * Object for content view
		 *
		*/
		$scope.fab = {};

		$scope.fab.icon = 'mdi-plus';
		$scope.fab.label = 'Add';
		$scope.fab.tooltip = 'Add Scanner';
		$scope.fab.show = true;

		$scope.fab.action = function(){
		    $mdDialog.show({
		      	controller: 'addScannerDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-scanner-dialog.template.html',
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
		 * Object for Scanner
		 *
		*/
		$scope.scanner = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.scanner.page = 2;

		Scanner.paginate()
			.then(function(data){
				$scope.scanner.paginated = data.data;
				$scope.scanner.paginated.show = true;

				$scope.scanner.paginateLoad = function(){
					// kills the function if ajax is busy or pagination reaches last page
					if($scope.scanner.busy || ($scope.scanner.page > $scope.scanner.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.scanner.busy = true;

					// Calls the next page of pagination.
					Scanner.paginate($scope.scanner.page)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.scanner.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.scanner.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.scanner.busy = false;
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
			$scope.scanner.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.scanner.paginated.show = false;
			Preloader.preload();
			Scanner.search($scope.scanner)
				.success(function(data){
					$scope.scanner.results = data;
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
	.controller('scannerToolbarController', ['$scope', '$stateParams', 'Scanner', function($scope, $stateParams, Scanner){
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
		$scope.toolbar.childState = 'Scanner';
	}]);
adminModule
	.controller('scannerUnitContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'AssetTag', function($scope, $state, $stateParams, $mdDialog, Preloader, AssetTag){
		var unitID = $stateParams.unitID;
		var query = {};

		query.component_id = unitID;
		query.component_type = 'Scanner';

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
			// clear scanner
			$scope.scanner.paginated = {};
			$scope.scanner.results = null;
			$scope.scanner.page = 2;
			AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.scanner.paginated = data.data;
				$scope.scanner.paginated.show = true;

				$scope.scanner.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.scanner.busy || ($scope.scanner.page > $scope.scanner.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.scanner.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.scanner.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.scanner.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.scanner.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.scanner.busy = false;
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
			// clear scanner
			$scope.scanner.paginated = {};
			$scope.scanner.results = null;
			$scope.scanner.page = 2;
			AssetTag.repairUnit(1, query)
			.then(function(data){
				$scope.listType = 'Under Repair'
				$scope.scanner.paginated = data.data;
				$scope.scanner.paginated.show = true;

				$scope.scanner.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.scanner.busy || ($scope.scanner.page > $scope.scanner.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.scanner.busy = true;

					// Calls the next page of pagination.
					AssetTag.repairUnit($scope.scanner.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.scanner.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.scanner.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.scanner.busy = false;
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
			// clear scanner
			$scope.scanner.paginated = {};
			$scope.scanner.results = null;
			$scope.scanner.page = 2;
			AssetTag.disposeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Disposed'
				$scope.scanner.paginated = data.data;
				$scope.scanner.paginated.show = true;

				$scope.scanner.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.scanner.busy || ($scope.scanner.page > $scope.scanner.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.scanner.busy = true;

					// Calls the next page of pagination.
					AssetTag.disposeUnit($scope.scanner.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.scanner.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.scanner.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.scanner.busy = false;
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
		 * Object for scanner
		 *
		*/
		$scope.scanner = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.scanner.page = 2;
		// 
		
		AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.scanner.paginated = data.data;
				$scope.scanner.paginated.show = true;

				$scope.scanner.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.scanner.busy || ($scope.scanner.page > $scope.scanner.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.scanner.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.scanner.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.scanner.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.scanner.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.scanner.busy = false;
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
			$scope.scanner.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.scanner.paginated.show = false;
			Preloader.preload();
			var query = {};
			query.userInput = $scope.scanner.userInput;
			query.component_id = unitID;
			query.component_type = 'Scanner';
			query.table_name = 'scanners';
			query.property_code = 'PSCN';
			AssetTag.search(query)
				.success(function(data){
					$scope.scanner.results = data;
					Preloader.stop();
				})
				.error(function(data){
					Preloader.error();
				});
		};

		$scope.repaired = function(id){
			AssetTag.active(id)
				.success(function(){
					$scope.subheader.repairUnit();
				})
				.error(function(){
					Preloader.error();
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
	}]);

adminModule
	.controller('scannerUnitRightSidenavController', ['$scope', '$state', '$stateParams', 'Scanner', function($scope, $state, $stateParams, Scanner){
		$scope.asset = 'Scanner';

		Scanner.other($stateParams.unitID)
			.success(function(data){
				$scope.others = data;
			});

		$scope.show = function(id){
			$state.go('main.units', {'assetID': $stateParams.assetID, 'unitID': id});
		};
	}]);
adminModule
	.controller('scannerUnitToolbarController', ['$scope', '$state', '$stateParams', 'Scanner', function($scope, $state, $stateParams, Scanner){
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

		Scanner.show($stateParams.unitID)
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
	.controller('addSpeakerDialogController', ['$scope', '$state', '$mdDialog', 'Preloader', 'Speaker', function($scope, $state, $mdDialog, Preloader, Speaker){
		$scope.speaker = {};

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.submit = function(){
			/* Starts Preloader */
			Preloader.preload();
			/**
			 * Stores Single Record
			*/
			Speaker.store($scope.speaker)
				.then(function(){
					// Stops Preloader 
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		}

	}]);
adminModule
	.controller('speakerContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'Speaker', function($scope, $state, $stateParams, $mdDialog, Preloader, Speaker){
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
			$scope.speaker.paginated = {};
			$scope.speaker.page = 2;
			Speaker.paginate()
				.then(function(data){
					$scope.speaker.paginated = data.data;
					$scope.speaker.paginated.show = true;
					// stop preload
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		};

		/**
		 * Object for content view
		 *
		*/
		$scope.fab = {};

		$scope.fab.icon = 'mdi-plus';
		$scope.fab.label = 'Add';
		$scope.fab.tooltip = 'Add Speaker';
		$scope.fab.show = true;

		$scope.fab.action = function(){
		    $mdDialog.show({
		      	controller: 'addSpeakerDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-speaker-dialog.template.html',
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
		 * Object for speaker
		 *
		*/
		$scope.speaker = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.speaker.page = 2;

		Speaker.paginate()
			.then(function(data){
				$scope.speaker.paginated = data.data;
				$scope.speaker.paginated.show = true;

				$scope.speaker.paginateLoad = function(){
					// kills the function if ajax is busy or pagination reaches last page
					if($scope.speaker.busy || ($scope.speaker.page > $scope.speaker.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.speaker.busy = true;

					// Calls the next page of pagination.
					Speaker.paginate($scope.speaker.page)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.speaker.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.speaker.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.speaker.busy = false;
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
			$scope.speaker.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.speaker.paginated.show = false;
			Preloader.preload();
			Speaker.search($scope.speaker)
				.success(function(data){
					$scope.speaker.results = data;
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
	.controller('speakerToolbarController', ['$scope', 'Speaker', function($scope, Speaker){
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
		$scope.toolbar.childState = 'Speaker';
	}]);
adminModule
	.controller('speakerUnitContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'AssetTag', function($scope, $state, $stateParams, $mdDialog, Preloader, AssetTag){
		var unitID = $stateParams.unitID;
		var query = {};

		query.component_id = unitID;
		query.component_type = 'Speaker';

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
			// clear speaker
			$scope.speaker.paginated = {};
			$scope.speaker.results = null;
			$scope.speaker.page = 2;
			AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.speaker.paginated = data.data;
				$scope.speaker.paginated.show = true;

				$scope.speaker.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.speaker.busy || ($scope.speaker.page > $scope.speaker.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.speaker.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.speaker.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.speaker.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.speaker.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.speaker.busy = false;
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
			// clear speaker
			$scope.speaker.paginated = {};
			$scope.speaker.results = null;
			$scope.speaker.page = 2;
			AssetTag.repairUnit(1, query)
			.then(function(data){
				$scope.listType = 'Under Repair'
				$scope.speaker.paginated = data.data;
				$scope.speaker.paginated.show = true;

				$scope.speaker.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.speaker.busy || ($scope.speaker.page > $scope.speaker.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.speaker.busy = true;

					// Calls the next page of pagination.
					AssetTag.repairUnit($scope.speaker.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.speaker.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.speaker.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.speaker.busy = false;
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
			// clear speaker
			$scope.speaker.paginated = {};
			$scope.speaker.results = null;
			$scope.speaker.page = 2;
			AssetTag.disposeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Disposed'
				$scope.speaker.paginated = data.data;
				$scope.speaker.paginated.show = true;

				$scope.speaker.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.speaker.busy || ($scope.speaker.page > $scope.speaker.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.speaker.busy = true;

					// Calls the next page of pagination.
					AssetTag.disposeUnit($scope.speaker.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.speaker.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.speaker.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.speaker.busy = false;
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
		 * Object for speaker
		 *
		*/
		$scope.speaker = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.speaker.page = 2;
		// 
		
		AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.speaker.paginated = data.data;
				$scope.speaker.paginated.show = true;

				$scope.speaker.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.speaker.busy || ($scope.speaker.page > $scope.speaker.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.speaker.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.speaker.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.speaker.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.speaker.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.speaker.busy = false;
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
			$scope.speaker.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.speaker.paginated.show = false;
			Preloader.preload();
			var query = {};
			query.userInput = $scope.speaker.userInput;
			query.component_id = unitID;
			query.component_type = 'Speaker';
			query.table_name = 'speakers';
			query.property_code = 'PSPK';
			AssetTag.search(query)
				.success(function(data){
					$scope.speaker.results = data;
					Preloader.stop();
				})
				.error(function(data){
					Preloader.error();
				});
		};

		$scope.repaired = function(id){
			AssetTag.active(id)
				.success(function(){
					$scope.subheader.repairUnit();
				})
				.error(function(){
					Preloader.error();
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
	}]);

adminModule
	.controller('speakerUnitRightSidenavController', ['$scope', '$state', '$stateParams', 'Speaker', function($scope, $state, $stateParams, Speaker){
		$scope.asset = 'Speaker';

		Speaker.other($stateParams.unitID)
			.success(function(data){
				$scope.others = data;
			});

		$scope.show = function(id){
			$state.go('main.units', {'assetID': $stateParams.assetID, 'unitID': id});
		};
	}]);
adminModule
	.controller('speakerUnitToolbarController', ['$scope', '$state', '$stateParams', 'Speaker', function($scope, $state, $stateParams, Speaker){
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

		Speaker.show($stateParams.unitID)
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
	.controller('addNetworkSwitchDialogController', ['$scope', '$state', '$mdDialog', 'Preloader', 'NetworkSwitch', function($scope, $state, $mdDialog, Preloader, NetworkSwitch){
		$scope.networkSwitch = {};

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.submit = function(){
			/* Starts Preloader */
			Preloader.preload();
			/**
			 * Stores Single Record
			*/
			NetworkSwitch.store($scope.networkSwitch)
				.then(function(){
					// Stops Preloader 
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		}

	}]);
adminModule
	.controller('networkSwitchContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'NetworkSwitch', function($scope, $state, $stateParams, $mdDialog, Preloader, NetworkSwitch){
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
			$scope.networkSwitch.paginated = {};
			$scope.networkSwitch.page = 2;
			NetworkSwitch.paginate()
				.then(function(data){
					$scope.networkSwitch.paginated = data.data;
					$scope.networkSwitch.paginated.show = true;
					// stop preload
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		};

		/**
		 * Object for content view
		 *
		*/
		$scope.fab = {};

		$scope.fab.icon = 'mdi-plus';
		$scope.fab.label = 'Add';
		$scope.fab.tooltip = 'Add Network Switch';
		$scope.fab.show = true;

		$scope.fab.action = function(){
		    $mdDialog.show({
		      	controller: 'addNetworkSwitchDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-network-switch-dialog.template.html',
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
		 * Object for networkSwitch
		 *
		*/
		$scope.networkSwitch = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.networkSwitch.page = 2;

		NetworkSwitch.paginate()
			.then(function(data){
				$scope.networkSwitch.paginated = data.data;
				$scope.networkSwitch.paginated.show = true;

				$scope.networkSwitch.paginateLoad = function(){
					// kills the function if ajax is busy or pagination reaches last page
					if($scope.networkSwitch.busy || ($scope.networkSwitch.page > $scope.networkSwitch.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.networkSwitch.busy = true;

					// Calls the next page of pagination.
					NetworkSwitch.paginate($scope.networkSwitch.page)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.networkSwitch.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.networkSwitch.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.networkSwitch.busy = false;
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
			$scope.networkSwitch.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.networkSwitch.paginated.show = false;
			Preloader.preload();
			NetworkSwitch.search($scope.networkSwitch)
				.success(function(data){
					$scope.networkSwitch.results = data;
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
	.controller('networkSwitchToolbarController', ['$scope', 'NetworkSwitch', function($scope, NetworkSwitch){
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
		$scope.toolbar.childState = 'Network Switch';
	}]);
adminModule
	.controller('networkSwitchUnitContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'AssetTag', function($scope, $state, $stateParams, $mdDialog, Preloader, AssetTag){
		var unitID = $stateParams.unitID;
		var query = {};

		query.component_id = unitID;
		query.component_type = 'Network Switch';

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
			// clear networkSwitch
			$scope.networkSwitch.paginated = {};
			$scope.networkSwitch.results = null;
			$scope.networkSwitch.page = 2;
			AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.networkSwitch.paginated = data.data;
				$scope.networkSwitch.paginated.show = true;

				$scope.networkSwitch.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.networkSwitch.busy || ($scope.networkSwitch.page > $scope.networkSwitch.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.networkSwitch.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.networkSwitch.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.networkSwitch.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.networkSwitch.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.networkSwitch.busy = false;
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
			// clear networkSwitch
			$scope.networkSwitch.paginated = {};
			$scope.networkSwitch.results = null;
			$scope.networkSwitch.page = 2;
			AssetTag.repairUnit(1, query)
			.then(function(data){
				$scope.listType = 'Under Repair'
				$scope.networkSwitch.paginated = data.data;
				$scope.networkSwitch.paginated.show = true;

				$scope.networkSwitch.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.networkSwitch.busy || ($scope.networkSwitch.page > $scope.networkSwitch.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.networkSwitch.busy = true;

					// Calls the next page of pagination.
					AssetTag.repairUnit($scope.networkSwitch.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.networkSwitch.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.networkSwitch.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.networkSwitch.busy = false;
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
			// clear networkSwitch
			$scope.networkSwitch.paginated = {};
			$scope.networkSwitch.results = null;
			$scope.networkSwitch.page = 2;
			AssetTag.disposeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Disposed'
				$scope.networkSwitch.paginated = data.data;
				$scope.networkSwitch.paginated.show = true;

				$scope.networkSwitch.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.networkSwitch.busy || ($scope.networkSwitch.page > $scope.networkSwitch.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.networkSwitch.busy = true;

					// Calls the next page of pagination.
					AssetTag.disposeUnit($scope.networkSwitch.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.networkSwitch.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.networkSwitch.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.networkSwitch.busy = false;
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
		 * Object for networkSwitch
		 *
		*/
		$scope.networkSwitch = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.networkSwitch.page = 2;
		// 
		
		AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.networkSwitch.paginated = data.data;
				$scope.networkSwitch.paginated.show = true;

				$scope.networkSwitch.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.networkSwitch.busy || ($scope.networkSwitch.page > $scope.networkSwitch.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.networkSwitch.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.networkSwitch.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.networkSwitch.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.networkSwitch.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.networkSwitch.busy = false;
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
			$scope.networkSwitch.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.networkSwitch.paginated.show = false;
			Preloader.preload();
			var query = {};
			query.userInput = $scope.networkSwitch.userInput;
			query.component_id = unitID;
			query.component_type = 'Network Switch';
			query.table_name = 'network_switches';
			query.property_code = 'PNSW';
			AssetTag.search(query)
				.success(function(data){
					$scope.networkSwitch.results = data;
					Preloader.stop();
				})
				.error(function(data){
					Preloader.error();
				});
		};

		$scope.repaired = function(id){
			AssetTag.active(id)
				.success(function(){
					$scope.subheader.repairUnit();
				})
				.error(function(){
					Preloader.error();
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
	}]);

adminModule
	.controller('networkSwitchUnitRightSidenavController', ['$scope', '$state', '$stateParams', 'NetworkSwitch', function($scope, $state, $stateParams, NetworkSwitch){
		$scope.asset = 'Network Switch';

		NetworkSwitch.other($stateParams.unitID)
			.success(function(data){
				$scope.others = data;
			});

		$scope.show = function(id){
			$state.go('main.units', {'assetID': $stateParams.assetID, 'unitID': id});
		};
	}]);
adminModule
	.controller('networkSwitchUnitToolbarController', ['$scope', '$state', '$stateParams', 'NetworkSwitch', function($scope, $state, $stateParams, NetworkSwitch){
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

		NetworkSwitch.show($stateParams.unitID)
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
	.controller('addUpsDialogController', ['$scope', '$state', '$mdDialog', 'Preloader', 'UPS', function($scope, $state, $mdDialog, Preloader, UPS){
		$scope.ups = {};

		$scope.ups.wattages = [
			{'wattage':'550W'},
			{'wattage':'650W'},
		];

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.submit = function(){
			/* Starts Preloader */
			Preloader.preload();
			/**
			 * Stores Single Record
			*/
			UPS.store($scope.ups)
				.then(function(){
					// Stops Preloader 
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		}
	}]);
adminModule
	.controller('upsContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'UPS', function($scope, $state, $stateParams, $mdDialog, Preloader, UPS){
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
			$scope.ups.paginated = {};
			$scope.ups.page = 2;
			UPS.paginate()
				.then(function(data){
					$scope.ups.paginated = data.data;
					$scope.ups.paginated.show = true;
					// stop preload
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		};

		/**
		 * Object for content view
		 *
		*/
		$scope.fab = {};

		$scope.fab.icon = 'mdi-plus';
		$scope.fab.label = 'Add';
		$scope.fab.tooltip = 'Add UPS';
		$scope.fab.show = true;

		$scope.fab.action = function(){
		    $mdDialog.show({
		      	controller: 'addUpsDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-ups-dialog.template.html',
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
		 * Object for ups
		 *
		*/
		$scope.ups = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.ups.page = 2;

		UPS.paginate()
			.then(function(data){
				$scope.ups.paginated = data.data;
				$scope.ups.paginated.show = true;

				$scope.ups.paginateLoad = function(){
					// kills the function if ajax is busy or pagination reaches last page
					if($scope.ups.busy || ($scope.ups.page > $scope.ups.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.ups.busy = true;

					// Calls the next page of pagination.
					UPS.paginate($scope.ups.page)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.ups.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.ups.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.ups.busy = false;
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
			$scope.ups.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.ups.paginated.show = false;
			Preloader.preload();
			UPS.search($scope.ups)
				.success(function(data){
					$scope.ups.results = data;
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
	.controller('upsContentController', ['$scope', function($scope){
		//
	}])
adminModule
	.controller('upsRightSidenavController', ['$scope', function($scope){
		//
	}])
adminModule
	.controller('upsToolbarController', ['$scope', '$stateParams', 'UPS', function($scope, $stateParams, UPS){
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
		$scope.toolbar.childState = 'UPS';
	}]);
adminModule
	.controller('upsUnitContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'AssetTag', function($scope, $state, $stateParams, $mdDialog, Preloader, AssetTag){
		var unitID = $stateParams.unitID;
		var query = {};

		query.component_id = unitID;
		query.component_type = 'Uninterruptible Power Supply';

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
			// clear ups
			$scope.ups.paginated = {};
			$scope.ups.results = null;
			$scope.ups.page = 2;
			AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.ups.paginated = data.data;
				$scope.ups.paginated.show = true;

				$scope.ups.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.ups.busy || ($scope.ups.page > $scope.ups.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.ups.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.ups.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.ups.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.ups.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.ups.busy = false;
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
			// clear ups
			$scope.ups.paginated = {};
			$scope.ups.results = null;
			$scope.ups.page = 2;
			AssetTag.repairUnit(1, query)
			.then(function(data){
				$scope.listType = 'Under Repair'
				$scope.ups.paginated = data.data;
				$scope.ups.paginated.show = true;

				$scope.ups.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.ups.busy || ($scope.ups.page > $scope.ups.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.ups.busy = true;

					// Calls the next page of pagination.
					AssetTag.repairUnit($scope.ups.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.ups.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.ups.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.ups.busy = false;
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
			// clear ups
			$scope.ups.paginated = {};
			$scope.ups.results = null;
			$scope.ups.page = 2;
			AssetTag.disposeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Disposed'
				$scope.ups.paginated = data.data;
				$scope.ups.paginated.show = true;

				$scope.ups.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.ups.busy || ($scope.ups.page > $scope.ups.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.ups.busy = true;

					// Calls the next page of pagination.
					AssetTag.disposeUnit($scope.ups.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.ups.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.ups.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.ups.busy = false;
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
		 * Object for ups
		 *
		*/
		$scope.ups = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.ups.page = 2;
		// 
		
		AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.ups.paginated = data.data;
				$scope.ups.paginated.show = true;

				$scope.ups.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.ups.busy || ($scope.ups.page > $scope.ups.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.ups.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.ups.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.ups.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.ups.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.ups.busy = false;
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
			$scope.ups.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.ups.paginated.show = false;
			Preloader.preload();
			var query = {};
			query.userInput = $scope.ups.userInput;
			query.component_id = unitID;
			query.component_type = 'Uninterruptible Power Supply';
			query.table_name = 'uninterruptible_power_supplies';
			query.property_code = 'PUPS';
			AssetTag.search(query)
				.success(function(data){
					$scope.ups.results = data;
					Preloader.stop();
				})
				.error(function(data){
					Preloader.error();
				});
		};

		$scope.repaired = function(id){
			AssetTag.active(id)
				.success(function(){
					$scope.subheader.repairUnit();
				})
				.error(function(){
					Preloader.error();
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
	}]);

adminModule
	.controller('upsUnitRightSidenavController', ['$scope', '$state', '$stateParams', 'UPS', function($scope, $state, $stateParams, UPS){
		$scope.asset = 'UPS';

		UPS.other($stateParams.unitID)
			.success(function(data){
				$scope.others = data;
			});

		$scope.show = function(id){
			$state.go('main.units', {'assetID': $stateParams.assetID, 'unitID': id});
		};
	}]);
adminModule
	.controller('upsUnitToolbarController', ['$scope', '$state', '$stateParams', 'UPS', function($scope, $state, $stateParams, UPS){
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

		UPS.show($stateParams.unitID)
			.success(function(data){
				$scope.toolbar.parentState = data.model;
				$scope.toolbar.childState = data.wattage;
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
	.controller('addVideoCardDialogController', ['$scope', '$state', '$mdDialog', 'Preloader', 'VideoCard', function($scope, $state, $mdDialog, Preloader, VideoCard){
		$scope.videoCard = {};

		$scope.videoCard.sizes = [
			{'size':'1GB'},
			{'size':'2GB'},
		];

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.submit = function(){
			/* Starts Preloader */
			Preloader.preload();
			/**
			 * Stores Single Record
			*/
			VideoCard.store($scope.videoCard)
				.then(function(){
					// Stops Preloader 
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		}
	}]);
adminModule
	.controller('videoCardContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'VideoCard', function($scope, $state, $stateParams, $mdDialog, Preloader, VideoCard){
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
			$scope.videoCard.paginated = {};
			$scope.videoCard.page = 2;
			VideoCard.paginate()
				.then(function(data){
					$scope.videoCard.paginated = data.data;
					$scope.videoCard.paginated.show = true;
					// stop preload
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		};

		/**
		 * Object for content view
		 *
		*/
		$scope.fab = {};

		$scope.fab.icon = 'mdi-plus';
		$scope.fab.label = 'Add';
		$scope.fab.tooltip = 'Add Video Card';
		$scope.fab.show = true;

		$scope.fab.action = function(){
		    $mdDialog.show({
		      	controller: 'addVideoCardDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-video-card-dialog.template.html',
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
		 * Object for videoCard
		 *
		*/
		$scope.videoCard = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.videoCard.page = 2;

		VideoCard.paginate()
			.then(function(data){
				$scope.videoCard.paginated = data.data;
				$scope.videoCard.paginated.show = true;

				$scope.videoCard.paginateLoad = function(){
					// kills the function if ajax is busy or pagination reaches last page
					if($scope.videoCard.busy || ($scope.videoCard.page > $scope.videoCard.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.videoCard.busy = true;

					// Calls the next page of pagination.
					VideoCard.paginate($scope.videoCard.page)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.videoCard.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.videoCard.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.videoCard.busy = false;
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
			$scope.videoCard.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.videoCard.paginated.show = false;
			Preloader.preload();
			VideoCard.search($scope.videoCard)
				.success(function(data){
					$scope.videoCard.results = data;
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
	.controller('videoCardContentController', ['$scope', function($scope){
		//
	}])
adminModule
	.controller('videoCardRightSidenavController', ['$scope', function($scope){
		//
	}])
adminModule
	.controller('videoCardToolbarController', ['$scope', '$stateParams', 'VideoCard', function($scope, $stateParams, VideoCard){
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
		$scope.toolbar.childState = 'Video Card';
	}]);
adminModule
	.controller('videoCardUnitContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'AssetTag', function($scope, $state, $stateParams, $mdDialog, Preloader, AssetTag){
		var unitID = $stateParams.unitID;
		var query = {};

		query.component_id = unitID;
		query.component_type = 'Video Card';

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
			// clear videoCard
			$scope.videoCard.paginated = {};
			$scope.videoCard.results = null;
			$scope.videoCard.page = 2;
			AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.videoCard.paginated = data.data;
				$scope.videoCard.paginated.show = true;

				$scope.videoCard.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.videoCard.busy || ($scope.videoCard.page > $scope.videoCard.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.videoCard.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.videoCard.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.videoCard.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.videoCard.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.videoCard.busy = false;
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
			// clear videoCard
			$scope.videoCard.paginated = {};
			$scope.videoCard.results = null;
			$scope.videoCard.page = 2;
			AssetTag.repairUnit(1, query)
			.then(function(data){
				$scope.listType = 'Under Repair'
				$scope.videoCard.paginated = data.data;
				$scope.videoCard.paginated.show = true;

				$scope.videoCard.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.videoCard.busy || ($scope.videoCard.page > $scope.videoCard.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.videoCard.busy = true;

					// Calls the next page of pagination.
					AssetTag.repairUnit($scope.videoCard.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.videoCard.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.videoCard.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.videoCard.busy = false;
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
			// clear videoCard
			$scope.videoCard.paginated = {};
			$scope.videoCard.results = null;
			$scope.videoCard.page = 2;
			AssetTag.disposeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Disposed'
				$scope.videoCard.paginated = data.data;
				$scope.videoCard.paginated.show = true;

				$scope.videoCard.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.videoCard.busy || ($scope.videoCard.page > $scope.videoCard.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.videoCard.busy = true;

					// Calls the next page of pagination.
					AssetTag.disposeUnit($scope.videoCard.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.videoCard.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.videoCard.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.videoCard.busy = false;
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
		 * Object for videoCard
		 *
		*/
		$scope.videoCard = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.videoCard.page = 2;
		// 
		
		AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.videoCard.paginated = data.data;
				$scope.videoCard.paginated.show = true;

				$scope.videoCard.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.videoCard.busy || ($scope.videoCard.page > $scope.videoCard.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.videoCard.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.videoCard.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.videoCard.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.videoCard.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.videoCard.busy = false;
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
			$scope.videoCard.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.videoCard.paginated.show = false;
			Preloader.preload();
			var query = {};
			query.userInput = $scope.videoCard.userInput;
			query.component_id = unitID;
			query.component_type = 'Video Card';
			query.table_name = 'video_cards';
			query.property_code = 'PVDC';
			AssetTag.search(query)
				.success(function(data){
					$scope.videoCard.results = data;
					Preloader.stop();
				})
				.error(function(data){
					Preloader.error();
				});
		};

		$scope.repaired = function(id){
			AssetTag.active(id)
				.success(function(){
					$scope.subheader.repairUnit();
				})
				.error(function(){
					Preloader.error();
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
	}]);

adminModule
	.controller('videoCardUnitRightSidenavController', ['$scope', '$state', '$stateParams', 'VideoCard', function($scope, $state, $stateParams, VideoCard){
		$scope.asset = 'VideoCard';

		VideoCard.other($stateParams.unitID)
			.success(function(data){
				$scope.others = data;
			});

		$scope.show = function(id){
			$state.go('main.units', {'assetID': $stateParams.assetID, 'unitID': id});
		};
	}]);
adminModule
	.controller('videoCardUnitToolbarController', ['$scope', '$state', '$stateParams', 'VideoCard', function($scope, $state, $stateParams, VideoCard){
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

		VideoCard.show($stateParams.unitID)
			.success(function(data){
				$scope.toolbar.parentState = data.model;
				$scope.toolbar.childState = data.size;
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
	.controller('addSoftwareDialogController', ['$scope', '$state', '$mdDialog', 'Preloader', 'Software', function($scope, $state, $mdDialog, Preloader, Software){
		$scope.software = {};

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.submit = function(){
			/* Starts Preloader */
			Preloader.preload();
			/**
			 * Stores Single Record
			*/
			Software.store($scope.software)
				.then(function(){
					// Stops Preloader 
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		}
	}]);
adminModule
	.controller('softwareContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'Software', function($scope, $state, $stateParams, $mdDialog, Preloader, Software){
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
			$scope.software.paginated = {};
			$scope.software.page = 2;
			Software.paginate()
				.then(function(data){
					$scope.software.paginated = data.data;
					$scope.software.paginated.show = true;
					// stop preload
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		};

		/**
		 * Object for content view
		 *
		*/
		$scope.fab = {};

		$scope.fab.icon = 'mdi-plus';
		$scope.fab.label = 'Add';
		$scope.fab.tooltip = 'Add Software';
		$scope.fab.show = true;

		$scope.fab.action = function(){
		    $mdDialog.show({
		      	controller: 'addSoftwareDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-software-dialog.template.html',
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
		 * Object for software
		 *
		*/
		$scope.software = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.software.page = 2;

		Software.paginate()
			.then(function(data){
				$scope.software.paginated = data.data;
				$scope.software.paginated.show = true;

				$scope.software.paginateLoad = function(){
					// kills the function if ajax is busy or pagination reaches last page
					if($scope.software.busy || ($scope.software.page > $scope.software.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.software.busy = true;

					// Calls the next page of pagination.
					Software.paginate($scope.software.page)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.software.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.software.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.software.busy = false;
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
			$scope.software.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.software.paginated.show = false;
			Preloader.preload();
			Software.search($scope.software)
				.success(function(data){
					$scope.software.results = data;
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
	.controller('softwareToolbarController', ['$scope', '$stateParams', 'Software', function($scope, $stateParams, Software){
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
		$scope.toolbar.childState = 'Software';
	}]);
adminModule
	.controller('softwareUnitContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'AssetTag', function($scope, $state, $stateParams, $mdDialog, Preloader, AssetTag){
		var unitID = $stateParams.unitID;
		var query = {};

		query.component_id = unitID;
		query.component_type = 'Software';

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
			// clear software
			$scope.software.paginated = {};
			$scope.software.results = null;
			$scope.software.page = 2;
			AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.software.paginated = data.data;
				$scope.software.paginated.show = true;

				$scope.software.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.software.busy || ($scope.software.page > $scope.software.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.software.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.software.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.software.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.software.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.software.busy = false;
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
			// clear software
			$scope.software.paginated = {};
			$scope.software.results = null;
			$scope.software.page = 2;
			AssetTag.repairUnit(1, query)
			.then(function(data){
				$scope.listType = 'Under Repair'
				$scope.software.paginated = data.data;
				$scope.software.paginated.show = true;

				$scope.software.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.software.busy || ($scope.software.page > $scope.software.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.software.busy = true;

					// Calls the next page of pagination.
					AssetTag.repairUnit($scope.software.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.software.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.software.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.software.busy = false;
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
			// clear software
			$scope.software.paginated = {};
			$scope.software.results = null;
			$scope.software.page = 2;
			AssetTag.disposeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Disposed'
				$scope.software.paginated = data.data;
				$scope.software.paginated.show = true;

				$scope.software.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.software.busy || ($scope.software.page > $scope.software.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.software.busy = true;

					// Calls the next page of pagination.
					AssetTag.disposeUnit($scope.software.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.software.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.software.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.software.busy = false;
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
		 * Object for software
		 *
		*/
		$scope.software = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.software.page = 2;
		// 
		
		AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.software.paginated = data.data;
				$scope.software.paginated.show = true;

				$scope.software.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.software.busy || ($scope.software.page > $scope.software.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.software.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.software.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.software.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.software.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.software.busy = false;
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
			$scope.software.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.software.paginated.show = false;
			Preloader.preload();
			var query = {};
			query.userInput = $scope.software.userInput;
			query.component_id = unitID;
			query.component_type = 'Scanner';
			query.table_name = 'scanners';
			query.property_code = 'PSWA';
			AssetTag.search(query)
				.success(function(data){
					$scope.software.results = data;
					Preloader.stop();
				})
				.error(function(data){
					Preloader.error();
				});
		};

		$scope.repaired = function(id){
			AssetTag.active(id)
				.success(function(){
					$scope.subheader.repairUnit();
				})
				.error(function(){
					Preloader.error();
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
	}]);

adminModule
	.controller('softwareUnitRightSidenavController', ['$scope', '$state', '$stateParams', 'Software', function($scope, $state, $stateParams, Software){
		$scope.asset = 'Software';

		Software.other($stateParams.unitID)
			.success(function(data){
				$scope.others = data;
			});

		$scope.show = function(id){
			$state.go('main.units', {'assetID': $stateParams.assetID, 'unitID': id});
		};
	}]);
adminModule
	.controller('softwareUnitToolbarController', ['$scope', '$state', '$stateParams', 'Software', function($scope, $state, $stateParams, Software){
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

		Software.show($stateParams.unitID)
			.success(function(data){
				$scope.toolbar.parentState = data.name;
				$scope.toolbar.childState = data.version;
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
	.controller('addTelephoneDialogController', ['$scope', '$state', '$mdDialog', 'Preloader', 'Telephone', function($scope, $state, $mdDialog, Preloader, Telephone){
		$scope.telephone = {};

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.submit = function(){
			/* Starts Preloader */
			Preloader.preload();
			/**
			 * Stores Single Record
			*/
			Telephone.store($scope.telephone)
				.then(function(){
					// Stops Preloader 
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		}

	}]);
adminModule
	.controller('telephoneContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'Telephone', function($scope, $state, $stateParams, $mdDialog, Preloader, Telephone){
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
			$scope.telephone.paginated = {};
			$scope.telephone.page = 2;
			Telephone.paginate()
				.then(function(data){
					$scope.telephone.paginated = data.data;
					$scope.telephone.paginated.show = true;
					// stop preload
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		};

		/**
		 * Object for content view
		 *
		*/
		$scope.fab = {};

		$scope.fab.icon = 'mdi-plus';
		$scope.fab.label = 'Add';
		$scope.fab.tooltip = 'Add Telephone';
		$scope.fab.show = true;

		$scope.fab.action = function(){
		    $mdDialog.show({
		      	controller: 'addTelephoneDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-telephone-dialog.template.html',
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
		 * Object for telephone
		 *
		*/
		$scope.telephone = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.telephone.page = 2;

		Telephone.paginate()
			.then(function(data){
				$scope.telephone.paginated = data.data;
				$scope.telephone.paginated.show = true;

				$scope.telephone.paginateLoad = function(){
					// kills the function if ajax is busy or pagination reaches last page
					if($scope.telephone.busy || ($scope.telephone.page > $scope.telephone.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.telephone.busy = true;

					// Calls the next page of pagination.
					Telephone.paginate($scope.telephone.page)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.telephone.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.telephone.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.telephone.busy = false;
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
			$scope.telephone.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.telephone.paginated.show = false;
			Preloader.preload();
			Telephone.search($scope.telephone)
				.success(function(data){
					$scope.telephone.results = data;
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
	.controller('telephoneToolbarController', ['$scope', 'Telephone', function($scope, Telephone){
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
		$scope.toolbar.childState = 'Telephone';
	}]);
adminModule
	.controller('telephoneUnitContentContainerController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'AssetTag', function($scope, $state, $stateParams, $mdDialog, Preloader, AssetTag){
		var unitID = $stateParams.unitID;
		var query = {};

		query.component_id = unitID;
		query.component_type = 'Telephone';

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
			// clear telephone
			$scope.telephone.paginated = {};
			$scope.telephone.results = null;
			$scope.telephone.page = 2;
			AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.telephone.paginated = data.data;
				$scope.telephone.paginated.show = true;

				$scope.telephone.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.telephone.busy || ($scope.telephone.page > $scope.telephone.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.telephone.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.telephone.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.telephone.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.telephone.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.telephone.busy = false;
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
			// clear telephone
			$scope.telephone.paginated = {};
			$scope.telephone.results = null;
			$scope.telephone.page = 2;
			AssetTag.repairUnit(1, query)
			.then(function(data){
				$scope.listType = 'Under Repair'
				$scope.telephone.paginated = data.data;
				$scope.telephone.paginated.show = true;

				$scope.telephone.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.telephone.busy || ($scope.telephone.page > $scope.telephone.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.telephone.busy = true;

					// Calls the next page of pagination.
					AssetTag.repairUnit($scope.telephone.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.telephone.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.telephone.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.telephone.busy = false;
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
			// clear telephone
			$scope.telephone.paginated = {};
			$scope.telephone.results = null;
			$scope.telephone.page = 2;
			AssetTag.disposeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Disposed'
				$scope.telephone.paginated = data.data;
				$scope.telephone.paginated.show = true;

				$scope.telephone.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.telephone.busy || ($scope.telephone.page > $scope.telephone.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.telephone.busy = true;

					// Calls the next page of pagination.
					AssetTag.disposeUnit($scope.telephone.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.telephone.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.telephone.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.telephone.busy = false;
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
		 * Object for telephone
		 *
		*/
		$scope.telephone = {};
		// 2 is default so the next page to be loaded will be page 2 
		$scope.telephone.page = 2;
		// 
		
		AssetTag.activeUnit(1, query)
			.then(function(data){
				$scope.listType = 'Active'
				$scope.telephone.paginated = data.data;
				$scope.telephone.paginated.show = true;

				$scope.telephone.paginateLoad = function(){

					// kills the function if ajax is busy or pagination reaches last page
					if($scope.telephone.busy || ($scope.telephone.page > $scope.telephone.paginated.last_page)){
						return;
					}
					/**
					 * Executes pagination call
					 *
					*/
					// sets to true to disable pagination call if still busy.
					$scope.telephone.busy = true;

					// Calls the next page of pagination.
					AssetTag.activeUnit($scope.telephone.page, query)
						.then(function(data){
							// increment the page to set up next page for next AJAX Call
							$scope.telephone.page++;

							// iterate over each data then splice it to the data array
							angular.forEach(data.data.data, function(item, key){
								$scope.telephone.paginated.data.push(item);
							});

							// Enables again the pagination call for next call.
							$scope.telephone.busy = false;
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
			$scope.telephone.userInput = '';
			$scope.searchBar = false;
		};
		
		
		$scope.searchUserInput = function(){
			$scope.telephone.paginated.show = false;
			Preloader.preload();
			var query = {};
			query.userInput = $scope.telephone.userInput;
			query.component_id = unitID;
			query.component_type = 'Telephone';
			query.table_name = 'telephones';
			query.property_code = 'PTEL';
			AssetTag.search(query)
				.success(function(data){
					$scope.telephone.results = data;
					Preloader.stop();
				})
				.error(function(data){
					Preloader.error();
				});
		};

		$scope.repaired = function(id){
			AssetTag.active(id)
				.success(function(){
					$scope.subheader.repairUnit();
				})
				.error(function(){
					Preloader.error();
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
	}]);

adminModule
	.controller('telephoneUnitRightSidenavController', ['$scope', '$state', '$stateParams', 'Telephone', function($scope, $state, $stateParams, Telephone){
		$scope.asset = 'Telephone';

		Telephone.other($stateParams.unitID)
			.success(function(data){
				$scope.others = data;
			});

		$scope.show = function(id){
			$state.go('main.units', {'assetID': $stateParams.assetID, 'unitID': id});
		};
	}]);
adminModule
	.controller('telephoneUnitToolbarController', ['$scope', '$state', '$stateParams', 'Telephone', function($scope, $state, $stateParams, Telephone){
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

		Telephone.show($stateParams.unitID)
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
adminModule
	.controller('editAssetDialogController', ['$scope', '$mdDialog', 'Preloader', 'AssetTagService', 'AssetTag', function($scope, $mdDialog, Preloader, AssetTagService, AssetTag){
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
			})

		$scope.submit = function(){
			// start preloader
			Preloader.preload();
			AssetTag.update(assetTagID, $scope.asset)
				.success(function(){
					$mdDialog.hide();
				})
				.error(function(){
					Preloader.error();
				});
		}
	}]);
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
	.controller('pullOutAssetDialogController', ['$scope', '$stateParams', '$mdDialog', 'Department', 'WorkStation', 'Preloader', 'AssetTagService', 'AssetTag', function($scope, $stateParams, $mdDialog, Department, WorkStation, Preloader, AssetTagService, AssetTag){
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
			Preloader.preload();
			AssetTag.repair(assetTagID)
				.success(function(){
					//
				})
				.error(function(){
					Preloader.error();
				});
		};

		$scope.dispose = function(){
			Preloader.preload();
			AssetTag.dispose(assetTagID)
				.success(function(){
					//
				})
				.error(function(){
					Preloader.error();
				});
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
	.controller('transferAssetDialogController', ['$scope', '$stateParams', '$mdDialog', 'Department', 'WorkStation', 'Preloader', 'AssetTagService', 'AssetTag', function($scope, $stateParams, $mdDialog, Department, WorkStation, Preloader, AssetTagService, AssetTag){
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

		Department.index()
			.success(function(data){
				$scope.departments = data
			})
			.error(function(){
				Preloader.error();
			});

		$scope.showWorkStations = function(){
			WorkStation.department($scope.asset.department, $stateParams.workStationID)
				.success(function(data){
					$scope.workstations = data;
				});
		};

		$scope.submit = function(){
			// start preloader
			Preloader.preload();
			AssetTag.transfer(assetTagID, $scope.asset)
				.success(function(){
					$mdDialog.hide();
				})
				.error(function(){
					Preloader.error();
				});
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
	.controller('workStationContentContainerController', ['$scope', '$stateParams', '$mdDialog', 'Preloader', 'WorkStation', 'AssetTag', 'AssetTagService', 'UserService', function($scope, $stateParams, $mdDialog, Preloader, WorkStation, AssetTag, AssetTagService, UserService){
		/**
		 * Object for subheader
		 *
		*/
		var departmentID = $stateParams.departmentID;
		var workStationID = $stateParams.workStationID;

		$scope.subheader = {};
		$scope.subheader.state = 'work-station';

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
		};

		$scope.subheader.transfer = function(){
			$mdDialog.show({
		      	controller: 'transferWorkStationDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/transfer-work-station-dialog.template.html',
		      	parent: angular.element($('body')),
		    })
		};

		$scope.subheader.users = function(){
			$mdDialog.show({
		      	controller: 'usersWorkStationDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/users-work-station-dialog.template.html',
		      	parent: angular.element($('body')),
		    })
		    .then(function(answer){
		    	if(!answer){
			    	$mdDialog.show({
				      	controller: 'tagUsersWorkStationDialogController',
					    templateUrl: '/app/components/admin/templates/dialogs/tag-users-work-station-dialog.template.html',
				      	parent: angular.element($('body')),
				    })
				    .then(function(){
				    	$scope.subheader.refresh();
				    })
		    	}
		    	else{
		    		UserService.set(answer);
		    		$mdDialog.show({
				      	controller: 'transferUsersDialogController',
					    templateUrl: '/app/components/admin/templates/dialogs/transfer-users-dialog.template.html',
				      	parent: angular.element($('body')),
				    })
				    .then(function(){
				    	$scope.subheader.refresh();
				    })
		    	}
		    })
		};

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
	}]);

adminModule
	.controller('workStationContentController', ['$scope', '$stateParams', 'WorkStation', function($scope, $stateParams, WorkStation){
		
	}]);
adminModule
	.controller('workStationRightSidenavController', ['$scope', '$state', '$stateParams', 'Preloader', 'WorkStation', 'Department', function($scope, $state, $stateParams, Preloader, WorkStation, Department){
		/**
		 * Object for content view
		 *
		*/
		$scope.rightSidenav = {};

		var departmentID = $stateParams.departmentID;

		WorkStation.department(departmentID, $stateParams.workStationID)
			.success(function(data){
				$scope.rightSidenav.workStations = data;
			})
			.error(function(){
				Preloader.error();
			});

		$scope.rightSidenav.show = function(workStationID){
			$state.go('main.work-station', {'departmentID': departmentID, 'workStationID': workStationID});
		};
	}]);
adminModule
	.controller('workStationToolbarController', ['$scope', '$state', '$stateParams', 'departmentService', 'Department', 'WorkStation', 'AssetTagService', function($scope, $state, $stateParams, departmentService, Department, WorkStation, AssetTagService){
		/**
		 *  Object for toolbar view.
		 *
		*/
		$scope.toolbar = {};

		/**
		 * Properties and method of toolbar.
		 *
		*/
		var departmentID = $stateParams.departmentID;
		var index = departmentID - 1;

		$scope.toolbar.showBack = true;

		$scope.toolbar.back = function(){
			$state.go('main.floor-plan', {'departmentID': departmentID});
		};

		var departments = departmentService.get();
		if(!departments.length){
			Department.index()
				.success(function(data){
					departments = data;
					$scope.toolbar.parentState = departments[index].name;
				})
				.error(function(){
					Preload.error();
				});
		}
		else{
			$scope.toolbar.parentState = departments[index].name;
		}

		WorkStation.show($stateParams.workStationID)
			.success(function(data){
				$scope.toolbar.childState = data.name;
				AssetTagService.setStation(data.name);
			})
			.error(function(){
				Preload.error();
			});
	}]);
//# sourceMappingURL=admin.js.map
