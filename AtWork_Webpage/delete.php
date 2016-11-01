<?php 
	
	/*
	 * @Author: Niels Bekkers
	 */

	$id = $_GET['id'];
 
 	$dbc = mysqli_connect('localhost', 'root', 'root', 'AtWork') or die('Connection error!');
 
	$query = "DELETE FROM werknemers WHERE deviceID = '$id'";
	mysqli_query($dbc, $query) or die('Database error!');

	header('location:WebPage.php');

?>