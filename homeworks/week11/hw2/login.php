<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="./styles.css">
    <title></title>
  </head>
  <body>
    <div class="nav">
      <div class="nav__left">
        <a href="index.php"><h1>Who's Blog</h1></a><a href="articles.php">文章列表</a><a href="categories.php">分類專區</a><a href="about.php">關於我</a>
      </div>
      <div class="nav__right">
      </div>
    </div>
    <div class="login">
      <h1>Login</h1>
      <form class="" action="handle_login.php" method="post">
        <div class="login__info">
          <p>USERNAME</p>
          <input class="username-input"type="text" name="username" value="">
          <p>PASSWORD</p>
          <input class="password-input"type="password" name="password" value="">
          <input class="login-btn" type="submit" name="" value="SIGN IN">
        </div>
      </form>
    </div>
  </body>
</html>
