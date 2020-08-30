<?php
    try {
      echo "hello";
      $url = parse_url(getenv('DATABASE_URL'));
      echo substr($url['path']);
      $dsn = sprintf('pgsql:host=%s;dbname=%s', $url['host'], substr($url['path'], 1));
      $db = new PDO($dsn, $url['user'], $url['pass']);
    }
    catch (PDOException $e) {
      echo $e->getMessage();
    }
?>
