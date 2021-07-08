<?php
  require_once('./conn.php');
  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');

  $site = $_POST['site'];
  $nickname = $_POST['nickname'];
  $comment = $_POST['comment'];

  if(!isset($site) || empty($nickname) || empty($comment)) {
    $output = array(
      'loading_result' => false,
      'description' => 'Failed: Empty inputs'
    );
    echo json_encode($output);
    die();
  };

  $sql = 'INSERT INTO ykf2020_w12_hw1_comments(site,nickname,comment) VALUES(?,?,?)';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('iss', $site, $nickname, $comment);
  $result = $stmt->execute();
  if(!$result) {
    $output = array(
      'loading_result' => false,
      'description' => 'Failed: Database loading error'
    );
    echo json_encode($output);
    die();
  };


  $output = array(
    'loading_result' => true,
    'description' => 'Succeed!',
    'id' => $conn -> insert_id
  );

  echo json_encode($output);
?>
