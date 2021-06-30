<?php
  session_start();
  require_once("./conn.php");
  require_once('utils.php');

  // 引入 HTML Purifier
  require_once('./htmlpurifier-4.13.0-lite/library/HTMLPurifier.auto.php');
  $config = HTMLPurifier_Config::createDefault();
  $purifier = new HTMLPurifier($config);


  $id = $_GET['id'];
  $sql = "SELECT A.id, A.title, A.content, A.created_at, C.category FROM ykf2020_w11_hw2_articles AS A LEFT JOIN ykf2020_w11_hw2_categories AS C ON A.category = C.id  WHERE A.id=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i',$id);
  $result = $stmt->execute();
  if(!$result) {
    die($conn->error);
  }
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();

  // 先拿出來
  $title = $row['title'];
  $content = $row['content'];
  $category = $row['category'];
  $created_at = $row['created_at'];

  $clean_html = $purifier->purify($content);
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
        <?php if (IsAdmin()){ ?>
          <a href="add_article.php">新增文章</a><a href="admin.php">管理後臺</a><a href="logout.php">登出</a>
        <?php } else { ?>
          <a href="login.php">登入</a>
        <?php } ?>
      </div>
    </div>
    <div class="container__main">
      <div class="titles">
        <h1>存放技術之地</h1>
        <p>Welcome to my blog</p>
      </div>
      <div class="container__posts">
        <div class="post post-spread">
          <div class="post__title-spread">
            <h1><?php echo escape($title) ?></h1>
          </div>
          <div class="post__infos">
            <p><span><i class="fa fa-clock-o" aria-hidden="true"></i> <?php echo escape($created_at) ?></span>&nbsp;&nbsp;<span><i class="fa fa-folder-o" aria-hidden="true"></i> <?php echo escape($category) ?></span></p>
          </div>
          <div class="post__content-spread">
            <p><?php echo ($clean_html) ?></p>
          </div>
          <?php if(IsAdmin()) { ?>
          <a href="edit_article.php?id=<?php echo escape($id) ?>" class="edit-btn">編輯</a>
          <?php } ?>
        </div>
      </div>
    </div>
    <footer>
      Copyright © 2020 Who's Blog All Rights Reserved.
    </footer>
  </body>
  <script type="text/javascript" src="dist/purify.min.js"></script>
  <script type="text/javascript">
    let clean = DOMPurify.sanitize( dirty );
  </script>
</html>
