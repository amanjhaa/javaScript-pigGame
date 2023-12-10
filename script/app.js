var score, activePlayer, roundScore, gamePlaying;
var audioBg = document.getElementById("backgroundMusic");
var audiodice = document.getElementById("diceroll");
var audioNewGame = document.getElementById("newGame");
var audioPause = document.getElementById("pause");
var buttonRoll = document.querySelector(".btn-roll");
var confetti = document.querySelector(".confetti");


init();

function init() {
  audioNewGame.play();
  score = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  dice = Math.floor(Math.random() * 6 + 1);

  document.querySelector(".dice").style.display = "none";

  document.getElementById("score-0").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}
function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.querySelector(".dice").style.display = "none";
}
buttonRoll.addEventListener("click", function () {
  buttonRoll.style.pointerEvents = "none";
  setTimeout(function() {
    buttonRoll.style.pointerEvents = "auto";
  }, 1200);
  if (gamePlaying) {

    audiodice.play();

    var dice = Math.floor(Math.random() * 6 + 1);

    var diceDom = document.querySelector(".dice");
    diceDom.style.display = "block";
    diceDom.src = "Images/dice-" + dice + ".png";

    if (dice !== 1) {
      roundScore += dice;
      document.querySelector("#current-" + activePlayer).textContent =
        roundScore;
    } else {
      setTimeout(function () {
        nextPlayer();
      }, 1000);
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  if (gamePlaying) {
    audioPause.play();
    score[activePlayer] += roundScore;

    document.querySelector("#score-" + activePlayer).textContent =
      score[activePlayer];

    if (score[activePlayer] >= 100) {
      document.querySelector("#name-" + activePlayer).textContent = "winner";
      document.querySelector(".dice").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
    } else {

      nextPlayer();
    }
  }
});

document.querySelector(".btn-new").addEventListener("click", init);
