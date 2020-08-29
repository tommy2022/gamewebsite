<?php
    try {
      $url = parse_url(getenv('DATABASE_URL'));
      $dsn = sprintf('pgsql:host=%s;dbname=%s;charset=utf8', $url['host'], substr($url['path'], 1));
      $db = new PDO($dsn, $url['user'], $url['pass']);
    }
    catch (PDOException $e) {
      echo $e->getMessage();
    }
?>
