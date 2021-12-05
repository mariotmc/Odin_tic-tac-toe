const GameInitialization = (() => {
  const container = document.querySelector(".container");
  const nameInput = document.querySelector("#name");

  window.addEventListener("load", () => {
    container.style.display = "none";
    nameInput.focus();
  });

  return {
    container,
    nameInput,
  };
})();

const PlayerNamePrompt = (() => {
  const form = document.querySelector("form");
  const player1DisplayName = document.querySelector("#player1-name");

  const getPlayerName = () => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (GameInitialization.nameInput.value.length > 8) {
        alert("Please limit the characters to 8");
      } else if (GameInitialization.nameInput.value.length <= 8) {
        const playerName = GameInitialization.nameInput.value;

        player1DisplayName.textContent = playerName;

        GameInitialization.container.style.display = "flex";
        form.style.display = "none";

        GameInitialization.nameInput.textContent = "";
        GameInitialization.nameInput.value = "";
      }
    });
  };

  return { player1DisplayName, getPlayerName };
})();

const GameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  const cells = document.querySelectorAll(".cell");

  const updateBoard = (() => {
    cells.forEach((element) => {
      element.addEventListener("click", (e) => {
        if (
          parseInt(Scores.player1Display.textContent) < 5 &&
          parseInt(Scores.player2Display.textContent) < 5
        ) {
          if (GameFlow.currentPlayer === GameFlow.player1) {
            if (GameBoard.board[e.target.dataset.index] === "") {
              // player move
              GameBoard.board[e.target.dataset.index] =
                GameFlow.currentPlayer.getShape();
              element.textContent = GameBoard.board[e.target.dataset.index];
              element.style.color = "#ee6055";
              GameFlow.GameOver();

              GameFlow.currentPlayer = GameFlow.player2;

              // computer move
              if (
                parseInt(Scores.player1Display.textContent) < 5 &&
                parseInt(Scores.player2Display.textContent) < 5
              ) {
                setTimeout(() => {
                  Computer.computerMoves();
                  GameFlow.GameOver();
                  GameFlow.currentPlayer = GameFlow.player1;
                }, 500);
              }
            }
          }
        }
        if (parseInt(Scores.player1Display.textContent) === 5) {
          winLossMessage.winMessage();
        }
        if (parseInt(Scores.player2Display.textContent) === 5) {
          winLossMessage.lossMessage();
        }
      });
    });
  })();

  const clearBoard = (winner) => {
    cells.forEach((element) => {
      element.textContent = "";
    });

    if (winner === GameFlow.player1) {
      GameFlow.currentPlayer = GameFlow.player2;
    } else if (winner === GameFlow.player2) {
      GameFlow.currentPlayer = GameFlow.player1;
    }
  };

  return { board, cells, clearBoard };
})();

const Player = (name, shape) => {
  const getName = () => name;
  const getShape = () => shape;

  return { getName, getShape };
};

const Computer = (() => {
  const profile = Player("Computer", "O");

  function computerMoves() {
    const cell = Math.floor(Math.random() * 9);

    if (GameBoard.board[cell] === "") {
      GameBoard.board[cell] = Computer.profile.getShape();
      GameBoard.cells[cell].textContent = Computer.profile.getShape();
      GameBoard.cells[cell].style.color = "#5aa9e6";
    } else {
      return computerMoves();
    }
  }

  return { profile, computerMoves };
})();

const Scores = (() => {
  const player1Display = document.querySelector("#player1-score");
  const player2Display = document.querySelector("#player2-score");

  let player1 = 0;
  let player2 = 0;

  player1Display.textContent = player1;
  player2Display.textContent = player2;

  const updatePlayer1Score = () => {
    player1 += 1;
    player1Display.textContent = player1;
  };

  const updatePlayer2Score = () => {
    player2 += 1;
    player2Display.textContent = player2;
  };

  const resetScores = () => {
    player1 = 0;
    player1Display.textContent = player1;
    player2 = 0;
    player2Display.textContent = player2;
  };

  return {
    player1,
    player2,
    player1Display,
    player2Display,
    updatePlayer1Score,
    updatePlayer2Score,
    resetScores,
  };
})();

const GameFlow = (() => {
  const player1 = Player(PlayerNamePrompt.getPlayerName(), "X");

  const player2 = Computer.profile;

  let currentPlayer = player1;

  const GameOver = () => {
    const row1 = [GameBoard.board[0], GameBoard.board[1], GameBoard.board[2]];
    const row2 = [GameBoard.board[3], GameBoard.board[4], GameBoard.board[5]];
    const row3 = [GameBoard.board[6], GameBoard.board[7], GameBoard.board[8]];
    const column1 = [
      GameBoard.board[0],
      GameBoard.board[3],
      GameBoard.board[6],
    ];
    const column2 = [
      GameBoard.board[1],
      GameBoard.board[4],
      GameBoard.board[7],
    ];
    const column3 = [
      GameBoard.board[2],
      GameBoard.board[5],
      GameBoard.board[8],
    ];
    const diagonal1 = [
      GameBoard.board[0],
      GameBoard.board[4],
      GameBoard.board[8],
    ];
    const diagonal2 = [
      GameBoard.board[2],
      GameBoard.board[4],
      GameBoard.board[6],
    ];

    const player1Win = (() => {
      if (
        row1.every((currentValue) => currentValue === player1.getShape()) ||
        row2.every((currentValue) => currentValue === player1.getShape()) ||
        row3.every((currentValue) => currentValue === player1.getShape()) ||
        column1.every((currentValue) => currentValue === player1.getShape()) ||
        column2.every((currentValue) => currentValue === player1.getShape()) ||
        column3.every((currentValue) => currentValue === player1.getShape()) ||
        diagonal1.every(
          (currentValue) => currentValue === player1.getShape()
        ) ||
        diagonal2.every((currentValue) => currentValue === player1.getShape())
      ) {
        Scores.updatePlayer1Score();
        GameBoard.clearBoard(player1);
        GameBoard.board = ["", "", "", "", "", "", "", "", ""];
      }
    })();

    const player2Win = (() => {
      if (
        row1.every((currentValue) => currentValue === player2.getShape()) ||
        row2.every((currentValue) => currentValue === player2.getShape()) ||
        row3.every((currentValue) => currentValue === player2.getShape()) ||
        column1.every((currentValue) => currentValue === player2.getShape()) ||
        column2.every((currentValue) => currentValue === player2.getShape()) ||
        column3.every((currentValue) => currentValue === player2.getShape()) ||
        diagonal1.every(
          (currentValue) => currentValue === player2.getShape()
        ) ||
        diagonal2.every((currentValue) => currentValue === player2.getShape())
      ) {
        Scores.updatePlayer2Score();
        GameBoard.clearBoard(player2);
        GameBoard.board = ["", "", "", "", "", "", "", "", ""];
      }
    })();

    const tie = (() => {
      if (!GameBoard.board.some((element) => element === "")) {
        if (
          !row1.every((currentValue) => currentValue === player1.getShape()) ||
          !row2.every((currentValue) => currentValue === player1.getShape()) ||
          !row3.every((currentValue) => currentValue === player1.getShape()) ||
          !column1.every(
            (currentValue) => currentValue === player1.getShape()
          ) ||
          !column2.every(
            (currentValue) => currentValue === player1.getShape()
          ) ||
          !column3.every(
            (currentValue) => currentValue === player1.getShape()
          ) ||
          !diagonal1.every(
            (currentValue) => currentValue === player1.getShape()
          ) ||
          !diagonal2.every(
            (currentValue) => currentValue === player1.getShape()
          ) ||
          !row1.every((currentValue) => currentValue === player2.getShape()) ||
          !row2.every((currentValue) => currentValue === player2.getShape()) ||
          !row3.every((currentValue) => currentValue === player2.getShape()) ||
          !column1.every(
            (currentValue) => currentValue === player2.getShape()
          ) ||
          !column2.every(
            (currentValue) => currentValue === player2.getShape()
          ) ||
          !column3.every(
            (currentValue) => currentValue === player2.getShape()
          ) ||
          !diagonal1.every(
            (currentValue) => currentValue === player2.getShape()
          ) ||
          !diagonal2.every(
            (currentValue) => currentValue === player2.getShape()
          )
        ) {
          GameBoard.clearBoard();
          GameBoard.board = ["", "", "", "", "", "", "", "", ""];
        }
      }
    })();
  };

  return {
    player1,
    player2,
    currentPlayer,
    GameOver,
  };
})();

const winLossMessage = (() => {
  const messageDisplay = document.querySelector("#win-loss-message");
  const body = document.querySelector("body");

  const winMessage = () => {
    body.style.backgroundColor = "#d6f6dd";
    messageDisplay.textContent = `Congrats ${PlayerNamePrompt.player1DisplayName.textContent}! You won.`;
  };

  const lossMessage = () => {
    body.style.backgroundColor = "#ffafcc";
    messageDisplay.textContent = `Unlucky ${PlayerNamePrompt.player1DisplayName.textContent}! You lost.`;
  };

  const resetMessage = () => {
    body.style.backgroundColor = "#cddafd";
    messageDisplay.textContent = `First to 5 wins`;
  };

  return { winMessage, lossMessage, resetMessage };
})();

const NewGame = (() => {
  const newGameButton = document.querySelector("#new-game");

  newGameButton.addEventListener("click", () => {
    Scores.resetScores();
    GameBoard.clearBoard();
    GameBoard.board = ["", "", "", "", "", "", "", "", ""];
    winLossMessage.resetMessage();
    GameFlow.currentPlayer = GameFlow.player1;
  });
})();
