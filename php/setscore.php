<?php
require("dbconnect.php");
if ($_POST['bool'] == "true") {
  echo "help";
  $query = "UPDATE results SET score=? WHERE username=? AND game=?";
}
else {
  echo "hello";
  $query = "INSERT INTO results (score, username, game, time) VALUES (?, ?, ?, now())";
}
$connect = $db->prepare($query);
$connect->execute(array($_POST['score'], $_POST['username'], $_POST['game']));
?>
