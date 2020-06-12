<?php
	$data = array();
	if(isset($_POST["data"])){
		if(get_magic_quotes_gpc())
			$data = json_decode(stripslashes($_POST["data"]),true);
		else
			$data = json_decode($_POST["data"],true);
	}
	
	header('Content-Type: application/json');
	echo json_encode($data);
	
?>