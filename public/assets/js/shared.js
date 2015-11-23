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
			}
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
			}
		};
	}]);
sharedModule
	.factory('Employee', ['$http', function($http){
		var urlBase = '/employee';

		return {
			/**
			 * Paginated load of resource for infinite scrolling.
			 * @return: Object
			*/
			paginate: function(id, page){
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
			}
		};
	}])
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
		};
	}]);
sharedModule
	.factory('Printer', ['$http', function($http){
		var urlBase = '/printer';

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
		};
	}]);
sharedModule
	.factory('Scanner', ['$http', function($http){
		var urlBase = '/scanner';

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
		};
	}]);
sharedModule
	.factory('WorkStation', ['$http', function($http){
		var urlBase = '/work-station';

		return {
			/**
			 * Paginated load of resource for infinite scrolling.
			 * @return: Object
			*/
			paginate: function(id, page){
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
		     * Search for workstation according to department id except the exisiting workstation
		     *
		    */
			department: function(departmentID, workstationID){
				return $http.get(urlBase + '-department/' + departmentID + '/station/' + workstationID);
			},
		};
	}])
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
				returdataHolder = data;
			},
			/* Retrieves data */
			get: function(){
				return dataHolder;
			}
		};
	}]);
//# sourceMappingURL=shared.js.map
