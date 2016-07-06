adminModule
	.controller('mainContentContainerController', ['$scope', '$state', '$mdDialog', 'Preloader', 'InventoryReport', 'Activity', function($scope, $state, $mdDialog, Preloader, InventoryReport, Activity){
		/**
		 *  Object for toolbar view.
		 *
		*/
		$scope.toolbar = {};

		/**
		 * Properties and method of toolbar.
		 *
		*/
		$scope.toolbar.childState = 'Dashboard';

		$scope.toolbar.subheader = 'Options';

		$scope.toolbar.options = [
			{
				'label': 'Download Report',
				'icon': 'mdi-download',
				action : function(){
					var win = window.open('/inventory-report/', '_blank');
					win.focus();
				},
			},
			{
				'label': 'Sticker Generator',
				'icon': 'mdi-barcode',
				action : function(){
					$mdDialog.show({
				    	controller: 'barcodeDialogController',
				      	templateUrl: '/app/components/admin/templates/dialogs/barcode-dialog.template.html',
				      	parent: angular.element(document.body),
				    });
				},
			},
		];

		$scope.toolbar.refresh = function(){
			// start preloader
			Preloader.loading();
			$scope.init(true);
		}

		/**
		 * Status of search bar.
		 *
		*/
		$scope.searchBar = false;

		/**
		 * Reveals the search bar.
		 *
		*/
		$scope.showSearchBar = function(){
			$scope.searchBar = true;
		};

		/**
		 * Hides the search bar.
		 *
		*/
		$scope.hideSearchBar = function(){
			$scope.toolbar.searchText = '';
			$scope.searchBar = false;
		};

		$scope.charts = [
			// Purchase Orders
			{
				'title': 'Purchase Orders',
				'monthly': {
					'labels': ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
				},
				'weekly': {
					'data': [],
				},
			},
			// Asset Tags
			{
				'title': 'Asset Tags',
				'monthly': {
					'labels': ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
					'series': ["Deployed", "Stock", "Pulled Out"],
				},
				'weekly': {
					'series': ["Deployed", "Stock", "Pulled Out"],
					'data': [],
				},
			},
			// Activities
			{
				'title': 'Activities',
				'monthly' : {
					'labels': ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
				},
				'weekly': {
					'data': [],
				}
			}
		];

		$scope.chartType = 1;

		$scope.rightSidenav = {};

		$scope.rightSidenav.show = true;

		$scope.show = function(id){
			Preloader.set(id);
			$mdDialog.show({
		    	controller: 'activityDialogController',
		      	templateUrl: '/app/components/admin/templates/dialogs/activity-dialog.template.html',
		      	parent: angular.element(document.body),
		      	clickOutsideToClose: true,
		    });
		}

		$scope.init = function(refresh){
			InventoryReport.dashboard()
				.then(function(data){
					$scope.dashboard = data.data;

					$scope.charts[0].monthly.data = data.data.purchase_order_array[1];
					$scope.charts[1].monthly.data = data.data.asset_tag_array[1];
					$scope.charts[2].monthly.data = data.data.activity_array[1];

					angular.forEach($scope.charts[0].monthly.data, function(item, key){
						$scope.charts[0].weekly.labels = data.data.week_ranges[key];
						$scope.charts[1].weekly.labels = data.data.week_ranges[key];
						$scope.charts[2].weekly.labels = data.data.week_ranges[key];

						angular.forEach(data.data.purchase_order_array[0], function(item, key){
							$scope.charts[0].weekly.data.push([item]);
						});

						angular.forEach(data.data.purchase_order_array[1], function(item, key){
							$scope.charts[1].weekly.data.push([item]);
						});

						angular.forEach(data.data.purchase_order_array[2], function(item, key){
							$scope.charts[2].weekly.data.push([item]);
						});

						console.log($scope.charts[0].weekly.data[key]);
						
						// $scope.charts[1].weekly.data = data.data.asset_tag_array[0];
						// $scope.charts[2].weekly.data = data.data.activity_array[0];
					});


				})
				.then(function(){
					/**
					 * Object for Work Station
					 *
					*/
					$scope.activity = {};
					// 2 is default so the next page to be loaded will be page 2 
					$scope.activity.page = 2;

					Activity.paginate()
						.success(function(data){
							$scope.activity.details = data;
							$scope.activity.paginated = data.data;
							$scope.activity.paginated.show = true;

							if(data.data.length){
								// iterate over each record and set the updated_at date and first letter
								angular.forEach(data.data, function(item){
									item.created_at = new Date(item.created_at);
									item.first_letter = item.user.first_name[0].toUpperCase();
								});
							}

							$scope.activity.paginateLoad = function(){
								// kills the function if ajax is busy or pagination reaches last page
								if($scope.activity.busy || ($scope.activity.page > $scope.activity.details.last_page)){
									return;
								}
								/**
								 * Executes pagination call
								 *
								*/
								// sets to true to disable pagination call if still busy.
								$scope.activity.busy = true;

								// Calls the next page of pagination.
								Activity.paginate($scope.activity.page)
									.success(function(data){
										// increment the page to set up next page for next AJAX Call
										$scope.activity.page++;

										// iterate over each data then splice it to the data array
										angular.forEach(data.data, function(item, key){
											item.created_at = new Date(item.created_at);
											item.first_letter = item.user.first_name[0].toUpperCase();
											$scope.activity.paginated.push(item);
										});

										// Enables again the pagination call for next call.
										$scope.activity.busy = false;

									});
							}
							if(refresh){
								Preloader.stop();
								Preloader.stop();
							}
						})
						.error(function(){
							Preloader.error();
						});
				})
		}

		$scope.init();

	}]);