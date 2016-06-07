sharedModule
	.config(['$urlRouterProvider', '$stateProvider', '$mdThemingProvider', function($urlRouterProvider, $stateProvider, $mdThemingProvider){
		/* Defaul Theme Blue - Light Blue */
		$mdThemingProvider.theme('default')
			.primaryPalette('blue')
			.accentPalette('light-blue');
		
		/* Dark Theme - Blue */
		$mdThemingProvider.theme('dark', 'default')
	      	.primaryPalette('blue')
			.accentPalette('light-blue')
			.dark();

		$mdThemingProvider.theme('dark-teal').backgroundPalette('teal').dark();
		$mdThemingProvider.theme('dark-orange').backgroundPalette('orange').dark();
		$mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
		$mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();

		$urlRouterProvider
			.otherwise('/page-not-found')
			.when('', '/');

		$stateProvider
			.state('page-not-found',{
				url: '/page-not-found',
				templateUrl: '/app/shared/views/page-not-found.view.html',
			})
	}]);