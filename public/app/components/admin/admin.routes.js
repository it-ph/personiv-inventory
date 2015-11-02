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