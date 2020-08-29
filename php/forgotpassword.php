<?php
$auth = true;
if (!empty($_POST['user-username']) || !empty($_POST['user-email'])) {
  require('dbconnect.php');
  if (!empty($_POST['user-username'])) {
    $query = "SELECT * FROM users WHERE username=?";
    $connect = $db->prepare($query);
    $connect->execute(array($_POST['user-username']));
  }
  if (!empty($_POST['user-email'])) {
    $query = "SELECT * FROM users WHERE email=?";
    $connect = $db->prepare($query);
    $connect->execute(array($_POST['user-email']));
  }
  $success = $connect->fetch();
  if ($success) {
    echo "success";
  }
  else {
    $auth = false;
  }
}
?>

<!DOCTYPE html>
<head>
  <meta charset="utf-8" />
  <link rel="stylesheet" href="../css/title.css">
  <script src="https://kit.fontawesome.com/214bbd63e6.js" crossorigin="anonymous"></script>
  <script src="../javascript/jquery-3.5.1.js"></script>
</head>

<body>
  <div id="header">
      <span id="title">懐かしのゲームサイト</span>
      <a href = "../index.php" aria-label = "Home" class='home'><i class="fas fa-home"></i> </a>
  </div>
  <form name="frmForgot" action="" method="post">
  <h2>Forgot Password?</h2>
  <p id="fill-multiple">
    please fill out either one from below
  </p>
  <p id="connect-error" style="color: red">
    <?php if (!$auth) { echo "The entered username or email does not exist";} ?>
  </p>
  	<?php if(!empty($success_message)) { ?>
  	<div class="success_message"><?php echo $success_message; ?></div>
  	<?php } ?>

  	<div id="validation-message">
  		<?php if(!empty($error_message)) { ?>
  	<?php echo $error_message; ?>
  	<?php } ?>
  	</div>

  	<div class="field-group">
  		<div><label for="username">Username</label></div>
  		<div><input type="text" name="user-username" id="user-username" class="input-field"> Or</div>
  	</div>

  	<div class="field-group">
  		<div><label for="email">Email</label></div>
  		<div><input type="email" name="user-email" id="user-email" class="input-field"></div>
  	</div>

  	<div class="field-group">
  		<div><input type="submit" name="forgot-password" id="forgot-password" value="Submit"></div>
  	</div>
  </form>

  <script>
    $("#user-username").keyup(function() {
      if ($("#user-email").val() != "") {
        $(this).val("");
        $("#fill-multiple").css("color", "red");
      }
    });
    $("#user-email").keyup(function() {
      if ($("#user-username").val() != "") {
        $(this).val("");
        $("#fill-multiple").css("color", "red");
      }
    });
  </script>
</body>
