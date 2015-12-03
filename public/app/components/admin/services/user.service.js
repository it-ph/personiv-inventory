adminModule
	.service('UserService', function(){
		var user = null;

		return {
			set: function(data){
				user = data;
			},
			get: function(){
				return user;
			},
		}
	});