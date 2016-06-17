<?php
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
  $address = '';
	foreach($routes as $route)
	{
		if(trim($route) != '')
			array_push($routes, $route);
	}
  for($i=0; $i<((count($routes)-1)/2)-1; $i++){
    $address.='../';
  }
	$Styleaddress=$address.'css/style.css';
	$d3_min = $address.'d3/d3.v3.min.js';
	$d3_cloud = $address.'d3/d3.layout.cloud.js';
	$jq_Cloud = $address.'js/jquery.awesomeCloud-0.2.js';
	$js_main = $address.'js/main.js';
	$js_d3 = $address.'js/d3.js';
	$js_Db = $address.'js/dashboardUtil.js';
	
	$basepath = implode('/', array_slice(explode('/', $_SERVER['SCRIPT_NAME']), 0, -1)) . '/';
	//echo $basepath;


?>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta name="keywords" content="" />
	<meta name="description" content="" />
	<meta http-equiv="content-type" content="text/html; charset=utf-8" />
	<title>A Data Visualization Dashboard</title>
	<!-- CSS files -->
	<link href="http://fonts.googleapis.com/css?family=Oswald" rel="stylesheet" type="text/css" />
	<link type="text/css" href="<?php echo $Styleaddress?>" rel="stylesheet" media="screen" />
	<link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
	<link href="http://www.jqueryscript.net/css/jquerysctipttop.css" rel="stylesheet" type="text/css">
	<!-- JS files-->
	<script src="<?php echo $d3_min?>"></script>
	<script src="<?php echo $d3_cloud?>"></script>
	<script src="//code.jquery.com/jquery-1.10.2.js"></script>
	<script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
	<!--<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js"></script>-->
	<script src="<?php echo $jq_Cloud?>"></script>
	<script src="<?php echo $js_main?>"></script>
	<script src="<?php echo $js_d3?>"></script>
	<script src="<?php echo $js_Db?>"></script>
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
