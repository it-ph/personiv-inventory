adminModule
	.controller('addAssetDialogController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'WorkStation', 'AssetTag', 'AssetTagService', 'Desktop', 'HardDisk', 'Headset', 'Keyboard', 'Memory', 'Monitor', 'Mouse', 'Software', 'UPS', 'VideoCard', 'OtherComponent', function($scope, $state, $stateParams, $mdDialog, Preloader, WorkStation, AssetTag, AssetTagService, Desktop, HardDisk, Headset, Keyboard, Memory, Monitor, Mouse, Software, UPS, VideoCard, OtherComponent){
		var workStationID = $stateParams.workStationID;
		$scope.workStation = AssetTagService.getStation();
			
		$scope.components = [
			{'name': 'CPU', 'value': 'Desktop'},
			{'name': 'Firewall', 'value':'Firewall'},
			{'name': 'Hard Disk', 'value':'Hard Disk'},
			{'name': 'Headset', 'value':'Headset'},
			{'name': 'Keyboard', 'value':'Keyboard'},
			{'name': 'Mac', 'value':'Mac'},
			{'name': 'Memory', 'value':'Memory'},
			{'name': 'Monitor', 'value':'Monitor'},
			{'name': 'Mouse', 'value':'Mouse'},
			{'name': 'Network Switch', 'value':'Network Switch'},
			{'name': 'Portable Hard Disk', 'value':'Portable Hard Disk'},
			{'name': 'Printer', 'value':'Printer'},
			{'name': 'Projector', 'value':'Projector'},
			{'name': 'Router', 'value':'Router'},
			{'name': 'Scanner', 'value':'Scanner'},
			{'name': 'Software', 'value':'Software'},
			{'name': 'Speaker', 'value':'Speaker'},
			{'name': 'Telephone', 'value':'Telephone'},
			{'name': 'UPS', 'value':'Uninterruptible Power Supply'},
			{'name': 'Video Card', 'value':'Video Card'},
			{'name': 'Other Component', 'value':'Other Component'},
		];

		$scope.cancel = function(){
			$mdDialog.cancel();
		};


		$scope.submit = function(){
			AssetTagService.setType($scope.category);
			$mdDialog.hide();
		};

		
	}]);