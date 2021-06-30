<?php
  session_start();
  require_once('./conn.php');
  require_once('utils.php');

  // 查目前使用者有沒有刪除權限，若有就可以執行刪除動作，若沒有就強制退出編輯頁
  if(!IsAdmin()){
    header("Location: ./index.php");
  };

  $category = $_POST['category'];

  if(empty($category)) {
    header('Location: ' . $_SERVER['HTTP_REFERER']);
    die();
  };



  $sql = "INSERT INTO ykf2020_w11_hw2_categories(category) VALUES(?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s',$category);
  $result = $stmt->execute();
  if (!$result) {
    die("failed". $conn->error);
  } else {
    header("Location: ./categories.php");
  }
?>
