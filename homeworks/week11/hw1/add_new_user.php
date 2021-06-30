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
      <h1 class="board__title">Edit User</h1>
      <form class="" action="./handle_add_new_user.php" method="post">
        <div class="user__file">
        <div class="card__avatar"></div>
        <span class="edit-info">username: </span> <input type="text" name="username" value="">
        <br>
        <span class="edit-info">password: </span> <input type="password" name="password" value="">
        <br>
        <span class="edit-info">nickname: </span> <input type="text" name="nickname" value="">
        <br>
        <span class="edit-info">status: </span> <select class="" name="status">
        <?php $row = getAllStatus();
            for ($i =0; $i<sizeof($row);$i++) {  ?>
            <option value="<?php echo $row[$i]->id ?>" <?php echo($row[$i]->id==$status ? "selected" : "") ?>><?php echo $row[$i]->title ?></option>
        <?php } ?>
        </select>
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
