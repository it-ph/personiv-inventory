adminModule
	.service('assetService', ['$http', function($http){
		var assets = [
			{
				'controller' : 'cpu',
			},
			{
				'controller' : 'hardDisk',
			},
			{
				'controller' : 'headset',
			},
			{
				'controller' : 'keyboard'
			},
			{
				'controller' : 'memory',
			},
			{
				'controller' : 'monitor',
			},
			{
				'controller' : 'mouse',
			},
			{
				'controller' : 'printer',
			},
			{
				'controller' : 'scanner',
			},
			{
				'controller' : 'software',
			},
			{
				'controller' : 'ups',
			},
			{
				'controller' : 'videoCard',
			},
			{
				'controller' : 'otherComponent',
			},
		];

		return{
			get: function(){
				return assets;
			},
			toolbarController: function(id){
				return assets[id].controller  + 'ToolbarController';
			},
			contentContainerController: function(id){
				return assets[id].controller  + 'ContentContainerController';
			},
			contentController: function(id){
				return assets[id].controller  + 'ContentController';
			},
			rightSidenavController: function(id){
				return assets[id].controller  + 'RightSidenavController';
			},
		};
	}]);