<?php
  require_once('./utils.php');
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
    <header class="warning">
      <strong>🚧 注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼 🚧<br>
        Do Not Enter Your Real Username And Password!</strong>
    </header>
    <main class="board">
      <div class="">
          <a class="board__btn btn-home" href="./index.php"><i class="fa fa-home" aria-hidden="true"></i></a>
          <a class="board__btn btn-login" href="./login.php"><i class="fa fa-sign-in" aria-hidden="true"></i></a>
          <h2>Register</h2>
          <?php if(!empty($_GET['errCode'])) { ?>
              <h3 class="warningmsg"><?php echo checkError($_GET['errCode']) ?></h3>
          <?php } ?>
          <form class="register-form" action="./handle_register.php" method="post">
            <div class="board__nickname">
              <span>Username：</span>
              <input type="text" name="username" value="">
            </div>
            <div class="board__nickname">
              <span>Password ：</span>
              <input type="password" name="password" value="">
            </div>
            <div class="board__nickname">
              <span>Nickname ：</span>
              <input type="text" name="nickname" value="">
            </div>
            <input class="board__submit-btn" type="submit" value="confirm"/>
          </form>
      </div>
    </main>
    <div class="circle1"></div>
    <div class="circle2"></div>
    <div class="circle3"></div>
  </body>
</html>
