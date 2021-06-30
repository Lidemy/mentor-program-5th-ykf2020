<?php
  session_start();
  require_once("./conn.php");
  require_once('utils.php');

  $sql = "SELECT * FROM ykf2020_w11_hw2_categories ORDER BY id ";
  $stmt = $conn->prepare($sql);
  $result = $stmt->execute();
  if(!$result) {
    die($conn->error);
  };
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
        <?php if (IsAdmin()) { ?>
        <a href="add_article.php">新增文章</a><a href="backstage.php">管理後臺</a><a href="logout.php">登出</a>
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
        <?php if (IsAdmin()) { ?>
          <div class="post post-backstage">
            <form class="" action="handle_add_category.php" method="post">
              <div class="post__title">
                <div class="post__title-word">
                  <input type="text" name="category" class="add-category-input" placeholder="新增分類..." value=""></input>
                </div>
                <div class="post__title-buttons">
                  <input type="submit" class="add-category-btn" name="" value="送出">
                </div>
              </div>
            </form>
          </div>
        <?php } ?>
        <?php while($row = $result->fetch_assoc()){
          $count = getArticlesCount($row['id']);?>
          <div class="post post-backstage">
            <form class="" action="handle_edit_category.php" method="post">
              <div class="post__title">
                <div class="post__title-word">
                  <input type="hidden" name="id" value="<?php echo escape($row['id']) ?>">
                  <input type="text" name="category" class="hide add-category-input" placeholder="<?php echo escape($row['category']) ?>..." value=""></input>
                  <h1 class="category-title"><?php echo escape($row['category']) ?> ( <?php echo $count ?> )</h1>
                  <div class="hide cat-articles">
                    <?php
                    $sql = "SELECT id, title FROM ykf2020_w11_hw2_articles WHERE category = ? ORDER BY id DESC";
                    $stmt = $conn->prepare($sql);
                    $stmt->bind_param('i', $row['id']);
                    $result2 = $stmt->execute();
                    if(!$result2) {
                      die($conn->error);
                    };
                    $result2 = $stmt->get_result();
                    while($row2 = $result2->fetch_assoc()) { ?>
                    <div class="cat-article-title"><a href="article.php?id=<?php echo escape($row2['id']) ?>">・<?php echo escape($row2['title']) ?></a></div>
                    <?php } ?>
                  </div>
                </div>
                <?php if(IsAdmin()){ ?>
                <div class="post__title-buttons">
                  <p class="category-created_at"><?php echo escape($row['created_at']) ?></p>
                  <a class="bs_edit-btn edit-category-btn">編輯</a>
                  <input class="hide bs_edit-btn edit-category-submit-btn" type="submit" name="" value="送出">
                  <a href="handle_delete_category.php?id=<?php echo escape($row['id']) ?>" class=" <?php if ($row['id'] == 0) echo "cover" ?> bs_delete-btn">刪除</a>
                  <a class="hide bs_edit-btn edit-cancel-btn">取消</a>
                </div>
                <?php } ?>
              </div>
            </form>
          </div>
        <?php } ?>
      </div>
    </div>
    <footer>
      Copyright © 2020 Who's Blog All Rights Reserved.
    </footer>
    <script
      src="https://code.jquery.com/jquery-3.6.0.min.js"
      integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
      crossorigin="anonymous"></script>
    <script type="text/javascript">
      $('.container__posts').on('click','.edit-category-btn',function(e){
        var editBtn = e.target
        $(editBtn).toggleClass('hide')
        var submitBtn = $(e.target).parent().find('.edit-category-submit-btn')
        $(submitBtn).toggleClass('hide')
        var deleteBtn = $(e.target).parent().find('.bs_delete-btn')
        $(deleteBtn).toggleClass('hide')
        var cancelBtn = $(e.target).parent().find('.edit-cancel-btn')
        $(cancelBtn).toggleClass('hide')
        var createdAt = $(e.target).parent().find('.category-created_at')
        $(createdAt).toggleClass('cover')
        var input = $(e.target).parent().parent().find('.add-category-input')
        $(input).toggleClass('hide')
        var title = $(e.target).parent().parent().find('.category-title')
        $(title).toggleClass('hide')
      })
      $('.container__posts').on('click','.edit-cancel-btn',function(e){
        var cancelBtn = e.target
        $(cancelBtn).toggleClass('hide')
        var submitBtn = $(e.target).parent().find('.edit-category-submit-btn')
        $(submitBtn).toggleClass('hide')
        var deleteBtn = $(e.target).parent().find('.bs_delete-btn')
        $(deleteBtn).toggleClass('hide')
        var editBtn = $(e.target).parent().find('.edit-category-btn')
        $(editBtn).toggleClass('hide')
        var createdAt = $(e.target).parent().find('.category-created_at')
        $(createdAt).toggleClass('cover')
        var input = $(e.target).parent().parent().find('.add-category-input')
        $(input).toggleClass('hide')
        var title = $(e.target).parent().parent().find('.category-title')
        $(title).toggleClass('hide')
      })
      $('.container__posts').on('click','.category-title',function(e){
        var catArticles = $(e.target).parent().find('.cat-articles')
        $(catArticles).toggleClass('hide')
      })
    </script>
  </body>
</html>
