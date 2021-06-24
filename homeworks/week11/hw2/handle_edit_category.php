<?php
  session_start();
  require_once('./conn.php');
  require_once('./utils.php');

  $id = $_POST['id'];
  $category = $_POST['category'];

  if(!isset($id)||empty($category)) {
    header("Location: ./categories.php");
    die();
  };

  // 查目前使用者有沒有刪除權限，若有就可以執行刪除動作，若沒有就強制退出編輯頁***
  if(!IsAdmin()){
    header("Location: ./index.php");
    die();
  };

  $sql = "UPDATE ykf2020_w11_hw2_categories SET category=?  WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('si',$category,$id);
  $result = $stmt->execute();
  if (!$result) {
    die("failed". $conn->error);
  } else {
    header("Location: ./categories.php");
  };
?>
