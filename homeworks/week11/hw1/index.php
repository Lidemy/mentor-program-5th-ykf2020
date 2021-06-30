<?php
  session_start();
  require_once("./conn.php");
  require_once("./utils.php");

  $username = NULL;

  if(!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $user = getUserByUsername($username);
  }
  $sql = "SELECT C.id AS id, C.comment AS comment, C.created_at AS created_at, C.Username AS username, U.nickname FROM ykf2020_w11_hw1_comments AS C LEFT JOIN ykf2020_w11_hw1_users AS U ON C.username = U.username ORDER BY id DESC";
  $stmt = $conn->prepare($sql);
  $result = $stmt->execute();
  if(!$result) {
    die($conn->error);
  }
  $result = $stmt->get_result();
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
          <?php if(!$user) { ?>
            <a class="board__btn btn-register" href="./register.php"><i class="fa fa-user-plus" aria-hidden="true"></i></a>
            <a class="board__btn btn-login" href="./login.php"><i class="fa fa-sign-in" aria-hidden="true"></i></a>
          <?php } else {?>
            <a class="board__btn btn-logout" href="./logout.php"><i class="fa fa-sign-out" aria-hidden="true"></i></a>
            <?php if(checkIsAdmin($username)) { ?>
              <a class="board__btn btn-admin" href="./admin.php"><i class="fa fa-pencil" aria-hidden="true"></i></a>
          <?php }} ?>
      </div>
      <h1 class="board__title">Daydreaming 😪 Bulletin Board</h1>
      <?php if($user) { ?>
      <h3 class="hello">Hello, <?php echo escape($user['nickname']); ?> 😎 Whar's your daydream?</h3>
      <?php if(!empty($_GET['errCode'])) { ?>
          <h3 class="warningmsg"><?php echo checkError($_GET['errCode']) ?></h3>
      <?php } ?>
      <?php if(checkIsAblePost($username)){ ?>
      <form class="board__new-comment-form" action="handle_add_comment.php" method="post">
          <textarea name="comment" rows="5"></textarea>
          <input class="board__submit-btn" type="submit" value="submit" />
      </form>
      <?php }} ?>
      <div class="board__hr"></div>
      <section>
        <?php while($row = $result->fetch_assoc()) {?>
        <div class="card">
          <div class="card__avatar"></div>
          <div class="card__body">
            <div class="card__info">
              <div class="card__info-left">
                <span class="card__author"><?php echo escape($row['nickname'])?></span>
                <span class="card__time"><?php echo escape($row['created_at']) ?></span>
              </div>
              <div class="card__info-right">
                <?php if(checkIsAbleEditAllComment($username) || checkIsAbleEditOwnComment($username)&($row['username'] === $username)){ ?>
                <a href="edit_comment.php?id=<?php echo escape($row['id']);?>"><i class="fa fa-pencil" aria-hidden="true"></i></a>
                <?php } ?>
                <?php if(checkIsAbleDeleteAllComment($username) || checkIsAbleDeleteOwnComment($username)&($row['username'] === $username)){ ?>
                <a href="delete_comment.php?id=<?php echo escape($row['id']);?>"><i class="fa fa-trash" aria-hidden="true"></i></a>
                <?php } ?>
              </div>
            </div>
            <p class="card__content"><?php echo escape($row['comment']) ?></p>
          </div>
        </div>
        <?php } ?>
      </section>
    </main>
    <div class="circle1"></div>
    <div class="circle2"></div>
    <div class="circle3"></div>
  </body>
</html>
