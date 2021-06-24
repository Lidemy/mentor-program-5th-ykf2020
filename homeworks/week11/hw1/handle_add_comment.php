<?php
  session_start();
  require_once('./conn.php');

  $comment = $_POST['comment'];
  $username = $_SESSION['username'];

  if(empty($comment)) {
    header("Location: ./index.php?errCode=4");
    die();
  }

  $sql = "INSERT INTO ykf2020_w11_hw1_comments(username,comment) VALUES(?,?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ss',$username,$comment);
  $result = $stmt->execute();
  if (!$result) {
    die("failed". $conn->error);
  } else {
    header("Location: ./index.php");
  }
?>
