adminModule
	.controller('settingsContentContainerController', ['$scope', '$filter', '$mdDialog', 'Preloader', 'Department', 'AssetType', function($scope, $filter, $mdDialog, Preloader, Department, AssetType){
		/**
		  *
		  * Object for toolbar
		  *
		*/
		$scope.toolbar = {};
		$scope.toolbar.childState = 'Settings';
		$scope.toolbar.items = [];
		$scope.toolbar.getItems = function(query){
			var results = query ? $filter('filter')($scope.toolbar.items, query) : $scope.toolbar.items;
			return results;
		}
		$scope.showSearchBar = function(){
	    	$scope.searchBar = true;
	    }

	    $scope.hideSearchBar = function(){
	    	$scope.searchBar = false;
	    	$scope.toolbar.searchText = '';
	    }
		
		/**
		  *
		  * Object for subheader
		  *
		*/
		$scope.subheader = {};
		$scope.subheader.refresh = function(){
			/* Reset the data */
			$scope.departments = [];
			$scope.programs = [];
			$scope.show.department = false;
			$scope.show.program = false;
			/* Starts the loading */
			Preloader.loading();
			$scope.init(true);
		}

		/**
		  *
		  * Department Actions
		*/

		$scope.createDepartment = function(){
			$mdDialog.show({
		    	controller: 'createDepartmentDialogController',
		      	templateUrl: '/app/components/admin/templates/dialogs/department-dialog.template.html',
		      	parent: angular.element(document.body),
		    })
	        .then(function() {
	        	$scope.subheader.refresh();
	        }, function() {
	        	return;
	        });
		}

		$scope.editDepartment = function(id){
			Preloader.set(id);
			$mdDialog.show({
		    	controller: 'editDepartmentDialogController',
		      	templateUrl: '/app/components/admin/templates/dialogs/department-dialog.template.html',
		      	parent: angular.element(document.body),
		    })
	        .then(function() {
	        	$scope.subheader.refresh();
	        	Preloader.toastChangesSaved();
	        }, function() {
	        	return;
	        });	
		}

		$scope.deleteDepartment = function(id){
			var confirm = $mdDialog.confirm()
		        .title('Delete department')
		        .textContent('This department will be removed from the respondents list.')
		        .ariaLabel('Delete department')
		        .ok('Delete')
		        .cancel('Cancel');

		    $mdDialog.show(confirm)
		    	.then(function() {
			    	Department.delete(id)
			    		.success(function(){
			    			$scope.subheader.refresh();
			    			Preloader.toastChangesSaved();
			    		})
			    		.error(function(){
			    			Preloader.error();
			    		});
			    }, function() {
			    	return;
			    });
		}

		/**
		  *
		  * AssetType Actions
		  *
		*/

		$scope.createAssetType = function(){
			$mdDialog.show({
		    	controller: 'createAssetTypeDialogController',
		      	templateUrl: '/app/components/admin/templates/dialogs/asset-type-dialog.template.html',
		      	parent: angular.element(document.body),
		    })
	        .then(function() {
	        	$scope.subheader.refresh();
	        }, function() {
	        	return;
	        });
		}

		$scope.editAssetType = function(id){
			Preloader.set(id);
			$mdDialog.show({
		    	controller: 'editAssetTypeDialogController',
		      	templateUrl: '/app/components/admin/templates/dialogs/asset-type-dialog.template.html',
		      	parent: angular.element(document.body),
		    })
	        .then(function() {
	        	$scope.subheader.refresh();
	        	Preloader.toastChangesSaved();
	        }, function() {
	        	return;
	        });	
		}

		$scope.deleteAssetType = function(id){
			var confirm = $mdDialog.confirm()
		        .title('Delete')
		        .textContent('This asset will be removed from the list.')
		        .ariaLabel('Delete program')
		        .ok('Delete')
		        .cancel('Cancel');

		    $mdDialog.show(confirm)
		    	.then(function() {
			    	AssetType.delete(id)
			    		.success(function(){
			    			$scope.subheader.refresh();
			    			Preloader.toastChangesSaved();
			    		})
			    		.error(function(){
			    			Preloader.error();
			    		});
			    }, function() {
			    	return;
			    });
		}

		/**
		 *
		 * Object for FAB
		 *
		*/

		$scope.fab = {};
		$scope.fab.label = "Create";
		$scope.fab.icon = "mdi-plus";
		$scope.fab.action = function(){
			$mdDialog.show({
		    	controller: 'departmentOrAssetTypeDialogController',
		      	templateUrl: '/app/components/admin/templates/dialogs/department-or-asset-type-dialog.template.html',
		      	parent: angular.element(document.body),
		      	clickOutsideToClose:true,
		    })
		    .then(function(answer){
		    	if(answer == 'Department'){
		    		$scope.createDepartment();
		    	}
		    	else{
		    		$scope.createAssetType();
		    	}
		    }, function(){
		    	return;
		    });
		}

		/**
		  *
		  * Object for show
		  *
		*/
		$scope.show = {};

		/* sets the first letter and format the date to date object */
		var formatData = function(data)
		{
			angular.forEach(data, function(item){
				item.first_letter = item.name.charAt(0).toUpperCase();
				item.created_at = new Date(item.created_at);
			});
		}

		/**
		  *
		  * Initial data fetching
		  *
		*/
		$scope.init = function(refresh){
			$scope.fab.show = false;
			Department.index()
				.then(function(data){
					// formats the data;
					formatData(data.data);
					
					$scope.departments = data.data;

					$scope.show.department = true;

					angular.forEach(data, function(item){
						var toolbarItem = {};
						toolbarItem.display = item.name;
						$scope.toolbar.items.push(toolbarItem);
					});

					return;
				})
				.then(function(){
					AssetType.index()
						.success(function(data){
							// formats the data;
							formatData(data);

							$scope.programs = data;

							$scope.show.program = true;

							angular.forEach(data, function(item){
								var toolbarItem = {};
								toolbarItem.display = item.name;
								$scope.toolbar.items.push(toolbarItem);
							});

							$scope.toolbar.getItems();

							if(refresh)
							{
								Preloader.stop();
								Preloader.stop();
							}

							if($scope.departments.length || $scope.programs.length)
							{
								$scope.fab.show = true;
							}

							return;
						})

				}, function(){
					Preloader.error();
				});
		}

		/* execute initial data fetching */
		$scope.init();

		console.log('done');
	}]);