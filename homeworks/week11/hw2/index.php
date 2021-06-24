<?php
  session_start();
  require_once("./conn.php");
  require_once('utils.php');

  // 引入 HTML Purifier
  require_once('./htmlpurifier-4.13.0-lite/library/HTMLPurifier.auto.php');
  $config = HTMLPurifier_Config::createDefault();
  $purifier = new HTMLPurifier($config);

  // 拿全部文章數量
  $sql = "SELECT COUNT(id) AS count FROM ykf2020_w11_hw2_articles";
  $stmt = $conn->prepare($sql);
  $result = $stmt->execute();
  if(!$result) {
    die($conn->error);
  };
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();

  // 整理分頁所需資料，$total->全部文章數量、$page->目前頁數、$total_page->總頁數
  $total = ($row['count']);
  if(empty($_GET['page'])) {
    $page = 1;
  } else {
    $page = $_GET['page'];
  };
  $limit = 5;
  $offset = ($page - 1)*$limit;
  $total_page = ceil($total/$limit);

  // 拿預覽文章所需資訊
  $sql = "SELECT A.id, A.title, A.content, A.created_at, C.category FROM ykf2020_w11_hw2_articles AS A LEFT JOIN ykf2020_w11_hw2_categories AS C ON A.category = C.id  ORDER BY A.id DESC LIMIT ?  OFFSET ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ii', $limit, $offset);
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
    <link rel="stylesheet" href="./styles.css">
    <title></title>
  </head>
  <body>
    <div class="nav">
      <div class="nav__left">
        <a href="index.php"><h1>Who's Blog</h1></a><a href="articles.php">文章列表</a><a href="categories.php">分類專區</a><a href="about.php">關於我</a>
      </div>
      <div class="nav__right">
        <?php if(IsAdmin()){ ?><a href="add_article.php">新增文章</a><a href="backstage.php">管理後臺</a><a href="logout.php">登出</a><?php } else { ?>
        <a href="login.php">登入</a><?php } ?>
      </div>
    </div>
    <div class="container__main">
      <div class="titles">
        <h1>存放技術之地</h1>
        <p>Welcome to my blog</p>
      </div>
      <div class="container__posts">
        <?php while($row = $result->fetch_assoc()) {?>
        <div class="post">
          <div class="post__title">
            <h1><?php echo escape($row['title']) ?></h1>
          </div>
          <div class="post__infos">
            <p><span><i class="fa fa-clock-o" aria-hidden="true"></i> <?php echo escape($row['created_at']) ?></span>&nbsp;&nbsp;<span><i class="fa fa-folder-o" aria-hidden="true"></i> <?php echo escape($row['category']) ?></span></p>
          </div>
          <div class="post__content">
            <p><?php echo $purifier->purify($row['content']); ?></p>
          </div>
          <?php if(IsAdmin()){ ?>
          <a href="edit_article.php?id=<?php echo escape($row['id']) ?>" class="edit-btn">編輯</a>
          <?php } ?>
          <a href="article.php?id=<?php echo escape($row['id']) ?>" class="readmore-btn">READ MORE</a>
        </div>
        <?php } ?>
        <div class="paginator">
          <a class="page <?php if($page==1) echo"active" ?>"href="index.php?page=1">1</a>
          <?php if($page > 3) { ?>
          <span class="pageignore">...</span>
          <?php } ?>
          <?php if($page > 2 ) { ?>
          <a class="page" href="index.php?page=<?php echo $page-1 ?>"><?php echo $page-1 ?></a>
          <?php } ?>
          <?php if($page !=1 && $page != $total_page) { ?>
          <a class="page active"href="index.php?page=<?php echo $page ?>"><?php echo $page ?></a>
          <?php } ?>
          <?php if($page < $total_page-1) { ?>
          <a class="page" href="index.php?page=<?php echo $page+1 ?>"><?php echo $page+1 ?></a>
          <?php } ?>
          <?php if($page < $total_page-2) { ?>
          <span class="pageignore">...</span>
          <?php } ?>
          <?php if($total_page!=1){ ?>
          <a class="page <?php if($page == $total_page) echo"active" ?>"href="index.php?page=<?php echo $total_page ?>"><?php echo $total_page ?></a>
          <?php } ?>
        </div>
      </div>
    </div>

    <footer>
      Copyright © 2020 Who's Blog All Rights Reserved.
    </footer>
  </body>
</html>
