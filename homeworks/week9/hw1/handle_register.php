<?php
  session_start();
  require_once('conn.php');

  $username = $_POST['username'];
  $password = $_POST['password'];
  $nickname = $_POST['nickname'];
  if(empty($username) || empty($password) || empty($nickname)) {
    header("Location: ./register.php?errCode=1");
    die();
  }

  $sql = sprintf("INSERT INTO ykf2020_w9_users(username,password,nickname) VALUES('%s','%s','%s')",$username, $password, $nickname);
  $result = $conn->query($sql);
  if(!$result) {
    $code = $conn->errno;
    if($code === 1062){
      header("Location: ./register.php?errCode=2");
    }
    die($conn->error);
  }

  $_SESSION['username'] = $username;
  header("Location: ./index.php");
?>
