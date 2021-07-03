<?php
  require_once('./conn.php');
  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');
  
  $offset = $_POST['offset'];
  $site = $_POST['site'];
  $limit = $_POST['limit'];

  if(!isset($site)){
    $output = array(
      'loading_result' => false,
      'description' => 'Failed: Please indicate the site'
    );
    echo json_encode($output);
    die();
  };

  if(empty($limit)){
    $limit = 5;
  };


  $sql = "SELECT * FROM ykf2020_w12_hw1_comments  WHERE site = ? ORDER BY id DESC LIMIT ? OFFSET ? ";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('iii', $site, $limit, $offset);
  $result = $stmt->execute();
  if(!$result) {
    $output = array (
    'loading_result' => false,
    'description' => 'Failed: Database loading error'
    );

    echo json_encode($output);
    die();
  };
  $result = $stmt->get_result();
  $comments = array();
  while($row = $result->fetch_assoc()) {
    array_push($comments, array(
      'id' => $row['id'],
      'nickname' => $row['nickname'],
      'comment' => $row['comment'],
      'created_at' => $row['created_at']
    ));
  };
  // 再去撈下五筆看撈不撈的到，如果撈不到就回傳 false，載入更多的按鈕就可以不用顯示了
  $offset = $offset + $limit;
  $sql = "SELECT * FROM ykf2020_w12_hw1_comments  WHERE site = ? ORDER BY id DESC LIMIT ? OFFSET ? ";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('iii', $site, $limit, $offset);
  $result = $stmt->execute();
  if(!$result) {
    $output = array (
    'loading_result' => false,
    'description' => 'Failed: Database loading error'
    );
    echo json_encode($output);
    die();
  };

  $result = $stmt->get_result();
  $output = array(
    "loading_result" => true,
    "comments" => $comments,
    "more" => ($result->num_rows == 0 ? false : true )
  );
  echo json_encode($output);

?>
