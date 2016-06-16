<?php
	/*
	The following function will strip the script name from URL i.e.  http://www.something.com/search/book/fitzgerald will become /search/book/fitzgerald
	*/
	function getCurrentUri()
	{
		$basepath = implode('/', array_slice(explode('/', $_SERVER['SCRIPT_NAME']), 0, -1)) . '/';
		$uri = substr($_SERVER['REQUEST_URI'], strlen($basepath));
		if (strstr($uri, '?')) $uri = substr($uri, 0, strpos($uri, '?'));
		$uri = '/' . trim($uri, '/');
		return $uri;
	}
 
	$base_url = getCurrentUri();
	$routes = array();
	$routes = explode('/', $base_url);
	foreach($routes as $route)
	{
		if(trim($route) != '')
			array_push($routes, $route);
	}
	//echo getCurrentUri();
	/*
	Now, $routes will contain all the routes. $routes[0] will correspond to first route. For e.g. in above example $routes[0] is search, $routes[1] is book and $routes[2] is fitzgerald
	*/
 
	/*if($routes[0] == “search”)
	{
		if($routes[1] == “book”)
		{
			searchBooksBy($routes[2]);
		}
	}*/
	
?>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta name="keywords" content="" />
	<meta name="description" content="" />
	<meta http-equiv="content-type" content="text/html; charset=utf-8" />
	<title>A Data Visualization Dashboard</title>
	<!-- CSS files -->
	<link href="http://fonts.googleapis.com/css?family=Oswald" rel="stylesheet" type="text/css" />
	<link type="text/css" href="css/style.css" rel="stylesheet" media="screen" />
	<link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
	<link href="http://www.jqueryscript.net/css/jquerysctipttop.css" rel="stylesheet" type="text/css">
	<!-- JS files-->
	<script src="d3/d3.v3.min.js"></script>
	<script src="d3/d3.layout.cloud.js"></script>
	<script src="//code.jquery.com/jquery-1.10.2.js"></script>
	<script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
	<!--<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js"></script>-->
	<script src="js/jquery.awesomeCloud-0.2.js"></script>
	<script src="js/main.js"></script>
	<script src="js/d3.js"></script>
	<script src="js/dashboardUtil.js"></script>
	<script>

	var edgelist = [];
	var events = [];
	var actions = [];
	var users = [];
	var tagsAutocomplete = [];
	var artifactsAutocomplete = [];
	var tags = [];
	var tag2owner = new Object();
	var document2owner = new Object();

	</script>
</head>
<body>