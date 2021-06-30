<?php
  session_start();
  require_once('./conn.php');
  require_once('./utils.php');

  $id = $_POST['id'];
  $username = $_SESSION['username'];

  // 查目前使用者是不是管理員，如果不是管理員就強制退出編輯頁
  if(!checkIsAdmin($_SESSION['username'])) {
    die(header("Location: ./index.php"));
  }
  // 查目前使用者有沒有刪除權限，若有就可以執行刪除動作，若沒有就強制退出編輯頁

    $sql = "DELETE FROM ykf2020_w11_hw1_users WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i',$id);
    $result = $stmt->execute();
    if (!$result)  die("failed". $conn->error);
    header("Location: ./admin.php")
?>
