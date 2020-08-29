<?php
  $game = $_POST["game"];
  require("dbconnect.php");
  $query = "SELECT username, score,
      RANK() OVER (PARTITION BY
                   game
                   ORDER BY
                   score DESC
                 ) rank
  FROM results WHERE game=? LIMIT 5";
  $connect = $db->prepare($query);
  $connect->execute(array($game));
  if ($connect) {
    while($result = $connect->fetch()) {
      echo $result['username'] . " " . $result['score'] . ",";
    }
  }
  else {
      echo "failed";
  }
?>
