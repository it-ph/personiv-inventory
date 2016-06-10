adminModule
	.controller('settingsContentContainerController', ['$scope', '$state', '$filter', '$mdDialog', 'Preloader', 'Department', 'AssetType', 'User', function($scope, $state, $filter, $mdDialog, Preloader, Department, AssetType, User){
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
		$scope.toolbar.refresh = function(){
			/* Reset the data */
			$scope.departments = [];
			$scope.asset_types = [];
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
	        	$scope.toolbar.refresh();
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
	        	$scope.toolbar.refresh();
	        	Preloader.toastChangesSaved();
	        }, function() {
	        	return;
	        });	
		}

		$scope.deleteDepartment = function(id){
			var confirm = $mdDialog.confirm()
		        .title('Delete')
		        .textContent('This department will be removed from the list.')
		        .ariaLabel('Delete department')
		        .ok('Delete')
		        .cancel('Cancel');

		    $mdDialog.show(confirm)
		    	.then(function() {
			    	Department.delete(id)
			    		.success(function(){
			    			$scope.toolbar.refresh();
			    			Preloader.deleted();
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
	        	$scope.toolbar.refresh();
	        	$state.go($state.current, {}, {reload:true});
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
	        	$scope.toolbar.refresh();
	        	$state.go($state.current, {}, {reload:true});
	        	Preloader.toastChangesSaved();
	        }, function() {
	        	return;
	        });	
		}

		$scope.deleteAssetType = function(id){
			var confirm = $mdDialog.confirm()
		        .title('Delete')
		        .textContent('This asset will be removed from the list.')
		        .ariaLabel('Delete Asset Type')
		        .ok('Delete')
		        .cancel('Cancel');

		    $mdDialog.show(confirm)
		    	.then(function() {
			    	AssetType.delete(id)
			    		.success(function(){
			    			$scope.toolbar.refresh();
			    			$state.go($state.current, {}, {reload:true});
			    			Preloader.deleted();
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
		  * Users Actions
		  *
		*/
		$scope.createUser = function(){
			$mdDialog.show({
		    	controller: 'createUserDialogController',
		      	templateUrl: '/app/components/admin/templates/dialogs/user-dialog.template.html',
		      	parent: angular.element(document.body),
		    })
	        .then(function(){
	        	$scope.toolbar.refresh();
	        	$state.go($state.current, {}, {reload:true});
	        }, function() {
	        	return;
	        });
		}

		$scope.resetPassword = function(id){
			var confirm = $mdDialog.confirm()
		        .title('Reset Password')
		        .textContent('Reset the password for this account?')
		        .ariaLabel('Reset Password')
		        .ok('Reset')
		        .cancel('Cancel');

		    $mdDialog.show(confirm)
		    	.then(function() {
			    	User.resetPassword(id)
			    		.success(function(){
			    			Preloader.toastChangesSaved();
			    		})
			    		.error(function(){
			    			Preloader.error();
			    		});
			    }, function() {
			    	return;
			    });
		}

		$scope.deleteAccount = function(id){
			var confirm = $mdDialog.confirm()
		        .title('Delete Account')
		        .textContent('This account will be removed permanently.')
		        .ariaLabel('Delete Account')
		        .ok('Delete')
		        .cancel('Cancel');

		    $mdDialog.show(confirm)
		    	.then(function() {
			    	User.delete(id)
			    		.success(function(){
			    			$scope.toolbar.refresh();
			    			$state.go($state.current, {}, {reload:true});
			    			Preloader.deleted();
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
		  * Object for show
		  *
		*/

		/* sets the first letter and format the date to date object */
		var formatData = function(data)
		{
			angular.forEach(data, function(item){
				item.first_letter = item.name ? item.name.charAt(0).toUpperCase() : (item .type ? item.type.charAt(0).toUpperCase() : item.first_name.charAt(0).toUpperCase());
				item.created_at = new Date(item.created_at);
			});

			return data;
		}

		/**
		  *
		  * Initial data fetching
		  *
		*/
		$scope.init = function(refresh){
			Department.index()
				.then(function(data){
					// formats the data;
					formatData(data.data);
					
					$scope.departments = data.data;

					angular.forEach(data.data, function(item){
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
							formatData(data.data);

							$scope.asset_types = data;

							angular.forEach(data.data, function(item){
								var toolbarItem = {};
								toolbarItem.display = item.type;
								$scope.toolbar.items.push(toolbarItem);
							});

							$scope.toolbar.getItems();

							return;
						})

				})
				.then(function(){
					User.others()
						.success(function(data){
							formatData(data.data);

							$scope.users = data;

							angular.forEach(data.data, function(item){
								var toolbarItem = {};
								toolbarItem.display = item.first_name;
								$scope.toolbar.items.push(toolbarItem);
							});

							if(refresh)
							{
								Preloader.stop();
								Preloader.stop();
							}
						})
						.error(function(){
							Preloader.error();
						});

				}, function(){
					Preloader.error();
				});
		}

		/* execute initial data fetching */
		$scope.init();
	}]);