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