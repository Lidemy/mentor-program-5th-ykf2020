<?php
  session_start();
  require_once("./conn.php");
  require_once("./utils.php");

  // 查目前使用者是不是管理員，如果不是管理員就強制退出編輯頁
  if(!checkIsAdmin($_SESSION['username'])) {
    header("Location: ./index.php");
    die();
  };

  $id = $_GET['id'];
  $user = getUserByUserid($id);

  if(!$user) {
    header("Location: ./admin.php");
    die();
  };

  // 先取出資料方便等等使用
  $username = $user['username'];
  $nickname = $user['nickname'];
  $username = $user['username'];
  $status = $user['status'];
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
      <h1 class="board__title">Edit User</h1>
      <form class="" action="./handle_edit_user.php" method="post">
        <div class="user__file">
        <div class="card__avatar"></div>
        <p class="edit-info">Username: <span><?php echo escape($username) ?></span></p>
        <br>
        <label class="edit-info" for="">Nickname: </label> <input class="edit-input" type="text" name="nickname" value="<?php echo escape($nickname) ?>">
        <br>
        <label class="edit-info" for="">Status: </label> <select class="edit-input" name="status">
        <?php $row = getAllStatus();
          for ($i =0; $i<sizeof($row);$i++) {  ?>
          <option value="<?php echo escape($row[$i]->id) ?>" <?php echo (escape($row[$i]->id) == $status ? "selected" : "") ?>><?php echo escape($row[$i]->title) ?></option>
        <?php } ?>
        </select>
        <br>
        <label class="edit-info" for="">Password: </label> <span class="passwordchange-btn">*click to change*</span><input class="hide passwordchange" type="password" name="password" value=""><span class="hide cancelpasswordchange-btn"> *cancel* </span>
        <br><br>
        <input type="hidden" name="id" value="<?php echo escape($id) ?>">
        <input class="edit-submit-btn" type="submit" name="" value="submit">
        </div>
      </form>
      <form class="" action="delete_user.php" method="post">
        <input class="edit-delete-btn" type="submit" name="" value="delete this user">
        <input type="hidden" name="id" value="<?php echo escape($id) ?>">
      </form>
    </main>
    <div class="circle1"></div>
    <div class="circle2"></div>
    <div class="circle3"></div>
  </body>
  <script type="text/javascript">
    var change_btn = document.querySelector(".passwordchange-btn")
    var input = document.querySelector(".passwordchange")
    var cancel_btn = document.querySelector(".cancelpasswordchange-btn")

    change_btn.addEventListener('click',function(){
      input.classList.toggle('hide')
      cancel_btn.classList.toggle('hide')
      change_btn.classList.toggle('hide')
    })

    cancel_btn.addEventListener('click',function(){
      input.value = ""
      input.classList.toggle('hide')
      cancel_btn.classList.toggle('hide')
      change_btn.classList.toggle('hide')
      console.log(input.value)
    })
  </script>
</html>
