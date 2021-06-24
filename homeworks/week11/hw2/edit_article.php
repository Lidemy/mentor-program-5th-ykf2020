<?php
  session_start();
  require_once("./conn.php");
  require_once('utils.php');

  // 查目前使用者有沒有刪除權限，若有就可以執行刪除動作，若沒有就強制退出編輯頁***
  if(!IsAdmin()){
    header("Location: ./index.php");
  }

  $id = $_GET['id'];

  $sql = "SELECT *  FROM ykf2020_w11_hw2_articles  WHERE id=?";
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
?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="./styles.css">
    <title></title>
  </head>
  <script src="https://cdn.ckeditor.com/ckeditor5/28.0.0/classic/ckeditor.js"></script>
  <body>
    <div class="nav">
      <div class="nav__left">
        <a href="index.php"><h1>Who's Blog</h1></a><a href="articles.php">文章列表</a><a href="categories.php">分類專區</a><a href="about.php">關於我</a>
      </div>
      <div class="nav__right">
        <a href="add_article.php">新增文章</a><a href="backstage.php">管理後臺</a><a href="logout.php">登出</a>
      </div>
    </div>
    <div class="container__main">
      <div class="titles">
        <h1>存放技術之地</h1>
        <p>Welcome to my blog</p>
      </div>
      <div class="container__posts">
        <div class="post post-spread post-add">
          <form class="add__article-form" action="handle_edit_article.php" method="post">
            <div class="post__title">
              <h1>編輯文章：</h1>
              <input class="input-title" type="text" name="title" placeholder="請輸入文章標題..." value="<?php echo escape($title) ?>"></input>
            </div>
            <div class="post__infos">
              <select class="" name="category">
                <?php $row = getAllCategories();
                  for ($i =0; $i<sizeof($row); $i++) {  ?>
                  <option value="<?php echo escape($row[$i]->id) ?>" <?php echo(escape($row[$i]->id) == $category ? "selected" : "") ?>><?php echo escape($row[$i]->category) ?></option>
                <?php } ?>
              </select>
            </div>
            <div class="post__content-spread">
              <textarea name="content" id="editor"><?php echo $content ?></textarea>
            </div>
          <input type="hidden" name="id" value="<?php echo escape($id) ?>">
          <input class="submit-btn" type="submit" name="" value="送出">
        </div>
        </form>
      </div>
    </div>
    <footer>
      Copyright © 2020 Who's Blog All Rights Reserved.
    </footer>
  </body>
  <script>
    ClassicEditor
      .create( document.querySelector( '#editor' ) )
      .catch( error => {
    console.error( error );
    } );
  </script>
</html>
