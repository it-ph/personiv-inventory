adminModule
	.controller('mainContentContainerController', ['$scope', '$state', '$mdDialog', 'Preloader', 'InventoryReport', function($scope, $state, $mdDialog, Preloader, InventoryReport){
		/**
		 *  Object for toolbar view.
		 *
		*/
		$scope.toolbar = {};

		/**
		 * Properties and method of toolbar.
		 *
		*/
		$scope.toolbar.childState = 'Dashboard';

		$scope.toolbar.subheader = 'Options';

		$scope.toolbar.options = [
			{
				'label': 'Download Report',
				'icon': 'mdi-download',
				action : function(){
					var win = window.open('/inventory-report/', '_blank');
					win.focus();
				},
			},
			{
				'label': 'Sticker Generator',
				'icon': 'mdi-barcode',
				action : function(){
					$mdDialog.show({
				    	controller: 'barcodeDialogController',
				      	templateUrl: '/app/components/admin/templates/dialogs/barcode-dialog.template.html',
				      	parent: angular.element(document.body),
				    });
				},
			},
		];

		// $scope.subheader.barcode = function(){
		// 	$mdDialog.show({
		//     	controller: 'barcodeDialogController',
		//       	templateUrl: '/app/components/admin/templates/dialogs/barcode-dialog.template.html',
		//       	parent: angular.element(document.body),
		//     });
		// }

		/**
		 * Status of search bar.
		 *
		*/
		$scope.searchBar = false;

		/**
		 * Reveals the search bar.
		 *
		*/
		$scope.showSearchBar = function(){
			$scope.searchBar = true;
		};

		/**
		 * Hides the search bar.
		 *
		*/
		$scope.hideSearchBar = function(){
			$scope.toolbar.searchText = '';
			$scope.searchBar = false;
		};

		$scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
		$scope.series = ['Series A', 'Series B'];
		$scope.data = [
		    [65, 59, 80, 81, 56, 55, 40],
		    [28, 48, 40, 19, 86, 27, 90]
		];
		$scope.onClick = function (points, evt) {
		    console.log(points, evt);
		};
		$scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
		$scope.options = {
		    scales: {
		      yAxes: [
		        {
		          id: 'y-axis-1',
		          type: 'linear',
		          display: true,
		          position: 'left'
		        },
		        {
		          id: 'y-axis-2',
		          type: 'linear',
		          display: true,
		          position: 'right'
		        }
		      ]
		    }
		};

		$scope.pie = {};
		$scope.pie.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
		$scope.pie.data = [300, 500, 100];
	}]);