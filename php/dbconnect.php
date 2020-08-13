<?php 
    try {
      $dsn = 'mysql:dbname=practice;host=localhost;charset=utf8';
      $db = new PDO($dsn, 'root', '');
    }
    catch (PDOException $e) {
      echo $e->getMessage();
    }
?>