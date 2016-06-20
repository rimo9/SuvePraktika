<?php
	//This is responsible for routing to correct page in pages folder
	include 'simpleUrl.php';
	
	$url = new simpleUrl('/~rimoesk/SuvePraktika/');
	
	if(!$url->segment(1)){
		$page = 'eventtab';
		header("LOCATION: eventtab");
	}else{
		$page = $url->segment(1);
	}
	
	switch($page){
		case 'eventtab' :
			include 'pages/eventtab.php';
		break;
		case 'actortab' :
			include 'pages/actortab.php';
		break;
		case 'contexttab' :
			include 'pages/contexttab.php';
		break;
		default : 
			echo '404 Page not found';
		break;
	}
	
	
?>