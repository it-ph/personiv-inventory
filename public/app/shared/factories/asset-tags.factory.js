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
			},

			/**
			 * Search all components by work-station 
			 *
			*/
			workStation: function(id){
				return $http.get(urlBase + '-work-station/' + id);
			},

			/*
			 * Show specific asset tag with join details on corresponding asset table
			 *
			*/
			specific: function(id){
				return $http.get(urlBase + '-specific/' + id);
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

			/*
			 * Set asset tag status for repair
			 *
			*/
			repair: function(id){
				return $http.put(urlBase + '-repair/' + id);
			},

			/*
			 * Set asset tag status for dispose
			 *
			*/
			dispose: function(id){
				return $http.put(urlBase + '-dispose/' + id);
			},

			/*
			 * Set asset tag status for active
			 *
			*/
			active: function(id){
				return $http.put(urlBase + '-active/' + id);
			},

			/**
			 * Delete the asset tag
			 *
			*/
			delete : function(id){
				return $http.delete(urlBase + '/' + id);
			},

			/**
			 * Paginated load of resource for infinite scrolling.
			 * @return: Object
			*/
			activeUnit: function(page, data){
				return $http.post(urlBase + '-active-unit?page=' + page, data);
			},

			/**
			 * Paginated load of resource for infinite scrolling.
			 * @return: Object
			*/
			repairUnit: function(page, data){
				return $http.post(urlBase + '-repair-unit?page=' + page, data);
			},

			/**
			 * Paginated load of resource for infinite scrolling.
			 * @return: Object
			*/
			disposeUnit: function(page, data){
				return $http.post(urlBase + '-dispose-unit?page=' + page, data);
			},			
		};
	}]);