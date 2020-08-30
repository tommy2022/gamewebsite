function get_userrank(game, user) {
  $.post('../php/userrank.php', {game: game, username: user}, function(data) {
    $("#row6").css("display", "");
    $("#user_6").html(user);
    if (data.rank != "no_data") {
      $("#user_rank").html(data.rank);
      $("#score_6").html(data.score);
      user_score = data.score;
    }
    else {
      $("#user_rank").html("NA");
      $("#score_6").html("No record");
    }
  }, "json");
}
function get_leaderboard(game, user) {
  let pass_info = "game=" + game;
  $.post('../php/leaderboard.php', pass_info, function(data) {
    debugger;
    let userfound = false;
    const users = data.split(",");
    for (let i = 1; i < 6; i++) {
      if (users[i - 1]) {
        var record = users[i - 1].split(" ");
        var u_id = "#user_" + i.toString();
        var s_id = "#score_" + i.toString();
        if (record[0] == user) {
          user_score = record[1];
          userfound = true;
          const row_id = "#row" + i;
          $(row_id).css("font-weight", "bold");
        }
        $(u_id).html(record[0]);
        $(s_id).html(record[1]);
      }
    }
    if (!userfound) {
      get_userrank(game, user);
    }
  });
}

function set_score(score, game, user) {
  debugger;
  let boolean = true;
  if (!user_score) {
    boolean = false;
  }
  if (score > user_score) {
    user_score = score;
    $.post("../php/setscore.php", {game: game, username: user, score: score, bool: boolean});
    get_leaderboard(game, user);
  }
}
