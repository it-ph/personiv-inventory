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