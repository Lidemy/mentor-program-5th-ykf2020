<?php
  session_start();
  require_once("./conn.php");
  require_once("./utils.php");

  // 查目前使用者是不是管理員，如果不是管理員就強制退出編輯頁
  if(!checkIsAdmin($_SESSION['username'])) {
    die(header("Location: ./index.php"));
  }

  $id = $_GET['id'];
  $sql = "SELECT * FROM  ykf2020_w11_hw1_user_status WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i',$id);
  $result = $stmt->execute();
  if(!$result) {
    die($conn->error);
  };
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();

  // 先取出資料方便等等使用
  $title = $row['title'];
  $is_able_add_post = $row['is_able_add_post'];
  $is_able_edit_user = $row['is_able_edit_user'];
  $is_able_delete_own_comment = $row['is_able_delete_own_comment'];
  $is_able_delete_all_comment = $row['is_able_delete_all_comment'];
  $is_able_edit_own_comment = $row['is_able_edit_own_comment'];
  $is_able_edit_all_comment = $row['is_able_edit_all_comment'];

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
      <h1 class="board__title">Edit Status</h1>
      <form class="" action="handle_edit_user_status.php" method="post">
        <div class="user__file">
        <div class="card__avatar"></div>
        <span class="edit-info">title: </span> <input type="text" name="title" value="<?php echo escape($title) ?>">
        <br>
        <span class="edit-info">Edit User </span><input type="radio" id="edituser1" name="is_able_edit_user" value="1" <?php if($is_able_edit_user) echo "checked" ?>><label for="edituser1">Yes</label><input type="radio" id="edituser0" name="is_able_edit_user" value="0" <?php if(!$is_able_edit_user) echo "checked" ?> ><label for="edituser0">No</label>
        <br>
        <span class="edit-info">Add Post </span><input type="radio" id="addpost1" name="is_able_add_post" value="1" <?php if($is_able_add_post) echo "checked" ?> ><label for="addpost1">Yes</label><input type="radio" id="addpost0" name="is_able_add_post" value="0" <?php if(!$is_able_add_post) echo "checked" ?> ><label for="addpost0">No</label>
        <br>
        <span class="edit-info">Edit Own Comment: </span><input type="radio" id="editowncomment1" name="is_able_edit_own_comment" value="1" <?php if($is_able_edit_own_comment) echo "checked" ?> ><label for="editowncomment1">Yes</label><input type="radio" id="editowncomment0" name="is_able_edit_own_comment" value="0" <?php if(!$is_able_edit_own_comment) echo "checked" ?> ><label for="editowncomment0">No</label>
        <br>
        <span class="edit-info">Edit All Comment: </span><input type="radio" id="editallcomment1" name="is_able_edit_all_comment" value="1" <?php if($is_able_edit_all_comment) echo "checked" ?> ><label for="editallcomment1">Yes</label><input type="radio" id="editallcomment0" name="is_able_edit_all_comment" value="0" <?php if(!$is_able_edit_all_comment) echo "checked" ?> ><label for="editallcomment0">No</label>
        <br>
        <span class="edit-info">Delete Own Comment: </span><input type="radio" id="deleteowncomment1" name="is_able_delete_own_comment" value="1"<?php if($is_able_delete_own_comment) echo "checked" ?>  ><label for="deleteowncomment1">Yes</label><input type="radio" id="deleteowncomment0" name="is_able_delete_own_comment" value="0" <?php if(!$is_able_delete_own_comment) echo "checked" ?>  ><label for="deleteowncomment0">No</label>
        <br>
        <span class="edit-info">Delete All Comment: </span><input type="radio" id="deleteallcomment1" name="is_able_delete_all_comment" value="1" <?php if($is_able_delete_all_comment) echo "checked" ?>><label for="deleteallcomment1">Yes</label><input type="radio" id="deleteallcomment0" name="is_able_delete_all_comment" value="0" <?php if(!$is_able_delete_all_comment) echo "checked" ?> ><label for="deleteallcomment0">No</label>
        <br>
        <input type="hidden" name="id" value="<?php echo escape($id) ?>">
        <input class="edit-submit-btn" type="submit" name="" value="submit">
        </div>
      </form>
      <form class="" action="delete_user_status.php" method="post">
        <input class="edit-delete-btn" type="submit" name="" value="delete this status">
        <input type="hidden" name="id" value="<?php echo escape($id) ?>">
      </form>
    </main>
    <div class="circle1"></div>
    <div class="circle2"></div>
    <div class="circle3"></div>
  </body>
</html>
