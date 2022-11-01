<?php
	$action = $_POST['action'];

	if ($action == "addScore") 
		addScore();
	else if ($action == "getScores")
		getScores();

	function connect() {
		$databasehost = "LOCALHOST";
		$databasename = "JumpNSurvive";
		$databaseuser = "root";
		$databasepass = "root";

		$mysqli = new mysqli($databasehost, $databaseuser, $databasepass, $databasename);
        
		if ($mysqli->connect_errno) {
			echo "Problema con la conexion a la base de datos";
		}
		return $mysqli;
	}

	function disconnect() {
		mysqli_close();
	}

	//--------------------------------------------------------------------------------------------------------------------//
	
	function addScore() {
		$puntos = $_POST["puntos"];
		$nombre = $_POST["nombre"];
		//$nivel = $_POST["nivel"];

		$mysqli = connect();

		//$result = $mysqli->query("call sp_addScore(".$score.");");	
		$result = $mysqli->query("INSERT into usuarios (nombre, puntuacion, nivel) VALUES ('". $nombre."', $puntos, 'invierno')");  

		if (!$result) {
			echo "Problema al hacer un query: " . $mysqli->error;								
		} else {
			//echo "Todo salio bien";		
		}
		mysqli_close($mysqli);
	}

	function getScores() {
		$mysqli = connect();

		//$result = $mysqli->query("call sp_getScores();");	
		$result = $mysqli->query("select * from usuarios order by puntuacion DESC;");	

		if (!$result) {
			echo "Problema al hacer un query: " . $mysqli->error;								
		} else {
			$rows = array();
			while( $r = $result->fetch_assoc()) {
				$rows[] = $r;	
			}			
			echo json_encode($rows);
			
		}
		mysqli_close($mysqli);
	}
?>