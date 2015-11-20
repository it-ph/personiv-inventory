adminModule
	.controller('addAssetDialogController', ['$scope', '$state', '$stateParams', '$mdDialog', 'Preloader', 'WorkStation', 'AssetTag', 'AssetTagService', 'Desktop', 'HardDisk', 'Headset', 'Keyboard', 'Memory', 'Monitor', 'Mouse', 'Software', 'UPS', 'VideoCard', 'OtherComponent', function($scope, $state, $stateParams, $mdDialog, Preloader, WorkStation, AssetTag, AssetTagService, Desktop, HardDisk, Headset, Keyboard, Memory, Monitor, Mouse, Software, UPS, VideoCard, OtherComponent){
		var workStationID = $stateParams.workStationID;
		$scope.workStation = AssetTagService.getStation();
			
		$scope.components = [
			{'name': 'CPU', 'value': 'Desktop'},
			{'name': 'Hard Disk', 'value':'Hard Disk'},
			{'name': 'Headset', 'value':'Headset'},
			{'name': 'Keyboard', 'value':'Keyboard'},
			{'name': 'Memory', 'value':'Memory'},
			{'name': 'Monitor', 'value':'Monitor'},
			{'name': 'Mouse', 'value':'Mouse'},
			{'name': 'Software', 'value':'Software'},
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