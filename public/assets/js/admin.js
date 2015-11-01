var accountModule = angular.module('accountModule', []);
var departmentModule = angular.module('departmentModule', []);
var assetsModule = angular.module('assetsModule', []);
var dashboardModule = angular.module('dashboardModule', []);
// dashboardModule
// 	.config(['$stateProvider', function($stateProvider){
// 		$stateProvider
// 			.state('dashboard', {
// 				url: '/dashboard',
// 				views: {
// 					'': {
// 						templateUrl: '/app/components/admin/main/views/main.view.html',
// 					},
// 					'left-sidenav@dashboard': {
// 						templateUrl: '/app/components/admin/main/templates/sidenav/left.sidenav.html',
// 						controller: 'leftSidenavController'
// 					},
// 				},
// 			})
// 	}]);
var adminModule = angular.module('adminModule', [
	/* Shared Module */
	'sharedModule',
	/* Components Module */
	'accountModule',
	'assetsModule',
	'dashboardModule',
	'departmentModule'
]);
adminModule
	.config(['$stateProvider', function($stateProvider){
		$stateProvider
			.state('main', {
				url: '/',
				views: {
					'': {
						templateUrl: '/app/components/admin/main/views/main.view.html',
						controller: 'mainViewController',
					},
					'left-sidenav@main': {
						templateUrl: '/app/components/admin/main/templates/sidenavs/left.sidenav.html',
						controller: 'leftSidenavController',
					},
					'toolbar@main': {
						templateUrl: '/app/components/admin/main/templates/toolbar.template.html',
						controller: 'toolbarController',
					}
				},
			})
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
				'name':'Department',
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
		$scope.menu.department = [];

		// set section as active
		$scope.setActive = function(index){
		 	angular.element($('[aria-label="'+ 'section-' + index + '"]').closest('li').toggleClass('active'));
		 	angular.element($('[aria-label="'+ 'section-' + index + '"]').closest('li').siblings().removeClass('active'));
		};
	}]);
adminModule
	.controller('mainViewController', ['$scope', 'User', function($scope, User){
		/**
		 * Fetch authenticated user information
		 *
		*/
		User.index()
			.success(function(data){
				$scope.user = data;
			});
	}]);
adminModule
	.controller('toolbarController', ['$scope', function($scope){
		
	}]);
//# sourceMappingURL=admin.js.map
