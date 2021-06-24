<?php
  session_start();
  require_once('./conn.php');
  require_once('./utils.php');

  $id = $_POST['id'];
  $comment = $_POST['comment'];
  $username = $_SESSION['username'];

  if(empty($comment)) {
    header("Location: ./edit_comment.php?id=".$id."&errCode=4");
    die();
  }

  // 查此留言的 username
  $sql = "SELECT username FROM ykf2020_w11_hw1_comments WHERE id = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i',$id);
  $result = $stmt->execute();
  if (!$result)  die("failed". $conn->error);
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();

  // 查目前使用者有沒有編輯權限，若有就可以執行編輯動作，若沒有就強制退出編輯頁
  if(checkIsAbleEditAllComment($username) || checkIsAbleEditOwnComment($username)&($row['username'] === $username)) {
    $sql = "UPDATE ykf2020_w11_hw1_comments SET comment =? WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('si',$comment,$id);
    $result = $stmt->execute();
    if (!$result)  die("failed". $conn->error);
    header("Location: ./index.php");
  } else {
    header("Location: ./index.php");
  }
?>
