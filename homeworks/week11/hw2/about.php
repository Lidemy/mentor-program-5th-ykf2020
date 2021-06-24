<?php
  session_start();
  require_once("./conn.php");
  require_once('utils.php');
?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="./styles.css">
    <title>Who's Blog</title>
  </head>
  <body>
    <div class="nav">
      <div class="nav__left">
        <a href="index.php"><h1>Who's Blog</h1></a><a href="articles.php">文章列表</a><a href="categories.php">分類專區</a><a href="about.php">關於我</a>
      </div>
      <div class="nav__right">
        <?php if(IsAdmin()){ ?><a href="add_article.php">新增文章</a><a href="backstage.php">管理後臺</a><a href="logout.php">登出</a><?php } ?>
        <?php if(!IsAdmin()){ ?><a href="login.php">登入</a><?php } ?>
      </div>
    </div>
    <div class="container__main">
      <div class="titles">
        <h1>存放技術之地</h1>
        <p>Welcome to my blog</p>
      </div>
      <div class="container__posts">
        <div class="post post-spread">
          <div class="post__title about_title">
            <img src="https://truth.bahamut.com.tw/s01/202104/9c0bf63b744fde98f63841df09089eee.JPG" alt="">
            <h1>白川（白川（しらかわ），聲：飯田里穗）</h1>
          </div>
          <div class="hr"></div>
          <div class="post__content-spread about_content">
            <p>28歲的羊駝，剛力醫院的護士，是一位沉穩的成熟女性，但也有愛開玩笑的一面。興趣是卡波耶拉。
            Shirakawa is a nurse at Gouriki's medical clinic. She is a calm and mature woman, but sometimes shows a mischievous side. She is learning capoeira as a hobby. She is also the ex-girlfriend of Dobu.
            剛力医院の看護師。
  落ち着いた大人の女性だがたまにお茶目な一面を見せるときもある。
  趣味でカポエイラを習っている。</p>
          </div>
        </div>
      </div>
    </div>
    <footer>
      Copyright © 2020 Who's Blog All Rights Reserved.
    </footer>
  </body>
</html>
