adminModule
	.controller('addVideoCardDialogController', ['$scope', '$state', '$mdDialog', 'Preloader', 'VideoCard', function($scope, $state, $mdDialog, Preloader, VideoCard){
		$scope.videoCard = {};

		$scope.videoCard.sizes = [
			{'size':'1GB'},
			{'size':'2GB'},
		];

		$scope.cancel = function(){
			$mdDialog.cancel();
		}

		$scope.submit = function(){
			/* Starts Preloader */
			Preloader.preload();
			/**
			 * Stores Single Record
			*/
			VideoCard.store($scope.videoCard)
				.then(function(){
					// Stops Preloader 
					Preloader.stop();
				}, function(){
					Preloader.error();
				});
		}
	}]);