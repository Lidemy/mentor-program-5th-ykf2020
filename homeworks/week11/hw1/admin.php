<?php
  session_start();
  require_once("./conn.php");
  require_once("./utils.php");

  // 查目前使用者是不是管理員，如果不是管理員就強制退出編輯頁
  if(!checkIsAdmin($_SESSION['username'])) {
    die(header("Location: ./index.php"));
  }

  $sql = "SELECT U.id, U.username, U.nickname, S.title AS status FROM ykf2020_w11_hw1_users AS U LEFT JOIN ykf2020_w11_hw1_user_status AS S ON U.status = S.id";
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
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;500;600;700;800&family=Noto+Sans+TC:wght@100;300;400;500;700;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="./styles.css">
    <title>Daydreaming Bulletin Board</title>
  </head>
  <body>
    <main class="board board__admin">
      <div class="functions">
        <a class="board__btn btn-home" href="./index.php"><i class="fa fa-home" aria-hidden="true"></i></a>
        <a class="board__btn btn-logout" href="./logout.php"><i class="fa fa-sign-out" aria-hidden="true"></i></a>
      </div>
      <h1 class="board__title">Control Panel</h1>
      <h2>Users</h2>
      <table class="user__table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Username</th>
            <th>Nickname</th>
            <th>Status</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
        <?php while ($row = $result->fetch_assoc()) { ?>
          <tr>
            <td><?php echo $row['id']?></td>
            <td><?php echo escape($row['username'])?></td>
            <td><?php echo escape($row['nickname'])?></td>
            <td><?php echo $row['status']?></td>
            <td><a class="edit-btn" href="edit_user.php?id=<?php echo $row['id'] ?>"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a></td>
          </tr>
        <?php } ?>
        </tbody>
      </table>
      <a class="add-btn" href="add_new_user.php">Add New User</a>
      <h2>User Status</h2>
      <table class="status__table">
        <thead>
          <tr>
            <th >Id</th>
            <th>Title</th>
            <th>Edit Users</th>
            <th>Add Post</th>
            <th>Edit Own Comment</th>
            <th>Edit All Comment</th>
            <th>Delete Own Comment</th>
            <th>Delette All Comment</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
        <?php $sql = "SELECT * FROM  ykf2020_w11_hw1_user_status";
        $stmt = $conn->prepare($sql);
        $result = $stmt->execute();
        if(!$result) {
          die($conn->error);
        };
        $result = $stmt->get_result();
        while ($row = $result->fetch_assoc()) {  ?>
          <tr >
            <td ><?php echo $row['id']?></td>
            <td ><?php echo $row['title']?></td>
            <td class="status-sign"><?php echo $row['is_able_edit_user'] ? '<i class="fa fa-check" aria-hidden="true"></i>' :'<i class="fa fa-times" aria-hidden="true"></i>'?></td>
            <td class="status-sign"><?php echo $row['is_able_add_post'] ? '<i class="fa fa-check" aria-hidden="true"></i>' :'<i class="fa fa-times" aria-hidden="true"></i>'?></td>
            <td class="status-sign"><?php echo $row['is_able_edit_own_comment'] ? '<i class="fa fa-check" aria-hidden="true"></i>' :'<i class="fa fa-times" aria-hidden="true"></i>'?></td>
            <td class="status-sign"><?php echo $row['is_able_edit_all_comment'] ? '<i class="fa fa-check" aria-hidden="true"></i>' :'<i class="fa fa-times" aria-hidden="true"></i>'?></td>
            <td class="status-sign"><?php echo $row['is_able_delete_own_comment'] ? '<i class="fa fa-check" aria-hidden="true"></i>' :'<i class="fa fa-times" aria-hidden="true"></i>'?></td>
            <td class="status-sign"><?php echo $row['is_able_delete_all_comment'] ? '<i class="fa fa-check" aria-hidden="true"></i>' :'<i class="fa fa-times" aria-hidden="true"></i>'?></td>
            <td><a class="edit-btn" href="edit_user_status.php?id=<?php echo $row['id'] ?>"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a></td>
          </tr>
        <?php } ?>
        </tbody>
      </table>
      <a class="add-btn" href="add_user_status.php">Add New Status</a>
    </main>
    <div class="circle1"></div>
    <div class="circle2"></div>
    <div class="circle3"></div>
  </body>
</html>
