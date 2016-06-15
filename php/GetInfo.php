<?php
	require_once("functions.php");
	//GET selected data
	if(isset($_GET["actor"]) && isset($_GET["action"]) && isset($_GET["tag"]) && isset($_GET["artifact"]) && !empty($_GET["actor"]) && !empty($_GET["action"]) && !empty($_GET["tag"]) && !empty($_GET["artifact"])){
		$data_from_db = $User->getTable($_GET["actor"], $_GET["action"], $_GET["tag"], $_GET["artifact"]);
		echo(json_encode($data_from_db));
	}
	//GET all data
	if(isset($_GET["table"])){
		$data_from_db = $User->getData();
		echo(json_encode($data_from_db));
	}
	//GET ActorFilter NOT
	if(isset($_GET["ActorFilter"])){
		$data_from_db = $User->getActors();
		echo(json_encode($data_from_db));
	}
	//GET ActionFilter
	if(isset($_GET["ActionFilter"])){
		$data_from_db = $User->getActions();
		echo(json_encode($data_from_db));
	}
	//GET TagFilter NOT
	if(isset($_GET["TagFilter"])){
		$data_from_db = $User->getTags();
		echo(json_encode($data_from_db));
	}
	//GET ArtifactFilter NOT
	if(isset($_GET["ArtifactFilter"])){
		$data_from_db = $User->getArtifactFilters();
		echo(json_encode($data_from_db));
	}
?>
