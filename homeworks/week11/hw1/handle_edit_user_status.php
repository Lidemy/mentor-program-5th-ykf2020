<?php
  session_start();
  require_once('./conn.php');
  require_once('./utils.php');

  // 查目前使用者是不是管理員，如果不是管理員就強制退出編輯頁
  if(!checkIsAdmin($_SESSION['username'])) {
    die(header("Location: ./index.php"));
  }

  $id = $_POST['id'];
  $title = $_POST['title'];
  $is_able_add_post = $_POST['is_able_add_post'];
  $is_able_edit_user = $_POST['is_able_edit_user'];
  $is_able_delete_own_comment = $_POST['is_able_delete_own_comment'];
  $is_able_delete_all_comment = $_POST['is_able_delete_all_comment'];
  $is_able_edit_own_comment = $_POST['is_able_edit_own_comment'];
  $is_able_edit_all_comment = $_POST['is_able_edit_all_comment'];


  // 沒寫 nickname 的話是為錯誤，退回去上一頁
  if(empty($title)||!isset($is_able_edit_user)||!isset($is_able_add_post)||!isset($is_able_edit_own_comment)||!isset($is_able_edit_all_comment)||!isset($is_able_delete_own_comment)||!isset($is_able_delete_all_comment)) {
    header("Location: ./edit_user_status.php");
    die();
  };


  // 根據剛剛編輯結果去資料庫改 user 的資料
  $sql = "UPDATE ykf2020_w11_hw1_user_status SET title = ?, is_able_add_post = ?, is_able_edit_user =? , is_able_delete_own_comment = ?, is_able_delete_all_comment = ?, is_able_edit_own_comment = ?, is_able_edit_all_comment=?  WHERE id = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('siiiiiii', $title, $is_able_add_post, $is_able_edit_user,$is_able_delete_own_comment,$is_able_delete_all_comment,$is_able_edit_own_comment,$is_able_edit_all_comment,$id);
  $result = $stmt->execute();
  if (!$result)  die("failed". $conn->error);
  header("Location: ./admin.php");
?>
