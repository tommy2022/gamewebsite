<?php
  session_start();
?>
<!DOCTYPE html>
<html>
<head>
  <title>Game</title>
  <meta charset='utf-8' />
  <link rel="stylesheet" href="css/title.css">
  <script src="https://kit.fontawesome.com/214bbd63e6.js" crossorigin="anonymous"></script>
  <script>
  let logged_in = false;
    <?php if (!empty($_SESSION['username'])): ?>
      logged_in = true;
    <?php endif; ?>
  </script>
</head>
<body>
  <div id="header">
      <span id="title">懐かしのゲームサイト</span>
      <form id="login_form" action="php/login.php" method="get">
          <input id="login_link" type="submit" value="Login/Create account"
          style="border:none;background-color:transparent;color:blue;text-decoration:underline;">
      </form>
      <hr />
  </div>
<div>
 <h4> Tetris </h4>
 <input type="button" value="Tetris page" onclick="location.href='tetris/tetris.php'"></input>
  </div>
<div>
 <h4> FLappy Abe(s) </h4>
 <input type="button" value="Flappy Abe(s) page" onclick="location.href='flappyabe/flappyabe.php'"></input>
  </div>
  <div>
 <h4> Space Invader </h4>
 <input type="button" value="spaceinvader page" onclick="location.href='spaceinvader/spaceinvader.php'"></input>
  </div>

  <script>
    if (logged_in) {
      document.getElementById("login_link").value = "Log out";
      document.getElementById("login_form").action = "php/logout.php";
    }
  </script>
</body>
</html>
