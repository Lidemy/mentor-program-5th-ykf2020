<?php
  session_start();
  require_once("./conn.php");
  require_once('utils.php');

  // 引入 HTML Purifier
  require_once('./htmlpurifier-4.13.0-lite/library/HTMLPurifier.auto.php');
  $config = HTMLPurifier_Config::createDefault();
  $purifier = new HTMLPurifier($config);

  $category = $_GET['category'];
  $page = $_GET['page'];
  if(!empty($category)){
    $sql = "SELECT id, category FROM ykf2020_w11_hw2_categories WHERE id =?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i',$category);
    $result2 = $stmt->execute();
    if(!$result2) {
      die($conn->error);
    };
    $result2 = $stmt->get_result();
    $row2 = $result2->fetch_assoc();
    $name = $row2['category'];
  } else {
    $name = "所有文章";
  };


  // 拿全部文章數量
  if(empty($category)) {
    $sql = "SELECT COUNT(id) AS count FROM ykf2020_w11_hw2_articles";
    $stmt = $conn->prepare($sql);
    $result = $stmt->execute();
    if(!$result) {
      die($conn->error);
    };
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    $total = ($row['count']);
  } else {
    $total = getArticlesCount($category);
  };

  // 拿 page
  if(empty($_GET['page'])) {
    $page = 1;
  } else {
    $page = $_GET['page'];
  };
  // 整理分頁所需資料，$page->目前頁數、$total_page->總頁數
  $limit = 5;
  $offset = ($page - 1)*$limit;
  $total_page = ceil($total/$limit);

  if(empty($category)) {
    $sql = "SELECT A.id, A.title, A.content, A.created_at, C.category FROM ykf2020_w11_hw2_articles AS A LEFT JOIN ykf2020_w11_hw2_categories AS C ON A.category = C.id ORDER BY A.id DESC LIMIT ?  OFFSET ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ii',$limit,$offset);
    $result = $stmt->execute();
    if(!$result) {
      die($conn->error);
    };
  } else {
    $sql = "SELECT A.id, A.title, A.content, A.created_at, C.category FROM ykf2020_w11_hw2_articles AS A LEFT JOIN ykf2020_w11_hw2_categories AS C ON A.category = C.id WHERE A.category =?  ORDER BY A.id DESC LIMIT ?  OFFSET ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('iii',$category,$limit,$offset);
    $result = $stmt->execute();
    if(!$result) {
    die($conn->error);
  };
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
      <?php if(IsAdmin()){ ?><a href="add_article.php">新增文章</a><a href="backstage.php">管理後臺</a><a href="logout.php">登出</a><?php } ?>
      <?php if(!IsAdmin()){ ?><a href="login.php">登入</a><?php } ?>
      </div>
    </div>
    <div class="container__main">
      <div class="titles">
        <h1>文章列表</h1>
        <p class="category-choose"><?php echo escape($name); ?> <i class="category-choose-btn fa fa-caret-down" aria-hidden="true"></i></p>
        <div class="category-choose-panel hide">
          <div class="category-choose-option"><a href="articles.php?category=0">所有文章</a></div>
          <?php
          $sql = "SELECT id, category FROM ykf2020_w11_hw2_categories";
          $stmt = $conn->prepare($sql);
          $result3 = $stmt->execute();
          if(!$result3) {
            die($conn->error);
          };
          $result3 = $stmt->get_result();
          while($row3 = $result3->fetch_assoc()) { ?>
          <div class="category-choose-option"><a href="articles.php?category=<?php echo escape($row3['id'])?>"><?php echo escape($row3['category']) ?></a></div>
          <?php } ?>
        </div>
      </div>
      <div class="container__posts">
        <?php
         while($row = $result->fetch_assoc()) {?>
        <div class="post">
          <div class="post__title">
            <h1><?php echo escape($row['title']) ?></h1>
          </div>
          <div class="post__infos">
            <p><span><i class="fa fa-clock-o" aria-hidden="true"></i> <?php echo escape($row['created_at']) ?></span>&nbsp;&nbsp;<span><i class="fa fa-folder-o" aria-hidden="true"></i> <?php echo escape($row['category']) ?></span></p>
          </div>
          <div class="post__content">
            <p><?php echo $purifier->purify($row['content']) ?></p>
          </div>
          <?php if(IsAdmin()){ ?>
          <a href="edit_article.php?id=<?php echo escape($row['id']) ?>" class="edit-btn">編輯</a>
          <?php } ?>
          <a href="article.php?id=<?php echo escape($row['id']) ?>" class="readmore-btn">READ MORE</a>
        </div>
        <?php } ?>
        <div class="paginator">
          <a class="page <?php if($page==1) echo"active" ?>"href="articles.php?page=1&category=<?php echo escape($category) ?>">1</a>
          <?php if($page > 3) { ?>
          <span class="pageignore">...</span>
          <?php } ?>
          <?php if($page > 2 ) { ?>
          <a class="page" href="articles.php?page=<?php echo $page-1 ?>&category=<?php echo $category ?>"><?php echo $page-1 ?></a>
          <?php } ?>
          <?php if($page !=1 && $page != $total_page) { ?>
          <a class="page active"href="articles.php?page=<?php echo $page ?>&category=<?php echo $category ?>"><?php echo $page ?></a>
          <?php } ?>
          <?php if($page < $total_page-1) { ?>
          <a class="page" href="articles.php?page=<?php echo $page+1 ?>&category=<?php echo $category ?>"><?php echo $page+1 ?></a>
          <?php } ?>
          <?php if($page < $total_page-2) { ?>
          <span class="pageignore">...</span>
          <?php } ?>
          <?php if($total_page!=1){ ?>
          <a class="page <?php if($page == $total_page) echo"active" ?>"href="articles.php?page=<?php echo $total_page ?>&category=<?php echo $category ?>"><?php echo $total_page ?></a>
          <?php } ?>
        </div>
      </div>
    </div>
    <footer>
      Copyright © 2020 Who's Blog All Rights Reserved.
    </footer>
    <script type="text/javascript">
      document.querySelector('.category-choose').addEventListener('click',function(){
        document.querySelector('.category-choose-panel').classList.toggle('hide')
        document.querySelector('.category-choose-btn').classList.toggle('fa-caret-down')
        document.querySelector('.category-choose-btn').classList.toggle('fa-caret-up')
      })
    </script>
  </body>
</html>
