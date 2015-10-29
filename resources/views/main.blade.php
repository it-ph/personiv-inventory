<!DOCTYPE html>
<html lang="en" ng-app="sharedModule">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Personiv | Inventory System</title>
	<!-- Favicon -->
    <link rel="shortcut icon" href="/assets/img/Personiv-Favicon.png">
	<!-- Goolge Fonts Roboto -->
	<link href='https://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300italic,400italic,500,500italic,700,700italic' rel='stylesheet' type='text/css'>
	<!-- Vendor CSS -->
	<link rel="stylesheet" href="/assets/css/vendor.css">
	<!-- Shared CSS -->
	<link rel="stylesheet" href="/assets/css/shared.css">
</head>
<body>
	<!-- Main View -->
	<div class="main-view hidden" ng-controller="homePageController" ng-init="show()" id="main">
		@yield('content')
	</div>
	<!-- Vendor Scripts -->
	<script src="/assets/js/vendor.js"></script>
	<!-- Shared Script -->
	<script src="/assets/js/shared.js"></script>
</body>
</html>