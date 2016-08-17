var sharedModule = angular.module('sharedModule', [
	/* Vendor Dependencies */
	'ui.router',
	'ngMaterial',
	'ngMessages',
	'infinite-scroll',
	'mgcrea.ngStrap',
	'chart.js',
	'angularMoment'
]);
sharedModule
	.config(['$urlRouterProvider', '$stateProvider', '$mdThemingProvider', function($urlRouterProvider, $stateProvider, $mdThemingProvider){
		/* Defaul Theme Blue - Light Blue */
		$mdThemingProvider.theme('default')
			.primaryPalette('blue')
		
		/* Dark Theme - Blue */
		$mdThemingProvider.theme('dark', 'default')
	      	.primaryPalette('blue')
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
sharedModule
	.factory('Activity', ['$http', function($http){
		var urlBase = '/activity';

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
			paginate: function(page){
				return $http.get(urlBase + '-paginate?page=' + page);
			},
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
	.factory('AssetPurchaseOrder', ['$http', function($http){
		var urlBase = '/asset-purchase-order';

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
	.factory('AssetStatus', ['$http', function($http){
		var urlBase = '/asset-status';

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
			lastPropertyCode: function(data){
				return $http.post(urlBase + '-last-property-code', data);
			},
			repair: function(id){
				return $http.get(urlBase + '-repair/' + id);
			},
			paginate: function(assetTypeID, page){
				return $http.get(urlBase + '-paginate/' + assetTypeID + '?page=' + page);
			},
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

			/**
			 * Delete the asset tag
			 *
			*/
			delete : function(id){
				return $http.delete(urlBase + '/' + id);
			},

			checkSwap: function(data){
				return $http.post(urlBase + '-check-swap', data);
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
			checkSequence: function(data){
				return $http.post(urlBase + '-check-sequence', data);
			},
			search: function(data){
				return $http.post(urlBase + '-search', data);
			},
			statuses: function(id){
				return $http.get(urlBase + '-statuses/' + id);
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
			checkAssetType: function(data){
				return $http.post(urlBase + '-check-asset-type', data);
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
			brands: function(id){
				return $http.get(urlBase + '-brands/' + id);
			},
			purchaseOrders: function(id){
				return $http.get(urlBase + '-purchase-orders/' + id);
			},
		};
	}]);
sharedModule
	.factory('DepartmentWorkStation', ['$http', function($http){
		var urlBase = '/department-work-station';

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
			relation: function(departmentID, workstationID){
				return $http.get(urlBase + '-relation/' + departmentID + '/work-station/' + workstationID);
			},
			department: function(departmentID){
				return $http.get(urlBase + '-department/' + departmentID);
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
			checkDepartment: function(data){
				return $http.post(urlBase + '-check-department', data);
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
	.factory('InventoryReport', ['$http', function($http){
		var urlBase = '/inventory-report';

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
			dashboard: function(){
				return $http.get(urlBase + '-dashboard');
			},
			chartWeekly: function(data){
				return $http.post(urlBase + '-chart-weekly', data);
			},
		};
	}]);
sharedModule
	.factory('PurchaseOrder', ['$http', function($http){
		var urlBase = '/purchase-order';

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
			paginate: function(page){
				return $http.get(urlBase + '-paginate?page=' + page);
			},
			search: function(data){
				return $http.post(urlBase + '-search', data);
			},
		};
	}]);
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
			checkEmail: function(data){
				return $http.post(urlBase + '-check-email', data);
			},
			others: function(){
				return $http.get(urlBase + '-others');
			},
		};
	}]);
sharedModule
	.factory('Vendor', ['$http', function($http){
		var urlBase = '/vendor';

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
			distinct: function(data){
				return $http.post(urlBase + '-distinct', data);
			},
			contactPersons: function(id){
				return $http.get(urlBase + '-contact-persons/' + id);
			},
			contactNumbers: function(id){
				return $http.get(urlBase + '-contact-numbers/' + id);
			},
		};
	}]);
sharedModule
	.factory('WorkStation', ['$http', function($http){
		var urlBase = '/work-station';

		return {
			others: function(id){
				return $http.get(urlBase + '-others/' + id);
			},
			dashboard: function(){
				return $http.get(urlBase + '-dashboard');
			},
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

			update: function(id, data){
				return $http.put(urlBase + '/' + id, data);
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
			},
			checkIP: function(id, data){
				return $http.post(urlBase + '-check-ip/' + id, data);
			},
			batchTransfer: function(id, data){
				return $http.post(urlBase + '-batch-transfer/' + id, data);
			},
		};
	}])
//# sourceMappingURL=shared.js.map
