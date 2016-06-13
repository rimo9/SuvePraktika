<?php
class User{
	private $connection;
	function __construct($mysqli){
		$this->connection = $mysqli;
	}
	//Gets all data from database
	function getData(){
		$array = '[';
			
		mysqli_set_charset($this->connection,"utf8");
		
		$stmt = $this->connection->prepare("SELECT id,user, action, document, context, time, uptake FROM DVS");
		$stmt->bind_result( $id,$user,$action,$document,$context,$time,$uptake);
		$stmt->execute();
		while($stmt->fetch()){
			$array.='{"id":"'.$id.'","user":"'.$user.'","action":"'.$action.'","document":"'.$document.'","context":"'.$context.'","time":"'.$time.'","uptake":"'.$uptake.'"},';
		}
		$stmt->close();
		$array = substr($array,0, -1);
		$array.=']';
		return $array;
	}
}?>