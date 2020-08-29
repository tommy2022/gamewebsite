<?php
  require("dbconnect.php");
  $query = "SELECT * FROM results
  WHERE game=? AND username=?";
  $connect = $db->prepare($query);
  $connect->execute(array($_POST["game"], $_POST["username"]));;
  if ($success = $connect->fetch()) {
    $score = $success['score'];
    $query = "SELECT score, username,
        RANK() OVER (PARTITION BY
                     game
                     ORDER BY
                     score DESC
                   ) rank
    FROM results WHERE game=? AND score>=?";
    $connect = $db->prepare($query);
    $connect->execute(array($_POST["game"], $score));
    if ($connect) {
      while($result = $connect->fetch()) {
        if ($result['username'] == $_POST["username"]) {
          echo json_encode(array("rank"=>$result['rank'], "score"=>$result['score']));
          exit();
        }
      }
      echo json_encode(array("rank"=>"failed"));
    }
    else {
        echo json_encode(array("rank"=>"failed"));
    }
  }
  else {
    echo json_encode(array("rank"=>"no_data"));
  }
?>
