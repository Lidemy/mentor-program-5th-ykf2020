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

  $sql = "INSERT INTO ykf2020_w11_hw1_users(username,password,nickname) VALUES(?,?,?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('sss',$username,password_hash($password,PASSWORD_DEFAULT),$nickname);
  $result = $stmt->execute();
  if(!$result) {
    $code = $conn->errno;
    if($code === 1062) {
      header("Location: ./register.php?errCode=2");
    }
    die($conn->error);
  }

  $_SESSION['username'] = $username;
  header("Location: ./index.php");
?>
