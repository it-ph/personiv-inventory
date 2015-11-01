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