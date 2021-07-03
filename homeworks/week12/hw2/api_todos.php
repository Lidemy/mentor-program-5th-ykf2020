<?php
  require_once('./conn.php');
  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');
  
  $id = $_POST['id'];
  if(empty($id)){
    $output = array(
      'result' => false,
      'description' => '未指定id，請再試一次'
    );
    echo json_encode($output);
    die();
  };

  $sql = 'SELECT * FROM ykf2020_w12_hw2_todos WHERE id =?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i',$id);
  $result = $stmt->execute();
  if(!$result){
    $output = array(
      'result' => false,
      'description' => '讀取失敗，請再試一次'
    );
    echo json_encode($output);
    die();
  };

  $result = $stmt->get_result();
  $row = $result->fetch_assoc();
  $output = array(
    'result' => true,
    'description' => '成功讀取',
    'data' => $row
  );
  echo json_encode($output);
  die();
?>
