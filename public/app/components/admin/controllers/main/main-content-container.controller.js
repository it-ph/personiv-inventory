adminModule
	.controller('mainContentContainerController', ['$scope', '$state', '$mdDialog', 'Preloader', function($scope, $state, $mdDialog, Preloader){
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

		/**
		 * Object for subheader
		 *
		*/
		$scope.subheader = {};

		$scope.subheader.download = function(){
			// start preloader
			Preloader.preload();

			EmailReport.index()
				.success(function(){
					Preloader.stop();
				});
		};

		$scope.subheader.barcode = function(){
			$mdDialog.show({
		    	controller: 'barcodeDialogController',
		      	templateUrl: '/app/components/admin/templates/dialogs/barcode-dialog.template.html',
		      	parent: angular.element(document.body),
		    });
		}

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