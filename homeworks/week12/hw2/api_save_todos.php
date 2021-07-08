<?php
  require_once('conn.php');
  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');
  
  $id = $_POST['id'];
  $content = $_POST['content'];

  // 沒傳 id 的話做新增，並回傳新增好的 id
  if(empty($id)) {
    $sql = "INSERT INTO ykf2020_w12_hw2_todos(content) VALUES(?) ";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s',$content);
    $result = $stmt->execute();
    if(!$result){
      $output = array(
        'result' => false,
        'description' => '儲存失敗，請再試一次'
      );
      echo json_encode($output);
      die();
    };

    $output = array(
      'result' => true,
      'description' => '儲存成功',
      'id' => $conn -> insert_id
    );
    echo json_encode($output);
    die();
  }
  // 有傳 id 的話做更新
  $sql = 'UPDATE ykf2020_w12_hw2_todos SET content=? WHERE id =?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('si',$content, $id);
  $result = $stmt->execute();
  if(!$result){
    $output = array(
      'result' => false,
      'description' => '儲存失敗，請再試一次'
    );
    echo json_encode($output);
    die();
  };

  $output = array(
    'result' => true,
    'description' => '儲存成功'
  );
  echo json_encode($output);
  die();

?>
