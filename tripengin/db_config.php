<?php

 // ini_set('error_reporting', E_ALL);
 // ini_set('display_errors', 'On');  


$servername = "wilmington.365dtm.com";
$user = "wilmington";
$pass = "10262022";
$dbname = "wilmington_mobile_db";


$connection = mysqli_connect($servername, $user, $pass);
mysqli_set_charset($connection, 'utf8');
mysqli_select_db($connection, $dbname);


?>