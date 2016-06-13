var sharedModule = angular.module('sharedModule', [
	/* Vendor Dependencies */
	'ui.router',
	'ngMaterial',
	'ngMessages',
	'infinite-scroll',
	'mgcrea.ngStrap',
	'chart.js'
]);
sharedModule
	.config(['$urlRouterProvider', '$stateProvider', '$mdThemingProvider', function($urlRouterProvider, $stateProvider, $mdThemingProvider){
		/* Defaul Theme Blue - Light Blue */
		$mdThemingProvider.theme('default')
			.primaryPalette('blue')
			.accentPalette('light-blue');
		
		/* Dark Theme - Blue */
		$mdThemingProvider.theme('dark', 'default')
	      	.primaryPalette('blue')
			.accentPalette('light-blue')
			.dark();

		$mdThemingProvider.theme('dark-teal').backgroundPalette('teal').dark();
		$mdThemingProvider.theme('dark-orange').backgroundPalette('orange').dark();
		$mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
		$mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();

		$urlRouterProvider
			.otherwise('/page-not-found')
			.when('', '/');

		$stateProvider
			.state('page-not-found',{
				url: '/page-not-found',
				templateUrl: '/app/shared/views/page-not-found.view.html',
			})
	}]);
sharedModule
	.controller('homePageController', ['$scope', function($scope){
		$scope.show = function(){
			angular.element(document.querySelector('.main-view')).removeClass('hidden-custom');
		};
	}]);
sharedModule
	.factory('AssetDetail', ['$http', function($http){
		var urlBase = '/asset-detail';

		return {
			index: function(){
				return $http.get(urlBase);
			},
			store: function(data){
				return $http.post(urlBase, data);
			},
			show: function(id){
				return $http.get(urlBase + '/' + id);
			},
			update: function(id, data){
				return $http.put(urlBase + '/' + id, data);
			},
			delete: function(id){
				return $http.delete(urlBase + '/' + id);
			},
		};
	}]);
sharedModule
	.factory('AssetTag', ['$http', function($http){
		var urlBase = '/asset-tag';

		return {
			/**
			 * Fetch all departments.
			 * @return: Array of Objects
			*/
			index: function(){
				return $http.get(urlBase);
			},

			/**
			 * Fetch specific department.
			 * @return: Object
			*/
			show: function(id){
				return $http.get(urlBase +  '/' + id);
			},

			/**
			 * Store single record and returns the input data for updating record.
			 * @return object
			 *
			*/
			store: function(data){
				return $http.post(urlBase, data);
			},

			/**
			 * Store single record and returns the input data for updating record.
			 * @return object
			 *
			*/
			storeMultiple: function(data){
				return $http.post(urlBase + '-multiple', data);
			},

			/**
			 * Search database tables for data
			 *
			*/
			search: function(data){
				return $http.post(urlBase + '-search', data);
			},

			/**
			 * Search by component type
			 *
			*/
			componentType: function(data){
				return $http.post(urlBase + '-component-type', data);
			},

			/**
			 * Search all components by work-station 
			 *
			*/
			workStation: function(id){
				return $http.get(urlBase + '-work-station/' + id);
			},

			/*
			 * Show specific asset tag with join details on corresponding asset table
			 *
			*/
			specific: function(id){
				return $http.get(urlBase + '-specific/' + id);
			},

			/**
     		 * Update the specified resource in storage.
     		 *
     		*/
			update: function(id, data){
				return $http.put(urlBase + '/' + id, data);
			},

			/*
			 * Transfer the asset to a different work station
			 *
			*/
			transfer: function(assetID, data){
				return $http.put(urlBase + '-transfer/' + assetID, data);
			},

			/*
			 * Set asset tag status for repair
			 *
			*/
			repair: function(id){
				return $http.put(urlBase + '-repair/' + id);
			},

			/*
			 * Set asset tag status for dispose
			 *
			*/
			dispose: function(id){
				return $http.put(urlBase + '-dispose/' + id);
			},

			/*
			 * Set asset tag status for active
			 *
			*/
			active: function(id){
				return $http.put(urlBase + '-active/' + id);
			},

			/**
			 * Delete the asset tag
			 *
			*/
			delete : function(id){
				return $http.delete(urlBase + '/' + id);
			},

			/**
			 * Paginated load of resource for infinite scrolling.
			 * @return: Object
			*/
			activeUnit: function(page, data){
				return $http.post(urlBase + '-active-unit?page=' + page, data);
			},

			/**
			 * Paginated load of resource for infinite scrolling.
			 * @return: Object
			*/
			repairUnit: function(page, data){
				return $http.post(urlBase + '-repair-unit?page=' + page, data);
			},

			/**
			 * Paginated load of resource for infinite scrolling.
			 * @return: Object
			*/
			disposeUnit: function(page, data){
				return $http.post(urlBase + '-dispose-unit?page=' + page, data);
			},

			/**
			 * Pull out the components when pc is pulled out.
			 * 
			*/
			repairComponents: function(id){
				return $http.put(urlBase + '-repair-components/' + id);
			},

			/**
			 * Pull out the components when pc is pulled out.
			 * 
			*/
			disposeComponents: function(id){
				return $http.put(urlBase + '-dispose-components/' + id);
			},
			activeComponents: function(id){
				return $http.put(urlBase + '-active-components/' + id);
			},
			searchBarcode: function(data){
				return $http.post(urlBase + '-search-barcode', data);
			},
			availableSwap: function(data){
				return $http.post(urlBase + '-available-swap', data);
			},	
			swap: function(id, data){
				return $http.put(urlBase + '-swap/' + id , data);
			},
			transferComponents: function(id, data){
				return $http.put(urlBase + '-transfer-components/' + id, data);
			},
			swapComponents: function(id, swapID){
				return $http.put(urlBase + '-swap-components/' + id + '/target/' + swapID);
			},
		};
	}]);
sharedModule
	.factory('AssetType', ['$http', function($http){
		var urlBase = '/asset-type';

		return {
			index: function(){
				return $http.get(urlBase);
			},
			store: function(data){
				return $http.post(urlBase, data);
			},
			show: function(id){
				return $http.get(urlBase + '/' + id);
			},
			update: function(id, data){
				return $http.put(urlBase + '/' + id, data);
			},
			delete: function(id){
				return $http.delete(urlBase + '/' + id);
			},
		};
	}]);
sharedModule
	.factory('Asset', ['$http', function($http){
		var urlBase = '/asset';

		return {
			index: function(){
				return $http.get(urlBase);
			},
			store: function(data){
				return $http.post(urlBase, data);
			},
			show: function(id){
				return $http.get(urlBase + '/' + id);
			},
			update: function(id, data){
				return $http.put(urlBase + '/' + id, data);
			},
			delete: function(id){
				return $http.delete(urlBase + '/' + id);
			},
			paginate: function(assetTypeID, page){
				return $http.get(urlBase + '-paginate/' + assetTypeID + '?page=' + page);
			},
			checkDuplicate: function(data, id){
				return $http.post(urlBase + '-check-duplicate/' + id, data);
			},
		};
	}]);
sharedModule
	.factory('Department', ['$http', function($http){
		var urlBase = '/department';

		return {
			index: function(){
				return $http.get(urlBase);
			},
			store: function(data){
				return $http.post(urlBase, data);
			},
			show: function(id){
				return $http.get(urlBase + '/' + id);
			},
			update: function(id, data){
				return $http.put(urlBase + '/' + id, data);
			},
			delete: function(id){
				return $http.delete(urlBase + '/' + id);
			},
		};
	}]);
sharedModule
	.factory('EmailReport', ['$http', function($http){
		var urlBase = '/email-report';

		return {
			/**
			 * Fetch all.
			 * @return: Array of Objects
			*/
			index: function(){
				return $http.get(urlBase);
			},

			/**
			 * Fetch specific.
			 * @return: Object
			*/
			show: function(id){
				return $http.get(urlBase +  '/' + id);
			},
			
			/**
			 * Store single record and returns the input data for updating record.
			 * @return object
			 *
			*/
			store: function(data){
				return $http.post(urlBase, data);
			},

			/**
			 * Update single record and returns the input data for updating record.
			 * @return object
			 *
			*/
			update: function(id, data){
				return $http.put(urlBase + '/' + id, data);
			},
		};
	}])
sharedModule
	.factory('Employee', ['$http', function($http){
		var urlBase = '/employee';

		return {
			/**
			 * Paginated load of resource for infinite scrolling.
			 * @return: Object
			*/
			paginate: function(page){
				return $http.get(urlBase + '-paginate/' + '?page=' + page);
			},
			/**
			 * Paginated load of resource for infinite scrolling.
			 * @return: Object
			*/
			paginateDepartment: function(id, page){
				return $http.get(urlBase + '-paginate/' + id + '?page=' + page);
			},
			/**
			 * Fetch all.
			 * @return: Array of Objects
			*/
			index: function(){
				return $http.get(urlBase);
			},

			/**
			 * Fetch specific.
			 * @return: Object
			*/
			show: function(id){
				return $http.get(urlBase +  '/' + id);
			},
			
			/**
			 * Store single record and returns the input data for updating record.
			 * @return object
			 *
			*/
			store: function(data){
				return $http.post(urlBase, data);
			},

			/**
			 * Search database tables for data
			 *
			*/
			search: function(id, data){
				return $http.post(urlBase + '-search/' + id, data);
			},

			/**
			 * Show employees assigned to the work station.
 			 *
			*/
			workstation: function(id){
				return $http.get(urlBase + '-workstation/' + id);
			},

			/**
			 * Show unassigned employees by department.
 			 *
			*/
			department: function(id){
				return $http.get(urlBase + '-department/' + id);
			},
		};
	}])
sharedModule
	.factory('User', ['$http', function($http){
		var urlBase = '/user';

		return {
			index: function(){
				return $http.get(urlBase);
			},
			store: function(data){
				return $http.post(urlBase, data);
			},
			show: function(id){
				return $http.get(urlBase + '/' + id);
			},
			update: function(id, data){
				return $http.put(urlBase + '/' + id, data);
			},
			delete: function(id){
				return $http.delete(urlBase + '/' + id);
			},
			checkPassword: function(data){
				return $http.post(urlBase + '-check-password', data);
			},
			changePassword: function(data){
				return $http.post(urlBase + '-change-password', data);
			},
			others: function(){
				return $http.get(urlBase + '-others');
			},
			resetPassword: function(id){
				return $http.get(urlBase + '-reset-password/' + id);
			},
		};
	}]);
sharedModule
	.factory('WorkStation', ['$http', function($http){
		var urlBase = '/work-station';

		return {
			/**
			 * Search for vacant work stations
			 * @return : Array
			*/
			vacant: function(data){
				return $http.post(urlBase + '-vacant', data);
			},
			/**
			 * Paginated load of resource for infinite scrolling.
			 * @return: Array
			*/
			paginate: function(page){
				return $http.get(urlBase + '-paginate' + '?page=' + page);
			},
			/**
			 * Paginated load of resource for infinite scrolling.
			 * @return: Array
			*/
			paginateDepartment: function(id, page){
				return $http.get(urlBase + '-paginate/' + id + '?page=' + page);
			},
			/**
			 * Fetch all.
			 * @return: Array of Objects
			*/
			index: function(){
				return $http.get(urlBase);
			},

			/**
			 * Fetch specific.
			 * @return: Object
			*/
			show: function(id){
				return $http.get(urlBase +  '/' + id);
			},
			
			/**
			 * Store single record and returns the input data for updating record.
			 * @return object
			 *
			*/
			store: function(data){
				return $http.post(urlBase, data);
			},

			/**
			 * Search database tables for data
			 * @return Array
			*/
			search: function(data){
				return $http.post(urlBase + '-search', data);
			},

			/**
			 * Search database tables for data by department
			 * @return Array
			*/
			searchDepartment: function(id, data){
				return $http.post(urlBase + '-search/' + id, data);
			},

			/**
		     * Search for workstation according to department id except the exisiting workstation
		     * @return Array
		    */
			department: function(departmentID, workstationID){
				return $http.get(urlBase + '-department/' + departmentID + '/station/' + workstationID);
			},

			departmentPaginate: function(departmentID, workstationID, page){
				return $http.get(urlBase + '-department/' + departmentID + '/station/' + workstationID + '/paginate' + '?page=' + page);
			},
			floors: function(departmentID){
				return $http.get(urlBase + '-floors/' + departmentID);
			},

			divisions: function(departmentID, floor){
				return $http.get(urlBase + '-divisions/' + departmentID + '/floor/' + floor);
			},

			availableTransfer: function(data, id){
				return $http.post(urlBase + '-available-transfer/' + id, data);
			}
		};
	}])
sharedModule
	.service('Preloader', ['$mdDialog', '$mdToast', function($mdDialog, $mdToast){
		var dataHolder = null;
		var user = null;

		return {
			/* Starts the preloader */
			loading: function(){
				return $mdDialog.show({
					templateUrl: '/app/shared/templates/loading.html',
				    parent: angular.element(document.body),
				});
			},
			saving: function(){
				return $mdDialog.show({
					templateUrl: '/app/shared/templates/saving.html',
				    parent: angular.element(document.body),
				});
			},
			/* Stops the preloader */
			stop: function(data){
				return $mdDialog.hide(data);
			},
			/* Shows error message if AJAX failed */
			error: function(){
				return $mdDialog.show(
			    	$mdDialog.alert()
				        .parent(angular.element($('body')))
				        .clickOutsideToClose(true)
				        .title('Oops! Something went wrong!')
				        .content('An error occured. Please contact administrator for assistance.')
				        .ariaLabel('Error Message')
				        .ok('Got it!')
				);
			},
			errorMessage: function(data){
				return $mdDialog.show({
				    controller: 'errorMessageController',
				    templateUrl: '/app/shared/templates/dialogs/error-message.template.html',
				    parent: angular.element(document.body),
				    clickOutsideToClose:true,
				});
			},
			/* Send temporary data for retrival */
			set: function(data){
				dataHolder = data;
			},
			/* Retrieves data */
			get: function(){
				return dataHolder;
			},
			/* Set User */
			setUser: function(data){
				user = data;
			},
			/* Get User */
			getUser: function(data){
				return user;
			},
			toastChangesSaved: function(){
				return $mdToast.show(
			    	$mdToast.simple()
				        .textContent('Changes saved.')
				        .position('bottom right')
				        .hideDelay(3000)
			    );
			},
			deleted: function(){
				return $mdToast.show(
			    	$mdToast.simple()
				        .textContent('Deleted')
				        .position('bottom right')
				        .hideDelay(3000)
			    );
			},
		};
	}]);
//# sourceMappingURL=shared.js.map
