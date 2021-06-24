<?php
  session_start();
  require_once('./conn.php');
  require_once('./utils.php');

  $id = $_GET['id'];
  $username = $_SESSION['username'];

  // 沒傳id就進來編輯頁的直接導回去首頁
  if(empty($id)) {
    header("Location: ./index.php");
    die();
  }

  // 查此留言的 username
  $sql = "SELECT username,comment FROM ykf2020_w11_hw1_comments WHERE id = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i',$id);
  $result = $stmt->execute();
  if (!$result)  die("failed". $conn->error);
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();

  // 查目前使用者有沒有編輯權限，若沒有就強制退出編輯頁
  if(!(checkIsAbleEditAllComment($username) || checkIsAbleEditOwnComment($username)&($row['username'] === $username))) {
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
        <a class="board__btn btn-logout" href="./logout.php"><i class="fa fa-sign-out" aria-hidden="true"></i></a>
      </div>
      <h1 class="board__title">Daydreaming 😪 Bulletin Board</h1>
      <h3 class="hello">Edit The Comment📝</h3>
      <?php if(!empty($_GET['errCode'])) { ?>
          <h3 class="warningmsg"><?php echo checkError($_GET['errCode']) ?></h3>
      <?php } ?>
      <form class="board__new-comment-form" action="handle_edit_comment.php" method="post">
          <textarea name="comment" rows="5"><?php echo escape($row['comment']) ?></textarea>
          <input type="hidden" name="id" value="<?php echo escape($id) ?>">
          <input class="board__submit-btn" type="submit" value="submit" />
      </form>
      <div class="board__hr"></div>
    </main>
    <div class="circle1"></div>
    <div class="circle2"></div>
    <div class="circle3"></div>
  </body>
</html>
