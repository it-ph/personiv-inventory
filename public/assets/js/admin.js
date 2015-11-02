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
					'content@main': {
						templateUrl: '/app/components/admin/templates/content/main.content.template.html',
						controller: 'mainContentController',	
					},
					'right-sidenav@main': {
						templateUrl : '/app/components/admin/templates/sidenavs/main-right.sidenav.html',
						controller: 'mainRightSidenavController',
					},
				}
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
				}
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
				}
			})
			/**
			 * Assets Routes
			 *
			*/
			.state('main.asset', {
				url: 'assets'
			})

			.state('main.hard-disk', {
				url: 'assets/hard-disk',
				views: {
					'toolbar': {
						templateUrl: '/app/components/admin/templates/toolbar.template.html',
						controller: 'hardDiskToolbarController',
					},
					'content': {
						templateUrl: '/app/components/admin/templates/content/assets.content.template.html',
						controller: 'hardDiskContentController',
					},
					'right-sidenav': {
						templateUrl: '/app/components/admin/templates/sidenavs/main-right.sidenav.html',
						controller: 'hardDiskRightSidenavController',
					}
				}
			})
			.state('main.headset', {
				url: 'assets/hard-disk',
				views: {
					'toolbar': {
						templateUrl: '/app/components/admin/templates/toolbar.template.html',
						// controller: 'headsetToolbarController',
					},
				}
			})

			/**
			 * Department Routes
			 *
			*/
			.state('main.department', {
				url: 'department/{departmentID}',
				params: {'departmentID':null},
				views: {
					'toolbar': {
						templateUrl: '/app/components/admin/templates/toolbar.template.html',
						controller: 'departmentToolbarController',
					},
					''
				}
			})
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
	.controller('departmentToolbarController', ['$scope', '$stateParams', 'Department', function($scope, $stateParams, Department){
		/**
		 *  Object for toolbar view.
		 *
		*/
		$scope.toolbar = {};

		/**
		 * Properties and method of toolbar.
		 *
		*/
		$scope.toolbar.parentState = 'Departments';
		
		Department.show($stateParams.departmentID)
			.success(function(data){
				$scope.toolbar.childState = data.name;
			});

		/**
		 * Search database and look for user input depending on state.
		 *
		*/
		$scope.searchUserInput = function(){
			return;
		};

	}]);
adminModule
	.controller('leftSidenavController', ['$scope', 'Department', function($scope, Department){
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
					'state':'main.cpu',
				},
				{
					'name': 'Hard Disk',
					'state':'main.hard-disk',
				},
				{
					'name': 'Headset',
					'state':'main.headset',
				},
				{
					'name': 'Keyboard',
					'state':'main.keyboard',
				},
				{
					'name': 'Memory',
					'state':'main.memory',
				},
				{
					'name': 'Monitor',
					'state':'main.monitor',
				},
				{
					'name': 'Mouse',
					'state':'main.mouse',
				},
				{
					'name': 'Printer',
					'state':'main.printer',
				},
				{
					'name': 'Scanner',
					'state':'main.scanner',
				},
				{
					'name': 'Software',
					'state':'main.software',
				},
				{
					'name': 'UPS',
					'state':'main.ups',
				},
				{
					'name': 'Video Card',
					'state':'main.video-card',
				},
				{
					'name': 'Other Components',
					'state':'main.other-components',
				},
			],
		];

		/* AJAX Request Department */
		Department.index()
			.success(function(data){
				$scope.menu.pages.push(data);
			});

		// set section as active
		$scope.setActive = function(index){
		 	angular.element($('[aria-label="'+ 'section-' + index + '"]').closest('li').toggleClass('active'));
		 	angular.element($('[aria-label="'+ 'section-' + index + '"]').closest('li').siblings().removeClass('active'));
		};
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
		$scope.toolbar.parentState = 'Home';
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
	.controller('hardDiskContentController', ['$scope', function($scope){
		/**
		 *  Object for toolbar view.
		 *
		*/
		$scope.content = {};

		$scope.content.title = 'Hard Disk Content Initialized';
	}]);
adminModule
	.controller('hardDiskRightSidenavController', ['$scope', function($scope){
		/**
		 *  Object for toolbar view.
		 *
		*/
		$scope.sidenav = {};

		$scope.sidenav.title = 'Hard Disk Right Sidenav Initialized';
	}]);
adminModule
	.controller('hardDiskToolbarController', ['$scope', '$state', function($scope, $state){
		/**
		 *  Object for toolbar view.
		 *
		*/
		$scope.toolbar = {};

		/**
		 * Properties and method of toolbar.
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
//# sourceMappingURL=admin.js.map
