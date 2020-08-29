<?php
    try {
      $dsn = 'mysql:dbname=practice;host=127.0.0.1;charset=utf8';
      $db = new PDO($dsn, 'root', '');
    }
    catch (PDOException $e) {
      echo $e->getMessage();
    }
?>
