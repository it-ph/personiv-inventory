sharedModule
	.factory('Department', ['$http', function($http){
		var urlBase = '/department';

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