<?php
class User{
	private $connection;
	function __construct($mysqli){
		$this->connection = $mysqli;
	}
	//Gets all data from database
	function getData(){
		$entries = array();
		mysqli_set_charset($this->connection,"utf8");
			
		$stmt = $this->connection->prepare("SELECT id,user, action, document, context, time, uptake FROM DVS");
		$stmt->bind_result( $id,$user,$action,$document,$context,$time,$uptake);
		$stmt->execute();
		while($stmt->fetch()){
			$object = new StdClass();
			$object->id = $id;
			$object->user = $user;
			$object->action = $action;
			$object->document = $document;
			$object->context = $context;
			$object->time = $time;
			$object->uptake = $uptake;
			array_push($entries, $object);
		}
		$stmt->close();
		return $entries;
	}
	//Gets selected data from database
	function getTable($actor, $action, $tag, $artifact){
		$entries = array();
		mysqli_set_charset($this->connection,"utf8");
		if($actor === 'any'){$actor="%%";}else{$actor=$actor."%";}
		if($action === 'any'){$action="%%";}else{$action=$action."%";}
		if($tag === 'any'){$tag="%%";}else{$tag=$tag."%";}
		if($artifact === 'any'){$artifact="%%";}else{$artifact=$artifact."%";}	
		$stmt = $this->connection->prepare("SELECT id,user, action, document, context, time, uptake FROM DVS WHERE user LIKE ? AND action LIKE ? AND context LIKE ? AND document LIKE ?");
		$stmt->bind_param("ssss", $actor, $action, $tag, $artifact);
		$stmt->bind_result( $id,$user,$action,$document,$context,$time,$uptake);
		$stmt->execute();
		while($stmt->fetch()){
			$object = new StdClass();
			$object->id = $id;
			$object->user = $user;
			$object->action = $action;
			$object->document = $document;
			$object->context = $context;
			$object->time = $time;
			$object->uptake = $uptake;
			array_push($entries, $object);
		}
		$stmt->close();
		return $entries;
	}
	//gets all different Actors from db
	function getActors(){
		$entries = array();
		mysqli_set_charset($this->connection,"utf8");
		$stmt = $this->connection->prepare("SELECT DISTINCT user FROM DVS");
		$stmt->bind_result($action);
		$stmt->execute();
		while($stmt->fetch()){
			array_push($entries, $action);
		}
		$stmt->close();
		return $entries;
	}
	//gets all different Actions from db
	function getActions(){
		$entries = array();
		mysqli_set_charset($this->connection,"utf8");
		$stmt = $this->connection->prepare("SELECT DISTINCT action FROM DVS");
		$stmt->bind_result($action);
		$stmt->execute();
		while($stmt->fetch()){
			array_push($entries, $action);
		}
		$stmt->close();
		return $entries;
	}
	//gets all different tags from db
	function getTags(){
		$entries = array();
		mysqli_set_charset($this->connection,"utf8");
		$stmt = $this->connection->prepare("SELECT DISTINCT context FROM DVS");
		$stmt->bind_result($action);
		$stmt->execute();
		while($stmt->fetch()){
			array_push($entries, $action);
		}
		$stmt->close();
		return $entries;
	}
	//gets all different Artifacts/documents from db
	function getArtifactFilters(){
		$entries = array();
		mysqli_set_charset($this->connection,"utf8");
		$stmt = $this->connection->prepare("SELECT DISTINCT document FROM DVS");
		$stmt->bind_result($action);
		$stmt->execute();
		while($stmt->fetch()){
			array_push($entries, $action);
		}
		$stmt->close();
		return $entries;
	}
}?>