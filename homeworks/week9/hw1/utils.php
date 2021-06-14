<?php
  session_start();
  require_once('./conn.php');

  function getUserByUsername($username) {
    global $conn;
    $sql = sprintf("SELECT * FROM ykf2020_w9_users WHERE username = '%s'",$username);
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    return $row;
  }
?>
