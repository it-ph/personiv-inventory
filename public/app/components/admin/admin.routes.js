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
						controller: 'floorPlanContentController',
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
						controller: 'workStationContentController',
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
						controllerProvider: ['$stateParams', 'assetService', function($stateParams, assetService){
							var index = $stateParams.assetID - 1;
							return assetService.contentController(index);
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
			 * Unit Routes
			 *
			*/
			.state('main.units', {
				url: 'assets/{assetID}/unit/{unitID}',
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
						controllerProvider: ['$stateParams', 'assetService', function($stateParams, assetService){
							var index = $stateParams.assetID - 1;
							return assetService.unitContentController(index);
						}]
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