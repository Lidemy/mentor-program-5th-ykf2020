<?php
  session_start();
  require_once('./conn.php');
  require_once('./utils.php');

  // 查目前使用者是不是管理員，如果不是管理員就強制退出編輯頁
  if(!checkIsAdmin($_SESSION['username'])) {
    die(header("Location: ./index.php"));
  }

  $id = $_POST['id'];
  $nickname = $_POST['nickname'];
  $status= $_POST['status'];

  // 沒寫 nickname 的話是為錯誤，退回去上一頁
  if(empty($nickname)) {
    header("Location: ./edit_user.php?id=".$id."&errCode=4");
    die();
  }


  // 根據剛剛編輯結果去資料庫改 user 的資料
  if(!empty($_POST['password'])) {
    $sql = "UPDATE ykf2020_w11_hw1_users SET nickname = ?, status = ?, password = ?  WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('sisi', $nickname, $status, password_hash($_POST['password'],PASSWORD_DEFAULT), $id);
  } else {
    $sql = "UPDATE ykf2020_w11_hw1_users SET nickname = ?, status = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('sii', $nickname, $status, $id);
  }

  $result = $stmt->execute();
  if (!$result)  die("failed". $conn->error);
  header("Location: ./admin.php");
?>
