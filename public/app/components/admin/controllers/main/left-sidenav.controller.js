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