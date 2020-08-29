<?php
  session_start();
?>
<!DOCTYPE html>
<html>
    <head>
      <title>Space Invader</title>
      <meta charset="utf-8">
      <link rel="stylesheet" href="css/style.css">
      <link rel="stylesheet" href="../css/title.css">
      <script>
      let logged_in = false;
        <?php if (!empty($_SESSION['username'])): ?>
          logged_in = true;
        <?php endif; ?>
      </script>
      <script src="https://kit.fontawesome.com/214bbd63e6.js" crossorigin="anonymous"></script>
      <script src="../javascript/jquery-3.5.1.js"></script>
      <script src="../javascript/dbconnect.js"></script>
      <script src="javascript/colors.js"></script>
      <script src="javascript/bullet.js"></script>
      <script src="javascript/reset_arena.js"></script>
      <script src="javascript/items.js"></script>
    </head>
    <body>
      <div id="header">
          <span id="title">懐かしのゲームサイト</span>
          <a href = "../index.php" aria-label = "Home" class='home'><i class="fas fa-home"></i></a>
          <form id="login_form" action="../php/login.php" method="get">
              <input type="hidden" name="webpage" value="spaceinvader">
              <input id="login_link" type="submit" value="Login/Create account"
              style="border:none;background-color:transparent;color:blue;text-decoration:underline;">
          </form>
          <hr />
      </div>
      <h2 id="spaceinvader">Space Invader</h2>
        <canvas id="fore" height="200" width ="300"></canvas>
        <canvas id="back" height="260" width ="300"></canvas>
      <div id="result_info">
        <h3 style="text-align: center; line-height: 0.3em;">Leaderboard</h3>
        <hr />
        <table width="100%" style="text-align: center;">
          <tr>
            <th>  </th>
            <th> Username </th>
            <th> Score </th>
          </tr>
          <tr id="row1">
            <td>1</td>
            <td id="user_1"></td>
            <td id="score_1"></td>
          </tr>
          <tr id="row2">
            <td>2</td>
            <td id="user_2"></td>
            <td id="score_2"></td>
          </tr>
          <tr id="row3">
            <td>3</td>
            <td id="user_3"></td>
            <td id="score_3"></td>
          </tr>
          <tr id="row4">
            <td>4</td>
            <td id="user_4"></td>
            <td id="score_4"></td>
          </tr>
          <tr id="row5">
            <td>5</td>
            <td id="user_5"></td>
            <td id="score_5"></td>
          </tr>
          <tr id="row6" style="display: none; font-weight: bold;">
            <td id="user_rank"></td>
            <td id="user_6"></td>
            <td id="score_6"></td>
          </tr>
        </table>
      </div>
        <script>
        let user_score = null;
        let username = "<?php if(!empty($_SESSION['username'])) echo $_SESSION['username'];?>";
        if (logged_in) {
          get_leaderboard("SI", username);
        }
        else {
          $("#result_info").css("display", "none");
        }
      </script>
        <script src="../javascript/login.js"></script>
        <script src="../javascript/game.js"></script>
        <script src="javascript/enemy.js"></script>
        <script src="javascript/spaceship.js"></script>
        <script src="javascript/foreground.js"></script>
        <script src="javascript/background.js"></script>
        <script src="javascript/spaceinvader.js"></script>
        <script src="javascript/update.js"></script>
    </body>
</html>
