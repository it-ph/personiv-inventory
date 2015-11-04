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
				// returns assetNameToolbarController
				return assets[id].controller  + 'ToolbarController';
			},
			contentContainerController: function(id){
				// returns assetNameContentContainerController
				return assets[id].controller  + 'ContentContainerController';
			},
			contentController: function(id){
				// returns assetNameContentController
				return assets[id].controller  + 'ContentController';
			},
			rightSidenavController: function(id){
				// returns assetNameRightSidenavController
				return assets[id].controller  + 'RightSidenavController';
			},
		};
	}]);