<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title> Login</title>
        <link rel="stylesheet" href="../css/login.css">
        <script src="https://kit.fontawesome.com/214bbd63e6.js" crossorigin="anonymous"></script>
        <script src="javascript/jquery-3.5.1.js"></script>
    </head>
    <body>
        <div id="header">
            <span id="title">懐かしのゲームサイト</span>
            <a href = "../index.html" aria-label = "Home" class='home'><i class="fas fa-home"></i> </a>
        </div>
        <hr>
        <h3> Login </h3>
        <div id="login">
            <div>
                <p id="incorrect_input"></p>
                <form name="login_info" action="javascript:login()">
                <p>email</p>
                <input id="email" type="email" name="email">
                <p>password</p>
                <input id="password" type="password" name="password">
                <P><input type="submit" value="login"></P>
                </form>
                <a href="forgotpassword.html" style="font-size: 0.8em;">forgot password</a>
                <p  style="font-size: 0.8em;">Don't have an account? </p>
                <a href="create_account.php" style="font-size: 0.8em;">create one here</a>
            </div>
        </div>

    <script src="javascript/login.js"></script>
    </body>
</html>

