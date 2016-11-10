<!DOCTYPE html>
<html>
<!-- @Author: Niels Bekkers-->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" 
		integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

		<!-- Bootstrap Core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="css/simple-sidebar.css" rel="stylesheet">

    <!-- Custom Fonts -->
    <link href="font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">

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
     		die("<p>Databaseverbinding: <img src='img/red.png' width='15' height='15' /></p>");
		} 

		$sql = "SELECT deviceID, datum, tijd FROM werknemers";
		$result = $conn->query($sql);

		if ($status == null){
			$verbinding = "<p>Databaseverbinding: <img src='img/green.gif' width='15' height='15' /></p>";
		}
		else{
			$verbinding = "<p>Databaseverbinding: <img src='img/red.png' width='15' height='15' /></p>";
		}

		echo "<div id='wrapper'>

        <!-- Sidebar -->
        <div id='sidebar-wrapper'>
            <ul class='sidebar-nav'>
                <li class='sidebar-brand'>
                    <a href='webpage.php''>
                        <img src='img/icon.png' width='45' height='45' />&nbsp;&nbsp; <u>AtWork</u> 
                    </a>
                </li>
                <li>
                    <a href='webpage.php''><i class='fa fa-dashboard'></i>&nbsp;&nbsp; Dashboard</a>
                </li>
                <li>
                    <a href='informatie.php''><i class='fa fa-wrench'></i>&nbsp;&nbsp; Informatie</a>
                </li>
            </ul>
        </div>
        <!-- /#sidebar-wrapper -->

        <!-- Page Content -->
        <div id='page-content-wrapper'>
            <div class='container-fluid'>
                <div class='row'>
                    <div class='col-lg-12'>
                    	<div class='jumbotron'>";
                        
		echo "'<h1>Aanwezigheid werknemers</h1>
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
         	echo "<td class='text-center'><a href='http://localhost/atwork_webpage/delete.php?id=".$row['deviceID']."'  id='delete' name='deleteItem' value='Verwijderen' class='btn btn-danger btn-xs'>Verwijderen</a></td>";
         	echo "</tr>";
     		}
		} else {
     		echo "0 results";
			}

		echo "</form>";
		echo "</table>";

        echo "</div>
        		<div class='row'>
					<div class='col-lg-12'>
                    	<div class='jumbotron'>
                    		<p><img src='img/loading.gif' width='25' height='25' />&nbsp;Deze pagina vernieuwt zich automatisch na <b>2</b> minuten</p>
                    	</div>
                	</div>
                </div>
                 </div>
                	</div>
            			</div>
        		</div>
        		<!-- /#page-content-wrapper -->

    			</div>
    			<!-- /#wrapper -->

    			<!-- jQuery -->
    			<script src='js/jquery.js'></script>

    			<!-- Bootstrap Core JavaScript -->
    			<script src='js/bootstrap.min.js'></script>

    			<!-- Menu Toggle Script -->
    			<script>
    				$('#menu-toggle').click(function(e) {
        				e.preventDefault();
        				$('#wrapper').toggleClass('toggled');
    				});
    			</script>";

		//Delete knop (verwijder item)
		//$getIdUrl = $_GET['id'];
		//$sql = "DELETE FROM werknemers WHERE deviceID=".$getIdUrl."";
		//$conn->query($sql);
		
		$conn->close();
	?>  
</body>
</html>