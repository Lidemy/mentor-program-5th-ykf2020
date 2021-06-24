<?php
  session_start();
  require_once('./conn.php');
  require_once('utils.php');

  // 查目前使用者有沒有刪除權限，若有就可以執行刪除動作，若沒有就強制退出編輯頁
  if(!IsAdmin()) {
    header("Location: ./index.php");
    die();
  };

  $id = $_GET['id'];
  $username = $_SESSION['username'];

  // 沒傳id就進來刪除頁的直接導回去首頁
  if(empty($id)) {
    header("Location: ./index.php");
    die();
  };

  $sql = "DELETE FROM ykf2020_w11_hw2_articles WHERE id = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i',$id);
  $result = $stmt->execute();
  if (!$result)  die("failed". $conn->error);
  header("Location: ./backstage.php");
?>
