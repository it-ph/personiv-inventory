sharedModule
	.factory('Asset', ['$http', function($http){
		var urlBase = '/asset';

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
			paginate: function(assetTypeID, page){
				return $http.get(urlBase + '-paginate/' + assetTypeID + '?page=' + page);
			},
			checkDuplicate: function(data, id){
				return $http.post(urlBase + '-check-duplicate/' + id, data);
			},
			brands: function(id){
				return $http.get(urlBase + '-brands/' + id);
			},
			purchaseOrders: function(id){
				return $http.get(urlBase + '-purchase-orders/' + id);
			},
		};
	}]);