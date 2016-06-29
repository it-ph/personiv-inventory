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
	}]);