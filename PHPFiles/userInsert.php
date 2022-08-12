<?php
	$host = "localhost:3306";
	$db = "";
	$username = "";
	$password = "";
	

$connect = new mysqli($host,$username,$password,$db);

$uniqueid = $_POST['uniqueid'];
$username = $_POST['username'];
$email = $_POST['email'];
$password = $_POST['password'];
$hol = $_POST['hol'];
$cast = $_POST['cast'];
$level = $_POST['level'];

$squeryusername = "SELECT * FROM user WHERE username = '".$username."'";
$result = mysqli_query($connect,$squeryusername);
$squeryemail = "SELECT * FROM user WHERE email = '".$email."'";
$result2 = mysqli_query($connect,$squeryemail);

if ($result->num_rows > 0)
{
    echo "Username already taken";
}
else if ($result2->num_rows > 0)
{
    echo "Email already registered";
}
else
{
    $sql = "insert into user (unique_id, username, email, password, hol, cast, level) values ('".$uniqueid."','".$username."','".$email."','".$password."', '".$hol."', '".$cast."', '".$level."')";
    $result = mysqli_query($connect, $sql);
    echo "User Registered Successfully";
}

?>