adminModule
	.service('AssetTagService', ['AssetTag', 'Preloader', function(AssetTag, Preloader){
		var type = null;
		var station = null;
		var id = null;
		return {
			setStation: function(data){
				station = data;
			},
			getStation: function(){
				return station;
			},
			setType: function(data){
				type = data;
			},
			getType: function(){
				return type;
			},
			setID: function(data){
				id = data;
			},
			getID: function(){
				return id;
			},
		}
	}]);