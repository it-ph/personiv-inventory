var adminModule = angular.module('adminModule', [
	/* Shared Module */
	'sharedModule',
]);
adminModule
	.config(['$stateProvider', function($stateProvider){
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
						controller: 'mainContentController',	
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
				url: 'dashboard/floor-plan',
				views: {
					'toolbar': {
						templateUrl: '/app/components/admin/templates/toolbar.template.html',
						controller: 'floorPlanToolbarController',
					},
					'content': {
						templateUrl: '/app/components/admin/templates/content/floor-plan.content.template.html',
						controller: 'floorPlanContentController',
					},
					'right-sidenav': {
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
						controllerProvider: ['$stateParams', 'assetService', function($stateParams, assetService){
							var index = $stateParams.assetID - 1;
							return assetService.contentController(index);
						}]
					},
					'right-sidenav@main.assets': {
						templateUrl : '/app/components/admin/templates/sidenavs/main-right.sidenav.html',
						controllerProvider: ['$stateParams', 'assetService', function($stateParams, assetService){
							var index = $stateParams.assetID - 1;
							return assetService.rightSidenavController(index);
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
					'toolbar': {
						templateUrl: '/app/components/admin/templates/toolbar.template.html',
						controller: 'departmentToolbarController',
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
	.service('assetService', ['$http', function($http){
		var assets = [
			{
				'controller' : 'cpu',
			},
			{
				'controller' : 'hardDisk',
			},
			{
				'controller' : 'headset',
			},
			{
				'controller' : 'keyboard'
			},
			{
				'controller' : 'memory',
			},
			{
				'controller' : 'monitor',
			},
			{
				'controller' : 'mouse',
			},
			{
				'controller' : 'printer',
			},
			{
				'controller' : 'scanner',
			},
			{
				'controller' : 'software',
			},
			{
				'controller' : 'ups',
			},
			{
				'controller' : 'videoCard',
			},
			{
				'controller' : 'otherComponent',
			},
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
	.controller('floorPlanContentController', ['$scope', function($scope){
		/**
		 * Object for content view
		 *
		*/
		$scope.content = {};

		$scope.content.title = 'Floor Plan Content Initialized';
	}]);
adminModule
	.controller('floorPlanRightSidenavController', ['$scope', function($scope){
		/**
		 * Object for content view
		 *
		*/
		$scope.sidenav = {};

		$scope.sidenav.title = 'Floor Plan Right Sidenav Initialized';
	}]);
adminModule
	.controller('floorPlanToolbarController', ['$scope', function($scope){
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
		$scope.toolbar.childState = 'Floor Plan';

		/**
		 * Search database and look for user input depending on state.
		 *
		*/
		$scope.searchUserInput = function(){
			return;
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
		var departments = departmentService.get();
		var index = $stateParams.departmentID - 1;

		$scope.toolbar.parentState = 'Departments';
		$scope.toolbar.childState = departments[index].name;
		
		/**
		 * Search database and look for user input depending on state.
		 *
		*/
		$scope.searchUserInput = function(){
			return;
		};

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
				{
					'name':'Analysis',
					'state':'main.analysis',
				},
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
					'name': 'Hard Disk',
					'state':'main.assets',
					'id': 2
				},
				{
					'name': 'Headset',
					'state':'main.assets',
					'id': 3
				},
				{
					'name': 'Keyboard',
					'state':'main.assets',
					'id': 4
				},
				{
					'name': 'Memory',
					'state':'main.assets',
					'id': 5
				},
				{
					'name': 'Monitor',
					'state':'main.assets',
					'id': 6
				},
				{
					'name': 'Mouse',
					'state':'main.assets',
					'id': 7
				},
				{
					'name': 'Printer',
					'state':'main.assets',
					'id': 8
				},
				{
					'name': 'Scanner',
					'state':'main.assets',
					'id': 9
				},
				{
					'name': 'Software',
					'state':'main.assets',
					'id': 10
				},
				{
					'name': 'UPS',
					'state':'main.assets',
					'id': 11
				},
				{
					'name': 'Video Card',
					'state':'main.assets',
					'id': 12
				},
				{
					'name': 'Other Components',
					'state':'main.assets',
					'id': 13
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
	.controller('mainContentContainerController', ['$scope', function($scope){
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

		$scope.content.title = 'Main Content Initialized';
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
			$scope.searchBar = false;
		};
	}]);
adminModule
	.controller('toolbarController', ['$scope', '$mdSidenav', function($scope, $mdSidenav){
		$scope.toolbar = {};

		$scope.toolbar.parentState = 'Home';
	}]);
adminModule
	.controller('addDesktopDialogController', ['$scope', '$mdDialog', 'Desktop', function($scope, $mdDialog, Desktop){
		$scope.cpu = {};

		$scope.cancel = function(){
			$mdDialog.cancel();
		}
	}]);
adminModule
	.controller('cpuContentContainerController', ['$scope', '$mdDialog', 'Desktop', function($scope, $mdDialog, Desktop){
		/**
		 * Object for subheader
		 *
		*/
		$scope.subheader = {};
		$scope.subheader.state = 'assets';
		$scope.subheader.showButton = 'Show All';
		$scope.subheader.showButtonClass = 'md-primary';
		$scope.subheader.orderClass = 'mdi-chevron-up';
		$scope.subheader.order = 'Ascending';

		$scope.subheader.refresh = function(){
			console.log('refresh list');
		};

		$scope.subheader.orderBy = function(){
			if($scope.subheader.orderClass == 'mdi-chevron-up'){
				// change the content list to all inside array.
				$scope.subheader.orderClass = 'mdi-chevron-down';
				$scope.subheader.order = 'Descending';
			}
			else{
				// return the content list to paginated list inside array.
				$scope.subheader.orderClass = 'mdi-chevron-up';
				$scope.subheader.order = 'Ascending';
			}
		}

		/**
		 * Object for toggleList
		 *
		*/
		$scope.subheader.toggleList = function(){
			console.log('toogle list');
			if($scope.subheader.showButton == 'Show All'){
				// change the content list to all inside array.
				$scope.subheader.showButtonClass = 'md-warn';
				$scope.subheader.showButton = 'Show Less';
			}
			else{
				// return the content list to paginated list inside array.
				$scope.subheader.showButtonClass = 'md-primary';
				$scope.subheader.showButton = 'Show All';
			}
		}

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
		      	controller: 'addDesktopDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-cpu-dialog.template.html',
		      	parent: angular.element($('body')),
		    });
		};

		/**
		 * Object for rightSidenav
		 *
		*/
		$scope.rightSidenav = {};
		// hides right sidenav
		$scope.rightSidenav.show = false;
	}]);
adminModule
	.controller('cpuContentController', ['$scope', 'Desktop', function($scope, Desktop){
		/**
		 * Object for content view
		 *
		*/
		$scope.content = {};

		$scope.content.title = 'CPU Content Initialized';
	}]);
adminModule
	.controller('cpuRightSidenavController', ['$scope', 'Desktop', function($scope, Desktop){
		/**
		 * Object for content view
		 *
		*/
		$scope.sidenav = {};

		$scope.sidenav.title = 'CPU Content Initialized';
	}]);
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
		$scope.searchUserInput = function(){
			return;
		};
	}]);
adminModule
	.controller('hardDiskContentContainerController', ['$scope', 'Desktop', function($scope, Desktop){
		/**
		 * Object for content view
		 *
		*/
		$scope.fab = {};

		$scope.fab.icon = 'mdi-plus';
		$scope.fab.label = 'Add';

		$scope.fab.action = function(){
			return;
		};
	}]);
adminModule
	.controller('hardDiskContentController', ['$scope', 'HardDisk', function($scope, HardDisk){
		/**
		 * Object for content view
		 *
		*/
		$scope.content = {};

		$scope.content.title = 'Hard Disk Content Initialized';
	}]);
adminModule
	.controller('hardDiskRightSidenavController', ['$scope', 'HardDisk', function($scope, HardDisk){
		/**
		 * Object for content view
		 *
		*/
		$scope.sidenav = {};

		$scope.sidenav.title = 'Hard Disk Content Initialized';
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

		/**
		 * Search database and look for user input depending on state.
		 *
		*/
		$scope.searchUserInput = function(){
			return;
		};
	}]);
adminModule
	.controller('headsetContentController', ['$scope', 'Headset', function($scope, Headset){
		/**
		 * Object for content view
		 *
		*/
		$scope.content = {};

		$scope.content.title = 'Headset Content Initialized';
	}]);
adminModule
	.controller('headsetRightSidenavController', ['$scope', 'Headset', function($scope, Headset){
		/**
		 * Object for content view
		 *
		*/
		$scope.sidenav = {};

		$scope.sidenav.title = 'Headset Content Initialized';
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

		/**
		 * Search database and look for user input depending on state.
		 *
		*/
		$scope.searchUserInput = function(){
			return;
		};
	}]);
adminModule
	.controller('keyboardContentController', ['$scope', 'Keyboard', function($scope, Keyboard){
		/**
		 * Object for content view
		 *
		*/
		$scope.content = {};

		$scope.content.title = 'Keyboard Content Initialized';
	}]);
adminModule
	.controller('keyboardRightSidenavController', ['$scope', 'Keyboard', function($scope, Keyboard){
		/**
		 * Object for content view
		 *
		*/
		$scope.sidenav = {};

		$scope.sidenav.title = 'Keyboard Content Initialized';
	}]);
adminModule
	.controller('keyboardToolbarController', ['$scope', '$stateParams', 'Keyboard', function($scope, $stateParams, Desktop){
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

		/**
		 * Search database and look for user input depending on state.
		 *
		*/
		$scope.searchUserInput = function(){
			return;
		};
	}]);
//# sourceMappingURL=admin.js.map
