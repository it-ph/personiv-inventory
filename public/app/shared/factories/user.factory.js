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
		};
	}]);