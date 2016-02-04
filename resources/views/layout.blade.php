<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Barcode</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Barcode Generator</title>
	<!-- Favicon -->
    <link rel="shortcut icon" href="/assets/img/Personiv-Favicon.png">
    <!-- Goolge Fonts Roboto -->
    <link href='https://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300italic,400italic,500,500italic,700,700italic' rel='stylesheet' type='text/css'>
    <!-- Vendor CSS -->
    <!-- <link rel="stylesheet" href="/assets/css/vendor.css"> -->
    <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/angular_material/0.9.4/angular-material.min.css">
    <style>
		.padding {
			padding:5px;
		}
		body{
			font-family: 'Roboto', sans-serif;
		}
		.border{
			border: 1px solid #212121;
		}
		.font-size-8{
			font-size: 8px;
		}
		.font-size-10{
			font-size: 10px;
		}
    </style>
</head>
<body ng-app="barcode">
	@yield('content')
	<script src="/assets/js/vendor.js"></script>
	<script>
    	window.print();
    </script>
</body>
</html>