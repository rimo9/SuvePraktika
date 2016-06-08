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
		
		$stmt = $this->connection->prepare("SELECT ExId FROM runner_path WHERE ExId = ?");
		$stmt->bind_param("s", $ExId);
		$stmt->execute();
		if(!$stmt->fetch()){
			$array.=']';
			return $array;
		}
		$stmt->close();
		
		$stmt = $this->connection->prepare("SELECT lat, lng FROM runner_path WHERE ExId = ?");
		$stmt->bind_param("s", $ExId);
		$stmt->bind_result($lat, $lng);
		$stmt->execute();
		while($stmt->fetch()){
			$array.='{"lat":"'.$lat.'","lng":"'.$lng.'"},';
		}
		$stmt->close();
		$array = substr($array,0, -1);
		$array.=']';
		return $array;
		//END
	}
}?>