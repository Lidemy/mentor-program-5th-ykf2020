<?php
  session_start();
  require_once('./conn.php');
  require_once('./utils.php');

  print_r(getAllStatus())
?>
