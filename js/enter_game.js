module.exports = {
  process : process
}

let twoPlayerGame = false;

function oneVsOne() {
  console.log("1 vs 1");
  
  // toggle buttons
  var button = document.getElementById("2v2");
  button.disabled = false;  

  button = document.getElementById("1v1");
  button.disabled = true;  

  // disable inputs for second players
  var secondPlayers = document.getElementById("playerA2");
  secondPlayers.style.display = "none";
  secondPlayers = document.getElementById("playerB2");
  secondPlayers.style.display = "none";

  twoPlayerGame = false;
}

function twoVsTwo() {
  console.log("2 vs 2");

  // toggle buttons
  var button = document.getElementById("1v1");
  button.disabled = false;  

  button = document.getElementById("2v2");
  button.disabled = true;  

  // enable inputs for second players
  var secondPlayers = document.getElementById("playerA2");
  secondPlayers.style.display = "block";
  secondPlayers = document.getElementById("playerB2");
  secondPlayers.style.display = "block";

  twoPlayerGame = true;
}

function process (playerA1, playerA2, playerB1, playerB2, goalsA, goalsB)
{
  console.log("game entered");
  /*
  console.log("player A1: " + playerA1);
  console.log("player A2: " + playerA2);
  console.log("player B1: " + playerB1);
  console.log("goals A:   " + goalsA);
  console.log("goals B:   " + goalsB);
  */

  if (twoPlayerGame) {
    console.log("two player game");
  }
  else {
    console.log("one player game");
  }
}