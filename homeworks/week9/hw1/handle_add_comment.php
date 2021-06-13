<?php
  session_start();
  require_once('./conn.php');

  $comment = $_POST['comment'];
  $username = $_SESSION['username'];

  $sql = sprintf("INSERT INTO ykf2020_w9_comments(username,comment) VALUES('%s','%s')",$username, $comment);
  $result = $conn->query($sql);
  if (!$result) {
    die("failed". $conn->error);
  } else {
    header("Location: ./index.php");
  }
?>
