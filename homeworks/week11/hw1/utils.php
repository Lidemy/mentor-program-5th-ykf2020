<?php
  session_start();
  require_once('./conn.php');

  function getUserByUsername($username) {
    global $conn;
    $sql = "SELECT U.id, U.username, U.nickname, U.status, S.title, S.is_able_add_post, S.is_able_delete_own_comment, S.is_able_delete_all_comment, S.is_able_edit_own_comment, S.is_able_edit_all_comment, S.is_able_edit_user FROM ykf2020_w11_hw1_users AS U LEFT JOIN ykf2020_w11_hw1_user_status AS S ON U.status = S.id WHERE username = ? ";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s',$username);
    $result = $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    return $row;
  }

  function getUserByUserId($user_id) {
    global $conn;
    $sql = "SELECT * FROM ykf2020_w11_hw1_users WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i',$user_id);
    $result = $stmt->execute();
    $result = $stmt->get_result();
    if (!$result)  die("failed". $conn->error);
    $row = $result->fetch_assoc();
    return getUserByUsername($row['username']);
  }

  function getAllStatus(){
    global $conn;
    $sql = "SELECT * FROM  ykf2020_w11_hw1_user_status";
    $stmt = $conn->prepare($sql);
    $result = $stmt->execute();
    if(!$result) {
      die($conn->error);
    };
    $result = $stmt->get_result();

    $s = [];

    while($row = $result->fetch_assoc()) {
      array_push($s, (object)[
            'id' => $row['id'],
            'title' => $row['title']
      ]);
    };
    return $s;
  }

  function checkIsAdmin($username) {
    return getUserByUsername($username)['is_able_edit_user'];
  }

  function checkIsAblePost($username) {
    return getUserByUsername($username)['is_able_add_post'];
  }

  function checkIsAbleDeleteOwnComment($username) {
    return getUserByUsername($username)['is_able_delete_own_comment'];
  }

  function checkIsAbleDeleteAllComment($username) {
    return getUserByUsername($username)['is_able_delete_all_comment'];
  }

  function checkIsAbleEditOwnComment($username) {
    return getUserByUsername($username)['is_able_edit_own_comment'];
  }

  function checkIsAbleEditAllComment($username) {
    return getUserByUsername($username)['is_able_edit_all_comment'];
  }

  function escape($str) {
    return htmlspecialchars($str,ENT_QUOTES,'utf-8');
  }

  function checkError($errorCode) {
    if($_GET['errCode'] == 1) {
      $msg = 'Failed：Incomplete info, please try again.';
    } else if ($_GET['errCode'] == 2) {
      $msg = 'Failed：This username was already used.';
    } else if ($_GET['errCode'] == 3) {
      $msg = 'Failed：Incorrect username or password, please try again.';
    } else if ($_GET['errCode'] == 4) {
      $msg = 'Failed：Empty content was sent.';
    }
    return $msg;
  }
?>
