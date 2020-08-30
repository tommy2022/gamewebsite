<?php
  require('dbconnect.php');

  session_start();

  if(!empty($_SESSION)) {
    move_page();
  }

  if (!empty($_COOKIE['username'])) {
    $_POST['username'] = $_COOKIE['username'];
    $_POST['password'] = $_COOKIE['password'];
    $_POST['SAVE'] = "on";
  }

  if(!empty($_POST)) {
    $login = $db->prepare('SELECT * FROM users WHERE username=? AND password=?');
    $login->execute(array($_POST['username'], sha1($_POST['password'])));
    $result = $login->fetch();

    if ($result) {
      //successful

      $_SESSION['username'] = $result['username'];

      if ($_POST['save'] == "on") {
        setcookie('username', $_POST['username'], time() + 60*60*24*14);
        setcookie('password', $_POST['password'], time() + 60*60*24*14);
      }
      move_page();
    }
    else {
      $error['login'] = 'failed';
    }
  }
  function move_page() {
    if (!empty($_GET['webpage'])) {
      $link = 'Location: ../' . $_GET['webpage'] . '/' . $_GET['webpage'] . '.php';
      header($link);
    }
    else {
      header('Location: ../index.php');
    }
  }
?>


<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title> Login</title>
    <link rel="stylesheet" href="../css/login.css">
    <link rel="stylesheet" href="../css/title.css">
    <script src="https://kit.fontawesome.com/214bbd63e6.js" crossorigin="anonymous"></script>
    <script src="../javascript/jquery-3.5.1.js"></script>
  </head>
  <body>
      <div id="header">
          <span id="title">懐かしのゲームサイト</span>
          <a href = "../index.php" aria-label = "Home" class='home'><i class="fas fa-home"></i> </a>
      </div>
    <hr>
    <h3> Login </h3>
    <div id="login">
      <div>
        <?php if(!empty($error)): ?>
          <p style="color: red;">
            Your password does not match your username
          </p>
        <?php endif;?>
        <p id="incorrect_input"></p>
        <form name="login_info" action="" method="post">
        <p>username</p>
        <input id="username" type="username" name="username"
        value="<?php if (!empty($_POST)) {echo htmlspecialchars($_POST['username'], ENT_QUOTES);} ?>">
        <p>password</p>
        <input id="password" type="password" name="password">
        <br />
        <br />
        <input type="checkbox" name="save" value="on" /><label for="save">Remember me for 14 days</label>
        <P><input type="submit" value="login"></P>
        </form>
        <a href="forgotpassword.php" style="font-size: 0.8em;">forgot password</a>
        <p  style="font-size: 0.8em;">Don't have an account?
            <a href="create_account.php">Create one here</a> </p>
      </div>
    </div>
  </body>
</html>
