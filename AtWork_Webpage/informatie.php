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
<body>
    <?php
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
                    	<div class='jumbotron'>
                        
		    '<h1>Informatie</h1>
             <p>Dit dashboard toont in realtime de aanwezigheid van je werknemers.</p>
                <p>Zo is het gemakkelijk om na te gaan wie er al dan niet op de werkvloer rondloopt</p>
                <p>In de tabel komt de datum, tijd en deviceID tevoorschijn. Moest je toch handmatig de werknemer willen verwijderen uit de database,</p>
                <p>dan is het zeer vlug gedaan door op de verwijderknop te drukken!</p>
                <p>Er gaat ook constant gecontroleerd worden of er een databaseconnectie is, dit om eventuele fouten snel op te sporen.</p>
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
		
	?>  
</body>
</html>