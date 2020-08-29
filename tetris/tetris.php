<?php
  session_start();
?>
<!DOCTYPE html>
<html>
<head>
  <meta charset = "utf-8">
  <title>Tetris</title>
  <script src="../javascript/jquery-3.5.1.js"></script>
  <link rel="stylesheet" href="css/style.css" />
  <link rel="stylesheet" href="../css/title.css" />
  <script>
  let logged_in = false;
    <?php if (!empty($_SESSION['username'])): ?>
      logged_in = true;
    <?php endif; ?>
  </script>
  <script src="https://kit.fontawesome.com/214bbd63e6.js" crossorigin="anonymous"></script>
</head>
<body>
  <div id="header">
      <span id="title">懐かしのゲームサイト</span>
      <a href = "../index.php" aria-label = "Home" class='home'><i class="fas fa-home"></i></a>
      <form id="login_form" action="../php/login.php" method="get">
          <input type="hidden" name="webpage" value="tetris">
          <input id="login_link" type="submit" value="Login/Create account"
          style="border:none;background-color:transparent;color:blue;text-decoration:underline;">
      </form>
      <hr />
  </div>
  <div id="instructions">
    <h3> Game Controls</h3>
    <p>Turn Clockwise: Q </p>
    <p>Turn Anti-Clockwise: W </p>
    <p>Move Left: Left Arrow (←) </p>
    <p>Move Right: Right Arrow (→) </p>
    <p>Drop One Block: Down Arrow (↓) </p>
    <p>Hard Drop: Space </p>
    <p>Swap Block: Enter </p>
  </div>
  <div id="currscore">Score: <span id="score"></span> </div>

  <div class="result">
    <span id="gameover">GAME OVER</span>
    <br /><br />
    <span id="scoreResult"></span>
    <br /> <br /><br />
    <span> Press space to start again</span>
  </div>
  <canvas id="tetris" width="240" height="400"></canvas>
  <canvas id="next" width="200" height="200"></canvas>

  <script src="../javascript/login.js"></script>
  <script src="../javascript/game.js"></script>
  <script src="javascript/tetris.js"></script>
  <script src="javascript/update.js"></script>
</body>
</html>
