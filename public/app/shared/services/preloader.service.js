sharedModule
	.service('Preloader', ['$mdDialog', function($mdDialog){
		return {
			/* Starts the preloader */
			preload: function(){
				return $mdDialog.show({
					templateUrl: '/app/shared/templates/preloader.html',
				    parent: angular.element(document.body),
				});
			},
			/* Stops the preloader */
			stop: function(){
				return $mdDialog.hide();
			},
			/* Shows error message if AJAX failed */
			error: function(){
				return $mdDialog.show(
			    	$mdDialog.alert()
				        .parent(angular.element($('body')))
				        .clickOutsideToClose(true)
				        .title('Oops! Something went wrong!')
				        .content('An error occured. Please contact Mcoy for assistance. You can also email Mcoy at marco.paco@personiv.com.')
				        .ariaLabel('Error Message')
				        .ok('Got it!')
				);
			},
		};
	}]);