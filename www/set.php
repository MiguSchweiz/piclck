<?php
$file = '/home/pi/piclck/www/alarms';
$data=$_REQUEST["data"];
shell_exec("echo '".$data."'>".$file);
shell_exec("sudo systemctl restart alarms")
?>