var sharedModule = angular.module('sharedModule', [
	/* Vendor Dependencies */
	'ui.router',
	'ngMaterial',
	'ngMessages',
	'infinite-scroll',
	'mgcrea.ngStrap'
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
	.service('Preloader', ['$mdDialog', function($mdDialog){
		var dataHolder = null;
		return {
			/* Starts the preloader */
			preload: function(){
				return $mdDialog.show({
					templateUrl: '/app/shared/templates/preloader.html',
				    parent: angular.element(document.body),
				});
			},
			/* Stops the preloader */
			stop: function(data){
				$mdDialog.hide(data);
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
			/* Send temporary data for retrival */
			set: function(data){
				dataHolder = data;
			},
			/* Retrieves data */
			get: function(){
				return dataHolder;
			}
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
		};
	}]);
sharedModule
	.factory('Department', ['$http', function($http){
		var urlBase = '/department';

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
			 * Other departments
			 * @return: Array of Objects
			*/
			others: function(id){
				return $http.get(urlBase + '-others/' + id);
			},
		};
	}]);
sharedModule
	.factory('Desktop', ['$http', function($http){
		var urlBase = '/desktop';

		return {
			/**
		     * Fetch models with specific brand.
		     *
		     * @return Array of Objects
		    */
			model: function(data){
				return $http.post(urlBase + '-model', data);
			},
			/**
		     * Fetch distinct table columns
		     *
		     * @return Array of Objects
		    */
		    distinct: function(data){
		    	return $http.post(urlBase + '-distinct', data);
		    },
			/**
			 * Paginated load of resource for infinite scrolling.
			 * @return: Object
			*/
			paginate: function(page){
				return $http.get(urlBase + '-paginate?page=' + page);
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
			search: function(data){
				return $http.post(urlBase + '-search', data);
			},

			/**
			 * Search for other records in database except the given id
			 *
			*/
			other: function(id){
				return $http.get(urlBase +'-other/' + id);
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
	.factory('EmployeeTag', ['$http', function($http){
		var urlBase = '/employee-tag';

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
			 * Fetch Work Station Tag by workstation_id
			 * 
			*/
			workstation: function(id){
				return $http.get(urlBase + '-workstation/' + id);
			},

			/**
			 * Update single record and returns the input data for updating record.
			 * @return object
			 *
			*/
			update: function(id, data){
				return $http.put(urlBase + '/' + id, data);
			},

			employee: function(id){
				return $http.get(urlBase + '-employee/' + id);
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
	.factory('Firewall', ['$http', function($http){
		var urlBase = '/firewall';

		return {
			/**
		     * Fetch models with specific brand.
		     *
		     * @return Array of Objects
		    */
			model: function(data){
				return $http.post(urlBase + '-model', data);
			},
			/**
		     * Fetch distinct table columns
		     *
		     * @return Array of Objects
		    */
		    distinct: function(data){
		    	return $http.post(urlBase + '-distinct', data);
		    },
		    
			/**
			 * Paginated load of resource for infinite scrolling.
			 * @return: Object
			*/
			paginate: function(page){
				return $http.get(urlBase + '-paginate?page=' + page);
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
			 * Search database tables for data
			 *
			*/
			search: function(data){
				return $http.post(urlBase + '-search', data);
			},
			
			/**
			 * Search for other records in database except the given id
			 *
			*/
			other: function(id){
				return $http.get(urlBase +'-other/' + id);
			},
		};
	}]);
sharedModule
	.factory('HardDisk', ['$http', function($http){
		var urlBase = '/hard-disk';

		return {
			/**
		     * Fetch models with specific brand.
		     *
		     * @return Array of Objects
		    */
			model: function(data){
				return $http.post(urlBase + '-model', data);
			},
			/**
		     * Fetch distinct table columns
		     *
		     * @return Array of Objects
		    */
		    distinct: function(data){
		    	return $http.post(urlBase + '-distinct', data);
		    },
		    
			/**
			 * Paginated load of resource for infinite scrolling.
			 * @return: Object
			*/
			paginate: function(page){
				return $http.get(urlBase + '-paginate?page=' + page);
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
			 * Search database tables for data
			 *
			*/
			search: function(data){
				return $http.post(urlBase + '-search', data);
			},
			
			/**
			 * Search for other records in database except the given id
			 *
			*/
			other: function(id){
				return $http.get(urlBase +'-other/' + id);
			},
		};
	}]);
sharedModule
	.factory('Headset', ['$http', function($http){
		var urlBase = '/headset';

		return {
			/**
		     * Fetch models with specific brand.
		     *
		     * @return Array of Objects
		    */
			model: function(data){
				return $http.post(urlBase + '-model', data);
			},
			/**
		     * Fetch distinct table columns
		     *
		     * @return Array of Objects
		    */
		    distinct: function(data){
		    	return $http.post(urlBase + '-distinct', data);
		    },
		    
			/**
			 * Paginated load of resource for infinite scrolling.
			 * @return: Object
			*/
			paginate: function(page){
				return $http.get(urlBase + '-paginate?page=' + page);
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
			 * Search database tables for data
			 *
			*/
			search: function(data){
				return $http.post(urlBase + '-search', data);
			},
			
			/**
			 * Search for other records in database except the given id
			 *
			*/
			other: function(id){
				return $http.get(urlBase +'-other/' + id);
			},
		};
	}]);
sharedModule
	.factory('Keyboard', ['$http', function($http){
		var urlBase = '/keyboard';

		return {
			/**
		     * Fetch models with specific brand.
		     *
		     * @return Array of Objects
		    */
			model: function(data){
				return $http.post(urlBase + '-model', data);
			},
			/**
		     * Fetch distinct table columns
		     *
		     * @return Array of Objects
		    */
		    distinct: function(data){
		    	return $http.post(urlBase + '-distinct', data);
		    },
		    
			/**
			 * Paginated load of resource for infinite scrolling.
			 * @return: Object
			*/
			paginate: function(page){
				return $http.get(urlBase + '-paginate?page=' + page);
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
			 * Search database tables for data
			 *
			*/
			search: function(data){
				return $http.post(urlBase + '-search', data);
			},
			
			/**
			 * Search for other records in database except the given id
			 *
			*/
			other: function(id){
				return $http.get(urlBase +'-other/' + id);
			},
		};
	}]);
sharedModule
	.factory('Log', ['$http', function($http){
		var urlBase = '/log';

		return {
			/**
			 * Paginated load of resource for infinite scrolling.
			 * @return: Object
			*/
			paginate: function(page){
				return $http.get(urlBase + '-paginate?page=' + page);
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
			 * Search database tables for data
			 *
			*/
			search: function(data){
				return $http.post(urlBase + '-search', data);
			},
		};
	}]);
sharedModule
	.factory('Mac', ['$http', function($http){
		var urlBase = '/mac';

		return {
			/**
		     * Fetch distinct table columns
		     *
		     * @return Array of Objects
		    */
		    distinct: function(data){
		    	return $http.post(urlBase + '-distinct', data);
		    },
		    
			/**
			 * Paginated load of resource for infinite scrolling.
			 * @return: Object
			*/
			paginate: function(page){
				return $http.get(urlBase + '-paginate?page=' + page);
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
			 * Search database tables for data
			 *
			*/
			search: function(data){
				return $http.post(urlBase + '-search', data);
			},
			
			/**
			 * Search for other records in database except the given id
			 *
			*/
			other: function(id){
				return $http.get(urlBase + '-other/' + id);
			},

			processor: function(data){
				return $http.post(urlBase + '-processor', data);
			},
		};
	}]);
sharedModule
	.factory('Memory', ['$http', function($http){
		var urlBase = '/memory';

		return {
			/**
		     * Fetch distinct table columns
		     *
		     * @return Array of Objects
		    */
		    distinct: function(data){
		    	return $http.post(urlBase + '-distinct', data);
		    },
		    
			/**
			 * Paginated load of resource for infinite scrolling.
			 * @return: Object
			*/
			paginate: function(page){
				return $http.get(urlBase + '-paginate?page=' + page);
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
			 * Search database tables for data
			 *
			*/
			search: function(data){
				return $http.post(urlBase + '-search', data);
			},
			
			/**
			 * Search for other records in database except the given id
			 *
			*/
			other: function(id){
				return $http.get(urlBase +'-other/' + id);
			},
		};
	}]);
sharedModule
	.factory('Monitor', ['$http', function($http){
		var urlBase = '/monitor';

		return {
			/**
		     * Fetch models with specific brand.
		     *
		     * @return Array of Objects
		    */
			model: function(data){
				return $http.post(urlBase + '-model', data);
			},
			/**
		     * Fetch distinct table columns
		     *
		     * @return Array of Objects
		    */
		    distinct: function(data){
		    	return $http.post(urlBase + '-distinct', data);
		    },
		    
			/**
			 * Paginated load of resource for infinite scrolling.
			 * @return: Object
			*/
			paginate: function(page){
				return $http.get(urlBase + '-paginate?page=' + page);
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
			 * Search database tables for data
			 *
			*/
			search: function(data){
				return $http.post(urlBase + '-search', data);
			},
			/**
			 * Search for other records in database except the given id
			 *
			*/
			other: function(id){
				return $http.get(urlBase +'-other/' + id);
			},
		};
	}]);
sharedModule
	.factory('Mouse', ['$http', function($http){
		var urlBase = '/mouse';

		return {
			/**
		     * Fetch models with specific brand.
		     *
		     * @return Array of Objects
		    */
			model: function(data){
				return $http.post(urlBase + '-model', data);
			},
			/**
		     * Fetch distinct table columns
		     *
		     * @return Array of Objects
		    */
		    distinct: function(data){
		    	return $http.post(urlBase + '-distinct', data);
		    },
		    
			/**
			 * Paginated load of resource for infinite scrolling.
			 * @return: Object
			*/
			paginate: function(page){
				return $http.get(urlBase + '-paginate?page=' + page);
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
			 * Search database tables for data
			 *
			*/
			search: function(data){
				return $http.post(urlBase + '-search', data);
			},
			
			/**
			 * Search for other records in database except the given id
			 *
			*/
			other: function(id){
				return $http.get(urlBase +'-other/' + id);
			},
		};
	}]);
sharedModule
	.factory('NetworkSwitch', ['$http', function($http){
		var urlBase = '/network-switch';

		return {
			/**
		     * Fetch models with specific brand.
		     *
		     * @return Array of Objects
		    */
			model: function(data){
				return $http.post(urlBase + '-model', data);
			},
			/**
		     * Fetch distinct table columns
		     *
		     * @return Array of Objects
		    */
		    distinct: function(data){
		    	return $http.post(urlBase + '-distinct', data);
		    },
		    
			/**
			 * Paginated load of resource for infinite scrolling.
			 * @return: Object
			*/
			paginate: function(page){
				return $http.get(urlBase + '-paginate?page=' + page);
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
			 * Search database tables for data
			 *
			*/
			search: function(data){
				return $http.post(urlBase + '-search', data);
			},
			
			/**
			 * Search for other records in database except the given id
			 *
			*/
			other: function(id){
				return $http.get(urlBase +'-other/' + id);
			},
		};
	}]);
sharedModule
	.factory('OtherComponent', ['$http', function($http){
		var urlBase = '/other-component';

		return {
			/**
		     * Fetch models with specific brand.
		     *
		     * @return Array of Objects
		    */
			model: function(data){
				return $http.post(urlBase + '-model', data);
			},
			/**
		     * Fetch distinct table columns
		     *
		     * @return Array of Objects
		    */
		    distinct: function(data){
		    	return $http.post(urlBase + '-distinct', data);
		    },
		    
			/**
			 * Paginated load of resource for infinite scrolling.
			 * @return: Object
			*/
			paginate: function(page){
				return $http.get(urlBase + '-paginate?page=' + page);
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
			 * Search database tables for data
			 *
			*/
			search: function(data){
				return $http.post(urlBase + '-search', data);
			},

			/**
			 * Search for other records in database except the given id
			 *
			*/
			other: function(id){
				return $http.get(urlBase +'-other/' + id);
			},
		};
	}]);
sharedModule
	.factory('PortableHardDisk', ['$http', function($http){
		var urlBase = '/portable-hard-disk';

		return {
			/**
		     * Fetch models with specific brand.
		     *
		     * @return Array of Objects
		    */
			model: function(data){
				return $http.post(urlBase + '-model', data);
			},
			/**
		     * Fetch distinct table columns
		     *
		     * @return Array of Objects
		    */
		    distinct: function(data){
		    	return $http.post(urlBase + '-distinct', data);
		    },
		    
			/**
			 * Paginated load of resource for infinite scrolling.
			 * @return: Object
			*/
			paginate: function(page){
				return $http.get(urlBase + '-paginate?page=' + page);
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
			 * Search database tables for data
			 *
			*/
			search: function(data){
				return $http.post(urlBase + '-search', data);
			},
			
			/**
			 * Search for other records in database except the given id
			 *
			*/
			other: function(id){
				return $http.get(urlBase +'-other/' + id);
			},
		};
	}]);
sharedModule
	.factory('Printer', ['$http', function($http){
		var urlBase = '/printer';

		return {
			/**
		     * Fetch models with specific brand.
		     *
		     * @return Array of Objects
		    */
			model: function(data){
				return $http.post(urlBase + '-model', data);
			},
			/**
		     * Fetch distinct table columns
		     *
		     * @return Array of Objects
		    */
		    distinct: function(data){
		    	return $http.post(urlBase + '-distinct', data);
		    },
		    
			/**
			 * Paginated load of resource for infinite scrolling.
			 * @return: Object
			*/
			paginate: function(page){
				return $http.get(urlBase + '-paginate?page=' + page);
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
			 * Search database tables for data
			 *
			*/
			search: function(data){
				return $http.post(urlBase + '-search', data);
			},
			
			/**
			 * Search for other records in database except the given id
			 *
			*/
			other: function(id){
				return $http.get(urlBase +'-other/' + id);
			},
		};
	}]);
sharedModule
	.factory('Projector', ['$http', function($http){
		var urlBase = '/projector';

		return {
			/**
		     * Fetch models with specific brand.
		     *
		     * @return Array of Objects
		    */
			model: function(data){
				return $http.post(urlBase + '-model', data);
			},
			/**
		     * Fetch distinct table columns
		     *
		     * @return Array of Objects
		    */
		    distinct: function(data){
		    	return $http.post(urlBase + '-distinct', data);
		    },
		    
			/**
			 * Paginated load of resource for infinite scrolling.
			 * @return: Object
			*/
			paginate: function(page){
				return $http.get(urlBase + '-paginate?page=' + page);
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
			 * Search database tables for data
			 *
			*/
			search: function(data){
				return $http.post(urlBase + '-search', data);
			},
			
			/**
			 * Search for other records in database except the given id
			 *
			*/
			other: function(id){
				return $http.get(urlBase +'-other/' + id);
			},
		};
	}]);
sharedModule
	.factory('Router', ['$http', function($http){
		var urlBase = '/router';

		return {
			/**
		     * Fetch models with specific brand.
		     *
		     * @return Array of Objects
		    */
			model: function(data){
				return $http.post(urlBase + '-model', data);
			},
			/**
		     * Fetch distinct table columns
		     *
		     * @return Array of Objects
		    */
		    distinct: function(data){
		    	return $http.post(urlBase + '-distinct', data);
		    },
		    
			/**
			 * Paginated load of resource for infinite scrolling.
			 * @return: Object
			*/
			paginate: function(page){
				return $http.get(urlBase + '-paginate?page=' + page);
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
			 * Search database tables for data
			 *
			*/
			search: function(data){
				return $http.post(urlBase + '-search', data);
			},
			
			/**
			 * Search for other records in database except the given id
			 *
			*/
			other: function(id){
				return $http.get(urlBase +'-other/' + id);
			},
		};
	}]);
sharedModule
	.factory('Scanner', ['$http', function($http){
		var urlBase = '/scanner';

		return {
			/**
		     * Fetch models with specific brand.
		     *
		     * @return Array of Objects
		    */
			model: function(data){
				return $http.post(urlBase + '-model', data);
			},
			/**
		     * Fetch distinct table columns
		     *
		     * @return Array of Objects
		    */
		    distinct: function(data){
		    	return $http.post(urlBase + '-distinct', data);
		    },
		    
			/**
			 * Paginated load of resource for infinite scrolling.
			 * @return: Object
			*/
			paginate: function(page){
				return $http.get(urlBase + '-paginate?page=' + page);
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
			 * Search database tables for data
			 *
			*/
			search: function(data){
				return $http.post(urlBase + '-search', data);
			},
			
			/**
			 * Search for other records in database except the given id
			 *
			*/
			other: function(id){
				return $http.get(urlBase +'-other/' + id);
			},
		};
	}]);
sharedModule
	.factory('Software', ['$http', function($http){
		var urlBase = '/software';

		return {
			/**
		     * Fetch distinct table columns
		     *
		     * @return Array of Objects
		    */
		    distinct: function(data){
		    	return $http.post(urlBase + '-distinct', data);
		    },
		    
			/**
			 * Paginated load of resource for infinite scrolling.
			 * @return: Object
			*/
			paginate: function(page){
				return $http.get(urlBase + '-paginate?page=' + page);
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
			 * Search database tables for data
			 *
			*/
			search: function(data){
				return $http.post(urlBase + '-search', data);
			},

			/**
			 * Search for other records in database except the given id
			 *
			*/
			other: function(id){
				return $http.get(urlBase +'-other/' + id);
			},
		};
	}]);
sharedModule
	.factory('Speaker', ['$http', function($http){
		var urlBase = '/speaker';

		return {
			/**
		     * Fetch models with specific brand.
		     *
		     * @return Array of Objects
		    */
			model: function(data){
				return $http.post(urlBase + '-model', data);
			},
			/**
		     * Fetch distinct table columns
		     *
		     * @return Array of Objects
		    */
		    distinct: function(data){
		    	return $http.post(urlBase + '-distinct', data);
		    },
		    
			/**
			 * Paginated load of resource for infinite scrolling.
			 * @return: Object
			*/
			paginate: function(page){
				return $http.get(urlBase + '-paginate?page=' + page);
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
			 * Search database tables for data
			 *
			*/
			search: function(data){
				return $http.post(urlBase + '-search', data);
			},
			
			/**
			 * Search for other records in database except the given id
			 *
			*/
			other: function(id){
				return $http.get(urlBase +'-other/' + id);
			},
		};
	}]);
sharedModule
	.factory('Telephone', ['$http', function($http){
		var urlBase = '/telephone';

		return {
			/**
		     * Fetch models with specific brand.
		     *
		     * @return Array of Objects
		    */
			model: function(data){
				return $http.post(urlBase + '-model', data);
			},
			/**
		     * Fetch distinct table columns
		     *
		     * @return Array of Objects
		    */
		    distinct: function(data){
		    	return $http.post(urlBase + '-distinct', data);
		    },
		    
			/**
			 * Paginated load of resource for infinite scrolling.
			 * @return: Object
			*/
			paginate: function(page){
				return $http.get(urlBase + '-paginate?page=' + page);
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
			 * Search database tables for data
			 *
			*/
			search: function(data){
				return $http.post(urlBase + '-search', data);
			},
			
			/**
			 * Search for other records in database except the given id
			 *
			*/
			other: function(id){
				return $http.get(urlBase +'-other/' + id);
			},
		};
	}]);
sharedModule
	.factory('UPS', ['$http', function($http){
		var urlBase = '/ups';

		return {
			/**
		     * Fetch models with specific brand.
		     *
		     * @return Array of Objects
		    */
			model: function(data){
				return $http.post(urlBase + '-model', data);
			},
			/**
		     * Fetch distinct table columns
		     *
		     * @return Array of Objects
		    */
		    distinct: function(data){
		    	return $http.post(urlBase + '-distinct', data);
		    },
		    
			/**
			 * Paginated load of resource for infinite scrolling.
			 * @return: Object
			*/
			paginate: function(page){
				return $http.get(urlBase + '-paginate?page=' + page);
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
			 * Search database tables for data
			 *
			*/
			search: function(data){
				return $http.post(urlBase + '-search', data);
			},

			/**
			 * Search for other records in database except the given id
			 *
			*/
			other: function(id){
				return $http.get(urlBase +'-other/' + id);
			},
		};
	}]);
sharedModule
	.factory('User', ['$http', function($http){
		var urlBase = '/user';

		return {
			/**
			 * Fetch the authenticated user info.
			 *
			 * @return: Object
			 */
			index: function(){
				return $http.get(urlBase);
			},
		};
	}]);
sharedModule
	.factory('VideoCard', ['$http', function($http){
		var urlBase = '/video-card';

		return {
			/**
		     * Fetch models with specific brand.
		     *
		     * @return Array of Objects
		    */
			model: function(data){
				return $http.post(urlBase + '-model', data);
			},
			/**
		     * Fetch distinct table columns
		     *
		     * @return Array of Objects
		    */
		    distinct: function(data){
		    	return $http.post(urlBase + '-distinct', data);
		    },
		    
			/**
			 * Paginated load of resource for infinite scrolling.
			 * @return: Object
			*/
			paginate: function(page){
				return $http.get(urlBase + '-paginate?page=' + page);
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
			 * Search database tables for data
			 *
			*/
			search: function(data){
				return $http.post(urlBase + '-search', data);
			},

			/**
			 * Search for other records in database except the given id
			 *
			*/
			other: function(id){
				return $http.get(urlBase +'-other/' + id);
			},
		};
	}]);
sharedModule
	.factory('WorkStationTag', ['$http', function($http){
		var urlBase = '/work-station-tag';

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
			 * Fetch Work Station Tag by workstation_id
			 * 
			*/
			workstation: function(id){
				return $http.get(urlBase + '-workstation/' + id);
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
		};
	}])
//# sourceMappingURL=shared.js.map
