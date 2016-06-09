<?php
	require_once("functions.php");
	
	//GET Table
	if(isset($_GET["table"])){
		$data_from_db = $User->getData();
		echo $data_from_db;
	}
?>
