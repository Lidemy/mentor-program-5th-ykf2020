<?php
  session_start();
  require_once('./conn.php');
  require_once('utils.php');

  // 查目前使用者有沒有刪除權限，若有就可以執行刪除動作，若沒有就強制退出編輯頁***
  if(!IsAdmin()){
    header("Location: ./index.php");
  };

  $title = $_POST['title'];
  $content = $_POST['content'];
  $category = $_POST['category'];

  // 有參數沒傳到退回上一頁
  if(empty($content)||empty($title)||empty($category)) {
    header('Location: ' . $_SERVER['HTTP_REFERER']);
    die();
  };


  $sql = "INSERT INTO ykf2020_w11_hw2_articles(title, content, category) VALUES(?,?,?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ssi',$title,$content,$category);
  $result = $stmt->execute();
  if (!$result) {
    die("failed". $conn->error);
  } else {
    header("Location: ./index.php");
  }
?>
