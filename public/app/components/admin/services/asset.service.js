adminModule
	.service('assetService', ['$http', function($http){
		var assets = [
			{ 'controller' : 'cpu' },
			{ 'controller' : 'firewall' },
			{ 'controller' : 'hardDisk' },
			{ 'controller' : 'headset' },
			{ 'controller' : 'keyboard' },
			{ 'controller' : 'mac' },
			{ 'controller' : 'memory' },
			{ 'controller' : 'monitor' },
			{ 'controller' : 'mouse' },
			{ 'controller' : 'networkSwitch' },
			{ 'controller' : 'portableHardDisk' },
			{ 'controller' : 'printer' },
			{ 'controller' : 'projector' },
			{ 'controller' : 'router' },
			{ 'controller' : 'scanner' },
			{ 'controller' : 'software' },
			{ 'controller' : 'speaker' },
			{ 'controller' : 'telephone' },
			{ 'controller' : 'ups' },
			{ 'controller' : 'videoCard' },
			{ 'controller' : 'otherComponent' },
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
			unitToolbarController: function(id){
				// returns assetNameToolbarController
				return assets[id].controller  + 'UnitToolbarController';
			},
			unitContentContainerController: function(id){
				// returns assetNameContentContainerController
				return assets[id].controller  + 'UnitContentContainerController';
			},
			unitContentController: function(id){
				// returns assetNameContentController
				return assets[id].controller  + 'UnitContentController';
			},
			unitRightSidenavController: function(id){
				// returns assetNameRightSidenavController
				return assets[id].controller  + 'UnitRightSidenavController';
			},
		};
	}]);