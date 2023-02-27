window.addEventListener("load", function () {
  let is_Runing = false;
  let score = 0;
  const gameChoices = this.document.querySelector(
    "#game_choices .game_choices-content"
  );
  const gameResult = this.document.querySelector("#game-result");
  const btnChoiceEls = this.document.querySelectorAll(".btn-choice");
  const btnPlayAgain = this.document.querySelector("#play-again");
  const scoreEl = this.document.querySelector(".score_element .score_value");
  const gameStateEl = this.document.querySelector("#game-state");
  const playerChoiceEl = this.document.querySelector("#player-choice");
  const houseChoiceEl = this.document.querySelector("#house-choice");
  const resultStatusEl = this.document.querySelector("#result-status");
  const choiceClasses = ["rock", "paper", "scissors"];
  let playerChoiceValue = null;
  let HouseChoiceValue = null;
  btnChoiceEls.forEach((btn) => {
    btn.addEventListener("click", function () {
      gameChoices.classList.remove("active");
      gameResult.classList.add("active");
      const index = choiceClasses.findIndex((val) =>
        btn.classList.contains(val)
      );
      playerChoiceValue = choiceClasses[index];
      playTurn(playerChoiceEl, playerChoiceValue);
      setTimeout(function () {
        animateHousePlay();
      }, 400);
    });
  });

  btnPlayAgain.addEventListener("click", function () {
    gameChoices.classList.add("active");
    resultStatusEl.classList.remove("active");
    gameResult.classList.remove("active");
    playTurn(houseChoiceEl, "empty");
  });
  function playTurn(el, choice) {
    choiceClasses.forEach((val) => el.classList.remove(val));
    el.classList.remove("empty");
    el.classList.add(choice);
  }
  function getRandomChoice() {
    const arr = choiceClasses;

    return arr[Math.floor(Math.random() * arr.length)];
  }
  function animateHousePlay() {
    let i = 0;
    const limit = 20;
    const timer = setInterval(function () {
      HouseChoiceValue = getRandomChoice();
      playTurn(houseChoiceEl, HouseChoiceValue);
      i++;
      if (limit < i) {
        clearInterval(timer);
        checkForWin();
      }
    }, 50);
  }
  function checkForWin() {
    if (
      (playerChoiceValue === "rock" && HouseChoiceValue === "scissors") ||
      (playerChoiceValue === "paper" && HouseChoiceValue === "rock") ||
      (playerChoiceValue === "scissors" && HouseChoiceValue === "paper")
    ) {
      gameStateEl.innerHTML = "You Win";
      scoreEl.innerHTML = Number(scoreEl.innerHTML) + 1;
    }else if(
      (playerChoiceValue === "scissors" && HouseChoiceValue === "rock") ||
      (playerChoiceValue === "rock" && HouseChoiceValue === "paper") ||
      (playerChoiceValue === "paper" && HouseChoiceValue === "scissors")
    ){
      gameStateEl.innerHTML = "You Lose";
    } else {
      gameStateEl.innerHTML = "Draw";
    }
    resultStatusEl.classList.add("active");
  }
  function gameInit() {
    is_Runing = true;
    score = 0;
    scoreEl.innerHTML = score;
  }
  gameInit();
});
