<?php
	require_once("../../configglobal.php");
	require_once("User.class.php");

	session_start();

	//connection with db
	$mysqli = new mysqli($servername, $server_username, $server_password, $database);

	mysqli_set_charset($mysqli, "utf8");
	//new instance from class User
	$User = new User($mysqli);
?>
