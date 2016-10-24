<!DOCTYPE html>
<html>
<!-- @Author: Niels Bekkers-->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" 
		integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
<style>
	.custab{
    	border: 1px solid #ccc;
    	padding: 5px;
    	margin: 5% 0;
    	box-shadow: 3px 3px 2px #ccc;
    	transition: 0.5s;
    	}
	.custab:hover{
    	box-shadow: 3px 3px 0px transparent;
    	transition: 0.5s;
    	}
</style>
<body onload="setInterval(function() {window.location.reload();}, 120000);">
	
    <?php
		$servername = "localhost";
		$username = "root";
		$password = "root";
		$dbname = "AtWork";
		$status = null;

		// Create connection
		$conn = new mysqli($servername, $username, $password, $dbname);
		// Check connection
		if ($conn->connect_error) {
			$status = "Geen verbinding met database!";
     		die("Connection failed: " . $conn->connect_error);
		} 

		$sql = "SELECT deviceID, datum, tijd FROM werknemers";
		$result = $conn->query($sql);

		if ($status == null){
			$verbinding = "<p>Databaseverbinding: <img src='img/green.gif' width='15' height='15' /></p>";
		}
		else{
			$verbinding = "<p>Databaseverbinding: <img src='img/red.png' width='15' height='15' /></p>";
		}

		echo "<div class='container'>
		<div class='row col-md-6 custyle'>
			<h1>AtWork</h1>
    		".$verbinding."
    	<form action='' method='get'>
    	<table class='table table-striped custab'>
    	<thead>
        	<tr>
            	<th>DeviceID</th>
            	<th>Datum</th>
            	<th>Tijd</th>
            	<th class='text-center'>Actie</th>
        	</tr>
    	</thead>";

		if ($result->num_rows > 0) {
     		// output data of each row
     		while($row = $result->fetch_assoc()) {
         	/*echo "<br> id: ". $row["id"]. " - Name: ". $row["name"]. " Icon: " . $row["icon"] . "<br>";*/
         	echo "<tr>";
         	echo "<td>".$row["deviceID"]."</td>";
         	echo "<td>".$row["datum"]."</td>";
         	echo "<td>".$row["tijd"]."</td>";
         	echo "<td class='text-center'><a href='http://localhost/atwork_webpage/webpage.php?id=".$row['deviceID']."'  id='delete' name='deleteItem' value='Verwijderen' class='btn btn-danger btn-xs'>Verwijderen</a></td>";
         	echo "</tr>";
     		}
		} else {
     		echo "0 results";
			}

		echo "</form>";
		echo "</table>";
		echo "<p><img src='img/loading.gif' width='25' height='25' />&nbsp;Deze pagina vernieuwt zich automatisch na <b>2</b> minuten</p>";
		echo "</div>";
		echo "</div>";

		
		//Delete knop (verwijder item)
		//$getIdUrl = $_GET['id'];
		//$sql = "DELETE FROM werknemers WHERE deviceID=".$getIdUrl."";
		//$conn->query($sql);
		
		

		$conn->close();
	?>  

</body>
</html>