sharedModule
	.factory('WorkStation', ['$http', function($http){
		var urlBase = '/work-station';

		return {
			others: function(id){
				return $http.get(urlBase + '-others/' + id);
			},
			dashboard: function(){
				return $http.get(urlBase + '-dashboard');
			},
			/**
			 * Search for vacant work stations
			 * @return : Array
			*/
			vacant: function(data){
				return $http.post(urlBase + '-vacant', data);
			},
			/**
			 * Paginated load of resource for infinite scrolling.
			 * @return: Array
			*/
			paginate: function(page){
				return $http.get(urlBase + '-paginate' + '?page=' + page);
			},
			/**
			 * Paginated load of resource for infinite scrolling.
			 * @return: Array
			*/
			paginateDepartment: function(id, page){
				return $http.get(urlBase + '-paginate/' + id + '?page=' + page);
			},
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

			update: function(id, data){
				return $http.put(urlBase + '/' + id, data);
			},

			/**
			 * Search database tables for data
			 * @return Array
			*/
			search: function(data){
				return $http.post(urlBase + '-search', data);
			},

			/**
			 * Search database tables for data by department
			 * @return Array
			*/
			searchDepartment: function(id, data){
				return $http.post(urlBase + '-search/' + id, data);
			},

			/**
		     * Search for workstation according to department id except the exisiting workstation
		     * @return Array
		    */
			department: function(departmentID, workstationID){
				return $http.get(urlBase + '-department/' + departmentID + '/station/' + workstationID);
			},

			departmentPaginate: function(departmentID, workstationID, page){
				return $http.get(urlBase + '-department/' + departmentID + '/station/' + workstationID + '/paginate' + '?page=' + page);
			},
			floors: function(departmentID){
				return $http.get(urlBase + '-floors/' + departmentID);
			},

			divisions: function(departmentID, floor){
				return $http.get(urlBase + '-divisions/' + departmentID + '/floor/' + floor);
			},

			availableTransfer: function(data, id){
				return $http.post(urlBase + '-available-transfer/' + id, data);
			},
			checkIP: function(id, data){
				return $http.post(urlBase + '-check-ip/' + id, data);
			},
			batchTransfer: function(id, data){
				return $http.post(urlBase + '-batch-transfer/' + id, data);
			},
			batchSwap: function(id, data){
				return $http.post(urlBase + '-batch-swap/' + id, data);
			},
		};
	}])