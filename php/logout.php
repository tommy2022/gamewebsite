<?php
echo $_COOKIE['email'];
  session_start();

  $_SESSION = array();
if (isset($_COOKIE[session_name()])) {
    setcookie(session_name(), '', time()-42000, '/');
}
session_destroy();

setcookie('email', '', time() - 3600);
setcookie('password', '', time() - 3600);
if (!empty($_GET['webpage'])) {
  $link = 'Location: ../' . $_GET['webpage'] . '/' . $_GET['webpage'] . '.php';
  header($link);
}
else {
  header('Location: ../index.php');
}
?>
