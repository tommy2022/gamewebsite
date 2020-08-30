<?php
    session_start();
    $error = NULL;
    $duplicate = false;

    if (!empty($_POST)) {
        if ($_POST["password"] != $_POST["confirm"]) {
            $error['confirm'] = 1;
        }

        if (empty($error)) {
          echo $_POST["email"] . "  "  . $_POST["username"];

            require('dbconnect.php');
            $statement = $db->prepare('INSERT INTO users SET email=?, username=?, password=?');
            $ret = $statement->execute(array($_POST["email"], $_POST['username'], sha1($_POST["password"])));
            if ($ret) {
              $_SESSION['username'] = $_POST["username"];
              header('Location: account_successful.php');
              exit();
            }
            else {
              echo " lalala";
                $duplicate = true;
            }
        }
    }
?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title> Create Account</title>
        <link rel="stylesheet" href="../css/login.css">
        <script src="https://kit.fontawesome.com/214bbd63e6.js" crossorigin="anonymous"></script>
        <script src="../javascript/jquery-3.5.1.js"></script>
    </head>
    <body>
        <div id="header">
            <span id="title">懐かしのゲームサイト</span>
            <a href = "../index.html" aria-label = "Home" class='home'><i class="fas fa-home"></i> </a>
        </div>
        <hr>
        <h3> Create new account </h3>
        <div id="login">
            <div>
                <p id="message" style="color: red">
                    <?php if (!empty($error)) : ?>
                    The password and confirmation password do not match.
                    <?php endif; ?>
                    <?php if ($duplicate) : ?>
                      This email address is already used
                    <?php endif; ?>
                </p>
                <form name="login_info" action="" method="post">
                <p>Email</p>
                <input id="email" type="email" name="email" required
                value="<?php if (!empty($_POST)) {echo htmlspecialchars($_POST['email'], ENT_QUOTES);} ?>" >
                <p>Username</p>
                <input id="username" type="username" name="username" required>
                <p>Password</p>
                <input id="password" type="password" name="password" required>
                <p>Confirm password</p>
                <input id="confirm" type="password" name="confirm" required>
                <P><input type="submit" value="Create Account"></P>
                </form>
            </div>
        </div>
    </body>
</html>
