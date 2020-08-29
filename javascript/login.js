if (logged_in) {
  document.getElementById("login_link").value = "Log out";
  document.getElementById("login_form").action = "../php/logout.php";
}
