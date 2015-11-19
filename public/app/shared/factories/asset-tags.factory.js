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
			}
		};
	}]);