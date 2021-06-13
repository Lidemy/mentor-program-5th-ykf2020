<?php
  session_start();
  require_once("./conn.php");
  require_once("./utils.php");

  $username = NULL;

  if(!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $user = getUserByUsername($username);
  }

  $sql = "SELECT * from ykf2020_w9_comments ORDER BY id DESC";
  $result = $conn->query($sql);
?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
    <link rel="preconnect" href="https://fonts.gstatic.com">
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
          <?php } ?>
      </div>
      <h1 class="board__title">Daydreaming 😪 Bulletin Board</h1>
      <?php if($user) { ?>
      <h3 class="hello">Hello, <?php echo $user['nickname']; ?> 😎 Whar's your daydream?</h3>
      <form class="board__new-comment-form" action="handle_add_comment.php" method="post">
          <textarea name="comment" rows="5"></textarea>
          <input class="board__submit-btn" type="submit" value="submit" />
      </form>
      <?php } ?>
      <div class="board__hr"></div>
      <section>
        <?php while($row = $result->fetch_assoc()) {?>
        <div class="card">
          <div class="card__avatar"></div>
          <div class="card__body">
            <div class="card__info">
              <span class="card__author"><?php $author = getUserByUsername($row['username']); echo $author['nickname']?></span>
              <span class="card__time"><?php echo $row['created_at'] ?></span>
            </div>
            <p class="card__content"><?php echo $row['comment'] ?></p>
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
