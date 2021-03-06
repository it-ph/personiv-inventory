sharedModule
	.factory('Vendor', ['$http', function($http){
		var urlBase = '/vendor';

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
			distinct: function(data){
				return $http.post(urlBase + '-distinct', data);
			},
			contactPersons: function(id){
				return $http.get(urlBase + '-contact-persons/' + id);
			},
			contactNumbers: function(id){
				return $http.get(urlBase + '-contact-numbers/' + id);
			},
		};
	}]);