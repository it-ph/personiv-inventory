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