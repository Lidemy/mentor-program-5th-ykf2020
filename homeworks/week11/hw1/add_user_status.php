<?php
  session_start();
  require_once("./conn.php");
  require_once("./utils.php");

  // 查目前使用者是不是管理員，如果不是管理員就強制退出編輯頁
  if(!checkIsAdmin($_SESSION['username'])) {
    die(header("Location: ./index.php"));
  }

?>

<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;500;600;700;800&family=Noto+Sans+TC:wght@100;300;400;500;700;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="./styles.css">
    <title>Daydreaming Bulletin Board</title>
  </head>
  <body>
    <main class="board">
      <div class="functions">
        <a class="board__btn btn-home" href="./index.php"><i class="fa fa-home" aria-hidden="true"></i></a>
        <a class="board__btn btn-admin" href="./admin.php"><i class="fa fa-arrow-left" aria-hidden="true"></i></a>
      </div>
      <h1 class="board__title">Add New User</h1>
      <form class="" action="handle_add_user_status.php" method="post">
        <div class="user__file">
        <div class="card__avatar"></div>
        <span class="edit-info">title: </span>  <input type="text" name="title" value="">
        <br>
        <span class="edit-info">Edit User </span><input type="radio" id="edituser1" name="is_able_edit_user" value="1"><label for="edituser1">Yes</label><input type="radio" id="edituser0" name="is_able_edit_user" value="0"><label for="edituser0">No</label>
        <br>
        <span class="edit-info">Add Post </span><input type="radio" id="addpost1" name="is_able_add_post" value="1"><label for="addpost1">Yes</label><input type="radio" id="addpost0" name="is_able_add_post" value="0"><label for="addpost0">No</label>
        <br>
        <span class="edit-info">Edit Own Comment: </span><input type="radio" id="editowncomment1" name="is_able_edit_own_comment" value="1"><label for="editowncomment1">Yes</label><input type="radio" id="editowncomment0" name="is_able_edit_own_comment" value="0"><label for="editowncomment0">No</label>
        <br>
        <span class="edit-info">Edit All Comment: </span><input type="radio" id="editallcomment1" name="is_able_edit_all_comment" value="1"><label for="editallcomment1">Yes</label><input type="radio" id="editallcomment0" name="is_able_edit_all_comment" value="0"><label for="editallcomment0">No</label>
        <br>
        <span class="edit-info">Delete Own Comment: </span><input type="radio" id="deleteowncomment1" name="is_able_delete_own_comment" value="1"><label for="deleteowncomment1">Yes</label><input type="radio" id="deleteowncomment0" name="is_able_delete_own_comment" value="0"><label for="deleteowncomment0">No</label>
        <br>
        <span class="edit-info">Delete All Comment: </span><input type="radio" id="deleteallcomment1" name="is_able_delete_all_comment" value="1"><label for="deleteallcomment1">Yes</label><input type="radio" id="deleteallcomment0" name="is_able_delete_all_comment" value="0"><label for="deleteallcomment0">No</label>
        <br>
        <input class="edit-submit-btn" type="submit" name="" value="submit">
        </div>
      </form>
    </main>
    <div class="circle1"></div>
    <div class="circle2"></div>
    <div class="circle3"></div>
  </body>
</html>
