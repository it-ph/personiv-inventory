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