sharedModule
	.factory('DepartmentWorkStation', ['$http', function($http){
		var urlBase = '/department-work-station';

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
			relation: function(departmentID, workstationID){
				return $http.get(urlBase + '-relation/' + departmentID + '/work-station/' + workstationID);
			},
		};
	}]);