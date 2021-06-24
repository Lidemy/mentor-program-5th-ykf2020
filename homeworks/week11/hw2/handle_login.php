<?php
  session_start();
  require_once('./conn.php');

  $username = $_POST['username'];
  $password = $_POST['password'];

  // 沒傳帳號密碼就送出的就退回去
  if(empty($username) || empty($password)) {
    header("Location: ./login.php");
    die();
  }

  $sql = "SELECT * FROM ykf2020_w11_hw2_user WHERE username = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s', $username);
  $result = $stmt->execute();
  if(!$result) {
    die($conn->error);
  };
  $result = $stmt->get_result();

  // username錯誤的就退回去
  if($result->num_rows === 0) {
    header("Location: ./login.php");
    die();
  }


  $row = $result->fetch_assoc();
  if (password_verify($password, $row['password'])) {
    $_SESSION['username'] = $username;
    header("Location:./index.php");
    die();
  } else {
    // password錯誤的就退回去
    header("Location: ./login.php");
    die();
  }
?>
