adminModule
	.config(['$stateProvider', function($stateProvider){
		$stateProvider
			.state('main', {
				url: '/',
				views: {
					'': {
						templateUrl: '/app/components/admin/main/views/main.view.html',
					},
					'left-sidenav@main': {
						templateUrl: '/app/components/admin/main/templates/sidenav/left.sidenav.html',
						controller: 'leftSidenavController'
					},
				},
			})
			.state('main.dashboard', {

			})
			.state('main.assets', {
				
			})
			.state('main.department', {
				
			})
	}]);