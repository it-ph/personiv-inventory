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