<?php
class User{
	//privaatne muutuja
	private $connection;
	//käivitub kui tuleb new User();
	function __construct($mysqli){
		//selle klassi muutuja
		$this->connection = $mysqli;
	}
	function getTable(){
		//ALUSEKS
		//START
		$array = '[';
		
		
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
		//END
	}
}?>