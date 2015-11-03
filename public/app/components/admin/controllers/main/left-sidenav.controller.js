adminModule
	.controller('leftSidenavController', ['$scope', 'Department', 'departmentService', function($scope, Department, departmentService){
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
					'state':'main.assets',
					'id': 1
				},
				{
					'name': 'Hard Disk',
					'state':'main.assets',
					'id': 2
				},
				{
					'name': 'Headset',
					'state':'main.assets',
					'id': 3
				},
				{
					'name': 'Keyboard',
					'state':'main.assets',
					'id': 4
				},
				{
					'name': 'Memory',
					'state':'main.assets',
					'id': 5
				},
				{
					'name': 'Monitor',
					'state':'main.assets',
					'id': 6
				},
				{
					'name': 'Mouse',
					'state':'main.assets',
					'id': 7
				},
				{
					'name': 'Printer',
					'state':'main.assets',
					'id': 8
				},
				{
					'name': 'Scanner',
					'state':'main.assets',
					'id': 9
				},
				{
					'name': 'Software',
					'state':'main.assets',
					'id': 10
				},
				{
					'name': 'UPS',
					'state':'main.assets',
					'id': 11
				},
				{
					'name': 'Video Card',
					'state':'main.assets',
					'id': 12
				},
				{
					'name': 'Other Components',
					'state':'main.assets',
					'id': 13
				},
			],
		];

		/* AJAX Request Department */
		Department.index()
			.success(function(data){
				$scope.menu.pages.push(data);
				this.index = $scope.menu.pages.length - 1;
				/* Save the department on service for future use */
				departmentService.set($scope.menu.pages[this.index]);
			});

		// set section as active
		$scope.setActive = function(index){
		 	angular.element($('[aria-label="'+ 'section-' + index + '"]').closest('li').toggleClass('active'));
		 	angular.element($('[aria-label="'+ 'section-' + index + '"]').closest('li').siblings().removeClass('active'));
		};
	}]);