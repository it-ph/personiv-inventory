sharedModule
	.factory('AssetTag', ['$http', function($http){
		var urlBase = '/asset-tag';

		return {
			paginate: function(assetTypeID, page){
				return $http.get(urlBase + '-paginate/' + assetTypeID + '?page=' + page);
			},
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
     		 * Update the specified resource in storage.
     		 *
     		*/
			update: function(id, data){
				return $http.put(urlBase + '/' + id, data);
			},

			/*
			 * Transfer the asset to a different work station
			 *
			*/
			transfer: function(assetID, data){
				return $http.put(urlBase + '-transfer/' + assetID, data);
			},

			/**
			 * Delete the asset tag
			 *
			*/
			delete : function(id){
				return $http.delete(urlBase + '/' + id);
			},

			checkSwap: function(data){
				return $http.post(urlBase + '-check-swap', data);
			},	
			swap: function(id, data){
				return $http.put(urlBase + '-swap/' + id , data);
			},
			transferComponents: function(id, data){
				return $http.put(urlBase + '-transfer-components/' + id, data);
			},
			swapComponents: function(id, swapID){
				return $http.put(urlBase + '-swap-components/' + id + '/target/' + swapID);
			},
			checkSequence: function(data){
				return $http.post(urlBase + '-check-sequence', data);
			},
		};
	}]);