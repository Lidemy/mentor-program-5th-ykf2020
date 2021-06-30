<?php

  require_once('conn.php');
  require_once('utils.php');

  $category = 8;

  $sql = "SELECT id, category FROM ykf2020_w11_hw2_categories";
  $stmt = $conn->prepare($sql);
  $result2 = $stmt->execute();
  if(!$result2) {
    die($conn->error);
  };

  $result2 = $stmt->get_result();
  if(empty($category)) {
    while($row2 = $result2->fetch_assoc()) {
      echo ($row2['id'] == $category ? $row2['category']:"");
    };
  } else {
    echo "所有文章";
  }
?>
