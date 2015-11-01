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