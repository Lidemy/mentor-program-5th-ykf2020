<?php
  session_start();
  require_once('./conn.php');
  require_once('./utils.php');

  // 查目前使用者是不是管理員，如果不是管理員就強制退出編輯頁
  if(!checkIsAdmin($_SESSION['username'])) {
    die(header("Location: ./index.php"));
  }

  $username = $_POST['username'];
  $password = $_POST['password'];
  $nickname = $_POST['nickname'];
  $status= $_POST['status'];

  // 沒寫 nickname 的話是為錯誤，退回去上一頁
  if(empty($username)||empty($password)||empty($nickname)||empty($status)) {
    header("Location: ./add_new_user.php?errCode=4");
    die();
  }

  // 根據新增資訊去資料庫新增 user 的資料
  $sql = "INSERT INTO ykf2020_w11_hw1_users(username,password,nickname,status) VALUES(?,?,?,?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('sssi', $nickname, password_hash($password,PASSWORD_DEFAULT), $nickname, $status);
  $result = $stmt->execute();
  if (!$result)  die("failed". $conn->error);
  header("Location: ./admin.php");
?>
