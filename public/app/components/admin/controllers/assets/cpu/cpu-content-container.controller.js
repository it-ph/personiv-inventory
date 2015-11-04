adminModule
	.controller('cpuContentContainerController', ['$scope', '$mdDialog', 'Desktop', function($scope, $mdDialog, Desktop){
		/**
		 * Object for subheader
		 *
		*/
		$scope.subheader = {};
		$scope.subheader.state = 'assets';
		$scope.subheader.showButton = 'Show All';
		$scope.subheader.showButtonClass = 'md-primary';
		$scope.subheader.orderClass = 'mdi-chevron-up';
		$scope.subheader.order = 'Ascending';

		$scope.subheader.refresh = function(){
			console.log('refresh list');
		};

		$scope.subheader.orderBy = function(){
			if($scope.subheader.orderClass == 'mdi-chevron-up'){
				// change the content list to all inside array.
				$scope.subheader.orderClass = 'mdi-chevron-down';
				$scope.subheader.order = 'Descending';
			}
			else{
				// return the content list to paginated list inside array.
				$scope.subheader.orderClass = 'mdi-chevron-up';
				$scope.subheader.order = 'Ascending';
			}
		}

		/**
		 * Object for toggleList
		 *
		*/
		$scope.subheader.toggleList = function(){
			console.log('toogle list');
			if($scope.subheader.showButton == 'Show All'){
				// change the content list to all inside array.
				$scope.subheader.showButtonClass = 'md-warn';
				$scope.subheader.showButton = 'Show Less';
			}
			else{
				// return the content list to paginated list inside array.
				$scope.subheader.showButtonClass = 'md-primary';
				$scope.subheader.showButton = 'Show All';
			}
		}

		/**
		 * Object for fab
		 *
		*/
		$scope.fab = {};

		$scope.fab.icon = 'mdi-plus';
		$scope.fab.label = 'Add';
		$scope.fab.show = true;

		$scope.fab.action = function(){
		    $mdDialog.show({
		      	controller: 'addDesktopDialogController',
			    templateUrl: '/app/components/admin/templates/dialogs/add-cpu-dialog.template.html',
		      	parent: angular.element($('body')),
		    });
		};

		/**
		 * Object for rightSidenav
		 *
		*/
		$scope.rightSidenav = {};
		// hides right sidenav
		$scope.rightSidenav.show = false;
	}]);