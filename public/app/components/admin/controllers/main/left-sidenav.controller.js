adminModule
	.controller('leftSidenavController', ['$scope', '$mdSidenav', 'Department', 'departmentService', function($scope, $mdSidenav, Department, departmentService){
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
				// {
				// 	'name':'Analysis',
				// 	'state':'main.analysis',
				// },
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
					'name': 'Firewall',
					'state':'main.assets',
					'id': 2
				},
				{
					'name': 'Hard Disk',
					'state':'main.assets',
					'id': 3
				},
				{
					'name': 'Headset',
					'state':'main.assets',
					'id': 4
				},
				{
					'name': 'Keyboard',
					'state':'main.assets',
					'id': 5
				},
				{
					'name': 'Mac Computer',
					'state':'main.assets',
					'id': 6
				},
				{
					'name': 'Memory',
					'state':'main.assets',
					'id': 7
				},
				{
					'name': 'Monitor',
					'state':'main.assets',
					'id': 8
				},
				{
					'name': 'Mouse',
					'state':'main.assets',
					'id': 9
				},
				{
					'name': 'Network Switch',
					'state':'main.assets',
					'id': 10
				},
				{
					'name': 'Portable Hard Disk',
					'state':'main.assets',
					'id': 11
				},
				{
					'name': 'Printer',
					'state':'main.assets',
					'id': 12
				},
				{
					'name': 'Projector',
					'state':'main.assets',
					'id': 13
				},
				{
					'name': 'Router',
					'state':'main.assets',
					'id': 14
				},
				{
					'name': 'Scanner',
					'state':'main.assets',
					'id': 15
				},
				{
					'name': 'Software',
					'state':'main.assets',
					'id': 16
				},
				{
					'name': 'Speaker',
					'state':'main.assets',
					'id': 17
				},
				{
					'name': 'Telephone',
					'state':'main.assets',
					'id': 18
				},
				{
					'name': 'UPS',
					'state':'main.assets',
					'id': 19
				},
				{
					'name': 'Video Card',
					'state':'main.assets',
					'id': 20
				},
				{
					'name': 'Other Components',
					'state':'main.assets',
					'id': 21
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