<?php
	require_once("functions.php");
	
	//GET Table
	if(isset($_GET["table"])){
		$table_from_db = $User->getTable();
		echo $table_from_db;
	}
?>
