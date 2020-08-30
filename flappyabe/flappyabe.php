<?php
  session_start();
?>
<!DOCTYPE html>
<html>
<head>
  <title>Flappy Bird</title>
  <meta charset="utf-8" />
  <script src="../javascript/jquery-3.5.1.js"></script>
  <script src="../javascript/dbconnect.js"></script>
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
          <input type="hidden" name="webpage" value="flappyabe">
          <input id="login_link" type="submit" value="Login/Create account"
          style="border:none;background-color:transparent;color:blue;text-decoration:underline;">
      </form>
      <hr />
  </div>
  <canvas id="canvas" width="600" height="600"></canvas>
  <canvas id="abe" width="600" height="600"></canvas>

  <div id="instructions">
    <h3> Game Controls</h3>
    <section>
      <h4> Single player</h4>
      <p><span style="font-weight: bold">Jump</span> - w, space, up-arrow, <br /> enter, mouse right-click </p>
    </section>
    <hr />
    <section>
      <h4> Double player</h4>
      <p><span style="font-weight: bold">P1 (Abe) Jump</span> - up-arrow, enter, mouse right-click </p>
      <p><span style="font-weight: bold">P1 (Abe) Jump</span> - w, space </p>
    </section>
    <hr />
    <p><span style="font-weight: bold">Return to main menu</span> - Esc</p>
  </div>
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
    get_leaderboard("FA", username);
  }
  else {
    $("#result_info").css("display", "none");
  }
</script>
  <script src="../javascript/login.js"></script>
  <script src="../javascript/game.js"></script>
  <script src="javascript/abengers.js"></script>
  <script src="javascript/flappyabe.js"></script>
  <script src="javascript/update.js"></script>
</body>
</html>
