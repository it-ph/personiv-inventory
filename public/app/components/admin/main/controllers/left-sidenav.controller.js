adminModule
	.controller('leftSidenavController', ['$scope', function($scope){
		$scope.menu = {};

		$scope.menu.section = [
			{
				'name':'Dashboard',
				'state':'main.dashboard',
			},
			{
				'name':'Assets',
				'state':'main.assets',
			},
			{
				'name':'Department',
				'state':'main.department',
			},
			{
				'name':'Account',
				'state':'main.account',
			},
		];

		$scope.menu.pages = [
			/* 0 */
			[
				{
					'name':'Analysis',
					'state':'dashboard.analysis',
				},
				{
					'name':'Floor Plan',
					'state':'dashboard.floor-plan',
				},
			],
			/* 1 */
			[
				{
					'name': 'Hard Disk',
					'state':'assets.hard-disk',
				},
				{
					'name': 'Headset',
					'state':'assets.headset',
				},
				{
					'name': 'Keyboard',
					'state':'assets.keyboard',
				},
				{
					'name': 'Memory',
					'state':'assets.memory',
				},
				{
					'name': 'Monitor',
					'state':'assets.monitor',
				},
				{
					'name': 'Mouse',
					'state':'assets.mouse',
				},
				{
					'name': 'Printer',
					'state':'assets.printer',
				},
				{
					'name': 'Scanner',
					'state':'assets.scanner',
				},
				{
					'name': 'Software',
					'state':'assets.software',
				},
				{
					'name': 'Video Card',
					'state':'assets.video-card',
				},
				{
					'name': 'Other Components',
					'state':'assets.other-components',
				},
			],
		];

		/* AJAX Request Department */
		$scope.menu.department = [];
	}]);