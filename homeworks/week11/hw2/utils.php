<?php
  session_start();
  require_once('conn.php');

  function IsAdmin() {
    return ($_SESSION['username']==='admin');
  };

  function getAllCategories() {
    global $conn;
    $sql = "SELECT * FROM  ykf2020_w11_hw2_categories";
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
            'category' => $row['category']
      ]);
    };
    return $s;
  };

  function getArticlesCount($id) {

    global $conn;

    $sql = "SELECT COUNT(id) AS count FROM ykf2020_w11_hw2_articles WHERE category = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i',$id);
    $result = $stmt->execute();
    if (!$result) {
      die($conn->error);
    };

    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    return $row['count'] ;

    };

  function escape($str) {
    return htmlspecialchars($str,ENT_QUOTES,'utf-8');
  }

?>
