<?php
  session_start();
  require_once("./conn.php");
  require_once('utils.php');

  // 查目前使用者有沒有權限，沒有就強制退出
  if(!IsAdmin()){
    header("Location: ./index.php");
    die();
  };

  $offset = 5;
  $limit = 5;

  $sql = "SELECT A.id, A.title, A.content, A.created_at, C.category FROM ykf2020_w11_hw2_articles AS A LEFT JOIN ykf2020_w11_hw2_categories AS C ON A.category = C.id ORDER BY A.id DESC";
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
    <link rel="stylesheet" href="./styles.css">

    <title></title>
  </head>
  <body>
    <div class="nav">
      <div class="nav__left">
        <a href="index.php"><h1>Who's Blog</h1></a><a href="articles.php">文章列表</a><a href="categories.php">分類專區</a><a href="about.php">關於我</a>
      </div>
      <div class="nav__right">
        <a href="add_article.php">新增文章</a>
        <a href="logout.php">登出</a>
      </div>
    </div>
    <div class="container__main">
      <div class="titles">
        <h1>存放技術之地</h1>
        <p>Welcome to my blog</p>
      </div>
        <div class="container__posts">
        <?php while($row = $result->fetch_assoc()){ ?>
          <div class="post post-backstage">
            <div class="post__title">
              <div class="post__title-word">
                <h1><?php echo escape($row['title']) ?></h1>
              </div>
              <div class="post__title-buttons">
                <p><?php echo escape($row['created_at']) ?></p>
                <a href="edit_article.php?id=<?php echo escape($row['id']) ?>" class="bs_edit-btn">編輯</a>
                <a href="handle_delete_article.php?id=<?php echo escape($row['id']) ?>" class="bs_delete-btn">刪除</a>
              </div>
            </div>
          </div>
        <?php } ?>
      </div>
    </div>
    <footer>
      Copyright © 2020 Who's Blog All Rights Reserved.
    </footer>
  </body>
</html>
