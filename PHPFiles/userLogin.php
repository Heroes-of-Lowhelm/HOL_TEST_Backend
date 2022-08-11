<?php

    $host = "localhost:3306";
	$db = "mytestdb";
	$username = "root";
	$password = "";
	
	$conn = mysqli_connect($host, $username, $password, $db);
	if(mysqli_connect_errno()){
		echo "error in connection" . mysqli_connec_error();
	}
	
	function anti_injection_post ($sql, $formUse = TRUE){
		
		$sql = preg_replace ("/(from|select|insert|delete|where|drop table|show tables|,|'|#|\*|--|\\\\)/i","",$sql);
		$sql = trim($sql);
		$sql = strip_tags($sql);
		if(!$formUse)
			$sql = addslashes($sql);
		return $sql;
		
	}
	
	$p_username = anti_injection_post($_POST["userName"]);
	$p_password = anti_injection_post($_POST["password"]);
	
	
	$squery = "SELECT * FROM newusers WHERE userName = '" . $p_username . "' ";
	
	$result = $conn->query($squery);
	
	if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
		if($row["password"] == $p_password){
			
			$conn->query("UPDATE newusers WHERE userName = '" . $p_username . "' ");
			echo "1";
			
		}
		else if($row["password"] == $p_password){
			echo "Account is currently logged in.";
		}else{
			echo "Incorrect credentials.";
		}
	}	
	}
	else
	{
		echo "Cant read database.";
	}

?>