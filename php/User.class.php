<?php
class User{
	private $connection;
	function __construct($mysqli){
		$this->connection = $mysqli;
	}
	//Gets all data from database
	function getData(){
		//$array = '[';
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
			//$array.='{"id":"'.$id.'","user":"'.$user.'","action":"'.$action.'","document":"'.$document.'","context":"'.$context.'","time":"'.$time.'","uptake":"'.$uptake.'"},';
		}
		$stmt->close();
		//$array = substr($array,0, -1);
		//$array.=']';
		return $entries;
	}
}?>